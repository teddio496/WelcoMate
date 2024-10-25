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
    CONSTRAINT "HotelService_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HotelServiceBooking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    CONSTRAINT "HotelServiceBooking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotelServiceBooking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "HotelGuest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotelServiceBooking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "HotelService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HotelGuest" (
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

-- CreateTable
CREATE TABLE "Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "indoor_outdoor" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan" TEXT NOT NULL,
    "hotelGuestId" INTEGER NOT NULL,
    CONSTRAINT "Plan_hotelGuestId_fkey" FOREIGN KEY ("hotelGuestId") REFERENCES "HotelGuest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AttractionToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AttractionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Attraction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttractionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "HotelService_hotelId_idx" ON "HotelService"("hotelId");

-- CreateIndex
CREATE INDEX "HotelServiceBooking_hotelId_idx" ON "HotelServiceBooking"("hotelId");

-- CreateIndex
CREATE INDEX "HotelServiceBooking_guestId_idx" ON "HotelServiceBooking"("guestId");

-- CreateIndex
CREATE INDEX "HotelGuest_hotelId_idx" ON "HotelGuest"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "HotelGuest_roomNumber_checkinDate_key" ON "HotelGuest"("roomNumber", "checkinDate");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_hotelGuestId_key" ON "Plan"("hotelGuestId");

-- CreateIndex
CREATE UNIQUE INDEX "_AttractionToTag_AB_unique" ON "_AttractionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_AttractionToTag_B_index" ON "_AttractionToTag"("B");
