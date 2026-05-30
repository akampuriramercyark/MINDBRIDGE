'use client'

import React from 'react'
import { JournalEditor } from '@/components/features/journal/journal-editor'
import { JournalHistory } from '@/components/features/journal/journal-history'
import { ProtectedRoute } from '@/components/common/protected-route'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function JournalPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy p-6 md:p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Guided Journaling</h1>
            <p className="text-xl text-brand-blue">
              Your thoughts deserve a safe space. Reflect, grow, and heal through private journaling.
            </p>
          </header>

          <div className="space-y-12">
            <JournalEditor />
            <JournalHistory />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
