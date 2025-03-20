import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { RoleSelector } from './components/RoleSelector';
import { EconomicIndicators } from './components/EconomicIndicators';
import { SearchBar } from './components/SearchBar';
import { NewsFeed } from './components/NewsFeed';
import type { UserRole } from './types';

function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <RoleSelector 
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
        />
        
        <SearchBar />
        
        <div className="grid grid-cols-1 gap-8">
          <EconomicIndicators />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}

export default App;