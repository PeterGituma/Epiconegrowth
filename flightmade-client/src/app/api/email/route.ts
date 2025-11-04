import { NextResponse } from "next/server";
import { parsePdf, parseCsv, parseHtml } from "@/lib/emailParser";
import { aggregateFlights } from "@/lib/flightAggregator";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let Flights: any[] = [];

    if (file.name.endsWith(".pdf")) {
      Flights = await parsePdf(buffer);
    } else if (file.name.endsWith(".csv")) {
      Flights = parseCsv(buffer.toString("utf8"));
    } else if (file.name.endsWith(".html")) {
      Flights = parseHtml(buffer.toString("utf8"));
    }

    const uniqueFlights = aggregateFlights(Flights);

    return NextResponse.json({ flights: uniqueFlights });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to parse file" }, { status: 500 });
  }
}
