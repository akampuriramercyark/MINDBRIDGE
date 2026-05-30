'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import { Smile, Frown, Meh, Angry, CloudRain, Sun, Heart, Zap, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  { id: 'calm', label: 'Calm', icon: Sun, color: 'text-blue-300', bg: 'bg-blue-300/20' },
  { id: 'neutral', label: 'Meh', icon: Meh, color: 'text-gray-400', bg: 'bg-gray-400/20' },
  { id: 'loved', label: 'Loved', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-400/20' },
  { id: 'sad', label: 'Sad', icon: CloudRain, color: 'text-indigo-400', bg: 'bg-indigo-400/20' },
  { id: 'anxious', label: 'Anxious', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { id: 'angry', label: 'Angry', icon: Angry, color: 'text-red-400', bg: 'bg-red-400/20' },
]

export function MoodLogger() {
  const { user } = useAuth()
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedMood) return

    setLoading(true)
    try {
      const { error } = await (supabase.from('mood_logs') as any).insert({
        user_id: user.id,
        mood: selectedMood,
        intensity,
        note,
      })

      if (error) throw error
      
      setSuccess(true)
      setSelectedMood(null)
      setIntensity(5)
      setNote('')
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      console.error('Error logging mood:', error.message)
      alert('Failed to log mood. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="w-full max-w-3xl mx-auto p-8 md:p-12 relative overflow-hidden group">
      {/* Decorative spark */}
      <div className="absolute top-0 right-0 p-6 text-brand-purple/10 group-hover:text-brand-purple/20 transition-colors pointer-events-none">
        <Sparkles size={60} />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">How are you feeling?</h2>
        <p className="text-brand-blue/60 mb-10">Your emotions are valid. Let&apos;s check in with yourself.</p>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {moods.map((mood, idx) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "flex flex-col items-center gap-4 p-5 rounded-[2rem] transition-all border duration-500 relative group/mood",
                  selectedMood === mood.id 
                    ? cn("border-brand-purple bg-brand-purple/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-105")
                    : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover/mood:scale-110 duration-500",
                  mood.bg
                )}>
                  <mood.icon className={cn("w-8 h-8", mood.color)} />
                </div>
                <span className="text-[13px] font-bold text-white tracking-wide uppercase">{mood.label}</span>
                
                {selectedMood === mood.id && (
                  <motion.div 
                    layoutId="active-mood"
                    className="absolute -top-1 -right-1 w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center border-2 border-brand-navy shadow-lg"
                  >
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedMood && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="space-y-8 overflow-hidden pt-4"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-white/70 uppercase tracking-[0.2em]">Intensity</label>
                    <span className="text-2xl font-black text-brand-purple">{intensity}<span className="text-white/20 text-sm font-medium ml-1">/ 10</span></span>
                  </div>
                  <div className="relative group/slider">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple hover:accent-brand-lavender transition-all"
                    />
                    <div className="flex justify-between px-1 mt-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                      <span>Mild</span>
                      <span>Intense</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-[0.2em]">What&apos;s on your mind?</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Describe your feelings or what triggered them..."
                    className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple/30 transition-all min-h-[140px] resize-none text-[15px] leading-relaxed shadow-inner"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  size="lg"
                  variant={success ? 'outline' : 'primary'}
                >
                  {loading ? 'Logging...' : success ? (
                    <span className="flex items-center gap-2">
                      <Check size={20} />
                      Mood Saved
                    </span>
                  ) : 'Save Mood Entry'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </GlassCard>
  )
}
