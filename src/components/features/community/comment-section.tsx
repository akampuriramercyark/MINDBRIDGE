'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { moderateContent, detectCrisis } from '@/services/ai-service'
import { formatDistanceToNow } from 'date-fns'
import { Send, Loader2, User, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [reportedComments, setReportedComments] = useState<string[]>([])

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('community_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (error: any) {
      console.error('Error fetching comments:', error.message)
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleReportComment = async (commentId: string) => {
    if (!user) return
    try {
      const { error } = await (supabase
        .from('moderation_reports') as any)
        .insert({
          reporter_id: user.id,
          comment_id: commentId,
          reason: 'Inappropriate Comment'
        })
      
      if (error) throw error
      setReportedComments([...reportedComments, commentId])
    } catch (error: any) {
      console.error('Error reporting comment:', error.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setSubmitting(true)
    try {
      // 1. Crisis Check
      if (detectCrisis(content.trim())) {
        alert("I'm concerned about what you shared. Please reach out for support using the resources in our footer or the Crisis Support section. We cannot allow comments that suggest self-harm for safety reasons.")
        setSubmitting(false)
        return
      }

      // 2. AI Moderation
      const moderation = await moderateContent(content.trim())
      if (!moderation.isSafe) {
        alert(`Your comment could not be shared: ${moderation.reason || 'It violates our community guidelines.'}`)
        setSubmitting(false)
        return
      }

      const { error } = await (supabase.from('community_comments') as any).insert({
        post_id: postId,
        author_id: user.id,
        content: content.trim(),
        is_anonymous: true, // Default to anonymous for now
      })
      if (error) throw error
      setContent('')
      fetchComments()
    } catch (error: any) {
      console.error('Error adding comment:', error.message)
      alert('Failed to add comment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-4 pt-6 border-t border-white/10 space-y-5">
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-brand-purple/50" />
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={comment.id}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-brand-blue" />
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 group relative">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-white/90">Anonymous</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/30 font-medium">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                    <button 
                      onClick={() => handleReportComment(comment.id)}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        reportedComments.includes(comment.id) ? "text-red-400 opacity-100" : "text-white/20 hover:text-white"
                      )}
                      disabled={reportedComments.includes(comment.id)}
                    >
                      <ShieldAlert size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-[13px] text-white/70 leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
          {comments.length === 0 && (
            <div className="text-center py-4">
              <p className="text-white/20 text-xs italic">No replies yet. Be the first to offer support.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-3 pt-3">
            <div className="flex-1 relative">
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Offer some encouragement..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple/30 transition-all shadow-inner"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={submitting || !content.trim()}
              className="w-12 h-12 rounded-xl bg-brand-purple flex items-center justify-center text-white disabled:opacity-50 transition-all shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
            </motion.button>
          </form>
        </div>
      )}
    </div>
  )
}
