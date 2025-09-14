import React from "react";

interface PreferenceSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export default function PreferenceSection({
  title,
  description,
  icon: Icon,
  children,
}: PreferenceSectionProps) {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200 mb-[30px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-ocean-blue" />
        </div>
        <div>
          <h3 className="sm:text-xl text-lg font-bold text-midnight-blue font-raleway">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}