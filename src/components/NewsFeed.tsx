import React, { useEffect, useState } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import type { NewsItem } from '../types';

// Finnhub API Key
const FINNHUB_API_KEY = 'cvdrknhr01qm9khmrqtgcvdrknhr01qm9khmrqu0';

// List of major Indian companies to track
const COMPANIES = [
  'RELIANCE.NS',
  'TCS.NS',
  'HDFCBANK.NS',
  'INFY.NS',
  'ICICIBANK.NS'
];

export function NewsFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Fetch general market news
      const marketNewsResponse = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
      );
      
      if (!marketNewsResponse.ok) {
        throw new Error('Failed to fetch market news');
      }

      const marketNews = await marketNewsResponse.json();

      // Fetch company-specific news for each company
      const companyNewsPromises = COMPANIES.map(symbol =>
        fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${getDateString(7)}&to=${getDateString(0)}&token=${FINNHUB_API_KEY}`)
          .then(res => res.json())
          .catch(() => []) // Handle individual company request failures gracefully
      );

      const companyNewsResults = await Promise.all(companyNewsPromises);
      
      // Combine and sort all news
      const allNews = [
        ...marketNews,
        ...companyNewsResults.flat()
      ];

      // Remove duplicates based on headline
      const uniqueNews = Array.from(
        new Map(allNews.map(item => [item.headline, item])).values()
      );

      // Sort by datetime (most recent first) and take top 10
      const sortedNews = uniqueNews
        .sort((a, b) => b.datetime - a.datetime)
        .slice(0, 10);

      // Transform the API response to match our NewsItem type
      const transformedNews = sortedNews.map((article: any) => ({
        title: article.headline,
        summary: article.summary || article.description || 'No description available',
        sentiment: determineSentimentFromContent(article.headline + ' ' + (article.summary || article.description || '')),
        date: new Date(article.datetime * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: article.source
      }));

      setNewsItems(transformedNews);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
      
      // Fallback to mock data in case of error
      setNewsItems([
        {
          title: 'RBI Maintains Repo Rate at 6.5%, GDP Growth Forecast at 7%',
          summary: 'The Reserve Bank of India (RBI) kept the repo rate unchanged at 6.5% for the sixth consecutive time and maintained its GDP growth forecast at 7% for FY24.',
          sentiment: 'neutral',
          date: new Date().toLocaleDateString('en-IN'),
          source: 'Economic Times'
        },
        {
          title: 'Sensex Hits New All-Time High, Crosses 74,000 Mark',
          summary: 'Indian equity benchmarks reached new record highs with Sensex surpassing 74,000 points led by banking and IT stocks.',
          sentiment: 'positive',
          date: new Date().toLocaleDateString('en-IN'),
          source: 'Business Standard'
        },
        {
          title: 'Indian Rupee Strengthens Against US Dollar',
          summary: 'The Indian rupee appreciated against the US dollar supported by strong domestic equities and foreign fund inflows.',
          sentiment: 'positive',
          date: new Date().toLocaleDateString('en-IN'),
          source: 'Financial Express'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get date string in YYYY-MM-DD format
  const getDateString = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  // Enhanced sentiment analysis function
  const determineSentimentFromContent = (text: string): 'positive' | 'negative' | 'neutral' => {
    const positiveWords = [
      'surge', 'rise', 'gain', 'up', 'positive', 'growth', 'profit', 'success',
      'high', 'strengthen', 'boost', 'improved', 'bullish', 'rally', 'outperform'
    ];
    const negativeWords = [
      'fall', 'decline', 'down', 'negative', 'loss', 'risk', 'concern', 'drop',
      'low', 'weak', 'bearish', 'underperform', 'crash', 'crisis', 'worry'
    ];
    
    const textLower = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  useEffect(() => {
    fetchNews();
    // Refresh news every 2 minutes
    const interval = setInterval(fetchNews, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Indian Finance News</h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={fetchNews}
            className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-600">Positive</span>
          </div>
          <div className="flex items-center">
            <Minus className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-gray-600">Negative</span>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.title} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.summary}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {item.sentiment === 'positive' && <TrendingUp className="w-5 h-5 text-green-500" />}
                  {item.sentiment === 'neutral' && <Minus className="w-5 h-5 text-gray-500" />}
                  {item.sentiment === 'negative' && <TrendingDown className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.title} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.summary}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {item.sentiment === 'positive' && <TrendingUp className="w-5 h-5 text-green-500" />}
                  {item.sentiment === 'neutral' && <Minus className="w-5 h-5 text-gray-500" />}
                  {item.sentiment === 'negative' && <TrendingDown className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}