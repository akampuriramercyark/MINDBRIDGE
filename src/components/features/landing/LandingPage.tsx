import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/features/landing/HeroSection';
import { FeatureSection } from '@/components/features/landing/FeatureSection';
import { HowItWorks } from '@/components/features/landing/HowItWorks';
import { FAQ } from '@/components/features/landing/FAQ';
import { Footer } from '@/components/common/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-navy text-white selection:bg-brand-blue/30 overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Statistics Section */}
        <div className="bg-brand-navy border-y border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient">85%</div>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Stress Reduction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">24/7</div>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">AI Availability</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">100%</div>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Secure & Private</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">10k+</div>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Youth Supported</p>
            </div>
          </div>
        </div>
        
        <FeatureSection />
        <HowItWorks />
        <FAQ />
        
        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-lavender/10 rounded-full blur-[100px] -ml-32 -mb-32" />
             
             <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to feel <br /><span className="text-gradient">lighter?</span></h2>
             <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
               Join thousands of young people across Uganda who are finding peace, 
               clarity, and support with MindBridge.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-brand-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-lavender transition-all cursor-pointer shadow-xl">
                   Get Started Free
                </button>
                <button className="glass text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all cursor-pointer">
                   Talk to AI Now
                </button>
             </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
