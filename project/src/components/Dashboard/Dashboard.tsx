import React, { useState, useEffect, useRef } from 'react';
import MetricsSection from './MetricsSection';
import BookingsTable from './BookingsTable';
import ExperiencesSection from './ExperiencesSection';
import ReviewsSection from './ReviewsSection';
import NotificationsPanel from './NotificationsPanel';
import { metrics, recentBookings, experiences, reviews, agent, notifications } from '../../data/mockData';
import { Plus, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [welcomeText, setWelcomeText] = useState('');
  const fullText = `Welcome back, ${agent.agencyName}`;
  const isErasingRef = useRef(false);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typeText = () => {
      if (!isErasingRef.current && currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setWelcomeText(currentText);
        currentIndex++;
        animationRef.current = setTimeout(typeText, 150);
      } else if (!isErasingRef.current && currentIndex >= fullText.length) {
        animationRef.current = setTimeout(() => {
          isErasingRef.current = true;
          eraseText(currentText);
        }, 3000);
      }
    };

    const eraseText = (text: string) => {
      if (text.length > 0) {
        const newText = text.slice(0, -1);
        setWelcomeText(newText);
        animationRef.current = setTimeout(() => eraseText(newText), 70);
      } else {
        isErasingRef.current = false;
        currentIndex = 0;
        currentText = '';
        animationRef.current = setTimeout(typeText, 800);
      }
    };

    typeText();

    // Cleanup function to prevent memory leaks
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []); // No dependencies to prevent re-running

  return (
    <div className="bg-light-gray min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-midnight-blue to-ocean-blue/90 rounded-xl shadow-lg overflow-hidden">
          <div className="relative p-8">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-64 opacity-20">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M40.9,-62.5C52.3,-53.6,60.4,-40.7,66.9,-26.8C73.3,-12.8,78.2,2.3,75.7,16.3C73.2,30.3,63.4,43.3,51.2,53.2C39,63.1,24.4,69.9,8.6,73.3C-7.2,76.8,-24.3,76.8,-38.3,69.5C-52.4,62.1,-63.4,47.3,-71.1,31.1C-78.8,14.8,-83.1,-3,-80.5,-20.2C-77.9,-37.4,-68.4,-53.9,-54.9,-62.3C-41.5,-70.7,-24.1,-70.9,-8.2,-67.3C7.8,-63.6,29.4,-71.4,40.9,-62.5Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="flex justify-between items-center relative z-10">
              <div>
                <div className="flex items-center mb-2">
                  <Sparkles className="h-6 w-6 text-accent mr-2" />
                  <span className="text-accent font-medium tracking-wide">Agent Dashboard</span>
                </div>
                <h1 className="text-3xl font-bold text-white min-h-[40px] tracking-tight mt-1">
                  {welcomeText}
                  <span className="animate-blink ml-1">|</span>
                </h1>
                <p className="text-blue-100 mt-3 tracking-wide max-w-xl">
                  Here's what's happening with your experiences today. Check your recent bookings and performance metrics.
                </p>
              </div>
              <button className="inline-flex items-center px-5 py-2.5 bg-ocean-blue/70 hover:bg-ocean-blue text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Experience
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs font-medium text-blue-100">Open Bookings</p>
                <p className="text-xl font-semibold text-white">14</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs font-medium text-blue-100">Today's Revenue</p>
                <p className="text-xl font-semibold text-white">$2,580</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs font-medium text-blue-100">New Reviews</p>
                <p className="text-xl font-semibold text-white">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-8">
          <MetricsSection metrics={metrics} />
        </div>

        {/* Main Content with Bookings Table and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <BookingsTable bookings={recentBookings} />
          </div>
          <div className="lg:col-span-1">
            <NotificationsPanel notifications={notifications} />
          </div>
        </div>

        {/* Experiences */}
        <div className="mb-8">
          <ExperiencesSection experiences={experiences} />
        </div>

        {/* Reviews */}
        <div>
          <ReviewsSection reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;