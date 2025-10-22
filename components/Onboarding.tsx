
import React, { useState } from 'react';
import { UserProfile, VisualCondition } from '../types';
import AliaCharacter from './icons/AliaCharacter';

interface OnboardingProps {
  onPlanGenerated: (profile: UserProfile) => void;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  apiError: string | null;
}

const Onboarding: React.FC<OnboardingProps> = ({ onPlanGenerated, setLoading, isLoading, apiError }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: 5,
    condition: VisualCondition.Amblyopia,
    duration: 15,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || profile.name.trim().length < 2) {
      setError('الرجاء إدخال اسم الطفل.');
      return;
    }
    setError('');
    setLoading(true);
    onPlanGenerated(profile as UserProfile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-alia-light-blue dark:bg-gray-900">
       <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
        <AliaCharacter className="h-32 w-32 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-alia-dark-blue dark:text-alia-blue mb-2">
            أهلاً بك في بصريات علياء!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
            لنبدأ رحلة ممتعة لتحسين النظر. الرجاء إكمال بيانات طفلك.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          <div>
            <label htmlFor="name" className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">اسم الطفل</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-alia-blue dark:focus:border-alia-dark-pink transition"
              placeholder="مثال: سارة"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">العمر (3-12 سنة)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleInputChange}
              min="3"
              max="12"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-alia-blue dark:focus:border-alia-dark-pink transition"
            />
          </div>

          <div>
            <label htmlFor="condition" className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">الحالة البصرية</label>
            <select
              id="condition"
              name="condition"
              value={profile.condition}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-alia-blue dark:focus:border-alia-dark-pink transition appearance-none"
            >
              {Object.values(VisualCondition).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
             <label className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">مدة البرنامج</label>
             <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map(d => (
                    <button type="button" key={d} onClick={() => setProfile(p => ({...p, duration: d as 15|30|60}))}
                     className={`px-4 py-3 rounded-lg font-semibold transition ${profile.duration === d ? 'bg-alia-dark-blue text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                        {d} يوم
                    </button>
                ))}
             </div>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {apiError && <p className="text-red-500 text-sm font-semibold mt-2">{apiError}</p>}


          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-alia-dark-pink text-white font-bold py-4 px-4 rounded-xl hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري إنشاء الخطة...
                </>
            ) : "إنشاء الخطة العلاجية"}
          </button>
        </form>
       </div>
    </div>
  );
};

export default Onboarding;
