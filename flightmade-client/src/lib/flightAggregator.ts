import { FlightData } from "./emailParser";

export function aggregateFlights(flights: FlightData[]): FlightData[] {
  const map = new Map<string, FlightData>();

  flights.forEach(f => {
    const key = `${f.aircraft}-${f.from}-${f.to}-${f.datetime}-${f.price}`;
    if (!map.has(key)) {
      map.set(key, f);
    }
  });

  return Array.from(map.values());
}
