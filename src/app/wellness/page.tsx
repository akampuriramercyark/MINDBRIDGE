'use client'

import React from 'react'
import { BreathingExercise } from '@/components/features/wellness/breathing-exercise'
import { ProtectedRoute } from '@/components/common/protected-route'
import Link from 'next/link'
import { EncouragementCard } from '@/components/features/wellness/EncouragementCard'
import { ArrowLeft, Sparkles, Anchor, ShieldCheck, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

const affirmations = [
  "You are doing enough, even when the world asks for more.",
  "Your worth is not defined by 'black tax' or family expectations. You matter.",
  "Mirembe. Peace starts with how you talk to yourself today.",
  "Small steps lead to big change. Keep pushing, you've got this.",
  "It's okay to prioritize your mental health. You can't pour from an empty cup.",
  "You are resilient, like the mountains of Uganda. Unshakable.",
  "Webale for showing up today. That in itself is a victory.",
  "Your dreams are valid, regardless of the economy or job market.",
  "You are seen. You are heard. You are supported.",
  "Rest is not a reward; it is a necessity. Give yourself permission to pause.",
]

const groundingSteps = [
  { num: 5, label: "See", text: "Things you can see around you.", color: "text-brand-purple" },
  { num: 4, label: "Touch", text: "Things you can touch (physical sensations).", color: "text-brand-blue" },
  { num: 3, label: "Hear", text: "Things you can hear in the distance.", color: "text-brand-lavender" },
  { num: 2, label: "Smell", text: "Things you can smell.", color: "text-brand-purple" },
  { num: 1, label: "Taste", text: "Thing you can taste.", color: "text-brand-blue" },
]

export default function WellnessToolkitPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy p-6 md:p-12 relative overflow-hidden text-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </motion.div>

          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Wellness Toolkit</h1>
              <p className="text-xl text-brand-blue/80 max-w-2xl leading-relaxed">
                A sanctuary for your mind. Use these tools to ground yourself, find peace, and remind yourself of your strength.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Exercises (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BreathingExercise />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-brand-purple/10 text-brand-purple">
                      <Anchor size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">5-4-3-2-1 Grounding</h3>
                      <p className="text-white/40 text-sm">Reconnect with the present moment</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {groundingSteps.map((step, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        key={step.num} 
                        className="flex items-center gap-6 group"
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl transition-all group-hover:scale-110 group-hover:border-brand-purple/30",
                          step.color
                        )}>
                          {step.num}
                        </div>
                        <div>
                          <p className="text-white/90 font-medium">
                            <span className={cn("font-bold mr-2", step.color)}>{step.label}:</span>
                            {step.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Right Column: Affirmations & Resources (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-brand-lavender/10 text-brand-lavender">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Reminders</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {affirmations.slice(0, 3).map((text, i) => (
                      <EncouragementCard key={i} text={text} type="affirmation" delay={i * 0.1} />
                    ))}
                    <div className="pt-6 space-y-4">
                      <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] px-2">More Affirmations</p>
                      <div className="grid grid-cols-1 gap-3">
                        {affirmations.slice(3, 7).map((text, i) => (
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            key={i} 
                            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-purple/20 hover:bg-white/10 transition-all cursor-default"
                          >
                            <p className="text-white/70 text-sm italic">&quot;{text}&quot;</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 border border-white/10 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl group-hover:bg-brand-purple/30 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-brand-purple">
                      <ShieldCheck size={28} />
                      <h3 className="text-2xl font-bold text-white">Crisis Support</h3>
                    </div>
                    <p className="text-white/70 text-[15px] leading-relaxed mb-8">
                      These tools are for grounding. If you are in immediate danger or feeling overwhelmed beyond these exercises, please reach out. You are not alone.
                    </p>
                    <Link 
                      href="/therapists" 
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white text-brand-navy rounded-2xl font-bold hover:bg-brand-lavender transition-all shadow-xl shadow-brand-purple/10"
                    >
                      <Heart size={20} className="fill-brand-navy" />
                      Find Support Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
