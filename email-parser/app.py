# app.py
from fastapi import FastAPI, Request
from flight_parser import parse_email_message
import requests

NEXTJS_API = "http://localhost:3000/api/flights"  # adjust for prod

app = FastAPI()

@app.post("/api/inbound/email")
async def inbound_email(request: Request):
    form = await request.form()
    if "body-rfc822" in form:
        raw = form["body-rfc822"].file.read()
    elif "message" in form:
        raw = form["message"].file.read()
    else:
        raw = b""
        for key, value in form.items():
            try:
                raw += (value.file.read())
            except Exception:
                pass

    flight = parse_email_message(raw)

    # Forward parsed flight to Next.js
    try:
        res = requests.post(NEXTJS_API, json={k: v for k, v in flight.items() if k != "raw_email"})
        res.raise_for_status()
        saved = res.json()
    except Exception as e:
        return {"ok": False, "error": str(e), "parsed": flight}

    return {"ok": True, "saved": saved}
