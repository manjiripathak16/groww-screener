import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req) {
  const reqBody = await req.json();
  const closePriceValue = reqBody;
  let companies;
  try {
    companies = await prisma.company.findMany({
      select: {
        marketCap: true,
        companyName: true,
        closePrice: true,
        yearlyHighPrice: true,
        yearlyLowPrice: true,
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
