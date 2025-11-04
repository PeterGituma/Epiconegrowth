import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; // adjust if needed

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      concierge,
      petsNumber,
      petsSize,
      petsSpecial,
      mealNotes,
      crewNotes,
      flightId,
    } = body;

    // combine notes into one field (or split if you prefer)
    const notes = [mealNotes, crewNotes].filter(Boolean).join("\n");

    // group pets into JSON
    const pets = {
      number: petsNumber,
      size: petsSize,
      special: petsSpecial,
    };

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        concierge,
        notes,
        pets,
        message: "Flight booking inquiry", // required field
        Flight: { connect: { id: Number(flightId) } },
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
