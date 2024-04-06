"use client";
import { React, useState, useEffect } from "react";
import axios from "axios";

export default function FundamentalsCard(props) {
  const [currentPrice, setCurrentPrice] = useState("--");
  const [dividendYield, setDividendYield] = useState("--");
  const [faceValue, setFaceValue] = useState("--");
  const [highLow, setHighLow] = useState("--");
  const [roce, setRoce] = useState("--");
  const [stockPE, setStockPE] = useState("--");
  const [bookValue, setBookValue] = useState("--");
  const [marketCap, setMarketCap] = useState("--");
  const [nse, setNse] = useState("--");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/fundamentalData")
      .then((response) => {
        const data = response.data.testOutput;
        setMarketCap(data.marketCap);
        setBookValue(data.bookValue);
        setCurrentPrice(data.currentPrice);
        setFaceValue(data.faceValue);
        setHighLow(data.highLow);
        setStockPE(data.stockPE);
        setRoce(data.roce);
        setDividendYield(data.dividendYield);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="px-4 py-2">
        <h2 className="px-4 text-xl font-bold my-2">{props.companyName}</h2>
        <div className="px-4 py-2">
          <span>{nse}</span>
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Market Cap:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{marketCap}</td>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Current Price:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">
                {currentPrice}
              </td>
            </tr>
            <tr>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Book Value:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{bookValue}</td>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                High Low:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{highLow}</td>
            </tr>
            <tr>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Stock P/E:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{stockPE}</td>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Roce:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{roce}</td>
            </tr>
            <tr>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Dividend Yield:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">
                {dividendYield}
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm font-semibold">
                Face Value:
              </td>
              <td className="px-0 py-1 text-gray-600 text-sm">{faceValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
