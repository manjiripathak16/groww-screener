import axios from "axios";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let companies;
export async function GET() {
  try {
    companies = await prisma.company.findMany({
      select: {
        marketCap: true,
        companyName: true,
        closePrice: true,
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
  return NextResponse.json({ companies });
}
