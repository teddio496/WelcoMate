/*
  Warnings:

  - You are about to drop the `Attraction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelServiceBookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttractionToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `checkin_date` on the `HotelGuest` table. All the data in the column will be lost.
  - You are about to drop the column `checkout_date` on the `HotelGuest` table. All the data in the column will be lost.
  - You are about to drop the column `login_token` on the `HotelGuest` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `HotelGuest` table. All the data in the column will be lost.
  - You are about to drop the column `token_expires_at` on the `HotelGuest` table. All the data in the column will be lost.
  - Added the required column `checkinDate` to the `HotelGuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutDate` to the `HotelGuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `HotelGuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `HotelGuest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HotelServiceBookings_guest_id_idx";

-- DropIndex
DROP INDEX "HotelServiceBookings_hotel_id_idx";

-- DropIndex
DROP INDEX "HotelServices_hotel_id_idx";

-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "_AttractionToTag_B_index";

-- DropIndex
DROP INDEX "_AttractionToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Attraction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HotelServiceBookings";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HotelServices";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hotels";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AttractionToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HotelService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "descriptions" TEXT,
    "imageLinks" TEXT,
    "freeService" BOOLEAN NOT NULL,
    "freePremium" BOOLEAN NOT NULL,
    CONSTRAINT "HotelService_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HotelServiceBooking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "guestId" INTEGER NOT NULL,
    CONSTRAINT "HotelServiceBooking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotelServiceBooking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "HotelGuest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HotelGuest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "loginToken" TEXT,
    "tokenExpiresAt" DATETIME,
    CONSTRAINT "HotelGuest_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HotelGuest" ("email", "fullname", "id") SELECT "email", "fullname", "id" FROM "HotelGuest";
DROP TABLE "HotelGuest";
ALTER TABLE "new_HotelGuest" RENAME TO "HotelGuest";
CREATE INDEX "HotelGuest_hotelId_idx" ON "HotelGuest"("hotelId");
CREATE UNIQUE INDEX "HotelGuest_roomNumber_checkinDate_key" ON "HotelGuest"("roomNumber", "checkinDate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "HotelService_hotelId_idx" ON "HotelService"("hotelId");

-- CreateIndex
CREATE INDEX "HotelServiceBooking_hotelId_idx" ON "HotelServiceBooking"("hotelId");

-- CreateIndex
CREATE INDEX "HotelServiceBooking_guestId_idx" ON "HotelServiceBooking"("guestId");
