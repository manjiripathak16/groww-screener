import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomTable from './CustomTable';
import axios from 'axios';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filters, setFilters] = useState({
    // Define your initial filter state here
  });

  const headers = [
    { 
      key: 'companyName', 
      displayText: 'Company Name',
      renderer:(rowData) => (
        <div className="px-2 align-items-center my-2">
          <Link href='http://localhost:3000/api/listCompanies' target="_blank">
            {rowData.companyName}
          </Link>
        </div>
      ),
    },
    { 
      key: 'marketCap', 
      displayText: 'Market Cap' 
    },
    { 
      key: 'closePrice', 
      displayText: 'Close Price' 
    },
  ];

  useEffect(() => {
    fetchData(); // Fetch data from the API when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    applyFilters(); // Apply filters whenever the companies or filters state changes
  }, [companies, filters]);

  const fetchData = async () => {
    axios.get('http://localhost:3000/api/listCompanies')
    .then(response =>{
        setCompanies(response.data.companies)
    })  .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const applyFilters = () => {
    // Logic to filter companies based on the current filters
    // Update the filteredCompanies state accordingly
  };

  const handleFilterChange = (event) => {
    // Update the filters state based on user input
    // You can use event.target.name and event.target.value to access filter values
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/4 p-4 bg-gray-100">
        <input type="text" name="search" placeholder="Search" onChange={handleFilterChange} />
        <select name="industry" onChange={handleFilterChange}>
          <option value="">All Industries</option>
        </select>
      </div>
      <div className="w-3/4 p-4">
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
