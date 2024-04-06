"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomTable from "./CustomTable";
import axios from "axios";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState();
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  const headers = [
    {
      key: "companyName",
      displayText: "Company Name",
      renderer: (rowData) => (
        <div className="px-2 my-2">
          <Link href="http://localhost:3000/api/listCompanies" target="_blank">
            {rowData.companyName}
          </Link>
        </div>
      ),
    },
    {
      key: "marketCap",
      displayText: "Market Cap",
    },
    {
      key: "closePrice",
      displayText: "Close Price",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("http://localhost:3000/api/listCompanies")
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleFilterChange = () => {
    console.log("Hahahahahahahahahha");
    axios
      .post("http://localhost:3000/api/filterClosePrice", {
        closePriceValue: 500,
      })
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="flex px-2 border border-gray-300">
      <div className="px-2 mx-2 mt-4 w-1/4">
        <div className="mt-4">
          <label
            htmlFor="priceRange"
            className="block text-sm font-medium text-gray-700"
          >
            Close Price
          </label>
          <div className="flex justify-between mt-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              onChange={(e) => setMinValue(parseFloat(e.target.value))}
              className="block w-1/2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              onChange={(e) => setMaxValue(parseFloat(e.target.value))}
              className="block w-1/2 ml-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="px-2 mx-2 my-2 text-center">
            <button
              className="text-black-200 bg-purple-100"
              onClick={handleFilterChange}
            >
              Apply Filter
            </button>
          </div>
        </div>
        <div className="mt-4 bg-gray-100 p-4">
          <input
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleFilterChange}
            className="block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* <div className="mt-4 bg-gray-100 p-4">
          <select name="industry" onChange={handleFilterChange} className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">All Industries</option>
          </select>
        </div> */}
      </div>
      <div className="flex flex-column w-3/4 p-4">
        <CustomTable
          headers={headers}
          content={companies}
          keyField="companyId" // Adjust keyField based on your API response
          totalItems={companies.length}
          isPaginated={false} // Set to true if pagination is required
        />
      </div>
    </div>
  );
};

export default HomePage;
