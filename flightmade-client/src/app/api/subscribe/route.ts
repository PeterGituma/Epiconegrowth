import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const subscription = await prisma.subscription.create({
    data: { email },
  });

  return NextResponse.json(subscription, { status: 201 });
}
