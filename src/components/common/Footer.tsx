import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-lavender to-brand-blue rounded-lg flex items-center justify-center font-bold text-brand-navy">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Harmony Hub</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Empowering African youth with AI-driven emotional support and wellness tools. 
            You don't have to carry it all alone.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white">Product</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">AI Companion</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mood Tracker</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white">Company</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white">Connect</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">WhatsApp Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© 2024 Harmony Hub. All rights reserved.</p>
        <div className="flex gap-8">
          <p>Made with 💜 for Uganda</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
