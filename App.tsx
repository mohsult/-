
import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { UserProfile, TherapyPlan } from './types';
import { generateTherapyPlan } from './services/geminiService';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [therapyPlan, setTherapyPlan] = useState<TherapyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handlePlanGeneration = async (profile: UserProfile) => {
    setIsLoading(true);
    setApiError(null); // Reset error on a new attempt
    setUserProfile(profile);
    try {
      const plan = await generateTherapyPlan(profile);
      if (plan && plan.sessions) {
        setTherapyPlan(plan);
      } else {
        throw new Error("Invalid plan structure received.");
      }
    } catch (error) {
      console.error("Failed to generate therapy plan:", error);
      setApiError("عذراً، حدث خطأ غير متوقع أثناء إنشاء الخطة. الرجاء المحاولة مرة أخرى.");
      setUserProfile(null); // Reset profile to stay on the onboarding screen
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-alia-light-blue dark:bg-gray-900 transition-colors duration-300">
      {userProfile && therapyPlan ? (
        <Dashboard userProfile={userProfile} plan={therapyPlan.sessions} />
      ) : (
        <Onboarding 
          onPlanGenerated={handlePlanGeneration} 
          setLoading={setIsLoading} 
          isLoading={isLoading}
          apiError={apiError} 
        />
      )}
    </div>
  );
};

export default App;
