// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { email } = await req.json();

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });
//   }

//   // Save email to DB or SendGrid list
//   console.log("New subscription:", email);

//   return NextResponse.json({ message: "Subscribed successfully!" }, { status: 201 });
// }


import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const contact = await prisma.contact.create({
    data: { name, email, message },
  });

  return NextResponse.json(contact, { status: 201 });
}
