'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-32 px-4 overflow-hidden">
      {/* Background Glows with Animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue/20 rounded-full blur-[150px] pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        <div className="text-center lg:text-left space-y-10">
          <motion.div variants={itemVariants} className="inline-block px-5 py-2 rounded-full glass border-white/10 text-brand-lavender text-sm font-semibold tracking-wide">
            MENTAL WELLNESS FOR AFRICAN YOUTH
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-white">
            You Don’t Have To <br />
            <span className="text-gradient">Carry Everything Alone.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Harmony Hub is a safe space for all minds. We provide anonymous emotional support, 
            AI-powered conversations, wellness tools, and connection with professional care.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <Button variant="primary" size="lg" className="px-10">
              Get Started Free
            </Button>
            <Button variant="glass" size="lg" className="px-10">
              Talk To Sanyu AI
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-10 pt-10">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">Users</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">Support</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">Private</div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="relative px-4 lg:px-0"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 bg-brand-navy/50">
            <div className="aspect-[4/3] flex items-center justify-center relative">
               <img 
                src="/artifacts/hero-wellness-africa.png" 
                alt="Safe space illustration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            </div>
          </div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-10 -left-6 md:-left-12 z-20"
          >
            <GlassCard className="max-w-[280px] shadow-2xl border-brand-purple/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Harmony Hub AI</span>
              </div>
              <p className="text-base italic text-white/90 leading-relaxed font-medium">"I'm here for you. How are you feeling today?"</p>
            </GlassCard>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-20 h-20 bg-brand-purple/20 rounded-2xl blur-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
