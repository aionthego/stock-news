"use client"
// src/components/DataDisplay.tsx
import React, { useState} from 'react';

interface DataDisplayProps {
  companyData: { [key: string]: any }[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ companyData }) => {
  if (companyData.length === 0) {
    return <p>No data available for the selected sector and industry.</p>;
  }
  const fixedHeaders = ["Ticker", "Name", "Market Cap", "Employees", "Shares", "Value"];
  const lowercaseFixedHeaders = fixedHeaders.map((header) => header.toLowerCase());

  const getHeaderValue = (company: any, header: string) => {
    const lowerCaseKey = Object.keys(company).find(key => key.toLowerCase() === header.toLowerCase());
    return lowerCaseKey ? company[lowerCaseKey] : "-";
  };
  const [selectedCompanyFacts, setSelectedCompanyFacts] = useState<any>(null);
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const numberFormatter = new Intl.NumberFormat('en-US', {
    useGrouping: true,
  });

  const handleClick = async (ticker: string, exchange: string) => {
      window.open(`https://www.google.com/finance/quote/${ticker}:${exchange}`, 'gf');
  };

  return (
    <div>
      <h2 className='p-4'>Company Data</h2>
        <table className='p-4 w-full table-auto'>
            <colgroup>
                {fixedHeaders.map((_, index) => (
                    <col key={index} className="w-1/6" />
                ))}
            </colgroup>
        <thead>
          <tr>
            {fixedHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {companyData.map((k,v) => (
          <tr>
          <td onClick={() => handleClick(k.Ticker, k.Exchange)}>
          <div className="cursor-pointer underline">{k.Ticker}:{k.Exchange}</div>
          </td>
          <td style={{ "text-align": "center" }}>{k.Name}</td>
          <td style={{ "text-align": "right" }}>{currencyFormatter.format(k.MarketCap)}</td>
          <td style={{ "text-align": "right" }}>{numberFormatter.format(Number(k.Employees))}</td>
          <td style={{ "text-align": "right" }}>{numberFormatter.format(Number(k.Shares))}</td>
          <td style={{ "text-align": "right" }}>{numberFormatter.format(Number(k.MarketCap/k.Shares))}</td>
          </tr>
        ))}        
          </tbody>
      </table>
      {selectedCompanyFacts && (
        <div className='mt-8'>
          <h3 className="text-lg font-semibold mb-4">Company Facts</h3>
          <pre>{JSON.stringify(selectedCompanyFacts, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;


