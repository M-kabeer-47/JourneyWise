"use client"
import React, { useState } from 'react';
import DashboardHeader from '../../../components/agent/DashboardHeader';
import DashboardSidebar from '../../../components/agent/DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar         
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6">
              {/* Page content */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;