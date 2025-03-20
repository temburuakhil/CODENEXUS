import React from 'react';
import { Brain, ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">
                AI-Powered Financial Insights
              </h1>
            </div>
            <p className="text-xl text-blue-100">
              Unlock powerful financial analytics with our advanced AI platform.
              Make informed decisions with real-time insights and personalized recommendations.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold 
                hover:bg-blue-50 transition-colors flex items-center">
                Explore Now <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold 
                hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800"
              alt="Financial Analytics Dashboard"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}