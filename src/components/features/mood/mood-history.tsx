'use client'

import { useEffect, useState } from 'react'
import { getMoodTrends } from '@/services/wellness-service'
import { useAuth } from '@/context/auth-context'
import { Smile, Sun, Meh, CloudRain, Angry, Zap, Heart, Loader2, Calendar, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'

const moodConfig: Record<string, { icon: any, color: string, label: string, bg: string }> = {
  happy: { icon: Smile, color: 'text-yellow-400', label: 'Happy', bg: 'bg-yellow-400/10' },
  calm: { icon: Sun, color: 'text-blue-300', label: 'Calm', bg: 'bg-blue-300/10' },
  neutral: { icon: Meh, color: 'text-gray-400', label: 'Meh', bg: 'bg-gray-400/10' },
  sad: { icon: CloudRain, color: 'text-indigo-400', label: 'Sad', bg: 'bg-indigo-400/10' },
  angry: { icon: Angry, color: 'text-red-400', label: 'Angry', bg: 'bg-red-400/10' },
  anxious: { icon: Zap, color: 'text-orange-400', label: 'Anxious', bg: 'bg-orange-400/10' },
  loved: { icon: Heart, color: 'text-pink-400', label: 'Loved', bg: 'bg-pink-400/10' },
}

export const MoodHistory = () => {
  const { user } = useAuth()
  const [trends, setTrends] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchTrends = async () => {
        const data = await getMoodTrends(user.id)
        setTrends(data.reverse()) // Show newest first
        setLoading(false)
      }
      fetchTrends()
    }
  }, [user])

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-brand-purple/50" />
      <p className="text-white/40 text-sm font-medium">Loading your journey...</p>
    </div>
  )

  if (trends.length === 0) return (
    <GlassCard className="p-12 text-center border-dashed border-white/10">
      <p className="text-white/40 text-lg italic">No mood logs yet.</p>
      <p className="text-white/20 text-sm mt-2">Start tracking how you feel above.</p>
    </GlassCard>
  )

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white tracking-tight">Recent History</h3>
        <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">{trends.length} Entries</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((log, i) => {
          const config = moodConfig[log.mood] || moodConfig.neutral
          const Icon = config.icon
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <GlassCard className="p-6 hover:border-white/20 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", config.bg)}>
                      <Icon className={config.color} size={28} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{config.label}</div>
                      <div className="text-white/40 text-xs flex items-center gap-1.5 font-medium">
                        <Calendar size={12} />
                        {new Date(log.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-white/10 group-hover:text-brand-purple/20 transition-colors">#{trends.length - i}</span>
                    <div className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-brand-blue uppercase">Int: {log.intensity}</div>
                  </div>
                </div>

                {log.note && (
                  <div className="relative pl-4 border-l-2 border-white/5 group-hover:border-brand-purple/30 transition-colors">
                    <MessageSquare size={12} className="absolute -left-1.5 -top-3 text-white/10 group-hover:text-brand-purple/30" />
                    <p className="text-[13px] text-white/60 italic leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors">
                      &quot;{log.note}&quot;
                    </p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
