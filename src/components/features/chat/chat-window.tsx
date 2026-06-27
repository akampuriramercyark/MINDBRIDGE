'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { type UIMessage as Message } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  sessionId: string;
  initialMessages?: Message[];
}

export default function ChatWindow({ sessionId, initialMessages = [] }: ChatWindowProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = (useChat as any)({
    api: '/api/chat',
    body: { sessionId },
    initialMessages,
    onResponse: (response: Response) => {
      if (!response.ok) {
        console.error('Chat error response:', response);
      }
    },
    onError: (err: Error) => {
      console.error('Chat error:', err);
    }
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[650px] w-full max-w-2xl mx-auto glass border border-white/10 shadow-2xl rounded-[2rem] overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-purple/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="p-5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-white font-bold shadow-lg">
              S
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-brand-navy shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-tight">Sanyu AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Active Now</p>
            </div>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
          End-to-End Encrypted
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide scroll-smooth"
      >
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
            <Lock size={10} className="text-brand-purple" />
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">End-to-End Encrypted & Private</span>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                <Sparkles className="text-brand-purple/40" size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-sm font-medium italic">&quot;Osiibye otya? (How has your day been?)&quot;</p>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Start a conversation with Sanyu</p>
              </div>
            </motion.div>
          )}
          {messages.map((m: any) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-end gap-3",
                m.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0 border border-brand-purple/10">
                  <Sparkles size={14} />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm relative group",
                  m.role === 'user'
                    ? 'bg-brand-purple text-white rounded-br-none'
                    : 'bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 rounded-bl-none'
                )}
              >
                {m.content}
                <div className={cn(
                  "absolute bottom-[-18px] opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold text-white/20 uppercase tracking-widest",
                  m.role === 'user' ? 'right-0' : 'left-0'
                )}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 shrink-0 border border-white/10">
                  <User size={14} />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0 border border-brand-purple/10 animate-pulse">
                <Sparkles size={14} />
              </div>
              <div className="bg-white/5 text-white/40 rounded-2xl px-5 py-3 text-xs italic flex items-center gap-2">
                Sanyu is reflecting
                <span className="flex gap-1">
                  <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Section */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <form 
          onSubmit={handleSubmit} 
          className="relative flex items-center"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Tell me what's on your heart..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:bg-white/[0.07] transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 bg-brand-purple text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-brand-purple/20"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-center text-[10px] text-white/20 mt-4 font-medium uppercase tracking-[0.1em]">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}
