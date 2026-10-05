import React, { useState } from 'react';
import { Search, Tag, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { Article } from '../types/article';
import { HumanImage } from './HumanImage';

interface KeywordExplorerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onFilterByKeyword: (keyword: string) => void;
}

export const KeywordExplorer: React.FC<KeywordExplorerProps> = ({
  articles,
  onSelectArticle,
  onFilterByKeyword,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique SEO keywords across all 10 articles
  const allKeywords = Array.from(
    new Set(articles.flatMap((a) => a.seoKeywords))
  ).sort();

  // Search filter
  const filteredArticles = articles.filter((article) => {
    const term = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(term) ||
      article.subtitle.toLowerCase().includes(term) ||
      article.primarySearchQuery.toLowerCase().includes(term) ||
      article.seoKeywords.some((k) => k.toLowerCase().includes(term)) ||
      article.chapterCategory.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-mono text-[#8C8275] block mb-2">
          SEO Research & Discovery Matrix
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] mb-4">
          The Language of Modern Quiet
        </h2>
        <p className="font-reading text-base text-[#524B40] leading-relaxed">
          Explore how modern humans articulate their dread of silence—from clinical inquiries regarding sedatephobia to midnight searches for auditory blankets.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords (e.g. sedatephobia, white noise, awkward pauses)..."
            className="w-full pl-11 pr-4 py-3 bg-[#FCFAF6] border border-[#D8CEBD] focus:border-[#936B45] rounded-xl text-sm font-sans placeholder-[#9E9384] text-[#1C1917] focus:outline-none transition-colors book-shadow"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8275] hover:text-[#1C1917] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Top 10 High-Intent Search Inquiries (Google & Search Engine Patterns) */}
      <section className="mb-14">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[#8C8275] mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#936B45]" />
          <span>Top 10 Searched Questions on the Fear of Silence</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group flex items-center justify-between p-4 bg-[#FCFAF6] hover:bg-[#FAF6EE] border border-[#E7E0D3] hover:border-[#C4B7A2] rounded-xl cursor-pointer transition-all duration-200 book-shadow hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4 pr-2">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#D8CEBD] bg-[#EDE5D5]">
                  <HumanImage
                    src={article.image.url}
                    alt={article.image.alt}
                    folioId={article.id}
                    className="w-full h-full"
                    imageClassName="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#936B45] uppercase tracking-wider block mb-0.5">
                    FOLIO {article.chapterNumber} · {article.chapterCategory}
                  </span>
                  <p className="font-editorial text-base text-[#1C1917] group-hover:text-[#7A5C3E] leading-snug line-clamp-1">
                    "{article.primarySearchQuery}"
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#857B6E]">
                    <span>Indexed:</span>
                    <span className="font-medium text-[#524B40] truncate max-w-xs">
                      #{article.seoKeywords[0]} · #{article.seoKeywords[1]}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A39889] group-hover:text-[#936B45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* SEO Keyword Index Cloud */}
      <section className="mb-14 p-6 sm:p-8 bg-[#F6F2E9] border border-[#E7E0D3] rounded-xl">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[#7A7062] mb-4 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-[#936B45]" />
          <span>Curated Index of Core SEO Keywords</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {allKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => {
                setSearchTerm(kw);
              }}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EFEAE0] border border-[#DDD5C5] rounded text-xs font-sans text-[#443F37] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              #{kw}
            </button>
          ))}
        </div>
      </section>

      {/* Filtered Results if searching */}
      {searchTerm && (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7A7062] pb-2 border-b border-[#EAE3D6]">
            <span>Showing results for "{searchTerm}" ({filteredArticles.length} found)</span>
            <button
              onClick={() => setSearchTerm('')}
              className="hover:underline text-[#936B45]"
            >
              Reset filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="p-5 bg-[#FCFAF6] border border-[#E7E0D3] hover:border-[#936B45] rounded-lg cursor-pointer transition-colors"
              >
                <span className="font-mono text-[10px] text-[#8C8275] block mb-1">
                  FOLIO {article.chapterNumber} · {article.readTime}
                </span>
                <h4 className="font-editorial text-lg text-[#1C1917] hover:text-[#936B45] mb-2 leading-snug">
                  {article.title}
                </h4>
                <p className="font-reading text-xs text-[#524B40] line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
