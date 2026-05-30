'use client'

import { ProtectedRoute } from '@/components/common/protected-route'
import { useAuth } from '@/context/auth-context'
import ChatWindow from '@/components/features/chat/chat-window'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ChevronLeft, MessageCircle } from 'lucide-react'

export default function AIChatPage() {
  const { user } = useAuth()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getOrCreateSession() {
      if (!user) return

      const { data, error } = await (supabase
        .from('chat_sessions')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1) as any)

      const sessions = data as { id: string }[] | null

      if (error) {
        console.error('Error fetching session:', error)
      }

      if (sessions && sessions.length > 0) {
        setSessionId(sessions[0].id)
        setLoading(false)
      } else {
        const { data: newSession, error: createError } = await (supabase
          .from('chat_sessions')
          .insert({
            user_id: user.id,
            title: 'Wellness Conversation'
          } as any)
          .select()
          .single() as any)

        if (createError) {
          console.error('Error creating session:', createError)
        } else {
          setSessionId(newSession.id)
        }
        setLoading(false)
      }
    }

    getOrCreateSession()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy text-white flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center px-8 gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
              <MessageCircle size={24} />
            </div>
            <h1 className="text-2xl font-bold">MindBridge AI</h1>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          {loading ? (
            <div className="text-white/40 animate-pulse">Initializing Sanyu...</div>
          ) : sessionId ? (
            <ChatWindow sessionId={sessionId} />
          ) : (
            <div className="text-red-400">Failed to initialize chat session. Please try again.</div>
          )}
          
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 w-full">
            <h4 className="text-sm font-semibold mb-2 text-brand-lavender">Important Reminder</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Sanyu is an AI wellness companion, not a clinical therapist. If you are in immediate danger or having thoughts of self-harm, please reach out to Butabika Hospital (+256 414 504388) or Mental Health Uganda (0800 21 21 21) immediately.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
