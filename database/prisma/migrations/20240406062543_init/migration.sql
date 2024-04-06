/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instrument_key` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `last_price` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - Added the required column `closePrice` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industryCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isin` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketCap` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nseScriptCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyHighPrice` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyLowPrice` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "instrument_key",
DROP COLUMN "last_price",
DROP COLUMN "name",
ADD COLUMN     "closePrice" INTEGER NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "industryCode" INTEGER NOT NULL,
ADD COLUMN     "isin" TEXT NOT NULL,
ADD COLUMN     "marketCap" BIGINT NOT NULL,
ADD COLUMN     "nseScriptCode" TEXT NOT NULL,
ADD COLUMN     "yearlyHighPrice" INTEGER NOT NULL,
ADD COLUMN     "yearlyLowPrice" INTEGER NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("isin");
