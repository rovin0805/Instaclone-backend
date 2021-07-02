/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hash_unique" ON "Hashtag"("hash");
