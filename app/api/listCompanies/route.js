import axios from "axios";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      select: {
        marketCap: true,
        companyName: true,
        closePrice: true,
      },
    });
    console.log(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
  return NextResponse.json({ companies });
}
