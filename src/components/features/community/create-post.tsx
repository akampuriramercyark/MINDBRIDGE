'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { moderateContent, detectCrisis } from '@/services/ai-service'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Send, Eye, EyeOff, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const categories = ['Anxiety', 'Relationship', 'Career', 'General', 'Hope', 'Identity']

export function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('General')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setLoading(true)
    try {
      // 1. Crisis Check
      if (detectCrisis(content.trim())) {
        alert("I'm concerned about what you shared. Please reach out for support using the resources in our footer or the Crisis Support section. We cannot allow posts that suggest self-harm in the community for safety reasons.")
        setLoading(false)
        return
      }

      // 2. AI Moderation
      const moderation = await moderateContent(content.trim())
      if (!moderation.isSafe) {
        alert(`Your post could not be shared: ${moderation.reason || 'It violates our community guidelines.'}`)
        setLoading(false)
        return
      }

      const { error } = await (supabase.from('community_posts') as any).insert({
        author_id: user.id,
        content: content.trim(),
        category,
        is_anonymous: isAnonymous,
      })
      if (error) throw error
      setContent('')
      onPostCreated()
    } catch (error: any) {
      console.error('Error creating post:', error.message)
      alert('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-6 mb-8 border-brand-purple/30 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 text-brand-purple/20 group-hover:text-brand-purple/40 transition-colors pointer-events-none">
          <Sparkles size={48} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
              Select a Topic
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold transition-all border",
                    category === cat
                      ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-brand-purple/20"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your heart today?"
            className="w-full px-5 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple/30 transition-all min-h-[140px] resize-none text-[15px] leading-relaxed shadow-inner"
            required
          />
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all text-sm font-medium",
                isAnonymous
                  ? "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              )}
            >
              {isAnonymous ? <EyeOff size={18} /> : <Eye size={18} />}
              {isAnonymous ? 'Posting Anonymously' : 'Posting Publicly'}
            </button>
            <Button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-8"
              size="lg"
            >
              {loading ? 'Sharing...' : (
                <div className="flex items-center gap-2">
                  <span>Share Story</span>
                  <Send size={18} />
                </div>
              )}
            </Button>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  )
}
