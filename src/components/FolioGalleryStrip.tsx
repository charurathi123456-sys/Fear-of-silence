import React from 'react';
import { GalleryVertical, Sparkles } from 'lucide-react';
import { Article } from '../types/article';
import { HumanImage } from './HumanImage';

interface FolioGalleryStripProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const FolioGalleryStrip: React.FC<FolioGalleryStripProps> = ({
  articles,
  onSelectArticle,
}) => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#8C8275] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#936B45]" />
            <span>Visual Monograph Archive</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917]">
            Exhibition Photo Essay Plates
          </h3>
        </div>
        <span className="hidden sm:inline-block font-mono text-xs text-[#8C8275]">
          10 Curated Chapters
        </span>
      </div>

      {/* Horizontal Scrollable Plates Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group shrink-0 w-64 sm:w-72 bg-[#FCFAF6] hover:bg-[#FAF7F0] border border-[#E7E0D3] hover:border-[#936B45] rounded-xl overflow-hidden book-shadow cursor-pointer transition-all duration-300 hover:-translate-y-1 snap-start"
          >
            {/* Visual Plate Header */}
            <div className="h-44 relative bg-[#EDE5D5] overflow-hidden">
              <HumanImage
                src={article.image.url}
                alt={article.image.alt}
                folioId={article.id}
                className="w-full h-full"
                imageClassName="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-3 bg-[#FAF8F5]/90 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-[#443F37]">
                FOLIO {article.chapterNumber}
              </div>
            </div>

            {/* Description */}
            <div className="p-4">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">
                {article.chapterCategory}
              </span>
              <h4 className="font-editorial text-base text-[#1C1917] group-hover:text-[#7A5C3E] leading-snug line-clamp-2 mb-2">
                {article.title}
              </h4>
              <p className="font-reading text-xs text-[#5C5346] line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="text-[11px] font-mono text-[#936B45] font-medium flex items-center justify-between pt-2 border-t border-[#EAE3D6]">
                <span>{article.readTime}</span>
                <span className="group-hover:underline">Read →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

