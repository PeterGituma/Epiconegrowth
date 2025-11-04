import pdfParse from "pdf-parse";
import * as cheerio from "cheerio";
import { parse as csvParse } from "csv-parse/sync";

export type FlightData = {
  aircraft: string;
  from: string;
  to: string;
  datetime: string;
  price: number;
  imageUrl?: string;
};

export async function parsePdf(buffer: Buffer): Promise<FlightData[]> {
  const parsed = await pdfParse(buffer);
  // extract using regex/patterns
  return []; // return extracted flight objects
}

export function parseCsv(content: string): FlightData[] {
  const records = csvParse(content, { columns: true });
  return records.map((r: any) => ({
    aircraft: r.aircraft,
    from: r.from,
    to: r.to,
    datetime: r.datetime,
    price: parseFloat(r.price),
    imageUrl: r.imageUrl,
  }));
}

export function parseHtml(content: string): FlightData[] {
  const $ = cheerio.load(content);
  const flights: FlightData[] = [];
  $("table.flight-row").each((_: number, el: cheerio.Element) => {
    flights.push({
      aircraft: $(el).find(".aircraft").text(),
      from: $(el).find(".from").text(),
      to: $(el).find(".to").text(),
      datetime: $(el).find(".datetime").text(),
      price: parseFloat($(el).find(".price").text().replace("$", "")),
    });
  });
  return flights;
}
