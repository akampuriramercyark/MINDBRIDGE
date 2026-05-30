'use client'

import React from 'react'
import { MoodLogger } from '@/components/features/mood/mood-logger'
import { MoodHistory } from '@/components/features/mood/mood-history'
import { ProtectedRoute } from '@/components/common/protected-route'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MoodTrackerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy p-6 md:p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
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
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <TrendingUp size={28} />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Mood Tracker</h1>
              </div>
              <p className="text-xl text-brand-blue/80 max-w-2xl leading-relaxed">
                Your emotional journey matters. Tracking your moods helps you understand patterns and prioritize your mental well-being.
              </p>
            </motion.div>
          </header>

          <div className="space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MoodLogger />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MoodHistory />
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
