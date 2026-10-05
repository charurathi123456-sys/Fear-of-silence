import React from 'react';
import { Bookmark, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeView: 'catalog' | 'reader' | 'keywords';
  onNavigate: (view: 'catalog' | 'reader' | 'keywords', filterCategory?: string) => void;
  savedCount: number;
  onOpenShelf: () => void;
  onOpenSilencePractice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  savedCount,
  onOpenShelf,
  onOpenSilencePractice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E7E0D3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('catalog')}
          className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-tight text-[#1C1917] group-hover:text-[#7A5C3E] transition-colors">
            Quietude
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans tracking-widest uppercase text-[#8C8275]">
            Journal of Silence
          </span>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#6B6255]">
          <button
            onClick={() => onNavigate('catalog')}
            className={`cursor-pointer transition-colors py-1 border-b ${
              activeView === 'catalog'
                ? 'text-[#1C1917] border-[#1C1917]'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#BFAF98]'
            }`}
          >
            The Folios
          </button>
          <button
            onClick={() => onNavigate('catalog', 'Clinical Anatomy')}
            className="cursor-pointer transition-colors py-1 border-b border-transparent hover:text-[#1C1917] hover:border-[#BFAF98]"
          >
            Clinical & Science
          </button>
          <button
            onClick={() => onNavigate('catalog', 'Cultural Habits')}
            className="cursor-pointer transition-colors py-1 border-b border-transparent hover:text-[#1C1917] hover:border-[#BFAF98]"
          >
            Acoustic Culture
          </button>
          <button
            onClick={() => onNavigate('keywords')}
            className={`cursor-pointer transition-colors py-1 border-b ${
              activeView === 'keywords'
                ? 'text-[#1C1917] border-[#1C1917]'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#BFAF98]'
            }`}
          >
            Search Matrix
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShelf}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-sans font-medium text-[#44403C] hover:text-[#1C1917] hover:bg-[#F2ECE1] rounded transition-colors cursor-pointer border border-[#E7E0D3]"
            title="View saved reading shelf"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shelf</span>
            {savedCount > 0 && (
              <span className="font-mono text-[10px] bg-[#292524] text-[#FBF9F5] px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSilencePractice}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-sans font-medium text-[#FBF9F5] bg-[#292524] hover:bg-[#44403C] rounded shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E7DEC8]" />
            <span>60s Chamber</span>
          </button>
        </div>
      </div>
    </header>
  );
};
