import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomTable from "./CustomTable";
import axios from "axios";
// import { ReactComponent as MarketCapIcon } from './assets/market_cap_icon.svg';
// import { ReactComponent as ClosePriceIcon } from './assets/close_price_icon.svg';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = [
    {
      key: "companyName",
      displayText: <div className="flex items-center">Company Name</div>,
      renderer: (rowData) => (
        <div className="px-2 my-2">
          <Link href={`/${rowData.companyName}`} target="_blank">
            <span className="text-blue-500 hover:text-blue-700">
              {rowData.companyName}
            </span>
          </Link>
        </div>
      ),
    },
    {
      key: "marketCap",
      displayText: <div className="flex items-center">Market Cap</div>,
    },
    {
      key: "closePrice",
      displayText: "Close Price",
    },
    {
      key: "yearlyHighPrice",
      displayText: "Yearly High Price",
    },
    {
      key: "yearlyLowPrice",
      displayText: "Yearly Low Price",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/listCompanies"
      );
      setCompanies(response.data.companies);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    axios
      .post("http://localhost:3000/api/filterClosePrice", minValue)
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCapChange = (data) => {
    axios
      .post("http://localhost:3000/api/filterMarketCap", { data })
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify center items-center ">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex border border-gray-300">
          <div className="px-2 mt-4 w-1/4">
            <div className="mt-4">
              <label
                htmlFor="priceRange"
                className="px-2 block text-sm font-bold text-gray-700"
              >
                Close Price
              </label>
              <div className="flex justify-between mt-2 mx-1">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  onChange={(e) => setMinValue(parseFloat(e.target.value))}
                  className="block w-1/2 py-2 px-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
                  onClick={handleFilterChange}
                >
                  Apply Filter
                </button>
              </div>
              <div className="my-2">
                <label
                  htmlFor="priceRange"
                  className="px-2 block text-sm font-bold text-gray-700 my-3"
                >
                  Market Capitalization
                </label>
                <button
                  className="mx-1 text-white bg-green-500 w-1/2 px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors mb-2"
                  onClick={() => {
                    handleCapChange("largeCap");
                  }}
                >
                  Large Cap
                </button>
                <button
                  className="mx-1 text-white bg-green-400 w-1/2 px-4 py-2 rounded-md shadow-sm hover:bg-blue-500 transition-colors mb-2"
                  onClick={() => {
                    handleCapChange("midCap");
                  }}
                >
                  Mid Cap
                </button>
                <button
                  className="mx-1 text-white bg-green-300 w-1/2  px-4 py-2 rounded-md shadow-sm hover:bg-blue-400 transition-colors"
                  onClick={() => {
                    handleCapChange("smallCap");
                  }}
                >
                  Small Cap
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-column w-3/4 p-4">
            <CustomTable
              headers={headers}
              content={companies}
              keyField="companyId"
              totalItems={companies}
              isPaginated={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
