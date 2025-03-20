import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { EconomicIndicator } from '../types';

const indicators: EconomicIndicator[] = [
  {
    name: 'GDP Growth',
    value: '3.2%',
    trend: 'up',
    percentage: '+0.5%'
  },
  {
    name: 'Inflation Rate',
    value: '2.1%',
    trend: 'down',
    percentage: '-0.3%'
  },
  {
    name: 'Interest Rate',
    value: '4.5%',
    trend: 'neutral',
    percentage: '0.0%'
  },
  {
    name: 'Employment Rate',
    value: '95.8%',
    trend: 'up',
    percentage: '+0.2%'
  }
];

export function EconomicIndicators() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Economic Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">{indicator.name}</span>
              {indicator.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
              {indicator.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
              {indicator.trend === 'neutral' && <Minus className="w-5 h-5 text-gray-500" />}
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{indicator.value}</span>
              <span className={`ml-2 text-sm ${
                indicator.trend === 'up' ? 'text-green-500' :
                indicator.trend === 'down' ? 'text-red-500' :
                'text-gray-500'
              }`}>
                {indicator.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}