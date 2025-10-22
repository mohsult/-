import React from 'react';
import { Activity, ActivityType } from '../types';
import EyeIcon from './icons/EyeIcon';
import PuzzleIcon from './icons/PuzzleIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';
import TargetIcon from './icons/TargetIcon';
import RelaxIcon from './icons/RelaxIcon';

interface ActivityDetailModalProps {
  activity: Activity;
  onClose: () => void;
}

const iconMap: Record<ActivityType, React.FC<{className?: string}>> = {
  [ActivityType.EyeTracking]: EyeIcon,
  [ActivityType.Puzzle]: PuzzleIcon,
  [ActivityType.Coloring]: PaintBrushIcon,
  [ActivityType.FocusGame]: TargetIcon,
  [ActivityType.Relaxation]: RelaxIcon,
};

const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose }) => {
  const Icon = iconMap[activity.type];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <header className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-alia-light-blue dark:bg-alia-dark-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-alia-dark-blue dark:text-alia-light-blue" />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activity.title}</h2>
                  <p className="text-sm text-alia-dark-blue dark:text-alia-blue font-semibold">المدة: {activity.duration} دقائق</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <main className="p-6 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-2 dark:text-white">طريقة التنفيذ:</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {activity.description}
            </div>
          </main>
          
          <footer className="p-5 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="w-full bg-alia-dark-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
              >
                فهمت، لنبدأ!
              </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ActivityDetailModal;