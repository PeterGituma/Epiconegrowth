// src/app/api/flights/count/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Count all flights in DB
    const count = await prisma.flight.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching flight count:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight count" },
      { status: 500 }
    );
  }
}
