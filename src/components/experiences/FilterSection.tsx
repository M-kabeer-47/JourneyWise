// components/experiences/FilterSection.tsx
import React from 'react';

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function FilterSection({ title, icon, children }: FilterSectionProps) {
  return (
    <div className="space-y-3 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}