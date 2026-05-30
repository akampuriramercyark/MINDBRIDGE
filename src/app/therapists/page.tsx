'use client'

import { ProtectedRoute } from '@/components/common/protected-route'
import Link from 'next/link'
import { TherapistCard } from '@/components/features/therapists/TherapistCard'
import { ArrowLeft, Search, Loader2, Heart, Filter, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getTherapists, Therapist } from '@/services/therapist-service'
import { motion, AnimatePresence } from 'framer-motion'

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true)
      const data = await getTherapists(searchQuery)
      setTherapists(data)
      setLoading(false)
    }

    const timer = setTimeout(() => {
      fetchTherapists()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy p-6 md:p-12 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-all group font-bold uppercase text-[10px] tracking-[0.2em]">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>

          <header className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple shadow-inner">
                <Heart size={24} fill="currentColor" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Discover <span className="text-gradient">Support.</span></h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/50 max-w-2xl leading-relaxed font-light"
            >
              Connect with vetted therapists and mental health coaches who understand the cultural and social context of Ugandan youth.
            </motion.p>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-16"
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-purple transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, specialty, or keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95">
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin text-brand-purple opacity-40" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-purple w-4 h-4" />
              </div>
              <p className="text-white/40 font-medium tracking-widest uppercase text-[10px]">Finding the right match for you...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {therapists.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {therapists.map((t, index) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TherapistCard 
                        name={t.full_name} 
                        specialty={t.specialization.join(', ')} 
                        image={t.avatar_url || undefined}
                        bio={t.bio || undefined}
                        isVerified={t.is_verified}
                        email={t.contact_email || undefined}
                        bookingUrl={t.booking_url || undefined}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32 glass rounded-[2.5rem] border border-white/5 bg-white/[0.02]"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="text-white/20" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No specialists found</h3>
                  <p className="text-white/40 max-w-sm mx-auto font-light mb-8">We couldn't find anyone matching your current search. Try different keywords or browse all profiles.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-brand-purple font-bold hover:underline underline-offset-8 decoration-2"
                  >
                    Clear search and try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <footer className="mt-32 p-10 md:p-16 rounded-[3rem] glass border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl font-bold">Are you a mental health professional?</h3>
              <p className="text-white/60 text-lg font-light max-w-xl">Join our network of compassionate experts and support the next generation of leaders in Uganda.</p>
            </div>
            <button className="relative z-10 px-10 py-5 bg-white text-brand-navy rounded-2xl font-bold text-lg hover:bg-brand-lavender transition-all shadow-xl active:scale-95 whitespace-nowrap">
              Apply to Join Network
            </button>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}
