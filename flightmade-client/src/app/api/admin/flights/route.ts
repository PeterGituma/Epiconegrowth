import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const flights = await prisma.flight.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(flights);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
