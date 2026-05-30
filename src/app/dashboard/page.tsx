'use client'

import { ProtectedRoute } from '@/components/common/protected-route'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import { WellnessInsights } from '@/components/features/dashboard/WellnessInsights'
import { DynamicEncouragement } from '@/components/features/wellness/DynamicEncouragement'
import { WellnessNotifications } from '@/components/features/wellness/WellnessNotifications'
import {
  MessageCircle,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Users,
  Heart,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'AI Chat', icon: MessageCircle, href: '/ai-chat' },
    { name: 'Journal', icon: BookOpen, href: '/journal' },
    { name: 'Mood Tracker', icon: TrendingUp, href: '/mood' },
    { name: 'Wellness Toolkit', icon: Sparkles, href: '/wellness' },
    { name: 'Community', icon: Users, href: '/community' },
    { name: 'Therapists', icon: Heart, href: '/therapists' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy flex text-white overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 hidden lg:flex flex-col p-6 h-screen sticky top-0">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">MindBridge</span>
          </Link>

          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white group"
              >
                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-red-400 group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-brand-navy/50 relative">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Header */}
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-brand-navy/80 backdrop-blur-md sticky top-0 z-20">
            <h1 className="text-2xl font-bold">Welcome back, {user?.email?.split('@')[0]}</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center shadow-inner">
                <span className="text-brand-purple font-bold uppercase">{user?.email?.[0]}</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-8 space-y-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions / Cards */}
              <div className="p-6 rounded-3xl glass border border-white/10 space-y-4 hover:border-brand-purple/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold">Talk to AI</h3>
                <p className="text-white/60">Need someone to listen? MindBridge AI is here for you 24/7.</p>
                <Link href="/ai-chat" className="inline-block text-brand-purple font-semibold hover:underline">Start Chatting →</Link>
              </div>

              <div className="p-6 rounded-3xl glass border border-white/10 space-y-4 hover:border-brand-blue/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold">How are you feeling?</h3>
                <p className="text-white/60">Track your mood and see your emotional trends over time.</p>
                <Link href="/mood" className="inline-block text-brand-blue font-semibold hover:underline">Log Mood →</Link>
              </div>
            </div>

            <DynamicEncouragement />

            <WellnessNotifications />

            {/* Dashboard Insights Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-brand-purple" size={24} />
                Your Wellness Journey
              </h2>
              <WellnessInsights />
            </section>

            {/* Other Actions Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/journal" className="p-6 rounded-3xl glass border border-white/10 flex flex-col items-center text-center space-y-3 hover:bg-white/5 transition-all group">
                <div className="p-4 rounded-2xl bg-brand-lavender/10 text-brand-lavender group-hover:bg-brand-lavender/20 transition-colors">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-bold">Journal</h3>
              </Link>

              <Link href="/wellness" className="p-6 rounded-3xl glass border border-white/10 flex flex-col items-center text-center space-y-3 hover:bg-white/5 transition-all group">
                <div className="p-4 rounded-2xl bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple/20 transition-colors">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold">Toolkit</h3>
              </Link>

              <Link href="/community" className="p-6 rounded-3xl glass border border-white/10 flex flex-col items-center text-center space-y-3 hover:bg-white/5 transition-all group">
                <div className="p-4 rounded-2xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20 transition-colors">
                  <Users size={24} />
                </div>
                <h3 className="font-bold">Community</h3>
              </Link>

              <Link href="/therapists" className="p-6 rounded-3xl glass border border-white/10 flex flex-col items-center text-center space-y-3 hover:bg-white/5 transition-all group">
                <div className="p-4 rounded-2xl bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple/20 transition-colors">
                  <Heart size={24} />
                </div>
                <h3 className="font-bold">Therapists</h3>
              </Link>
            </section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
