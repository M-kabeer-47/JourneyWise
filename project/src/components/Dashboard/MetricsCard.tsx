import React from 'react';
import { Calendar, CreditCard, MapPin, Star } from 'lucide-react';
import { Metric } from '../../../../src/lib/data';

interface MetricsCardProps {
  metric: Metric;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.icon) {
      case 'Calendar':
        return <Calendar className="h-6 w-6 text-ocean-blue" />;
      case 'CreditCard':
        return <CreditCard className="h-6 w-6 text-ocean-blue" />;
      case 'Star':
        return <Star className="h-6 w-6 text-ocean-blue" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-ocean-blue" />;
      default:
        return <Calendar className="h-6 w-6 text-ocean-blue" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
          <h3 className="text-2xl font-bold text-midnight-blue">{metric.value}</h3>
          {metric.change !== undefined && (
            <div className="flex items-center mt-2">
              <div className={`flex items-center ${metric.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                <span className="text-sm font-medium">
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className="bg-ocean-blue/5 p-3 rounded-xl">
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;