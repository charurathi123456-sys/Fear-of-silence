import React from 'react';
import { Bookmark, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types/article';
import { HumanImage } from './HumanImage';

interface BookCardProps {
  article: Article;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenArticle: (article: Article) => void;
  isFeatured?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  article,
  isSaved,
  onToggleSave,
  onOpenArticle,
  isFeatured = false,
}) => {
  return (
    <article
      onClick={() => onOpenArticle(article)}
      className={`group relative flex flex-col justify-between bg-[#FCFAF6] hover:bg-[#FFFDF9] border border-[#E7E0D3] hover:border-[#C4B7A2] rounded-xl transition-all duration-300 cursor-pointer overflow-hidden book-shadow hover:-translate-y-1 ${
        isFeatured
          ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#FAF7F0] to-[#F5EFE4]'
          : ''
      }`}
    >
      {/* Decorative Book Spine Stitch / Left Margin */}
      <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#D8CEBD] group-hover:bg-[#936B45] transition-colors z-10" />

      {/* Real Humanized Image Banner with SEO Alt Tags */}
      <div className={`relative overflow-hidden bg-[#EDE5D5] ${isFeatured ? 'h-64 sm:h-76' : 'h-52'}`}>
        <HumanImage
          src={article.image.url}
          alt={article.image.alt}
          folioId={article.id}
          className="w-full h-full"
          imageClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Subtle Paper Scrim & Bookplate Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF6] via-transparent to-black/20 opacity-80" />

        {/* Floating Folio Badge */}
        <div className="absolute top-3 left-5 z-10 bg-[#FAF8F5]/95 backdrop-blur-xs px-2.5 py-1 rounded border border-[#DDD5C5] text-[10px] font-mono tracking-widest uppercase text-[#523F2B] shadow-xs">
          FOLIO {article.chapterNumber}
        </div>

        {/* Bookmark ribbon */}
        <button
          onClick={(e) => onToggleSave(article.id, e)}
          className={`absolute top-3 right-4 z-10 p-2 rounded-full backdrop-blur-xs transition-colors focus:outline-none ${
            isSaved
              ? 'bg-[#936B45] text-white shadow-sm'
              : 'bg-[#FAF8F5]/85 text-[#736A5E] hover:text-[#292524] hover:bg-[#FAF8F5]'
          }`}
          title={isSaved ? 'Remove from Reading Shelf' : 'Save to Reading Shelf'}
          aria-label={isSaved ? 'Bookmarked' : 'Bookmark'}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={`flex flex-col justify-between flex-1 ${isFeatured ? 'p-7 lg:p-9' : 'p-6'}`}>
        <div>
          {/* Category kicker */}
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#8C8275] mb-2 font-mono">
            <span>{article.chapterCategory}</span>
            <span aria-hidden="true" className="text-[#C4B7A2]">·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Title */}
          <h3
            className={`font-editorial font-medium text-[#1C1917] group-hover:text-[#7A5C3E] transition-colors leading-tight mb-3 ${
              isFeatured
                ? 'text-2xl sm:text-3xl lg:text-4xl max-w-3xl'
                : 'text-xl sm:text-2xl'
            }`}
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p
            className={`font-reading text-[#4A443B] leading-relaxed mb-5 ${
              isFeatured ? 'text-base sm:text-lg line-clamp-3 sm:line-clamp-4' : 'text-sm sm:text-base line-clamp-3'
            }`}
          >
            {article.excerpt}
          </p>

          {/* Primary Search Query Callout */}
          <div className="mb-5 py-2 px-3 bg-[#F4EFE6] border-l-2 border-[#936B45] rounded-r text-xs text-[#5C5346]">
            <span className="font-medium text-[#2C2621]">Top Search Intent: </span>
            <span className="italic">"{article.primarySearchQuery}"</span>
          </div>
        </div>

        {/* Footer Metadata */}
        <div>
          {/* Subtle SEO keywords preview (unboxed text discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#857B6E] mb-4">
            <span className="text-[#A39889]">Search terms:</span>
            {article.seoKeywords.slice(0, 3).map((kw, i) => (
              <React.Fragment key={kw}>
                <span className="font-sans hover:text-[#292524]">#{kw}</span>
                {i < 2 && <span aria-hidden="true" className="text-[#C4B7A2]">·</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between text-xs text-[#736A5E]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#3D372F]">{article.author.name}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <div className="flex items-center gap-1 font-medium text-[#292524] group-hover:text-[#936B45] transition-colors">
              <span>Open Folio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

