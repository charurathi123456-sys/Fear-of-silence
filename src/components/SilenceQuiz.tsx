import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { Article } from '../types/article';

interface SilenceQuizProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SilenceQuiz: React.FC<SilenceQuizProps> = ({ articles, onSelectArticle }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultFolioId, setResultFolioId] = useState<string | null>(null);

  const questions = [
    {
      prompt: 'When you are alone in your apartment at night, what is your immediate acoustic instinct?',
      options: [
        { label: 'Turn on a TV show, podcast, or video so the house feels occupied.', folio: 'white-noise-addiction' },
        { label: 'Panic slightly at the sudden heartbeat/ringing sound in my ears.', folio: 'sedatephobia-clinical-panic' },
        { label: 'Grab my phone to scroll so my mind does not start spinning.', folio: 'digital-pacifiers-infinite-scroll' },
      ],
    },
    {
      prompt: 'What happens during an unexpected 5-second silence while conversing with someone?',
      options: [
        { label: 'I sweat, assume they dislike me, and say something awkward to fill it.', folio: 'awkward-silence-anxiety' },
        { label: 'I wonder if they are giving me the silent treatment or pulling away.', folio: 'silence-in-relationships-stonewalling' },
        { label: 'I feel my thoughts branch into dozens of past regrets and to-do lists.', folio: 'default-mode-network' },
      ],
    },
    {
      prompt: 'What sounds like your ultimate challenge or greatest fear?',
      options: [
        { label: 'Spending 45 minutes alone in an acoustic anechoic chamber at -9 dB.', folio: 'anechoic-chamber-madness' },
        { label: 'Having my tinnitus ringing with zero fans or background sounds allowed.', folio: 'tinnitus-fear-of-silence' },
        { label: 'Sitting in an empty room with a blank journal for an hour with zero stimulation.', folio: 'horror-vacui-empty-mind' },
      ],
    },
  ];

  const handleSelectOption = (optionFolio: string) => {
    const nextAnswers = [...answers, step];
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResultFolioId(optionFolio);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setResultFolioId(null);
  };

  const matchedArticle = resultFolioId ? articles.find((a) => a.id === resultFolioId) : null;

  return (
    <div className="bg-[#FAF7F0] border border-[#E7E0D3] rounded-2xl p-6 sm:p-8 book-shadow relative overflow-hidden">
      {/* Decorative Book Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E5DCcb] to-transparent pointer-events-none" />

      <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#8C8275] mb-2">
        <Compass className="w-3.5 h-3.5 text-[#936B45]" />
        <span>Self-Inquiry Assessment</span>
      </div>

      <h3 className="font-editorial text-2xl text-[#1C1917] mb-2">
        Discover Your Specific Silence Vulnerability
      </h3>
      <p className="font-reading text-sm text-[#5C5346] mb-6">
        Answer 3 intuitive prompts to diagnose why silence triggers anxiety for you and receive your tailored folio reading.
      </p>

      {!matchedArticle ? (
        <div>
          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-6">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-[#936B45]' : i < step ? 'w-4 bg-[#C4B7A2]' : 'w-4 bg-[#E7E0D3]'
                }`}
              />
            ))}
            <span className="text-[11px] font-mono text-[#8C8275] ml-2">
              Question 0{step + 1} of 03
            </span>
          </div>

          <h4 className="font-editorial text-lg sm:text-xl text-[#1C1917] mb-4">
            {questions[step].prompt}
          </h4>

          <div className="space-y-2.5">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.folio)}
                className="w-full text-left p-4 bg-[#FCFAF6] hover:bg-[#F2ECE1] border border-[#DDD5C5] hover:border-[#936B45] rounded-xl font-reading text-sm text-[#332E27] transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-[#A39889] group-hover:text-[#936B45] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result State */
        <div className="p-6 bg-[#FCFAF6] border border-[#936B45]/40 rounded-xl animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-xs font-mono text-[#7A5C3E] uppercase mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#936B45]" />
            <span>Diagnostic Match Found</span>
          </div>

          <h4 className="font-editorial text-xl sm:text-2xl text-[#1C1917] mb-2">
            Recommended Folio: {matchedArticle.title}
          </h4>
          <p className="font-reading text-sm text-[#4A443B] leading-relaxed mb-5">
            {matchedArticle.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectArticle(matchedArticle)}
              className="px-5 py-2.5 bg-[#292524] text-[#FBF9F5] text-xs font-medium rounded-lg hover:bg-[#44403C] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Read Folio {matchedArticle.chapterNumber} Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#DDD5C5] hover:bg-[#EFEAE0] text-xs text-[#6B6255] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
