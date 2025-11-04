import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; // adjust path if different

const prisma = new PrismaClient();

// GET /api/bookings → fetch all bookings
export async function GET() {
  try {
    const bookings = await prisma.inquiry.findMany({
      include: { Flight: true }, // also fetch flight details
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/bookings → create booking
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

    const notes = [mealNotes, crewNotes].filter(Boolean).join("\n");

    const pets = {
      number: petsNumber,
      size: petsSize,
      special: petsSpecial,
    };

    const bookings = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        concierge,
        notes,
        pets,
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
