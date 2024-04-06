/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "company" (
    "isin" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "industryCode" INTEGER NOT NULL,
    "nseScriptCode" TEXT NOT NULL,
    "yearlyHighPrice" INTEGER NOT NULL,
    "yearlyLowPrice" INTEGER NOT NULL,
    "closePrice" INTEGER NOT NULL,
    "marketCap" BIGINT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("isin")
);
