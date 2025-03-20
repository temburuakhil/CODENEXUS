import React from 'react';
import { Users, BookOpen, Landmark, LineChart } from 'lucide-react';
import type { UserRole } from '../types';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'citizen',
    name: 'Citizens',
    icon: Users,
    description: 'Personal finance and economic trends',
    path: '/citizen-dashboard'
  },
  {
    id: 'researcher',
    name: 'Researchers',
    icon: BookOpen,
    description: 'Advanced data analysis tools',
    path: '/researcher-dashboard'
  },
  {
    id: 'policymaker',
    name: 'Policymakers',
    icon: Landmark,
    description: 'Policy impact and forecasting',
    path: '/policymaker-dashboard'
  },
  {
    id: 'financial',
    name: 'Financial Professionals',
    icon: LineChart,
    description: 'Market insights and portfolio analysis',
    path: '/financial-dashboard'
  }
] as const;

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const handleRoleClick = (role: UserRole, path: string) => {
    onRoleSelect(role);
    window.open(path, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleRoleClick(role.id, role.path)}
              className={`p-6 rounded-xl transition-all ${
                selectedRole === role.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-800 hover:shadow-md hover:scale-105'
              }`}
            >
              <Icon className="w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
              <p className={selectedRole === role.id ? 'text-blue-100' : 'text-gray-600'}>
                {role.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}