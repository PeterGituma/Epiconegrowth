import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subs = await prisma.subscription.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subs);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
