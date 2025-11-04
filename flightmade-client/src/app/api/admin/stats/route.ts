import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [flights, inquiries, bookings, subs, messages] = await Promise.all([
      prisma.flight.count(),
      prisma.inquiry.count(),
      prisma.booking.count(),
      prisma.subscription.count(),
      prisma.contactMessage.count(),
    ]);

    return NextResponse.json({
      flights,
      inquiries,
      bookings,
      subscriptions: subs,
      messages,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
