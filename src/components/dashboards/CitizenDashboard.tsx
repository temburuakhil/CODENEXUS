import React from 'react';
import { 
  Calculator, Bell, TrendingUp, BookOpen, Wallet, 
  PiggyBank, LineChart, FileText, GraduationCap,
  Globe, Shield, Settings, Download, Moon, Sun
} from 'lucide-react';
import type { CalculatorData, EconomicIndicator, NewsItem, MarketData, PolicyUpdate } from '../../types';

export function CitizenDashboard() {
  const [calculatorData, setCalculatorData] = React.useState<CalculatorData>({
    principal: 1000,
    rate: 5,
    time: 1,
    result: 0
  });

  const [darkMode, setDarkMode] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  // Mock data for demonstration
  const financialMetrics = {
    savings: 25000,
    debt: 15000,
    investments: 45000,
    creditScore: 750,
    emergencyFund: 10000
  };

  const economicIndicators: EconomicIndicator[] = [
    { name: 'Inflation Rate', value: '3.2%', trend: 'up', percentage: '+0.5%' },
    { name: 'Local CPI', value: '2.8%', trend: 'down', percentage: '-0.2%' },
    { name: 'Wage Growth', value: '4.1%', trend: 'up', percentage: '+0.3%' }
  ];

  const marketData: MarketData[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.50', change: '+2.3%', volume: '45.2M', trend: 'up' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$335.20', change: '+1.8%', volume: '32.1M', trend: 'up' }
  ];

  const policyUpdates: PolicyUpdate[] = [
    { 
      title: 'New Tax Credit for Home Energy Improvements',
      status: 'active',
      impact: 'high',
      sector: 'housing',
      date: '2024-03-15'
    }
  ];

  const calculateInterest = () => {
    const { principal, rate, time } = calculatorData;
    const result = principal * (1 + (rate / 100) * time);
    setCalculatorData(prev => ({ ...prev, result }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#222831]' : 'bg-[#F5F7FA]'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle and Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#00457C] dark:text-[#009CDE]">
            Personal Financial Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-6 h-6 text-[#F4A261]" /> : <Moon className="w-6 h-6 text-[#002F6C]" />}
            </button>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="rounded-lg bg-white border border-[#0070BA] text-[#00457C] focus:ring-2 focus:ring-[#009CDE]"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Finance Hub */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Personal Finance Hub
              </h3>
              <Wallet className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                  <p className="text-sm text-[#00457C]">Total Savings</p>
                  <p className="text-xl font-bold text-[#002F6C]">${financialMetrics.savings.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#E63946]/10 to-[#F4A261]/10 rounded-lg border border-[#E63946]/20">
                  <p className="text-sm text-[#E63946]">Total Debt</p>
                  <p className="text-xl font-bold text-[#002F6C]">${financialMetrics.debt.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <p className="text-sm text-[#1DBF73]">Credit Score</p>
                <p className="text-xl font-bold text-[#002F6C]">{financialMetrics.creditScore}</p>
              </div>
            </div>
          </div>

          {/* Economic Impact Center */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Economic Impact Center
              </h3>
              <TrendingUp className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              {economicIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                  <div>
                    <p className="font-medium text-[#002F6C]">{indicator.name}</p>
                    <p className="text-sm text-[#00457C]">{indicator.value}</p>
                  </div>
                  <div className={`flex items-center ${indicator.trend === 'up' ? 'text-[#1DBF73]' : 'text-[#E63946]'}`}>
                    <span>{indicator.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy & Tax Updates */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Policy & Tax Updates
              </h3>
              <FileText className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              {policyUpdates.map((update, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-[#F4A261]/10 to-[#E63946]/10 rounded-lg border border-[#F4A261]/20">
                  <p className="font-medium text-[#002F6C]">{update.title}</p>
                  <p className="text-sm text-[#00457C]">
                    Status: {update.status} | Impact: {update.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning & Planning Tools */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Learning & Planning Tools
              </h3>
              <GraduationCap className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <p className="font-medium text-[#002F6C]">Financial Education</p>
                <p className="text-sm text-[#00457C]">Access personalized learning modules</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#009CDE]/10 to-[#0070BA]/10 rounded-lg border border-[#009CDE]/20">
                <p className="font-medium text-[#002F6C]">Retirement Planning</p>
                <p className="text-sm text-[#00457C]">Calculate your retirement goals</p>
              </div>
            </div>
          </div>

          {/* Market Intelligence */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Market Intelligence
              </h3>
              <Globe className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              {marketData.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                  <div>
                    <p className="font-medium text-[#002F6C]">{stock.symbol}</p>
                    <p className="text-sm text-[#00457C]">{stock.name}</p>
                  </div>
                  <div className={`flex items-center ${stock.trend === 'up' ? 'text-[#1DBF73]' : 'text-[#E63946]'}`}>
                    <span>{stock.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Settings */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">
                Security & Settings
              </h3>
              <Shield className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#002F6C]/10 to-[#00457C]/10 rounded-lg border border-[#002F6C]/20">
                <p className="font-medium text-[#002F6C]">Two-Factor Authentication</p>
                <p className="text-sm text-[#00457C]">Status: Active</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#002F6C]/10 to-[#00457C]/10 rounded-lg border border-[#002F6C]/20">
                <p className="font-medium text-[#002F6C]">Privacy Controls</p>
                <p className="text-sm text-[#00457C]">Manage your data preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export and Additional Tools */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#0070BA] to-[#00457C] text-white rounded-lg hover:from-[#009CDE] hover:to-[#0070BA] transition-all duration-300">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#002F6C] to-[#00457C] text-white rounded-lg hover:from-[#00457C] hover:to-[#002F6C] transition-all duration-300">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}