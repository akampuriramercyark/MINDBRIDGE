'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Play, Pause, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Wait'>('Wait')
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => (prev + 1) % 16)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (!isActive) {
      setPhase('Wait')
      setTimer(0)
      return
    }

    if (timer < 4) setPhase('Inhale')
    else if (timer < 8) setPhase('Hold')
    else if (timer < 12) setPhase('Exhale')
    else setPhase('Hold')
  }, [timer, isActive])

  return (
    <GlassCard className="w-full p-8 flex flex-col items-center text-center overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
        <Sparkles size={40} />
      </div>
      
      <div className="flex items-center gap-3 mb-10 relative z-10">
        <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue">
          <Wind size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Box Breathing</h2>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-3xl" />
        
        <AnimatePresence>
          {isActive && (
            <>
              {/* Outer Ring */}
              <motion.div
                key="outer"
                className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 rounded-full border border-white/5"
                animate={{
                  scale: phase === 'Inhale' ? 1.4 : phase === 'Exhale' ? 1.0 : (phase === 'Hold' && timer < 8) ? 1.4 : 1.0,
                  opacity: phase === 'Wait' ? 0.2 : 0.6
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
              {/* Inner Circle */}
              <motion.div
                key="inner"
                className="absolute inset-8 bg-gradient-to-br from-brand-purple/30 to-brand-blue/30 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                animate={{
                  scale: phase === 'Inhale' ? 1.2 : phase === 'Exhale' ? 0.8 : (phase === 'Hold' && timer < 8) ? 1.2 : 0.8,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center">
          <motion.span 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white mb-2 uppercase tracking-[0.2em]"
          >
            {phase === 'Wait' ? 'Ready?' : phase}
          </motion.span>
          {isActive && (
            <motion.span 
              key={timer}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white"
            >
              {(timer % 4) + 1}
            </motion.span>
          )}
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all shadow-xl",
            isActive 
              ? "bg-white/10 text-white border border-white/10 backdrop-blur-md" 
              : "bg-brand-purple text-white shadow-brand-purple/20 hover:shadow-brand-purple/40"
          )}
        >
          {isActive ? <Pause size={22} /> : <Play size={22} />}
          {isActive ? 'Pause' : 'Start Journey'}
        </motion.button>
        
        {isActive && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsActive(false)
              setTimer(0)
            }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md"
          >
            <RotateCcw size={22} />
          </motion.button>
        )}
      </div>

      <p className="mt-10 text-white/40 text-sm leading-relaxed max-w-xs font-medium italic">
        Box breathing helps lower cortisol and center your mind. 
        Focus on your breath as it flows in and out.
      </p>
    </GlassCard>
  )
}
