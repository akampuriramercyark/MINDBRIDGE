'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-brand-blue/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center animate-pulse shadow-2xl mb-8">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-purple animate-progress" />
            </div>
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Authenticating</span>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
