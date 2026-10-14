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

        <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] mb-3">
          What Happens Inside the Central Nervous System When External Decibels Drop to Zero?
        </h2>

        <div className="p-4 sm:p-5 bg-[#F6F2E9] border-l-3 border-[#936B45] rounded-r-lg my-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#7A5C3E] font-semibold block mb-1">
            Direct Answer
          </span>
          <p className="font-reading text-base text-[#292524] leading-relaxed">
            Answer: When external decibels drop to zero, the central nervous system undergoes an involuntary gain spike: the dorsal cochlear nucleus amplifies neural static into phantom ringing, the autonomic sympathetic branch triggers primal predator alarms, and the Default Mode Network flares into high-gear rumination.
          </p>
        </div>

        <p className="font-reading text-base text-[#524B40] leading-relaxed mb-6">
          Explore the physiological mechanics of sedatephobia, central auditory gain in tinnitus, the Default Mode Network, and acoustic deprivation research from Orfield Laboratories.
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
        <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] mb-3">
          What Are the Three Biological Pillars That Drive Acoustic Panic?
        </h2>
        <div className="p-3.5 bg-[#EDE5D5] border-l-3 border-[#7A5C3E] rounded-r-lg mb-6 text-left">
          <span className="font-mono text-xs uppercase tracking-wider text-[#7A5C3E] font-semibold block mb-1">
            Direct Answer
          </span>
          <p className="font-reading text-sm text-[#292524] leading-relaxed">
            Answer: Acoustic panic is triggered by three synchronized physiological pathways: an autonomic predator alarm in the amygdala, central auditory gain in the brainstem, and Default Mode Network hyper-connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <HeartPulse className="w-4 h-4 text-[#936B45]" />
              <span>1. Autonomic Alarm</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Why Does Silence Trigger Predator Reflexes?</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              <strong className="text-[#936B45]">Answer:</strong> In nature, sudden stillness signaled that a predator was stalking nearby and every animal had frozen. Modern silence misfires this ancient fight-or-flight adrenal spike.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Activity className="w-4 h-4 text-[#936B45]" />
              <span>2. Central Auditory Gain</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">How Does the Brain Boost Phantom Noise?</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              <strong className="text-[#936B45]">Answer:</strong> When external sound waves drop, the dorsal cochlear nucleus increases electrical sensitivity, turning quiet bedrooms into ringing, pulsatile soundscapes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#7A5C3E]">
              <Brain className="w-4 h-4 text-[#936B45]" />
              <span>3. Default Mode Flare</span>
            </div>
            <h3 className="font-editorial text-lg text-[#1C1917]">Why Does the Mind Ruminate in Silence?</h3>
            <p className="font-reading text-xs text-[#524B40] leading-relaxed">
              <strong className="text-[#936B45]">Answer:</strong> The instant external task focus ends, the Default Mode Network kicks into gear, replaying memories, reviewing regrets, and simulating future anxieties.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid for Clinical & Science */}
      <section className="mb-16">
        <div className="mb-8 pb-3 border-b border-[#EAE3D6]">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] mb-2">
            Which Clinical Folios Explain Auditory Gain and Tinnitus Mechanisms?
          </h2>
          <p className="font-reading text-sm text-[#5C5346] leading-relaxed">
            <strong className="text-[#936B45]">Answer:</strong> Folios 01, 04, 05, 09, and 10 provide peer-reviewed scientific guides examining anechoic chambers, neuro-auditory habituation, and clinical exposure protocols for quiet intolerance.
          </p>
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
          <h2 className="font-editorial text-2xl text-[#1C1917]">
            How Can You Clinically Retrain Your Nervous System to Tolerate Quiet?
          </h2>
          <p className="font-reading text-sm text-[#5C5346] leading-relaxed">
            <strong className="text-[#936B45]">Answer:</strong> Clinical desensitization uses graduated micro-exposure—beginning with 60-second unbuffered stillness intervals to prove to the amygdala that absence of noise is physically safe.
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
