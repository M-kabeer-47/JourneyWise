"use client";
import React, { useState } from "react";
import DashboardHeader from "../../../components/agent-dashboard/layout/DashboardHeader";
import DashboardSidebar from "../../../components/agent-dashboard/layout/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen bg-gray-50 md:flex ">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-col w-full ">
        <DashboardHeader />

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="px-4 sm:px-6">
            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
