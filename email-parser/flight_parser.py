# flight_parser.py
import email
import io
import hashlib
import re
from datetime import datetime
from typing import Dict, Optional, List, Any
import csv
import json

# Third-party libs (install via pip)
# pip install python-dateutil beautifulsoup4 pdfplumber Pillow requests

from dateutil import parser as dateparser
from bs4 import BeautifulSoup
import pdfplumber
from PIL import Image

# --- Helpers ---

def sha256_hex(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()

def normalize_iata(code: str) -> str:
    if not code: return ""
    return code.strip().upper()

def parse_currency_amount(s: str):
    # very simple: capture currency symbol/code + amount
    # returns tuple (amount_float, currency_code)
    if not s:
        return None, None
    s = s.replace(",", "")
    m = re.search(r'([A-Z]{3})\s*([0-9]+(?:\.[0-9]+)?)', s)
    if m:
        return float(m.group(2)), m.group(1)
    m = re.search(r'([£$€])\s*([0-9]+(?:\.[0-9]+)?)', s)
    if m:
        sym = m.group(1)
        mapping = {"$":"USD","£":"GBP","€":"EUR"}
        return float(m.group(2)), mapping.get(sym,"USD")
    # fallback: find number
    m = re.search(r'([0-9]+(?:\.[0-9]+)?)', s)
    if m:
        return float(m.group(1)), "USD"
    return None, None

# --- parsers for different formats ---

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    text = []
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            t = page.extract_text() or ""
            text.append(t)
    return "\n".join(text)

def extract_images_from_email(msg: email.message.EmailMessage) -> List[bytes]:
    images = []
    for part in msg.walk():
        ctype = part.get_content_type()
        dispo = part.get("Content-Disposition", "")
        if ctype.startswith("image/") or (dispo and "attachment" in dispo and ctype.startswith("image/")):
            payload = part.get_payload(decode=True)
            if payload:
                images.append(payload)
    return images

def find_price_in_text(text: str):
    # naive search for price
    matches = re.findall(r'([A-Z]{3}\s*[0-9\.,]+|[£$€]\s*[0-9\.,]+|[0-9\.,]+\s*[A-Z]{3})', text)
    for m in matches:
        amt, cur = parse_currency_amount(m)
        if amt:
            return amt, cur
    return None, None

def find_iata_codes(text: str):
    # look for patterns like LHR, JFK, CDG (3-letter codes)
    codes = re.findall(r'\b([A-Z]{3})\b', text)
    # heuristics: common words filter
    stopwords = {"USD","EUR","GBP","FROM","TO","AND","THE"}
    codes = [c for c in codes if c not in stopwords]
    return codes[:2]  # try origin,destination

def parse_datetime_from_text(text: str) -> Optional[datetime]:
    # find a datetime-like substring and parse
    # Use dateutil to be forgiving
    # try patterns: 2025-09-10 14:30, 10 Sep 2025 14:30, Sep 10, 2025 14:30
    patterns = re.findall(r'\b(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}|\d{2}[:]\d{2} \w+ \d{4}|\w+ \d{1,2}, \d{4} \d{1,2}:\d{2})\b', text)
    if patterns:
        for p in patterns:
            try:
                return dateparser.parse(p)
            except Exception:
                continue
    # fallback: try any date-like with dateutil
    try:
        return dateparser.parse(text, fuzzy=True)
    except Exception:
        return None

# --- main email -> flight structure ---

def parse_email_message(raw_bytes: bytes) -> Dict[str,Any]:
    msg = email.message_from_bytes(raw_bytes)

    # extract plain text and html
    plain = ""
    html = ""
    for part in msg.walk():
        ctype = part.get_content_type()
        if part.is_multipart():
            continue
        payload = part.get_payload(decode=True)
        if payload is None:
            continue
        try:
            text = payload.decode(part.get_content_charset() or "utf-8", errors="replace")
        except Exception:
            text = str(payload)
        if ctype == "text/plain":
            plain += "\n" + text
        elif ctype == "text/html":
            html += "\n" + text

    # attachments
    attachments = []
    images = []
    for part in msg.iter_attachments():
        ctype = part.get_content_type()
        payload = part.get_payload(decode=True)
        filename = part.get_filename()
        if not payload:
            continue
        attachments.append({"filename": filename, "content_type": ctype, "bytes": payload})
        if ctype.startswith("image/"):
            images.append(payload)

    # If there's a CSV attachment, try to parse and take first record
    structured = {}
    for att in attachments:
        if att["filename"] and att["filename"].lower().endswith(".csv"):
            try:
                s = att["bytes"].decode("utf-8")
                reader = csv.DictReader(io.StringIO(s))
                for row in reader:
                    # heuristic column names
                    structured.update({k.lower(): v for k,v in row.items()})
                    break
            except Exception:
                pass
        if att["filename"] and att["filename"].lower().endswith(".pdf"):
            try:
                txt = extract_text_from_pdf_bytes(att["bytes"])
                plain += "\n" + txt
            except Exception:
                pass

    # parse html tables if present
    if html:
        soup = BeautifulSoup(html, "html.parser")
        # try to find a table with headers like 'from' 'to' 'price' etc.
        tables = soup.find_all("table")
        for table in tables:
            headers = [th.get_text(strip=True).lower() for th in table.find_all("th")]
            rows = table.find_all("tr")
            if headers and any(h in headers for h in ["from", "to", "price", "datetime", "date", "time"]):
                # parse first data row
                first_row = table.find("tr", lambda tag: tag.find_all("td"))
                if first_row:
                    tds = first_row.find_all("td")
                    d = {}
                    for i, th in enumerate(headers):
                        if i < len(tds):
                            d[th] = tds[i].get_text(strip=True)
                    structured.update(d)
                    break

    # combine text to search
    combined_text = (plain + "\n" + html + "\n" + json.dumps(structured)).strip()

    # extraction heuristics
    # price
    price, currency = structured.get("price"), structured.get("currency")
    if not price:
        price, currency = find_price_in_text(combined_text)

    # origin/destination
    origin = structured.get("from") or structured.get("origin")
    dest = structured.get("to") or structured.get("destination")
    if not (origin and dest):
        codes = find_iata_codes(combined_text)
        if len(codes) >= 2:
            origin, dest = codes[0], codes[1]

    # aircraft
    aircraft = structured.get("aircraft") or structured.get("type") or ""
    if not aircraft:
        # try to capture something like "Gulfstream G650" in text
        m = re.search(r'(Gulfstream\s+G650|Bombardier\s+Global\s+7500|Citation\s+X|Cessna\s+Citation\s+X)', combined_text, re.I)
        if m:
            aircraft = m.group(0)

    # datetime
    dt = structured.get("datetime") or structured.get("date") or ""
    parsed_dt = None
    if dt:
        try:
            parsed_dt = dateparser.parse(dt)
        except Exception:
            parsed_dt = None
    if not parsed_dt:
        parsed_dt = parse_datetime_from_text(combined_text)

    # fingerprint canonicalization
    canonical_parts = [
        aircraft or "",
        (origin or "").upper(),
        (dest or "").upper(),
        (parsed_dt.isoformat() if parsed_dt else ""),
        str(price or "")
    ]
    canonical = "|".join(canonical_parts)
    fingerprint = sha256_hex(canonical)

    # choose an image (first attachment / inline)
    img_bytes = None
    if images:
        img_bytes = images[0]
    else:
        # try to find any attachments with image mime
        for att in attachments:
            if att["content_type"].startswith("image/"):
                img_bytes = att["bytes"]
                break

    flight = {
        "aircraft": aircraft,
        "origin": normalize_iata(origin or ""),
        "destination": normalize_iata(dest or ""),
        "departure": parsed_dt.isoformat() if parsed_dt else None,
        "price": float(price) if price else None,
        "currency": currency or "USD",
        "image_bytes": img_bytes,
        "operator_note": combined_text[:2000],
        "fingerprint": fingerprint,
        "raw_email": raw_bytes
    }
    return flight
