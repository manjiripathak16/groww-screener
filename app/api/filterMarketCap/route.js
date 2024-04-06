import axios from "axios";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let companies;
export async function POST(req) {
  const reqBody = await req.json();
  const marketSize = reqBody.data;
  if (marketSize == "largeCap") {
    try {
      companies = await prisma.company.findMany({
        orderBy: { marketCap: "desc" },
        take: 100,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  } else if (marketSize == "midCap") {
    try {
      companies = await prisma.company.findMany({
        orderBy: { marketCap: "desc" },
        skip: 100,
        take: 250,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  } else {
    try {
      companies = await prisma.company.findMany({
        orderBy: { marketCap: "desc" },
        skip: 250,
        take: 700,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  }

  return NextResponse.json({ companies });
}
