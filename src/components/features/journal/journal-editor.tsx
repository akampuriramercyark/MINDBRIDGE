'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import { Book, Sparkles, RefreshCw } from 'lucide-react'

const prompts = [
  "What are three things you're grateful for today?",
  "What's one thing that made you smile recently?",
  "How are you feeling about your goals this week?",
  "Describe a challenge you faced and how you handled it.",
  "What's one thing you want to let go of?",
  "What does your ideal 'self-care' day look like?",
  "Who is someone that supports you, and how do they do it?",
]

export function JournalEditor() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const getRandomPrompt = () => {
    const remainingPrompts = prompts.filter(p => p !== currentPrompt)
    const random = remainingPrompts[Math.floor(Math.random() * remainingPrompts.length)]
    setCurrentPrompt(random)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content) return

    setLoading(true)
    try {
      const { error } = await (supabase.from('journals') as any).insert({
        user_id: user.id,
        title: title || 'Untitled Entry',
        content,
        is_private: true,
      })

      if (error) throw error
      
      setSuccess(true)
      setTitle('')
      setContent('')
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      console.error('Error saving journal:', error.message)
      alert('Failed to save journal entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-3xl glass shadow-2xl border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-lavender/20 flex items-center justify-center text-brand-lavender">
            <Book size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white">Private Journal</h2>
        </div>
        <button 
          onClick={getRandomPrompt}
          className="flex items-center gap-2 text-sm font-medium text-brand-lavender hover:text-white transition-colors"
        >
          <RefreshCw size={16} />
          New Prompt
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 relative group overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[140%] bg-brand-purple/5 rounded-full blur-3xl group-hover:bg-brand-purple/10 transition-all duration-700" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-brand-lavender mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Writing Prompt</span>
          </div>
          <p className="text-lg text-white font-medium italic">&quot;{currentPrompt}&quot;</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Today's reflection..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all min-h-[300px] resize-none leading-relaxed"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !content}
          className={cn(
            "w-full py-4 font-bold rounded-2xl transition-all transform shadow-xl",
            success 
              ? "bg-green-500 text-white" 
              : "bg-brand-purple hover:bg-brand-purple/90 text-white hover:scale-[1.02] shadow-brand-purple/20 disabled:opacity-50 disabled:hover:scale-100"
          )}
        >
          {loading ? 'Saving...' : success ? 'Entry Saved!' : 'Save Entry'}
        </button>
      </form>
    </div>
  )
}
