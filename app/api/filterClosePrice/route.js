import axios from "axios";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req) {
  console.log('pppttt',req)
  const closePriceValue = req.body.closePriceValue;
  console.log("$$$$$$$$$$$$$$$", req);
  let companies;
  try {
    companies = await prisma.company.findMany({
      select: {
        marketCap: true,
        companyName: true,
        closePrice: true,
      },
      where: {
        closePrice: { lt: closePriceValue },
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
  return NextResponse.json({ companies });
}
