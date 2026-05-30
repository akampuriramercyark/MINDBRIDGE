'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Community', href: '#community' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-xl border transition-all duration-700 ${
            isScrolled
              ? 'bg-brand-navy/80 border-white/10 shadow-2xl scale-[0.98]'
              : 'bg-white/10 border-white/20 shadow-lg'
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-purple to-brand-blue rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MindBridge</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-widest font-bold text-white/70">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-purple transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-white/70 hover:text-white transition-colors hidden sm:block">
              Login
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="hidden sm:flex px-6">
                Get Started
              </Button>
            </Link>
            <button 
              className="md:hidden text-white cursor-pointer p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden mt-4 mx-4 pointer-events-auto"
          >
            <div className="glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-brand-navy/90 backdrop-blur-2xl">
              <div className="flex flex-col p-10 gap-8 text-center">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    className="text-xl font-bold text-white/80 hover:text-brand-purple transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 pt-4"
                >
                  <hr className="border-white/5" />
                  <Link
                    href="/login"
                    className="block text-white/60 font-bold uppercase tracking-widest text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full py-5 text-lg shadow-2xl">Get Started Free</Button>
                  </Link>
                </motion.div>
              </div>
              <div className="bg-white/5 p-4 flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-brand-purple" />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Your Safe Space</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
