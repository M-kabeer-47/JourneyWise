import React from 'react';
import ExperienceCard from './ExperienceCard';
import { Experience } from '../../../../src/lib/data';
import { Plus } from 'lucide-react';

interface ExperiencesSectionProps {
  experiences: Experience[];
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-midnight-blue">Your Experiences</h2>
        <div className="flex space-x-4">
          <button className="text-sm text-ocean-blue hover:text-blue-700 font-medium">
            View All
          </button>
          <button className="inline-flex items-center text-sm px-3 py-1 bg-ocean-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-1" />
            Add New
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default ExperiencesSection;