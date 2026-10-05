import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Activity, Compass, Info, Play, Pause } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface SpectrumPreset {
  db: number;
  label: string;
  source: string;
  psychologicalImpact: string;
  noiseType: 'silence' | 'brown' | 'rain' | 'vinyl';
}

const PRESETS: SpectrumPreset[] = [
  {
    db: -9.4,
    label: 'Anechoic Chamber',
    source: 'Orfield Labs (The Quietest Room on Earth)',
    psychologicalImpact: 'Hallucinations begin in 20 minutes; blood pumping and synaptic ear ringing sound deafening.',
    noiseType: 'silence',
  },
  {
    db: 10,
    label: 'Desert at Midnight',
    source: 'Pure natural quietude without wind',
    psychologicalImpact: 'Auditory cortex turns up central gain; heart rate synchronizes to natural rhythm.',
    noiseType: 'silence',
  },
  {
    db: 25,
    label: 'Library & Ticking Clock',
    source: 'Antique reading room',
    psychologicalImpact: 'The classic sedatephobia trigger; solitary sounds stand out sharply against the quiet.',
    noiseType: 'vinyl',
  },
  {
    db: 45,
    label: 'Auditory Blanket (White/Brown Noise)',
    source: 'Fan, rain machine, or lo-fi stream',
    psychologicalImpact: 'Masks introspection and prevents Default Mode Network rumination from taking hold.',
    noiseType: 'brown',
  },
  {
    db: 70,
    label: 'Busy Urban Cafe',
    source: 'Espresso machines, chatter, streetcars',
    psychologicalImpact: 'Overstimulation; sensory buffering requires zero internal confrontation with self.',
    noiseType: 'rain',
  },
];

export const SoundSpectrumVisualizer: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<SpectrumPreset>(PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Canvas wave animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 140;
      }
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      phaseRef.current += isPlaying ? 0.04 : 0.015;

      const isQuiet = selectedPreset.db < 15;
      const amplitude = isQuiet
        ? (isPlaying ? 8 : 4)
        : Math.min(45, (selectedPreset.db / 80) * 45);

      // Draw subtle background grid lines
      ctx.strokeStyle = '#EBE5D8';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      // Center baseline
      ctx.strokeStyle = '#D8CEBD';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Primary flowing acoustic wave
      ctx.beginPath();
      ctx.strokeStyle = isQuiet ? '#936B45' : '#7A5C3E';
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x++) {
        const freq1 = isQuiet ? 0.008 : 0.02;
        const freq2 = isQuiet ? 0.015 : 0.05;
        const y =
          height / 2 +
          Math.sin(x * freq1 + phaseRef.current) * amplitude +
          Math.cos(x * freq2 - phaseRef.current * 0.7) * (amplitude * 0.5);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary harmonizing wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(184, 138, 88, 0.4)';
      ctx.lineWidth = 1.2;
      for (let x = 0; x < width; x++) {
        const y =
          height / 2 +
          Math.sin(x * 0.012 - phaseRef.current * 0.8) * (amplitude * 0.65);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, selectedPreset]);

  const handleSelectPreset = (preset: SpectrumPreset) => {
    setSelectedPreset(preset);
    if (isPlaying) {
      ambientAudio.setMode(preset.noiseType, 0.3);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      ambientAudio.stop();
      setIsPlaying(false);
    } else {
      ambientAudio.setMode(selectedPreset.noiseType, 0.3);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-[#FAF7F0] border border-[#E7E0D3] rounded-2xl p-6 sm:p-8 book-shadow">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D6]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#8C8275] mb-1">
            <Activity className="w-3.5 h-3.5 text-[#936B45]" />
            <span>Acoustic Oscilloscope</span>
          </div>
          <h3 className="font-editorial text-2xl text-[#1C1917]">
            The Decibel Spectrum of Silence vs. Noise
          </h3>
        </div>

        <button
          onClick={toggleSound}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer self-start sm:self-auto ${
            isPlaying
              ? 'bg-[#936B45] text-white shadow-sm'
              : 'bg-[#292524] text-[#FBF9F5] hover:bg-[#44403C]'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Silence Audio</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Decibels</span>
            </>
          )}
        </button>
      </div>

      {/* Preset decibel selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-6">
        {PRESETS.map((p) => {
          const isSelected = selectedPreset.db === p.db;
          return (
            <button
              key={p.db}
              onClick={() => handleSelectPreset(p)}
              className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FCFAF6] border-[#936B45] shadow-sm ring-1 ring-[#936B45]/20'
                  : 'bg-[#F2ECE1] border-transparent hover:border-[#D8CEBD] text-[#61574A]'
              }`}
            >
              <div className="font-mono text-sm font-semibold text-[#1C1917]">
                {p.db > 0 ? `+${p.db}` : p.db} dB
              </div>
              <div className="font-editorial text-xs text-[#524B40] leading-tight line-clamp-1 mt-0.5">
                {p.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Waveform Canvas */}
      <div className="relative bg-[#FCFAF6] rounded-xl border border-[#E7E0D3] p-2 overflow-hidden mb-6">
        <canvas ref={canvasRef} className="w-full h-32 block" />

        <div className="absolute top-3 left-4 flex items-center gap-2 text-[11px] font-mono text-[#8C8275]">
          <span className="w-2 h-2 rounded-full bg-[#936B45] animate-pulse" />
          <span>REAL-TIME SENSORY BANDWIDTH: {selectedPreset.db} dB</span>
        </div>

        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[#A39889]">
          432 Hz RESONANCE · 0.00002 Pa REF
        </div>
      </div>

      {/* Psychological Impact Card */}
      <div className="p-4 bg-[#F2ECE1] border-l-3 border-[#936B45] rounded-r-lg flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-[#7A5C3E] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#292524] uppercase tracking-wider text-[10px] block mb-0.5">
            What the Mind Experiences at {selectedPreset.db} dB ({selectedPreset.source})
          </span>
          <p className="font-reading text-[#443F37] leading-relaxed">
            {selectedPreset.psychologicalImpact}
          </p>
        </div>
      </div>
    </div>
  );
};
