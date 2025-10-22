import React, { useState } from 'react';
import { UserProfile, DailySession, Activity, ActivityType, ColoringActivity } from '../types';
import ActivityCard from './ActivityCard';
import AliaCharacter from './icons/AliaCharacter';
import PrintableActivities from './PrintableActivities';
import { generateColoringImages } from '../services/geminiService';
import ActivityDetailModal from './ActivityDetailModal';

interface DashboardProps {
  userProfile: UserProfile;
  plan: DailySession[];
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, plan }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [printableActivity, setPrintableActivity] = useState<ColoringActivity | null>(null);
  const [activityDetail, setActivityDetail] = useState<Activity | null>(null);
  const [coloringImages, setColoringImages] = useState<{theme: string, url: string}[]>([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [imageGenError, setImageGenError] = useState<string | null>(null);

  const currentSession = plan.find(session => session.day === selectedDay);

  const handleColoringActivityClick = async (activity: ColoringActivity) => {
    setPrintableActivity(activity);
    setIsGeneratingImages(true);
    setImageGenError(null);
    setColoringImages([]);
    try {
      const images = await generateColoringImages(activity.coloringThemes);
      const successfulImages = images.filter(img => img.url);
      if (successfulImages.length === 0) {
        throw new Error("Failed to generate any images.");
      }
      setColoringImages(successfulImages);
    } catch (error) {
      console.error("Error generating coloring images:", error);
      setImageGenError("عذراً، لم نتمكن من إنشاء صفحات التلوين. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsGeneratingImages(false);
    }
  };
  
  const handleActivityClick = (activity: DailySession['activities'][0]) => {
    if (activity.type === ActivityType.Coloring) {
        handleColoringActivityClick(activity as ColoringActivity)
    } else {
        setActivityDetail(activity);
    }
  }

  return (
    <div className="min-h-screen bg-alia-light-blue dark:bg-gray-900 p-4 sm:p-6 lg:p-8" dir="rtl">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-alia-dark-blue dark:text-alia-blue">
              مرحباً بعودتك، {userProfile.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              هذه هي خطتك العلاجية. هيا نبدأ رحلة اليوم!
            </p>
          </div>
          <AliaCharacter className="h-20 w-20 hidden sm:block" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">أيام البرنامج</h2>
          <div className="flex flex-wrap gap-2">
            {plan.map(session => (
              <button
                key={session.day}
                onClick={() => setSelectedDay(session.day)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedDay === session.day
                    ? 'bg-alia-dark-pink text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                اليوم {session.day}
              </button>
            ))}
          </div>
        </div>

        {currentSession && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">أنشطة اليوم {currentSession.day}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSession.activities.map((activity, index) => (
                <div key={index} onClick={() => handleActivityClick(activity)} className="cursor-pointer">
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {printableActivity && (
        <PrintableActivities
          activity={printableActivity}
          images={coloringImages}
          isLoading={isGeneratingImages}
          error={imageGenError}
          onClose={() => {
            setPrintableActivity(null);
            setColoringImages([]);
            setImageGenError(null);
          }}
        />
      )}

      {activityDetail && (
        <ActivityDetailModal
          activity={activityDetail}
          onClose={() => setActivityDetail(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;