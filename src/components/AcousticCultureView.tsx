import React from 'react';
import { Headphones, Smartphone, Coffee, Heart, Radio, Sparkles, MessageCircle } from 'lucide-react';
import { Article } from '../types/article';
import { BookCard } from './BookCard';
import { FolioGalleryStrip } from './FolioGalleryStrip';

interface AcousticCultureViewProps {
  articles: Article[];
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenArticle: (article: Article) => void;
  onOpenSilencePractice: () => void;
}

export const AcousticCultureView: React.FC<AcousticCultureViewProps> = ({
  articles,
  savedIds,
  onToggleSave,
  onOpenArticle,
  onOpenSilencePractice,
}) => {
  const acousticArticleIds = [
    'white-noise-addiction',
    'awkward-silence-anxiety',
    'horror-vacui-empty-mind',
    'silence-in-relationships-stonewalling',
    'digital-pacifiers-infinite-scroll',
  ];

  const acousticArticles = articles.filter((a) => acousticArticleIds.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2ECE1] border border-[#DDD5C5] rounded-full text-xs font-mono tracking-widest uppercase text-[#7A5C3E] mb-4">
          <Headphones className="w-3.5 h-3.5 text-[#936B45]" />
          <span>Acoustic Ecology & Modern Habits</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] leading-[1.1] mb-6">
          Acoustic Culture of Modern Life
        </h1>

        <p className="font-reading text-lg text-[#524B40] leading-relaxed mb-6">
          How did an entire civilization become dependent on 24/7 background audio? From white noise machines and bedtime podcast queues to four-second conversational panics and the phone reflex, explore the cultural architecture of escaping silence.
        </p>

        {/* Cultural Facts Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">3.2 Billion</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Annual Hours of White Noise</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">4.0 Sec</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Conversational Panic Threshold</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">2,617</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Daily Phone Touches</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">67%</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Prefer Shock to Stillness</span>
          </div>
        </div>
      </section>

      {/* Cultural Habits Analysis Box */}
      <section className="mb-14 p-6 sm:p-8 bg-[#F5EFE4] border border-[#DDD5C5] rounded-2xl book-shadow">
        <h2 className="font-editorial text-2xl text-[#1C1917] mb-3">
          The 3 Modern Auditory Shields
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Radio className="w-4 h-4 text-[#936B45]" />
              <span>1. The Noise Blanket</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Synthetic Bedside Companions</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              Box fans, YouTube rain loops, and crime shows act like synthetic roommates, creating decibels that mask our deepest nighttime worries.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <MessageCircle className="w-4 h-4 text-[#936B45]" />
              <span>2. The Social Pause</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Tribal Rejection Fear</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              In social settings, pauses longer than 200 milliseconds trigger subconscious alarms that we are being judged or disconnected from the clan.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Smartphone className="w-4 h-4 text-[#936B45]" />
              <span>3. The Pocket Pacifier</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">The Elevator Screen Reach</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              Any gap longer than five seconds triggers a compulsive reach for the smartphone screen to prevent encountering the unbuffered self.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Photo Strip */}
      <section className="mb-14">
        <FolioGalleryStrip
          articles={acousticArticles}
          onSelectArticle={onOpenArticle}
        />
      </section>

      {/* Articles Grid for Acoustic Culture */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAE3D6]">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917]">
            Acoustic Culture Folios ({acousticArticles.length})
          </h2>
          <span className="text-xs font-mono text-[#8C8275]">
            Essays on Modern Noise Dependency
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {acousticArticles.map((article, idx) => (
            <BookCard
              key={article.id}
              article={article}
              isSaved={savedIds.includes(article.id)}
              onToggleSave={onToggleSave}
              onOpenArticle={onOpenArticle}
              isFeatured={idx === 0}
            />
          ))}
        </div>
      </section>

      {/* Bottom Practice Invitation */}
      <section className="p-8 bg-[#FAF8F5] border border-[#DDD5C5] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 book-shadow">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-editorial text-2xl text-[#1C1917]">
            Dare to Put the Earbuds Away?
          </h3>
          <p className="font-reading text-sm text-[#5C5346]">
            Take a 60-second unbuffered breath right now and give your attention a break from the noise.
          </p>
        </div>
        <button
          onClick={onOpenSilencePractice}
          className="px-6 py-3 bg-[#292524] text-[#FBF9F5] text-xs font-medium uppercase tracking-wider rounded-xl hover:bg-[#44403C] transition-colors cursor-pointer shrink-0"
        >
          Begin 60s Stillness
        </button>
      </section>
    </div>
  );
};
