import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Compass, Volume2 } from 'lucide-react';
import { Article } from '../types/article';
import { BookCard } from './BookCard';
import { HeroBookShowcase } from './HeroBookShowcase';
import { FolioGalleryStrip } from './FolioGalleryStrip';
import { SoundSpectrumVisualizer } from './SoundSpectrumVisualizer';
import { SilenceQuiz } from './SilenceQuiz';

interface CatalogViewProps {
  articles: Article[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenArticle: (article: Article) => void;
  onOpenSilencePractice: () => void;
  onOpenKeywords: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  savedIds,
  onToggleSave,
  onOpenArticle,
  onOpenSilencePractice,
  onOpenKeywords,
}) => {
  const categories = [
    'All Folios',
    'Clinical Anatomy',
    'Cultural Habits',
    'Acoustic Experiments',
    'Philosophy & Solitude',
    'Therapeutic Protocols',
  ];

  const filteredArticles = selectedCategory === 'All Folios'
    ? articles
    : articles.filter((a) => {
        if (selectedCategory === 'Clinical Anatomy') {
          return a.chapterCategory === 'Clinical Anatomy' || a.chapterCategory === 'Neuroscience';
        }
        if (selectedCategory === 'Cultural Habits') {
          return a.chapterCategory === 'Cultural Habits' || a.chapterCategory === 'Technology & Dopamine';
        }
        if (selectedCategory === 'Acoustic Experiments') {
          return a.chapterCategory === 'Acoustic Experiments' || a.chapterCategory === 'Neurological Phenomena';
        }
        if (selectedCategory === 'Philosophy & Solitude') {
          return a.chapterCategory === 'Philosophy & Solitude' || a.chapterCategory === 'Social Dynamics' || a.chapterCategory === 'Interpersonal Intimacy';
        }
        if (selectedCategory === 'Therapeutic Protocols') {
          return a.chapterCategory === 'Therapeutic Protocols';
        }
        return a.chapterCategory === selectedCategory;
      });

  const featuredArticle = articles[0]; // Folio 01
  const remainingArticles = filteredArticles.filter((a) => a.id !== featuredArticle.id || selectedCategory !== 'All Folios');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Eye-Catchy 3D-Feel Book Showcase Hero */}
      <HeroBookShowcase
        articles={articles}
        onOpenArticle={onOpenArticle}
        onOpenPractice={onOpenSilencePractice}
      />

      {/* Visual Folio Exhibition Gallery Carousel */}
      <FolioGalleryStrip
        articles={articles}
        onSelectArticle={onOpenArticle}
      />

      {/* Interactive Acoustic Decibel Spectrum & Live Waveform Oscilloscope */}
      <section className="mb-20">
        <SoundSpectrumVisualizer />
      </section>

      {/* Table of Contents Section Divider */}
      <div className="relative flex items-center justify-center my-14">
        <div className="w-full border-t border-[#E7E0D3]" />
        <div className="absolute px-5 py-1 bg-[#FBF9F5] border border-[#E7E0D3] rounded-full text-xs font-mono tracking-widest uppercase text-[#7A5C3E]">
          The Complete Folio Archive
        </div>
      </div>

      {/* Category Filter Rail */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#292524] text-[#FBF9F5] shadow-xs'
                    : 'text-[#665D52] hover:text-[#1C1917] hover:bg-[#EFEAE0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-[#8C8275] font-mono">
          Showing {filteredArticles.length} of {articles.length} Folios
        </div>
      </div>

      {/* Curated Book Folios Grid with Visual Artworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {/* If viewing All Folios, render Folio 01 as Featured Hero Card */}
        {selectedCategory === 'All Folios' && (
          <BookCard
            article={featuredArticle}
            isSaved={savedIds.includes(featuredArticle.id)}
            onToggleSave={onToggleSave}
            onOpenArticle={onOpenArticle}
            isFeatured={true}
          />
        )}

        {/* Remaining Articles */}
        {(selectedCategory === 'All Folios' ? remainingArticles : filteredArticles).map((article) => (
          <BookCard
            key={article.id}
            article={article}
            isSaved={savedIds.includes(article.id)}
            onToggleSave={onToggleSave}
            onOpenArticle={onOpenArticle}
          />
        ))}
      </div>

      {/* Interactive Self-Inquiry Quiz: Discover Your Silence Vulnerability */}
      <section className="mb-20">
        <SilenceQuiz
          articles={articles}
          onSelectArticle={onOpenArticle}
        />
      </section>

      {/* Anechoic Room Sensory Feature Box */}
      <section className="p-8 sm:p-12 bg-gradient-to-br from-[#F5EFE4] to-[#EFE7D8] border border-[#DDD5C5] rounded-2xl book-shadow relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A5C3E] block mb-2">
            Acoustic Landmark · Folio 04 Focus
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] leading-tight mb-4">
            "In 45 Minutes of True Silence, You Become the Sound."
          </h3>
          <p className="font-reading text-base text-[#4A443B] leading-relaxed mb-6">
            At Orfield Laboratories in Minnesota, anechoic fiberglass wedges absorb 99.99% of acoustic energy, driving the noise floor down to negative 9.4 dBA. Within twenty minutes, you hear the rush of your bloodstream, the clicking of your joints, and the high-pitched electrical hum of your inner ear.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const anechoic = articles.find((a) => a.id === 'anechoic-chamber-madness');
                if (anechoic) onOpenArticle(anechoic);
              }}
              className="px-5 py-2.5 bg-[#292524] text-[#FBF9F5] text-xs font-medium rounded-lg hover:bg-[#44403C] transition-colors cursor-pointer"
            >
              Read Folio 04: The Anechoic Experiment
            </button>
            <span className="text-xs text-[#7A7062] font-mono">
              Indexed for: "quietest room in the world hallucinations"
            </span>
          </div>
        </div>
      </section>

      {/* Colophon & Archival Statement */}
      <footer className="mt-20 pt-12 border-t border-[#E7E0D3] text-center text-xs text-[#8C8275]">
        <div className="max-w-xl mx-auto space-y-3">
          <p className="font-editorial text-xl text-[#292524]">
            Quietude: A Curatorial Monograph on Silence
          </p>
          <p className="font-reading leading-relaxed text-[#5C5346]">
            Researched with references to cognitive neurobiology, clinical psychology on sedatephobia, acoustic engineering archives from Orfield Laboratories, and contemplative traditions.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 font-mono text-[11px] text-[#A39889]">
            <span>Vol. VII</span>
            <span>·</span>
            <span>Typeset in Cormorant & Newsreader</span>
            <span>·</span>
            <span>Alabaster & Parchment Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
