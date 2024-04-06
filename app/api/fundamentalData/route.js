import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await axios.get(
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=OSWQPDLIQ7OFLYM4"
  );

  let testOutput = {
    marketCap: "1000000",
    stockPE: "5",
    roce: "18",
    currentPrice: "234",
    bookValue: "131",
    highLow: "1234",
    dividendYield: "0.5",
    faceValue: "1",
  };
  return NextResponse.json({ testOutput });
}
