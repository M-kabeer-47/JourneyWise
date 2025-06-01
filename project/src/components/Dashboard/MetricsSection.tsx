import React from 'react';
import MetricsCard from './MetricsCard';
import { Metric } from '../../../../src/lib/data';

interface MetricsSectionProps {
  metrics: Metric[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricsCard key={index} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsSection;