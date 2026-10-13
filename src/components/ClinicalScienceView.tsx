import React from 'react';
import { Activity, Brain, Shield, HeartPulse, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { Article } from '../types/article';
import { BookCard } from './BookCard';
import { SoundSpectrumVisualizer } from './SoundSpectrumVisualizer';

interface ClinicalScienceViewProps {
  articles: Article[];
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenArticle: (article: Article) => void;
  onOpenSilencePractice: () => void;
}

export const ClinicalScienceView: React.FC<ClinicalScienceViewProps> = ({
  articles,
  savedIds,
  onToggleSave,
  onOpenArticle,
  onOpenSilencePractice,
}) => {
  const clinicalArticleIds = [
    'sedatephobia-clinical-panic',
    'anechoic-chamber-madness',
    'tinnitus-fear-of-silence',
    'default-mode-network',
    'befriending-the-void',
  ];

  const clinicalArticles = articles.filter((a) => clinicalArticleIds.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2ECE1] border border-[#DDD5C5] rounded-full text-xs font-mono tracking-widest uppercase text-[#7A5C3E] mb-4">
          <Brain className="w-3.5 h-3.5 text-[#936B45]" />
          <span>Neuroscience & Clinical Anatomy</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] leading-[1.1] mb-6">
          Clinical & Science of Silence
        </h1>

        <p className="font-reading text-lg text-[#524B40] leading-relaxed mb-6">
          What actually happens inside your central nervous system when external decibels drop to zero? Explore the physiological mechanics of sedatephobia, central auditory gain in tinnitus, the Default Mode Network, and acoustic deprivation research from Orfield Laboratories.
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">-9.4 dB</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Orfield Chamber Record</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">4,000 Hz</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Peak Tinnitus Gain</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">45 Min</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Max Chamber Tolerance</span>
          </div>
          <div className="p-3.5 bg-[#FAF7F0] border border-[#E7E0D3] rounded-xl">
            <span className="font-mono text-2xl font-light text-[#1C1917]">78%</span>
            <span className="block text-[11px] text-[#7A7062] font-sans mt-0.5">Exposure Recovery Rate</span>
          </div>
        </div>
      </section>

      {/* Clinical Research Summary Box */}
      <section className="mb-14 p-6 sm:p-8 bg-[#F5EFE4] border border-[#DDD5C5] rounded-2xl book-shadow">
        <h2 className="font-editorial text-2xl text-[#1C1917] mb-3">
          The 3 Pillars of Acoustic Panic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <HeartPulse className="w-4 h-4 text-[#936B45]" />
              <span>1. Autonomic Alarm</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Predator Silence Reflex</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              In nature, sudden silence signals that a predator is stalking nearby. Modern quiet triggers an ancestral fight-or-flight adrenal spike.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Activity className="w-4 h-4 text-[#936B45]" />
              <span>2. Central Auditory Gain</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Internal Amplifier</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              When external sound waves vanish, the dorsal cochlear nucleus increases electrical sensitivity, turning quiet bedrooms into ringing soundscapes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Brain className="w-4 h-4 text-[#936B45]" />
              <span>3. Default Mode Flare</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">The Ruminating Mind</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              The moment you rest, the brain’s Default Mode Network kicks into gear, sorting past memories, simulating future anxieties, and reviewing regrets.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid for Clinical & Science */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAE3D6]">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917]">
            Clinical Science Folios ({clinicalArticles.length})
          </h2>
          <span className="text-xs font-mono text-[#8C8275]">
            Peer-Reviewed Insights & Guides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {clinicalArticles.map((article, idx) => (
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

      {/* Embedded Live Oscilloscope */}
      <section className="mb-14">
        <SoundSpectrumVisualizer />
      </section>

      {/* Stillness Chamber Invitation */}
      <section className="p-8 bg-[#FAF8F5] border border-[#DDD5C5] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 book-shadow">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-editorial text-2xl text-[#1C1917]">
            Ready to Test Your Nervous System?
          </h3>
          <p className="font-reading text-sm text-[#5C5346]">
            Try our clinical 60-Second Stillness Chamber to practice gentle sensory desensitization.
          </p>
        </div>
        <button
          onClick={onOpenSilencePractice}
          className="px-6 py-3 bg-[#292524] text-[#FBF9F5] text-xs font-medium uppercase tracking-wider rounded-xl hover:bg-[#44403C] transition-colors cursor-pointer shrink-0"
        >
          Enter Stillness Chamber
        </button>
      </section>
    </div>
  );
};
