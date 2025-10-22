
import React from 'react';
import { Activity, ActivityType, ColoringActivity } from '../types';
import EyeIcon from './icons/EyeIcon';
import PuzzleIcon from './icons/PuzzleIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';
import TargetIcon from './icons/TargetIcon';
import RelaxIcon from './icons/RelaxIcon';

interface ActivityCardProps {
  activity: Activity | ColoringActivity;
}

const iconMap: Record<ActivityType, React.FC<{className?: string}>> = {
  [ActivityType.EyeTracking]: EyeIcon,
  [ActivityType.Puzzle]: PuzzleIcon,
  [ActivityType.Coloring]: PaintBrushIcon,
  [ActivityType.FocusGame]: TargetIcon,
  [ActivityType.Relaxation]: RelaxIcon,
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const Icon = iconMap[activity.type];
  const isColoring = 'coloringThemes' in activity;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-start space-x-4 space-x-reverse transition-transform hover:scale-105">
      <div className="flex-shrink-0 w-16 h-16 bg-alia-light-blue dark:bg-alia-dark-blue rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-alia-dark-blue dark:text-alia-light-blue" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{activity.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{activity.description}</p>
        <div className="text-sm text-alia-dark-blue dark:text-alia-blue font-semibold mt-3">
          {isColoring ? `${(activity as ColoringActivity).coloringThemes.length} صفحات` : `المدة: ${activity.duration} دقائق`}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
