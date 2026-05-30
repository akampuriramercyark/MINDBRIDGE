'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bell, Sparkles, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { getWellnessNotifications, WellnessNotification } from '@/services/wellness-service';
import { useAuth } from '@/context/auth-context';

export const WellnessNotifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<WellnessNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      if (user?.id) {
        const data = await getWellnessNotifications(user.id);
        setNotifications(data);
      }
      setLoading(false);
    }
    loadNotifications();
  }, [user?.id]);

  if (loading) {
    return <div className="h-20 flex items-center justify-center"><div className="w-6 h-6 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (notifications.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Calendar size={18} className="text-brand-blue" />;
      case 'nudge': return <BookOpen size={18} className="text-brand-lavender" />;
      default: return <AlertCircle size={18} className="text-brand-purple" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
        <Bell size={14} />
        Wellness Nudges
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.map((n) => (
          <GlassCard key={n.id} className="p-4 flex gap-4 items-start border-white/5 hover:border-white/10 transition-all">
            <div className="p-2 rounded-lg bg-white/5 shrink-0">
              {getIcon(n.type)}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{n.title}</h4>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
