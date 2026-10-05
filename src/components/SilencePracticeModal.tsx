import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, CheckCircle, Sparkles, Heart } from 'lucide-react';

interface SilencePracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToGuide: () => void;
}

export const SilencePracticeModal: React.FC<SilencePracticeModalProps> = ({
  isOpen,
  onClose,
  onGoToGuide,
}) => {
  const [duration, setDuration] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Handle timer countdown
  useEffect(() => {
    let timer: number | null = null;
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  // Breathing rhythm cycle (4s in, 4s hold, 6s out)
  useEffect(() => {
    let breathTimer: number | null = null;
    if (isActive) {
      const cycleLength = 14;
      const elapsed = duration - timeLeft;
      const currentSecondInCycle = elapsed % cycleLength;

      if (currentSecondInCycle < 4) {
        setBreathPhase('Inhale');
      } else if (currentSecondInCycle < 8) {
        setBreathPhase('Hold');
      } else {
        setBreathPhase('Exhale');
      }
    }
    return () => {
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [isActive, timeLeft, duration]);

  if (!isOpen) return null;

  const handleStart = () => {
    setTimeLeft(duration);
    setIsCompleted(false);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setIsCompleted(false);
  };

  const selectDuration = (seconds: number) => {
    if (!isActive) {
      setDuration(seconds);
      setTimeLeft(seconds);
      setIsCompleted(false);
    }
  };

  // Curated mindful reflections during the stillness practice
  const getPrompt = () => {
    const elapsed = duration - timeLeft;
    if (elapsed < 15) {
      return "Notice the air touching your skin. You are safe in this quiet room.";
    } else if (elapsed < 30) {
      return "If your brain offers loud thoughts, view them like passing birds in an open sky.";
    } else if (elapsed < 45) {
      return "Drop your shoulders away from your ears. Unclench your jaw. Stillness is not an enemy.";
    } else {
      return "Almost there. Experience the spaciousness between each breath.";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E7E0D3] rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A7062] hover:text-[#1C1917] hover:bg-[#EFEAE0] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-mono text-[#8C8275] block mb-1">
                Somatic Micro-Exposure
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1C1917]">
                The Stillness Chamber
              </h3>
              <p className="font-reading text-sm text-[#5C5346] mt-2">
                Titrated quietness exposure to gently reset your brain’s acoustic alarm.
              </p>
            </div>

            {/* Duration Selector Tabs (Interactive Buttons) */}
            {!isActive && (
              <div className="flex items-center justify-center gap-2 mb-8 bg-[#EFEAE0] p-1 rounded-lg max-w-xs mx-auto">
                <button
                  onClick={() => selectDuration(30)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                    duration === 30 ? 'bg-[#FCFAF6] text-[#1C1917] shadow-sm' : 'text-[#6B6255] hover:text-[#1C1917]'
                  }`}
                >
                  30s Micro
                </button>
                <button
                  onClick={() => selectDuration(60)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                    duration === 60 ? 'bg-[#FCFAF6] text-[#1C1917] shadow-sm' : 'text-[#6B6255] hover:text-[#1C1917]'
                  }`}
                >
                  60s Anchor
                </button>
                <button
                  onClick={() => selectDuration(120)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                    duration === 120 ? 'bg-[#FCFAF6] text-[#1C1917] shadow-sm' : 'text-[#6B6255] hover:text-[#1C1917]'
                  }`}
                >
                  120s Immersion
                </button>
              </div>
            )}

            {/* Central Animated Breathing & Timer Ring */}
            <div className="relative flex flex-col items-center justify-center my-8">
              {/* Pulsing Aura Circle */}
              <div
                className={`w-44 h-44 rounded-full border-2 border-[#D8CEBD] bg-gradient-to-b from-[#F2ECE1] to-[#EAE3D6] flex flex-col items-center justify-center transition-all duration-1000 ${
                  isActive
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 shadow-lg border-[#936B45]'
                      : breathPhase === 'Hold'
                      ? 'scale-110 shadow-md border-[#BFAF98]'
                      : 'scale-95 shadow-none border-[#D8CEBD]'
                    : ''
                }`}
              >
                {isActive ? (
                  <>
                    <span className="font-mono text-4xl font-light tabular-nums text-[#1C1917]">
                      {timeLeft}
                    </span>
                    <span className="text-xs uppercase tracking-widest font-sans font-medium text-[#7A5C3E] mt-1">
                      {breathPhase}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-4xl font-light tabular-nums text-[#443F37]">
                      {duration}s
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#8C8275] mt-1 font-mono">
                      Pure Quiet
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Mindful Anchor Text */}
            <div className="min-h-12 text-center px-4 mb-6">
              {isActive ? (
                <p className="font-reading text-sm italic text-[#524B40] animate-in fade-in duration-500">
                  {getPrompt()}
                </p>
              ) : (
                <p className="font-reading text-xs text-[#7A7062]">
                  Unplug headphones, lower your gaze, and let the room exist without interference.
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-6 py-3 bg-[#292524] text-[#FBF9F5] text-sm font-medium rounded-lg hover:bg-[#44403C] transition-colors shadow-sm cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Begin Stillness</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 border border-[#C4B7A2] text-[#5C5346] hover:bg-[#EFEAE0] text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Pause & Reset</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion State */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-[#E7DEC8] text-[#7A5C3E] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7" />
            </div>

            <span className="text-xs uppercase tracking-widest font-mono text-[#8C8275] block mb-1">
              Micro-Dose Complete
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] mb-3">
              You Inhabited Stillness
            </h3>

            <p className="font-reading text-sm sm:text-base text-[#4A443B] leading-relaxed max-w-md mx-auto mb-6">
              Notice your heartbeat. The room remained stable, your breath continued, and the world did not collapse. Each second spent in conscious quiet teaches your nervous system that peace is not dangerous.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#C4B7A2] text-[#443F37] hover:bg-[#EFEAE0] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Practice Again
              </button>
              <button
                onClick={() => {
                  onClose();
                  onGoToGuide();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#292524] text-[#FBF9F5] hover:bg-[#44403C] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Read Folio 10: Befriending The Void
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
