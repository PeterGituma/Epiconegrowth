-- AlterTable
ALTER TABLE "public"."Flight" ADD COLUMN     "avgPrice" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "concierge" BOOLEAN,
    "conciergePercent" DOUBLE PRECISION,
    "pets" TEXT,
    "meals" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
