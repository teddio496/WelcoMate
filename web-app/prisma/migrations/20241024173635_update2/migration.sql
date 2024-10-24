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
    "indoor_outdoor" TEXT NOT NULL
);
INSERT INTO "new_Attraction" ("address", "description", "id", "indoor_outdoor", "latitude", "link_url", "longitude", "title") SELECT "address", "description", "id", "indoor_outdoor", "latitude", "link_url", "longitude", "title" FROM "Attraction";
DROP TABLE "Attraction";
ALTER TABLE "new_Attraction" RENAME TO "Attraction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
