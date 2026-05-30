'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Mail, ExternalLink, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface TherapistProps {
  name: string
  specialty: string // Keep 'specialty' for backward compatibility with current usage
  bio?: string
  image?: string
  isVerified?: boolean
  email?: string
  bookingUrl?: string
  rating?: number
}

export function TherapistCard({
  name,
  specialty,
  bio = "Experienced professional dedicated to your mental well-being.",
  image,
  isVerified = true,
  email,
  bookingUrl = "#",
  rating = 4.8
}: TherapistProps) {
  return (
    <GlassCard 
      animate 
      hover 
      className="flex flex-col h-full hover:border-brand-purple/50 border border-white/5"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-brand-purple uppercase">{name[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white truncate">{name}</h3>
            {isVerified && <CheckCircle size={16} className="text-brand-purple shrink-0" />}
          </div>
          <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mt-1 truncate">
            {specialty}
          </p>
          <div className="flex items-center gap-1 mt-1 text-yellow-400">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold text-white/60">{rating}</span>
          </div>
        </div>
      </div>

      <p className="text-white/60 text-sm line-clamp-3 mb-6 flex-1 italic leading-relaxed">
        "{bio}"
      </p>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => email && (window.location.href = `mailto:${email}`)}
          className="text-xs py-2.5 h-auto rounded-xl border-white/10"
        >
          <Mail size={14} className="mr-2" />
          Email
        </Button>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => window.open(bookingUrl, '_blank')}
          className="text-xs py-2.5 h-auto rounded-xl"
        >
          <ExternalLink size={14} className="mr-2" />
          Book
        </Button>
      </div>
    </GlassCard>
  )
}

export default TherapistCard;
