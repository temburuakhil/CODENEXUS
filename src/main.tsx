import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { CitizenDashboard } from './components/dashboards/CitizenDashboard';
import { ResearcherDashboard } from './components/dashboards/ResearcherDashboard';
import { PolicymakerDashboard } from './components/dashboards/PolicymakerDashboard';
import { FinancialDashboard } from './components/dashboards/FinancialDashboard';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/citizen-dashboard',
    element: <CitizenDashboard />,
  },
  {
    path: '/researcher-dashboard',
    element: <ResearcherDashboard />,
  },
  {
    path: '/policymaker-dashboard',
    element: <PolicymakerDashboard />,
  },
  {
    path: '/financial-dashboard',
    element: <FinancialDashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);