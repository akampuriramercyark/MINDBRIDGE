import { AuthForm } from '@/components/features/auth/auth-form'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center shadow-lg shadow-brand-purple/20">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">MindBridge</span>
        </Link>

        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
