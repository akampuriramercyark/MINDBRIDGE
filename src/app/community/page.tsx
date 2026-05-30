'use client'

import React from 'react'
import { PostFeed } from '@/components/features/community/post-feed'
import { ProtectedRoute } from '@/components/common/protected-route'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'

export default function CommunityPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy p-6 md:p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Users size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Community Space</h1>
            </div>
            <p className="text-xl text-brand-blue max-w-2xl">
              You are not alone. Share your experiences, encourage others, and find support in our safe, anonymous space.
            </p>
          </header>

          <PostFeed />
        </div>
      </div>
    </ProtectedRoute>
  )
}
