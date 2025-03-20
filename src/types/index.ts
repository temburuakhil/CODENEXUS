export type UserRole = 'citizen' | 'researcher' | 'policymaker' | 'financial';

export interface EconomicIndicator {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  source: string;
}

export interface DashboardProps {
  role: UserRole;
}

export interface CalculatorData {
  principal: number;
  rate: number;
  time: number;
  result: number;
}

export interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface PolicyUpdate {
  title: string;
  status: 'proposed' | 'active' | 'under_review';
  impact: 'high' | 'medium' | 'low';
  sector: string;
  date: string;
}