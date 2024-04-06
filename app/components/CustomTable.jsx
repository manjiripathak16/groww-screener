import React from 'react';

const CustomTable = (props) => {
  const { headers, content, keyField, totalItems, isPaginated } = props;
  

function getCellData(header, row, index) {
    if (header.renderer) {
      return header.renderer(row, index);
    }
    return row[header.key];
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            {headers.map(header => (
              <th key={header.key} className="px-4 py-2 text-left text-sm font-medium">
                {header.displayText}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rIndex) => (
            <tr key={row[keyField]}>
              {headers.map((header,index)=>  {
                const keyEn = index + 1;
                return (
                <td
                    key={`${row[keyField]}${row[header.key]}${keyEn}`}
                    className="fs-01"
                >
                    {getCellData(header, row, rIndex)}
                </td>
            );
          })}
            </tr>
          ))}
        </tbody>
      </table>
      {totalItems === 0 && (
        <div className="px-4 py-2 text-sm text-center">No matching results</div>
      )}
      {isPaginated && (
        <div className="px-4 py-2 text-sm text-right">
          {/* Pagination buttons can be added here */}
        </div>
      )}
    </div>
  );
};

export default CustomTable;
