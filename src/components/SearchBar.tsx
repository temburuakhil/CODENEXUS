import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';

export function SearchBar() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <Search className="w-5 h-5 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Search for financial insights, trends, or data..."
            className="w-full py-3 px-4 rounded-lg focus:outline-none"
          />
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="px-4 py-2 flex items-center text-gray-600 hover:text-blue-600"
          >
            <Sliders className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
        
        {isAdvancedOpen && (
          <div className="absolute w-full mt-2 p-4 bg-white rounded-lg shadow-lg z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Type
                </label>
                <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500">
                  <option>All Types</option>
                  <option>Economic Indicators</option>
                  <option>Market Data</option>
                  <option>News & Analysis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500">
                  <option>All Sources</option>
                  <option>Government Data</option>
                  <option>Market Data</option>
                  <option>News Outlets</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}