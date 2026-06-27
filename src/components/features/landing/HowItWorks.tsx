'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Check-in with Sanyu AI',
    description: 'Start your journey with a simple emotional check-in. Our AI is here to listen without judgment, 24/7.',
  },
  {
    number: '02',
    title: 'Discover Personalized Tools',
    description: 'Based on how you feel, we suggest tailored grounding exercises, journaling prompts, or mood tracking.',
  },
  {
    number: '03',
    title: 'Connect with a Safe Community',
    description: 'Share your thoughts anonymously in our peer-to-peer spaces and realize you are not alone.',
  },
  {
    number: '04',
    title: 'Track Your Growth',
    description: 'See your emotional trends over time and celebrate your resilience and progress.',
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">How it <span className="text-gradient">Works.</span></h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            A simple, guided path to better emotional health, designed for the way you live.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -top-10 -left-4 text-8xl font-black text-white/[0.03] group-hover:text-brand-purple/[0.05] transition-colors pointer-events-none select-none">
                {step.number}
              </div>
              <div className="pt-8 space-y-4 relative z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-lavender transition-colors">{step.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <GlassCard className="flex flex-col lg:flex-row items-center gap-16 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 p-10 lg:p-16 border border-white/10 shadow-2xl">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-brand-purple/20 text-brand-lavender text-[10px] font-bold uppercase tracking-widest">
                Culturally Relevant
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Built for African Youth, by those who understand.</h3>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                Harmony Hub is built specifically for our context. We understand the unique pressures of family expectations, 
                career uncertainty, and the digital age that you face every day.
              </p>
              <div className="flex gap-5 items-center">
                <div className="flex -space-x-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-navy bg-gradient-to-br from-brand-purple/40 to-brand-blue/40 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white/50 font-medium">
                  <span className="text-white font-bold block text-base">5,000+</span>
                  Active users across Uganda
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="aspect-[4/3] rounded-[2rem] bg-brand-navy border border-white/20 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl"
               >
                  <img src="/artifacts/mindbridge-ai-companion.png" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="Support" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent opacity-60" />
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 group-hover:bg-white/20 transition-all z-10 shadow-2xl">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1.5" />
                  </div>
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors z-10">Watch Sanyu Story</span>
               </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
