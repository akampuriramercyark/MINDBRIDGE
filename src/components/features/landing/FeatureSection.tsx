'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI Wellness Companion',
    description: 'Emotionally supportive chat available 24/7. Your safe space to vent, reflect, and find grounding.',
    icon: '✨'
  },
  {
    title: 'Mood Tracker',
    description: 'Log your emotions daily and visualize trends to better understand your mental well-being.',
    icon: '📊'
  },
  {
    title: 'Anonymous Community',
    description: 'Connect with peers who understand. Share your story safely and anonymously.',
    icon: '🤝'
  },
  {
    title: 'Wellness Toolkit',
    description: 'Guided breathing, grounding exercises, and mindfulness tools for any moment.',
    icon: '🌿'
  },
  {
    title: 'Guided Journaling',
    description: 'Private, secure journaling with prompts to help you navigate complex emotions.',
    icon: '📝'
  },
  {
    title: 'Professional Support',
    description: 'Discover vetted therapists and mentors when you need human expertise.',
    icon: '💡'
  }
];

export const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 bg-brand-navy/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Everything you need to <br /><span className="text-gradient">thrive emotionally.</span></h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            We've combined AI intelligence with human empathy to create the ultimate support system for young people.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={index} 
              animate 
              delay={index * 0.1}
              hover
              className="border border-white/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed font-light">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
