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
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function getOrCreateSession() {
      if (!user) return

      try {
        const { data, error } = await (supabase
          .from('chat_sessions')
          .select('id')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1) as any)

        if (error) {
          console.error('Error fetching session:', error)
          setErrorMsg(`Database error: ${error.message}`)
          setLoading(false)
          return
        }

        const sessions = data as { id: string }[] | null

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
            setErrorMsg(`Failed to create session: ${createError.message}`)
          } else {
            setSessionId(newSession.id)
          }
          setLoading(false)
        }
      } catch (err: any) {
        setErrorMsg(`Unexpected error: ${err.message}`)
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
            <h1 className="text-2xl font-bold">Harmony Hub AI</h1>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          {loading ? (
            <div className="text-white/40 animate-pulse text-center">
              <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Initializing Sanyu...
            </div>
          ) : sessionId ? (
            <ChatWindow sessionId={sessionId} />
          ) : (
            <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-400 font-bold mb-2">Connection Error</p>
              <p className="text-red-300/70 text-sm mb-4">{errorMsg || "Failed to initialize chat session."}</p>
              <div className="flex flex-col gap-3 items-center">
                <button 
                  onClick={() => setSessionId("bypass-session-" + Date.now())}
                  className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-xl transition-all text-xs font-bold"
                >
                  Start Chat Anyway (Bypass DB)
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-white/40 hover:text-white/60 transition-all text-[10px] underline"
                >
                  Try Database Again
                </button>
              </div>
            </div>
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
