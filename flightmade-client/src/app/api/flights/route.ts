// // import { NextResponse } from "next/server";

// // // Dummy data for now
// // const flights = [
// //   {
// //     id: 1,
// //     aircraft: "Gulfstream G650",
// //     from: "London (LHR)",
// //     to: "New York (JFK)",
// //     datetime: "2025-09-12 14:30",
// //     price: 45000,
// //     status: "available",
// //     imageUrl: "/aircraft1.jpg",
// //   },
// //   {
// //     id: 2,
// //     aircraft: "Bombardier Global 7500",
// //     from: "Paris (CDG)",
// //     to: "Dubai (DXB)",
// //     datetime: "2025-09-14 09:00",
// //     price: 52000,
// //     status: "limited",
// //     imageUrl: "/aircraft2.jpg",
// //   },
// // ];

// // export async function GET() {
// //   return NextResponse.json(flights);
// // }


// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const flights = await prisma.flight.findMany({
//     orderBy: { datetime: "asc" },
//   });
//   return NextResponse.json(flights);
// }
// import { NextResponse } from "next/server";

// // Dummy data for now
// const flights = [
//   {
//     id: 1,
//     aircraft: "Gulfstream G650",
//     from: "London (LHR)",
//     to: "New York (JFK)",
//     datetime: "2025-09-12 14:30",
//     price: 45000,
//     status: "available",
//     imageUrl: "/aircraft1.jpg",
//   },
//   {
//     id: 2,
//     aircraft: "Bombardier Global 7500",
//     from: "Paris (CDG)",
//     to: "Dubai (DXB)",
//     datetime: "2025-09-14 09:00",
//     price: 52000,
//     status: "limited",
//     imageUrl: "/aircraft2.jpg",
//   },
// ];

// export async function GET() {
//   return NextResponse.json(flights);
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const flights = await prisma.flight.findMany({
    orderBy: { datetime: "asc" }, // Replace 'date' with the actual field name from your Prisma schema
  });
  return NextResponse.json(flights);
}
