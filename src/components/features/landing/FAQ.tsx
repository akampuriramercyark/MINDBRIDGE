'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is Harmony Hub really anonymous?",
    answer: "Yes. In our community spaces, your identity is completely hidden. Your AI conversations are private and encrypted. We prioritize your emotional safety above all else."
  },
  {
    question: "How does the AI Companion work?",
    answer: "Our AI, Sanyu, is trained in supportive communication and emotional grounding techniques. It doesn't replace a therapist, but it's available 24/7 to listen, provide coping strategies, and help you navigate your feelings."
  },
  {
    question: "Is Harmony Hub free to use?",
    answer: "We offer a generous free tier that includes AI support and community access. Premium features like advanced analytics and direct professional discovery may have associated costs."
  },
  {
    question: "What happens in a crisis?",
    answer: "Harmony Hub is not a crisis service. If you are in immediate danger, our system will detect certain keywords and immediately provide you with local Ugandan emergency contacts and professional help redirects."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 bg-brand-navy/30">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Common <span className="text-gradient">Questions.</span></h2>
          <p className="text-white/60 font-light">Everything you need to know about Harmony Hub.</p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <GlassCard 
              key={index} 
              className="cursor-pointer transition-all duration-300 overflow-hidden border border-white/5"
              dark={openIndex === index}
            >
              <div 
                className="flex items-center justify-between py-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold pr-8 text-white">{faq.question}</h3>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-brand-blue"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <p className="text-white/70 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
