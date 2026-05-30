'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  animate?: boolean;
  delay?: number;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  dark = false,
  animate = false,
  delay = 0,
  hover = false
}) => {
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay }
  } : {};

  const hoverProps = hover && animate ? {
    whileHover: { y: -5, transition: { duration: 0.2 } }
  } : {};

  return (
    <Component
      {...animationProps}
      {...hoverProps}
      className={cn(
        dark ? 'glass-dark' : 'glass',
        'rounded-3xl p-6 transition-all duration-300',
        hover && !animate ? 'hover:-translate-y-1' : '',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
