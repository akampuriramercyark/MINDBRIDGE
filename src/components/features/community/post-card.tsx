'use client'

import React, { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { MessageCircle, Heart, Share2, MoreHorizontal, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { CommentSection } from './comment-section'
import { motion, AnimatePresence } from 'framer-motion'

interface PostCardProps {
  post: {
    id: string
    content: string
    category: string
    is_anonymous: boolean
    likes_count: number
    created_at: string
    profiles?: {
      username: string | null
      avatar_url: string | null
    }
  }
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="p-6 mb-6 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner">
              {post.is_anonymous || !post.profiles?.avatar_url ? (
                <User size={20} className="text-brand-purple" />
              ) : (
                <img src={post.profiles.avatar_url} alt="avatar" className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {post.is_anonymous ? 'Anonymous Soul' : post.profiles?.username || 'User'}
              </h4>
              <span className="text-white/40 text-[11px] font-medium">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-brand-blue font-bold">
              {post.category}
            </span>
            <button className="text-white/20 hover:text-white transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <p className="text-white/80 leading-relaxed mb-6 text-[15px] relative z-10">
          {post.content}
        </p>

        <div className="flex items-center gap-6 pt-4 border-t border-white/5 relative z-10">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg",
              liked ? "text-brand-purple bg-brand-purple/10" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <Heart size={18} className={liked ? "fill-brand-purple" : ""} />
            <span>{likesCount}</span>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowComments(!showComments)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg",
              showComments ? "text-brand-purple bg-brand-purple/10" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <MessageCircle size={18} />
            <span>Reply</span>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ml-auto"
          >
            <Share2 size={18} />
          </motion.button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <CommentSection postId={post.id} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}
