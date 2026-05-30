'use client'

import { useEffect, useState } from 'react'
import { getMoodTrends, getActivityMetrics } from '@/services/wellness-service'
import { useAuth } from '@/context/auth-context'
import { Smile, Sun, Meh, CloudRain, Angry, Zap, Heart, Loader2, BookOpen, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const moodConfig: Record<string, { icon: any, color: string, label: string }> = {
  happy: { icon: Smile, color: 'text-yellow-400', label: 'Happy' },
  calm: { icon: Sun, color: 'text-blue-300', label: 'Calm' },
  neutral: { icon: Meh, color: 'text-gray-400', label: 'Meh' },
  sad: { icon: CloudRain, color: 'text-indigo-400', label: 'Sad' },
  angry: { icon: Angry, color: 'text-red-400', label: 'Angry' },
  anxious: { icon: Zap, color: 'text-orange-400', label: 'Anxious' },
  loved: { icon: Heart, color: 'text-pink-400', label: 'Loved' },
}

export const WellnessInsights = () => {
  const { user } = useAuth()
  const [trends, setTrends] = useState<any[]>([])
  const [metrics, setMetrics] = useState({ moodLogs: 0, journals: 0, communityPosts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const [trendsData, metricsData] = await Promise.all([
          getMoodTrends(user.id),
          getActivityMetrics(user.id)
        ])
        setTrends(trendsData)
        setMetrics(metricsData)
        setLoading(false)
      }
      fetchData()
    }
  }, [user])

  if (loading) {
    return (
      <div className="p-8 rounded-3xl glass border border-white/10 bg-white/5">
        <h3 className="text-xl font-bold mb-6">Wellness Insights</h3>
        <div className="h-48 w-full bg-white/5 rounded-2xl animate-pulse flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-purple mb-4 opacity-50" />
          <span className="text-white/20 font-medium">Analyzing your journey...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Smile, label: 'Mood Logs', value: metrics.moodLogs, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { icon: BookOpen, label: 'Journal Entries', value: metrics.journals, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
          { icon: Users, label: 'Community', value: metrics.communityPosts, color: 'text-brand-lavender', bg: 'bg-brand-lavender/10' },
        ].map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl glass border border-white/5 bg-white/5 flex items-center gap-5 hover:border-white/10 transition-colors group"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", metric.bg, metric.color)}>
              <metric.icon size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-white leading-none mb-1">{metric.value}</div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-3xl glass border border-white/10 bg-white/5"
      >
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-bold text-white">Emotional Trends</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 py-1 border border-white/5 rounded-full">Last 7 Days</span>
        </div>
        
        {trends.length === 0 ? (
           <div className="h-48 w-full flex flex-col items-center justify-center text-center p-4">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
             <Smile className="text-white/20" size={32} />
           </div>
           <p className="text-white/40 text-sm max-w-xs mx-auto font-light">Log your mood for a few days to see your emotional patterns and growth here.</p>
         </div>
        ) : (
          <div className="space-y-10">
            <div className="flex items-end justify-between h-40 gap-4 px-2">
              {trends.slice(-7).map((log, i) => {
                const config = moodConfig[log.mood] || moodConfig.neutral
                const Icon = config.icon
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full">
                    <div className="relative w-full flex-1 flex flex-col items-center justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(i + 1) * 10 + 40}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className={cn(
                          "w-full max-w-[40px] rounded-xl transition-all duration-500 bg-gradient-to-t from-white/5 shadow-inner",
                          config.color.replace('text-', 'to-').replace('-400', '/30').replace('-300', '/30')
                        )}
                      />
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-brand-navy border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-bold whitespace-nowrap z-20 shadow-2xl scale-90 group-hover:scale-100">
                        {new Date(log.created_at).toLocaleDateString(undefined, { weekday: 'long' })}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Icon size={20} className={cn(config.color, "transition-transform group-hover:scale-125")} />
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter hidden md:block">{config.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              <p className="text-sm text-white/60 font-light">
                {trends.length > 1 ? (
                  <>Based on your history, you've been feeling <span className={cn("font-bold", moodConfig[trends[trends.length-1].mood]?.color)}>{moodConfig[trends[trends.length-1].mood]?.label}</span> lately.</>
                ) : (
                  "Keep tracking to unlock more personalized wellness insights."
                )}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
