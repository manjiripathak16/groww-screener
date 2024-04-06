import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomTable from './CustomTable';
import axios from 'axios';
// import { ReactComponent as MarketCapIcon } from './assets/market_cap_icon.svg';
// import { ReactComponent as ClosePriceIcon } from './assets/close_price_icon.svg';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [minValue, setMinValue] = useState('');
  // const [maxValue, setMaxValue] = useState('');

  const headers = [
    { 
      key: 'companyName', 
      displayText: (
        <div className="flex items-center">
          Company Name
        </div>
      ),
      renderer: (rowData) => (
        <div className="px-2 my-2">
          <Link href={`/${rowData.companyName}`} target="_blank">
            <span className="text-blue-500 hover:text-blue-700">{rowData.companyName}</span>
          </Link>
        </div>
      ),
    },
    { 
      key: 'marketCap', 
      displayText: (
        <div className="flex items-center">
          Market Cap 
        </div>
      ),
    },
    { 
      key: 'closePrice', 
      displayText: 'Close Price' 
    },
  ];

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/listCompanies');
      setCompanies(response.data.companies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = () => {
    axios.post('http://localhost:3000/api/filterClosePrice', {
      closePriceValue: minValue,
    })
    .then(response =>{
      setCompanies(response.data.companies);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div className="flex px-2 border border-gray-300">
      <div className="px-2 mx-2 mt-4 w-1/4">   
        <div className="mt-4">
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Close Price</label>
          <div className="flex justify-between mt-2">
            <input 
              type="number" 
              name="minPrice" 
              placeholder="Min Price" 
              onChange={(e) => setMinValue(parseFloat(e.target.value))} 
              className="block w-1/2 py-2 px-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
            <input 
              type="number" 
              name="maxPrice" 
              placeholder="Max Price" 
              onChange={(e) => setMaxValue(parseFloat(e.target.value))} 
              className="block w-1/2 ml-2 py-2 px-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="px-2 mx-2 my-2 text-center">
            <button 
              className="text-white bg-blue-500 px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
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
            className="block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
      </div>
      <div className="flex flex-column w-3/4 p-4">
        <CustomTable
          headers={headers}
          content={companies}
          keyField="companyId" 
          totalItems={companies.length}
          isPaginated={false} 
        />
      </div>
    </div>
  );
};

export default HomePage;
