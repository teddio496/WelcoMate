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
    "fullname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateIndex
CREATE INDEX "HotelServices_hotel_id_idx" ON "HotelServices"("hotel_id");

-- CreateIndex
CREATE INDEX "HotelServiceBookings_hotel_id_idx" ON "HotelServiceBookings"("hotel_id");

-- CreateIndex
CREATE INDEX "HotelServiceBookings_guest_id_idx" ON "HotelServiceBookings"("guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "HotelGuest_email_key" ON "HotelGuest"("email");
