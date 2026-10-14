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
    'Clinical & Science',
    'Acoustic Culture',
    'Mind & Body',
    'Habits & Tech',
    'Social & Relationships',
  ];

  const filteredArticles = selectedCategory === 'All Folios'
    ? articles
    : articles.filter((a) => {
        if (selectedCategory === 'Clinical & Science') {
          return [
            'sedatephobia-clinical-panic',
            'anechoic-chamber-madness',
            'tinnitus-fear-of-silence',
            'default-mode-network',
            'befriending-the-void',
          ].includes(a.id);
        }
        if (selectedCategory === 'Acoustic Culture') {
          return [
            'white-noise-addiction',
            'awkward-silence-anxiety',
            'horror-vacui-empty-mind',
            'silence-in-relationships-stonewalling',
            'digital-pacifiers-infinite-scroll',
          ].includes(a.id);
        }
        if (selectedCategory === 'Mind & Body') {
          return (
            a.chapterCategory === 'Mind & Body' ||
            a.chapterCategory === 'Brain Science' ||
            a.chapterCategory === 'Practical Guide' ||
            a.chapterCategory === 'Health & Ears'
          );
        }
        if (selectedCategory === 'Habits & Tech') {
          return (
            a.chapterCategory === 'Everyday Habits' ||
            a.chapterCategory === 'Screen Habits' ||
            a.chapterCategory === 'Philosophy of Mind'
          );
        }
        if (selectedCategory === 'Social & Relationships') {
          return a.chapterCategory === 'Social Life' || a.chapterCategory === 'Love & Family';
        }
        return a.chapterCategory.toLowerCase().includes(selectedCategory.toLowerCase());
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

      {/* Table of Contents Section Divider with AEO Heading & Q&A */}
      <div className="relative flex items-center justify-center my-14">
        <div className="w-full border-t border-[#E7E0D3]" />
        <div className="absolute px-5 py-1 bg-[#FBF9F5] border border-[#E7E0D3] rounded-full text-xs font-mono tracking-widest uppercase text-[#7A5C3E]">
          The Complete Folio Archive
        </div>
      </div>

      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1917] mb-3">
          What is Sedatephobia and Why Does True Stillness Unnerve Us?
        </h2>
        <div className="p-4 sm:p-5 bg-[#F6F2E9] border-l-3 border-[#936B45] rounded-r-lg text-left my-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#7A5C3E] font-semibold block mb-1">
            Direct Answer
          </span>
          <p className="font-reading text-base text-[#292524] leading-relaxed">
            Answer: Sedatephobia is the clinical fear of silence, quiet rooms, or absolute stillness. It occurs because sudden silence historically signaled predator danger in the wild, and in modern life, removing auditory distractions forces the nervous system to confront suppressed emotions, bodily sounds, and racing thoughts.
          </p>
        </div>
        <p className="font-reading text-sm sm:text-base text-[#524B40] leading-relaxed">
          Browse our ten peer-reviewed folios below to explore the clinical neuroscience, acoustic anthropology, and step-by-step practices for befriending quiet spaces.
        </p>
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

      {/* Anechoic Room Sensory Feature Box with AEO Heading & Q&A */}
      <section className="p-8 sm:p-12 bg-gradient-to-br from-[#F5EFE4] to-[#EFE7D8] border border-[#DDD5C5] rounded-2xl book-shadow relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A5C3E] block mb-2">
            Acoustic Landmark · Folio 04 Focus
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] leading-tight mb-4">
            Can Human Beings Hallucinate in Complete Silence?
          </h2>
          <div className="p-4 bg-[#EDE5D5] border-l-3 border-[#7A5C3E] rounded-r-lg mb-4 text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#7A5C3E] font-semibold block mb-1">
              Direct Answer
            </span>
            <p className="font-reading text-sm sm:text-base text-[#292524] leading-relaxed">
              Answer: Yes. Deprived of all external acoustic reflections in an anechoic chamber (-9.4 dBA), the auditory cortex experiences sensory deprivation, increasing electrical gain until internal bodily rhythms—heartbeats, inner ear static, and rushing blood—sound loud enough to trigger auditory illusions within 20 to 45 minutes.
            </p>
          </div>
          <p className="font-reading text-base text-[#4A443B] leading-relaxed mb-6">
            At Orfield Laboratories in Minnesota, anechoic fiberglass wedges absorb 99.99% of acoustic energy. Step inside, and you discover that living human bodies are never truly silent.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/quietest-room-on-earth"
              onClick={(e) => {
                e.preventDefault();
                const anechoic = articles.find((a) => a.id === 'anechoic-chamber-madness');
                if (anechoic) onOpenArticle(anechoic);
              }}
              className="px-5 py-2.5 bg-[#292524] text-[#FBF9F5] text-xs font-medium rounded-lg hover:bg-[#44403C] transition-colors cursor-pointer inline-block"
            >
              Read Folio 04: The Anechoic Experiment
            </a>
            <span className="text-xs text-[#7A7062] font-mono">
              Indexed for: "quietest room in the world hallucinations"
            </span>
          </div>
        </div>
      </section>

      {/* Home Page AEO Editorial Q&A Section */}
      <section className="mt-20 p-8 sm:p-10 bg-[#FAF7F0] border border-[#E7E0D3] rounded-2xl book-shadow">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A5C3E] block mb-2 text-center">
            Editorial Knowledge Base
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-center text-[#1C1917] mb-8">
            Frequently Asked Questions on Silence and Anxiety
          </h2>

          <div className="space-y-6">
            <div className="p-4 sm:p-5 bg-[#FCFAF6] border border-[#DDD5C5] rounded-xl">
              <h3 className="font-editorial text-lg text-[#1C1917] mb-2 font-medium">
                Why does silence make me feel anxious in an empty house?
              </h3>
              <p className="font-reading text-sm text-[#443F37] leading-relaxed">
                <strong className="text-[#936B45]">Answer:</strong> Silence strips away the sensory veil of daily noise, causing your brain's Default Mode Network to process latent worries and unresolved thoughts. In nature, sudden stillness also signaled predator threats, keeping our nervous system on alert.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#FCFAF6] border border-[#DDD5C5] rounded-xl">
              <h3 className="font-editorial text-lg text-[#1C1917] mb-2 font-medium">
                Why can I not fall asleep without a fan or background noise?
              </h3>
              <p className="font-reading text-sm text-[#443F37] leading-relaxed">
                <strong className="text-[#936B45]">Answer:</strong> Background noise creates a raised acoustic threshold that masks sudden sound spikes (floor creaks, outdoor vehicles) and provides gentle cognitive engagement, preventing bedtime overthinking.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#FCFAF6] border border-[#DDD5C5] rounded-xl">
              <h3 className="font-editorial text-lg text-[#1C1917] mb-2 font-medium">
                How can I stop being afraid of silence and learn to relax?
              </h3>
              <p className="font-reading text-sm text-[#443F37] leading-relaxed">
                <strong className="text-[#936B45]">Answer:</strong> Practice graduated micro-exposure: take 60-second unbuffered breaks during everyday tasks (making tea, waiting for an elevator) without devices, grounding your attention in physical sensations.
              </p>
            </div>
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

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-sans">
            <a
              href="/clinical-science"
              className="text-[#7A5C3E] hover:underline font-medium"
              title="Explore Clinical Neuroscience on Silence"
            >
              Explore Clinical Science
            </a>
            <span className="text-[#C4B7A2]">·</span>
            <a
              href="/acoustic-culture"
              className="text-[#7A5C3E] hover:underline font-medium"
              title="Explore Acoustic Culture and Noise Dependency"
            >
              Explore Acoustic Culture
            </a>
            <span className="text-[#C4B7A2]">·</span>
            <a
              href="/search-keywords"
              className="text-[#7A5C3E] hover:underline font-medium"
              title="Explore Search Matrix and High-Intent Keywords"
            >
              Browse Search Matrix
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
