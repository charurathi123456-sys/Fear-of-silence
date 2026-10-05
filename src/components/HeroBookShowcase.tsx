import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '../types/article';
import { HumanImage } from './HumanImage';

interface HeroBookShowcaseProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onOpenPractice: () => void;
}

export const HeroBookShowcase: React.FC<HeroBookShowcaseProps> = ({
  articles,
  onOpenArticle,
  onOpenPractice,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const currentFolio = articles[activePageIndex] || articles[0];

  const handleNextPage = () => {
    setActivePageIndex((prev) => (prev + 1) % articles.length);
  };

  const handlePrevPage = () => {
    setActivePageIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  return (
    <div className="relative mb-20 bg-gradient-to-b from-[#F7F4EC] to-[#EFE7D8] border border-[#DDD5C5] rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden book-shadow">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D8CEBD]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C4B7A2]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Monograph Intro & Masthead */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5]/90 border border-[#C4B7A2] rounded-full text-xs font-mono tracking-widest uppercase text-[#7A5C3E]">
            <Sparkles className="w-3.5 h-3.5 text-[#936B45]" />
            <span>Volume VII · Edition on Sedatephobia</span>
          </div>

          <h1
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1917] tracking-tight leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            The Unspoken Void: Why Silence Terrifies Modern Minds
          </h1>

          <p className="font-reading text-base sm:text-lg text-[#4A443B] leading-relaxed max-w-xl">
            A curatorial collection of 10 illustrated folios examining why the absence of noise unleashes physiological panic, why our bedrooms run on synthetic white noise, and how to reclaim unhurried stillness.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenArticle(currentFolio)}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#292524] text-[#FBF9F5] hover:bg-[#44403C] rounded-xl font-medium text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>Read Folio {currentFolio.chapterNumber}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenPractice}
              className="flex items-center gap-2 px-5 py-3.5 bg-[#FCFAF6] hover:bg-[#FAF6EE] border border-[#C4B7A2] hover:border-[#936B45] text-[#332E27] rounded-xl font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#936B45]" />
              <span>Enter 60s Chamber</span>
            </button>
          </div>

          {/* Micro-Curator Quote */}
          <div className="pt-6 border-t border-[#DDD5C5]/80 flex items-center gap-4 text-xs text-[#6B6255]">
            <div className="w-10 h-10 rounded-full bg-[#E5DCcb] flex items-center justify-center font-editorial font-bold text-sm text-[#443F37] shrink-0 border border-[#DDD5C5]">
              Q
            </div>
            <div>
              <p className="font-editorial italic text-sm text-[#292524]">
                "Silence is not an empty room; it is an open mirror."
              </p>
              <p className="font-mono text-[11px] text-[#8C8275]">
                Quietude Editorial Archives · 10 Curated Chapters
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Physical 3D-feel Book Object with Interactive Flip */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onClick={() => onOpenArticle(currentFolio)}
            className="group relative w-full max-w-sm cursor-pointer perspective-1000 transform transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Hardcover Outer Frame */}
            <div className="relative bg-[#FCFAF6] border-2 border-[#D8CEBD] rounded-r-2xl rounded-l-md shadow-2xl p-5 overflow-hidden">
              {/* Embossed Left Book Spine Gutter */}
              <div className="absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-[#C4B7A2] via-[#E2D8C7] to-[#FAF8F5] border-r border-[#C4B7A2]/40" />

              {/* Gold Ribbon Bookmark */}
              <div className="absolute top-0 right-8 w-5 h-12 bg-[#936B45] shadow-md flex items-end justify-center pb-1 z-20">
                <div className="w-0 h-0 border-x-2.5 border-x-transparent border-t-3 border-t-[#FCFAF6]" />
              </div>

              {/* Cover Plate / Human Photo with SEO metadata */}
              <div className="ml-3 rounded-lg overflow-hidden border border-[#D8CEBD] bg-[#EDE5D5] shadow-inner">
                <div className="h-56 sm:h-64 relative">
                  <HumanImage
                    src={currentFolio.image.url}
                    alt={currentFolio.image.alt}
                    folioId={currentFolio.id}
                    className="w-full h-full"
                    imageClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono uppercase tracking-widest text-[#FBF9F5] drop-shadow-md">
                    FOLIO {currentFolio.chapterNumber} · {currentFolio.chapterCategory}
                  </div>
                </div>

                {/* Debossed Monograph Typography */}
                <div className="p-4 bg-[#FAF7F0] border-t border-[#D8CEBD]">
                  <h3 className="font-editorial text-lg text-[#1C1917] leading-tight mb-1 line-clamp-2">
                    {currentFolio.title}
                  </h3>
                  <p className="font-reading text-xs text-[#5C5346] line-clamp-2 mb-3">
                    {currentFolio.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7062] pt-2 border-t border-[#EAE3D6]">
                    <span>{currentFolio.readTime}</span>
                    <span className="text-[#936B45] group-hover:underline flex items-center gap-1 font-sans">
                      Open Book <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Realistic Deckle Edge Pages Stack on Right */}
              <div className="absolute top-2 bottom-2 -right-1.5 w-1.5 bg-gradient-to-r from-[#EDE5D5] to-[#D8CEBD] rounded-r border-y border-r border-[#C4B7A2]/60" />
            </div>
          </div>

          {/* Interactive Cover Carousel Controls */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handlePrevPage}
              className="p-2 bg-[#FCFAF6] hover:bg-[#FAF6EE] border border-[#C4B7A2] rounded-full text-[#443F37] transition-colors cursor-pointer"
              title="Previous Folio Cover"
              aria-label="Previous Folio"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-[#6B6255]">
              Folio {currentFolio.chapterNumber} of {articles.length.toString().padStart(2, '0')}
            </span>

            <button
              onClick={handleNextPage}
              className="p-2 bg-[#FCFAF6] hover:bg-[#FAF6EE] border border-[#C4B7A2] rounded-full text-[#443F37] transition-colors cursor-pointer"
              title="Next Folio Cover"
              aria-label="Next Folio"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
