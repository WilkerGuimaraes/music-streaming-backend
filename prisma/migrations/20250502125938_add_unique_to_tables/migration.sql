/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `albums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `playlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albums_title_key" ON "albums"("title");

-- CreateIndex
CREATE UNIQUE INDEX "artists_name_key" ON "artists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "playlists_name_key" ON "playlists"("name");
