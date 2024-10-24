-- CreateTable
CREATE TABLE "Hotels" (
    "hotel_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotel_name" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HotelServices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotel_id" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "descriptions" TEXT,
    "image_links" TEXT,
    "free_service" BOOLEAN NOT NULL,
    "free_premium" BOOLEAN NOT NULL,
    CONSTRAINT "HotelServices_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels" ("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HotelServiceBookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotel_id" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "guest_id" INTEGER NOT NULL,
    CONSTRAINT "HotelServiceBookings_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels" ("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotelServiceBookings_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "HotelGuest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HotelGuest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_number" INTEGER NOT NULL,
    "checkin_date" DATETIME NOT NULL,
    "checkout_date" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "login_token" TEXT,
    "token_expires_at" DATETIME
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
    "indoor_outdoor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttractionToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AttractionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Attraction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttractionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "HotelServices_hotel_id_idx" ON "HotelServices"("hotel_id");

-- CreateIndex
CREATE INDEX "HotelServiceBookings_hotel_id_idx" ON "HotelServiceBookings"("hotel_id");

-- CreateIndex
CREATE INDEX "HotelServiceBookings_guest_id_idx" ON "HotelServiceBookings"("guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "HotelGuest_room_number_checkin_date_key" ON "HotelGuest"("room_number", "checkin_date");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AttractionToTag_AB_unique" ON "_AttractionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_AttractionToTag_B_index" ON "_AttractionToTag"("B");
