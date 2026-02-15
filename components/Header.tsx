
import React from 'react';
import { Share2, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Share2 size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            SocialSense AI
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            <Zap size={14} className="text-amber-500 mr-1.5" />
            Powered by Gemini
          </div>
        </div>
      </div>
    </header>
  );
};
