-- CreateTable
CREATE TABLE "Company" (
    "instrument_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_price" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("instrument_key")
);
