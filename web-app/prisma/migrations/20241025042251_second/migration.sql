-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HotelGuest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "loginToken" TEXT,
    "tokenExpiresAt" DATETIME,
    CONSTRAINT "HotelGuest_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HotelGuest" ("checkinDate", "checkoutDate", "email", "fullname", "hotelId", "id", "loginToken", "planId", "roomNumber", "tokenExpiresAt") SELECT "checkinDate", "checkoutDate", "email", "fullname", "hotelId", "id", "loginToken", "planId", "roomNumber", "tokenExpiresAt" FROM "HotelGuest";
DROP TABLE "HotelGuest";
ALTER TABLE "new_HotelGuest" RENAME TO "HotelGuest";
CREATE INDEX "HotelGuest_hotelId_idx" ON "HotelGuest"("hotelId");
CREATE UNIQUE INDEX "HotelGuest_roomNumber_checkinDate_key" ON "HotelGuest"("roomNumber", "checkinDate");
CREATE TABLE "new_Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan" TEXT NOT NULL,
    CONSTRAINT "Plan_id_fkey" FOREIGN KEY ("id") REFERENCES "HotelGuest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plan" ("id", "plan") SELECT "id", "plan" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
