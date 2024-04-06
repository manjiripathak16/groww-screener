import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  let data = {
    companyName: "HDFC",
    marketCap: "1000000",
    closePrice: "500",
  };
  return NextResponse.json({ data });
}
