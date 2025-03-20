import React from 'react';
import { 
  TrendingUp, TrendingDown, Minus, RefreshCw,
  LineChart, BarChart2, PieChart, Globe,
  AlertTriangle, Bell, Settings, Download,
  Moon, Sun, Share2, ChevronDown,
  DollarSign, Shield, Brain, Database
} from 'lucide-react';
import type { MarketData } from '../../types';

const marketData: MarketData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$175.34',
    change: '+2.45%',
    volume: '52.3M',
    trend: 'up'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: '$378.92',
    change: '-0.78%',
    volume: '23.1M',
    trend: 'down'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: '$141.80',
    change: '0.00%',
    volume: '18.7M',
    trend: 'neutral'
  }
];

export function FinancialDashboard() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('market');
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('1D');

  // Mock data for demonstration
  const analyticsData = {
    marketIndicators: {
      gdp: { current: '2.1%', forecast: '2.3%', trend: 'up' },
      inflation: { current: '3.2%', target: '2.0%', trend: 'down' },
      interestRate: { current: '5.25%', forecast: '5.50%', trend: 'up' },
      unemployment: { current: '3.8%', change: '-0.2%', trend: 'down' }
    },
    portfolioMetrics: {
      totalValue: '$2.45M',
      dailyChange: '+1.2%',
      riskScore: 'Medium',
      diversification: '75%'
    },
    riskMetrics: {
      var: '2.3%',
      sharpeRatio: '1.8',
      beta: '1.1',
      correlation: '0.7'
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#222831]' : 'bg-[#F5F7FA]'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00457C] dark:text-[#009CDE]">
              Financial Analytics Dashboard
            </h1>
            <p className="text-[#00457C] dark:text-[#009CDE] mt-1">
              Real-time Market Intelligence & Portfolio Analytics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Bell className="w-6 h-6 text-[#00457C]" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-6 h-6 text-[#F4A261]" /> : <Moon className="w-6 h-6 text-[#002F6C]" />}
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#0070BA] to-[#00457C] text-white rounded-lg hover:from-[#009CDE] hover:to-[#0070BA] transition-all duration-300">
              <Share2 className="w-5 h-5 mr-2" />
              Share Analysis
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['market', 'portfolio', 'risk', 'analytics', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#0070BA] to-[#00457C] text-white'
                  : 'bg-white text-[#00457C] hover:bg-[#0070BA]/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview */}
          <div className="lg:col-span-2 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Market Overview</h3>
              <div className="flex space-x-3">
                <button className="flex items-center px-3 py-2 bg-[#0070BA]/10 text-[#00457C] rounded-lg hover:bg-[#0070BA]/20">
                  <Globe className="w-4 h-4 mr-2" />
                  Global
                </button>
                <button className="flex items-center px-3 py-2 bg-[#0070BA]/10 text-[#00457C] rounded-lg hover:bg-[#0070BA]/20">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marketData.map((item) => (
                    <tr key={item.symbol} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`
                          ${item.trend === 'up' ? 'text-green-600' : 
                            item.trend === 'down' ? 'text-red-600' : 
                            'text-gray-600'}
                        `}>
                          {item.change}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.volume}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                        {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
                        {item.trend === 'neutral' && <Minus className="w-5 h-5 text-gray-500" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portfolio Analytics */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Portfolio Analytics</h3>
              <PieChart className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <h4 className="font-medium text-[#00457C]">Total Portfolio Value</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.portfolioMetrics.totalValue}</p>
                <p className="text-sm text-[#00457C]">Daily Change: {analyticsData.portfolioMetrics.dailyChange}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Risk Score</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.portfolioMetrics.riskScore}</p>
                <p className="text-sm text-[#00457C]">Diversification: {analyticsData.portfolioMetrics.diversification}</p>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="lg:col-span-2 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Risk Management</h3>
              <Shield className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <h4 className="font-medium text-[#00457C]">Value at Risk (VaR)</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.riskMetrics.var}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Sharpe Ratio</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.riskMetrics.sharpeRatio}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#009CDE]/10 to-[#0070BA]/10 rounded-lg border border-[#009CDE]/20">
                <h4 className="font-medium text-[#00457C]">Beta</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.riskMetrics.beta}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Correlation</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.riskMetrics.correlation}</p>
              </div>
            </div>
          </div>

          {/* AI Analytics */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">AI Analytics</h3>
              <Brain className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-[#00457C] mr-2" />
                  <h4 className="font-medium text-[#002F6C]">Market Sentiment</h4>
                </div>
                <p className="text-sm text-[#00457C]">AI-powered sentiment analysis</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <div className="flex items-center mb-2">
                  <BarChart2 className="w-5 h-5 text-[#1DBF73] mr-2" />
                  <h4 className="font-medium text-[#002F6C]">Technical Analysis</h4>
                </div>
                <p className="text-sm text-[#00457C]">Pattern recognition and forecasting</p>
              </div>
            </div>
          </div>

          {/* Economic Indicators */}
          <div className="lg:col-span-3 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Economic Indicators</h3>
              <Database className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <h4 className="font-medium text-[#00457C]">GDP Growth</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.marketIndicators.gdp.current}</p>
                <p className="text-sm text-[#00457C]">Forecast: {analyticsData.marketIndicators.gdp.forecast}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Inflation Rate</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.marketIndicators.inflation.current}</p>
                <p className="text-sm text-[#00457C]">Target: {analyticsData.marketIndicators.inflation.target}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#009CDE]/10 to-[#0070BA]/10 rounded-lg border border-[#009CDE]/20">
                <h4 className="font-medium text-[#00457C]">Interest Rate</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.marketIndicators.interestRate.current}</p>
                <p className="text-sm text-[#00457C]">Forecast: {analyticsData.marketIndicators.interestRate.forecast}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Unemployment</h4>
                <p className="text-2xl font-bold text-[#002F6C]">{analyticsData.marketIndicators.unemployment.current}</p>
                <p className="text-sm text-[#00457C]">Change: {analyticsData.marketIndicators.unemployment.change}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
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