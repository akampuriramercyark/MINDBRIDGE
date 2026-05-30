'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { PostCard } from './post-card'
import { CreatePost } from './create-post'
import { Loader2, Filter, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'

const categories = ['All', 'Anxiety', 'Relationship', 'Career', 'General', 'Hope', 'Identity']

export function PostFeed() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
      
      if (activeCategory !== 'All') {
        query = query.eq('category', activeCategory)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      console.error('Error fetching posts:', error.message)
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <CreatePost onPostCreated={fetchPosts} />

      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center gap-2 pb-2">
          <Filter size={16} className="text-white/40 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-brand-blue/20 border-brand-blue text-brand-blue"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-brand-blue space-y-4">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-medium text-white/60">Gathering stories...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <GlassCard className="text-center py-20 border-dashed border-white/10 bg-white/[0.02]">
          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="text-brand-blue/40" size={32} />
          </div>
          <p className="text-white/60 text-lg font-medium italic">No stories here yet.</p>
          <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">Your voice matters. Be the first to share your experience and light the way for others.</p>
        </GlassCard>
      )}
    </div>
  )
}
