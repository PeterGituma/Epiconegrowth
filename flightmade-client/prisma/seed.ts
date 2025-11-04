import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // --- Flights ---
  const Flights = await prisma.flight.createMany({
    data: [
      {
        aircraft: "Gulfstream G650",
        from: "LAX",
        to: "JFK",
        datetime: new Date("2025-09-10T14:30:00Z"),
        price: 12000,
        status: "available",
        imageUrl: "https://via.placeholder.com/600x400?text=G650",
      },
      {
        aircraft: "Bombardier Global 7500",
        from: "LHR",
        to: "DXB",
        datetime: new Date("2025-09-12T09:00:00Z"),
        price: 18000,
        status: "limited",
        imageUrl: "https://via.placeholder.com/600x400?text=Global7500",
      },
      {
        aircraft: "Cessna Citation X",
        from: "MIA",
        to: "ORD",
        datetime: new Date("2025-09-15T16:00:00Z"),
        price: 9500,
        status: "available",
        imageUrl: "https://via.placeholder.com/600x400?text=CitationX",
      },
      {
        aircraft: "Dassault Falcon 8X",
        from: "CDG",
        to: "HND",
        datetime: new Date("2025-09-18T21:00:00Z"),
        price: 25000,
        status: "soldout",
        imageUrl: "https://via.placeholder.com/600x400?text=Falcon8X",
      },
      {
        aircraft: "Embraer Praetor 600",
        from: "YYZ",
        to: "MEX",
        datetime: new Date("2025-09-20T13:00:00Z"),
        price: 11000,
        status: "available",
        imageUrl: "https://via.placeholder.com/600x400?text=Praetor600",
      },
      {
        aircraft: "HondaJet Elite II",
        from: "SFO",
        to: "SEA",
        datetime: new Date("2025-09-22T08:00:00Z"),
        price: 5000,
        status: "limited",
        imageUrl: "https://via.placeholder.com/600x400?text=HondaJet",
      },
    ],
    skipDuplicates: true,
  });

  // grab the first two flights so we can tie inquiries to them
  const [flight1, flight2] = await prisma.flight.findMany({ take: 2 });

  // --- Inquiries ---
  await prisma.inquiry.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "+123456789",
        message: "Can I get a discount on the Gulfstream flight?",
        flightId: flight1.id,
      },
      {
        name: "Sarah Lee",
        email: "sarah@example.com",
        phone: "+987654321",
        message: "Is catering included in the Dubai flight?",
        flightId: flight2.id,
      },
    ],
    skipDuplicates: true,
  });

  // --- Subscriptions ---
  await prisma.subscription.createMany({
    data: [
      { email: "subscriber1@example.com" },
      { email: "subscriber2@example.com" },
      { email: "subscriber3@example.com" },
    ],
    skipDuplicates: true,
  });

  // --- Contacts ---
  await prisma.contact.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+111111111",
        message: "Interested in partnership opportunities.",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "+222222222",
        message: "Looking for private flight booking details.",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database has been seeded with test data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
