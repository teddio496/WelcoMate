/*
  Warnings:

  - Added the required column `indoor_outdoor` to the `Attraction` table without a default value. This is not possible if the table is not empty.

*/
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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "indoor_outdoor" INTEGER NOT NULL
);
INSERT INTO "new_Attraction" ("address", "description", "id", "latitude", "link_url", "longitude", "title") SELECT "address", "description", "id", "latitude", "link_url", "longitude", "title" FROM "Attraction";
DROP TABLE "Attraction";
ALTER TABLE "new_Attraction" RENAME TO "Attraction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_AttractionToTag_AB_unique" ON "_AttractionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_AttractionToTag_B_index" ON "_AttractionToTag"("B");
