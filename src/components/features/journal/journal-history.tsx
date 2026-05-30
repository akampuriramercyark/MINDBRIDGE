'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { Book, Loader2, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

export const JournalHistory = () => {
  const { user } = useAuth()
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchEntries = async () => {
        const { data, error } = await supabase
          .from('journals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)
        
        if (!error) setEntries(data || [])
        setLoading(false)
      }
      fetchEntries()
    }
  }, [user])

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-purple" /></div>

  if (entries.length === 0) return (
    <GlassCard className="p-12 text-center border-dashed border-white/10 bg-white/[0.02]">
      <div className="w-16 h-16 bg-brand-lavender/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Book className="text-brand-lavender/40" size={32} />
      </div>
      <p className="text-white/60 text-lg font-medium italic">Your story begins here.</p>
      <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">Write your first reflection above. Every word is a step towards understanding yourself better.</p>
    </GlassCard>
  )

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Past Entries</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entries.map((entry) => (
          <div key={entry.id} className="p-6 rounded-3xl glass border border-white/10 hover:border-brand-purple/30 transition-all bg-white/5">
            <div className="flex items-center gap-2 text-white/40 text-xs mb-3">
              <Calendar size={14} />
              {new Date(entry.created_at).toLocaleDateString()}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{entry.title}</h4>
            <p className="text-white/60 text-sm line-clamp-3">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
