/*
  Warnings:

  - The `pets` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "pets",
ADD COLUMN     "pets" JSONB;
