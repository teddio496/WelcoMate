/*
  Warnings:

  - You are about to drop the `Attraction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttractionToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[room_number,checkin_date]` on the table `HotelGuest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "HotelGuest_email_key";

-- AlterTable
ALTER TABLE "HotelGuest" ADD COLUMN "login_token" TEXT;
ALTER TABLE "HotelGuest" ADD COLUMN "token_expires_at" DATETIME;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Attraction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AttractionToTag";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "HotelGuest_room_number_checkin_date_key" ON "HotelGuest"("room_number", "checkin_date");
