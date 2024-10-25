/*
  Warnings:

  - You are about to drop the column `planId` on the `HotelGuest` table. All the data in the column will be lost.

*/
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
INSERT INTO "new_HotelGuest" ("checkinDate", "checkoutDate", "email", "fullname", "hotelId", "id", "loginToken", "roomNumber", "tokenExpiresAt") SELECT "checkinDate", "checkoutDate", "email", "fullname", "hotelId", "id", "loginToken", "roomNumber", "tokenExpiresAt" FROM "HotelGuest";
DROP TABLE "HotelGuest";
ALTER TABLE "new_HotelGuest" RENAME TO "HotelGuest";
CREATE INDEX "HotelGuest_hotelId_idx" ON "HotelGuest"("hotelId");
CREATE UNIQUE INDEX "HotelGuest_roomNumber_checkinDate_key" ON "HotelGuest"("roomNumber", "checkinDate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
