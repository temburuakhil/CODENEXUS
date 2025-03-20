import React, { useState, useEffect } from 'react';
import { 
  LineChart, Filter, Download, RefreshCw, 
  Search, Brain, TrendingUp, BarChart3,
  Users, GitBranch, FileText, Settings,
  AlertCircle, Database, Code, Share2,
  Moon, Sun, ChevronDown, MessageSquare
} from 'lucide-react';
import { InteractiveChart } from '../charts/InteractiveChart';
import { PredictiveModels } from '../analysis/PredictiveModels';
import { fetchStockData, fetchMarketSentiment } from '../../utils/marketData';
import type { StockData, MarketSentiment, ResearchPaper, DiscussionPost } from '../../types';

export function ResearcherDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [activeTab, setActiveTab] = useState('analytics');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [sentiment, setSentiment] = useState<MarketSentiment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock research papers for demonstration
  const [papers, setPapers] = useState<ResearchPaper[]>([
    {
      id: '1',
      title: 'Machine Learning Applications in Market Microstructure',
      abstract: 'This paper explores the application of deep learning in high-frequency trading...',
      authors: ['John Doe', 'Jane Smith'],
      keywords: ['ML', 'HFT', 'Market Microstructure'],
      publishDate: '2024-03-15',
      citations: 45,
      url: '#'
    }
  ]);

  // Mock discussion posts
  const [discussions, setDiscussions] = useState<DiscussionPost[]>([
    {
      id: '1',
      author: 'Alice Johnson',
      content: 'Interesting findings on the correlation between social sentiment and market movements.',
      timestamp: Date.now() - 3600000,
      likes: 12,
      replies: 3
    }
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stock data for major indices
      const indices = ['SPY', 'QQQ', 'DIA'];
      const stockPromises = indices.map(symbol => fetchStockData(symbol));
      const stockResults = await Promise.all(stockPromises);
      setStockData(stockResults);

      // Fetch market sentiment
      const sentimentData = await fetchMarketSentiment();
      setSentiment(sentimentData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (from: number, to: number) => {
    // Update data based on new time range
    console.log('Time range changed:', new Date(from), new Date(to));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement NLP-based search here
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#222831]' : 'bg-[#F5F7FA]'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00457C] dark:text-[#009CDE]">
              Research Analytics Platform
            </h1>
            <p className="text-[#00457C] dark:text-[#009CDE] mt-1">
              Advanced Financial Research & Analysis Tools
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-6 h-6 text-[#F4A261]" /> : <Moon className="w-6 h-6 text-[#002F6C]" />}
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#0070BA] to-[#00457C] text-white rounded-lg hover:from-[#009CDE] hover:to-[#0070BA] transition-all duration-300">
              <Share2 className="w-5 h-5 mr-2" />
              Share Research
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['analytics', 'research', 'sentiment', 'quantitative', 'collaboration'].map((tab) => (
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
          {/* Interactive Chart */}
          <div className="lg:col-span-2 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Market Analysis</h3>
              <div className="flex space-x-3">
                <button className="flex items-center px-3 py-2 bg-[#0070BA]/10 text-[#00457C] rounded-lg hover:bg-[#0070BA]/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-3 py-2 bg-[#0070BA]/10 text-[#00457C] rounded-lg hover:bg-[#0070BA]/20">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button 
                  onClick={fetchData}
                  disabled={loading}
                  className="flex items-center px-3 py-2 bg-[#0070BA]/10 text-[#00457C] rounded-lg hover:bg-[#0070BA]/20"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
            {stockData.length > 0 && (
              <InteractiveChart
                data={stockData}
                onTimeRangeChange={handleTimeRangeChange}
              />
            )}
          </div>

          {/* AI Research Tools */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">AI Research Tools</h3>
              <Brain className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <div className="flex items-center mb-2">
                  <Search className="w-5 h-5 text-[#00457C] mr-2" />
                  <h4 className="font-medium text-[#002F6C]">NLP Search</h4>
                </div>
                <input
                  type="text"
                  placeholder="Search research papers..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#0070BA]/20 focus:ring-2 focus:ring-[#009CDE]"
                />
              </div>
              {stockData.length > 0 && (
                <PredictiveModels
                  historicalPrices={stockData.map(d => d.price)}
                />
              )}
            </div>
          </div>

          {/* Market Sentiment Analysis */}
          <div className="lg:col-span-2 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Market Sentiment Analysis</h3>
              <AlertCircle className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                <h4 className="font-medium text-[#00457C]">Overall Sentiment</h4>
                <p className="text-2xl font-bold text-[#002F6C]">
                  {sentiment ? `${(sentiment.overall * 100).toFixed(1)}%` : 'Loading...'}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#009CDE]/10 to-[#0070BA]/10 rounded-lg border border-[#009CDE]/20">
                <h4 className="font-medium text-[#00457C]">News Sentiment</h4>
                <p className="text-2xl font-bold text-[#002F6C]">
                  {sentiment ? `${(sentiment.news * 100).toFixed(1)}%` : 'Loading...'}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#1DBF73]/10 to-[#009CDE]/10 rounded-lg border border-[#1DBF73]/20">
                <h4 className="font-medium text-[#00457C]">Social Sentiment</h4>
                <p className="text-2xl font-bold text-[#002F6C]">
                  {sentiment ? `${(sentiment.social * 100).toFixed(1)}%` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          {/* Research Papers */}
          <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Latest Research</h3>
              <FileText className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              {papers.map(paper => (
                <div key={paper.id} className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                  <h4 className="font-medium text-[#002F6C]">{paper.title}</h4>
                  <p className="text-sm text-[#00457C] mt-1">{paper.abstract}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-[#00457C]">
                    <span>Citations: {paper.citations}</span>
                    <span>{paper.publishDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration */}
          <div className="lg:col-span-3 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#00457C]">Research Community</h3>
              <Users className="w-6 h-6 text-[#0070BA]" />
            </div>
            <div className="space-y-4">
              {discussions.map(post => (
                <div key={post.id} className="p-4 bg-gradient-to-br from-[#0070BA]/10 to-[#00457C]/10 rounded-lg border border-[#0070BA]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#002F6C]">{post.author}</span>
                    <span className="text-sm text-[#00457C]">
                      {new Date(post.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[#00457C]">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-[#00457C]">{post.likes} likes</span>
                    <span className="text-sm text-[#00457C]">{post.replies} replies</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#0070BA] to-[#00457C] text-white rounded-lg hover:from-[#009CDE] hover:to-[#0070BA] transition-all duration-300">
            <Download className="w-5 h-5 mr-2" />
            Export Research
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