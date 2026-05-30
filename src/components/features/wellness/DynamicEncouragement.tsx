'use client';

import React, { useEffect, useState } from 'react';
import { EncouragementCard } from './EncouragementCard';
import { getDailyAffirmation, getPersonalizedEncouragement } from '@/services/wellness-service';
import { useAuth } from '@/context/auth-context';

export const DynamicEncouragement: React.FC = () => {
  const { user } = useAuth();
  const [affirmation, setAffirmation] = useState('');
  const [personalNudge, setPersonalNudge] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const aff = await getDailyAffirmation();
      setAffirmation(aff);
      if (user?.id) {
        const nudge = await getPersonalizedEncouragement(user.id);
        setPersonalNudge(nudge);
      }
      setLoading(false);
    }
    loadData();
  }, [user?.id]);

  if (loading) {
    return <div className="h-[200px] rounded-3xl glass animate-pulse" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EncouragementCard 
        text={affirmation} 
        author="Sanyu's Daily Word" 
        type="affirmation" 
      />
      {personalNudge && (
        <EncouragementCard 
          text={personalNudge} 
          author="Sanyu's Note to You" 
          type="personal" 
        />
      )}
    </div>
  );
};
