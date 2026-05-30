'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Quote, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface EncouragementCardProps {
  text: string;
  author?: string;
  type?: 'affirmation' | 'quote' | 'personal';
  delay?: number;
}

export const EncouragementCard: React.FC<EncouragementCardProps> = ({ 
  text, 
  author = "MindBridge AI", 
  type = 'affirmation',
  delay = 0
}) => {
  const getIcon = () => {
    switch (type) {
      case 'quote': return <Quote size={20} className="text-brand-blue" />;
      case 'personal': return <Heart size={20} className="text-brand-purple" />;
      default: return <Sparkles size={20} className="text-brand-purple" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'quote': return 'from-brand-blue/10 to-brand-soft-blue/5';
      case 'personal': return 'from-brand-purple/10 to-brand-lavender/5';
      default: return 'from-brand-purple/10 to-brand-blue/5';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <GlassCard className={`h-full flex flex-col justify-between p-8 hover:border-brand-purple/40 transition-all group overflow-hidden relative border border-white/5 bg-gradient-to-br ${getGradient()}`}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-white/10">
            {getIcon()}
          </div>
          <p className="text-xl font-bold leading-relaxed text-white italic">
            &quot;{text}&quot;
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">— {author}</span>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-lavender/40" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
