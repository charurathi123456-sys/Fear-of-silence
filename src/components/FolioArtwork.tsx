import React from 'react';

interface FolioArtworkProps {
  folioId: string;
  className?: string;
  aspect?: 'cover' | 'banner' | 'square';
}

export const FolioArtwork: React.FC<FolioArtworkProps> = ({
  folioId,
  className = '',
  aspect = 'cover',
}) => {
  const getIllustration = () => {
    switch (folioId) {
      case 'sedatephobia-clinical-panic':
        // Neurological labyrinth dissolving into acoustic void
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5EFE4" />
                <stop offset="50%" stopColor="#EDE5D5" />
                <stop offset="100%" stopColor="#E2D6C0" />
              </linearGradient>
              <radialGradient id="glow-1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#936B45" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#936B45" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#936B45" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-1)" />
            {/* Labyrinth & Resonance Waves */}
            <circle cx="200" cy="150" r="110" fill="url(#glow-1)" />
            <circle cx="200" cy="150" r="100" fill="none" stroke="#D1C3AD" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="#B8A78F" strokeWidth="1.2" />
            <circle cx="200" cy="150" r="60" fill="none" stroke="#936B45" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="200" cy="150" r="40" fill="none" stroke="#7A5C3E" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="20" fill="none" stroke="#523F2B" strokeWidth="2" />
            <circle cx="200" cy="150" r="4" fill="#382C1F" />
            {/* Sound Needle Lines */}
            <line x1="200" y1="20" x2="200" y2="280" stroke="#7A5C3E" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#7A5C3E" strokeWidth="0.8" strokeOpacity="0.4" />
            <path d="M120,150 Q160,110 200,150 T280,150" fill="none" stroke="#936B45" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M140,150 Q170,130 200,150 T260,150" fill="none" stroke="#B88A58" strokeWidth="1" />
            {/* Book Folio Emblem */}
            <text x="200" y="260" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              NEURAL VOID · FOLIO 01
            </text>
          </svg>
        );

      case 'white-noise-addiction':
        // Harmonic acoustic frequency bands & auditory blanket
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7F3EB" />
                <stop offset="100%" stopColor="#E5DCcb" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-2)" />
            {/* Geometric Sound Wave Layers */}
            {[...Array(9)].map((_, i) => (
              <path
                key={i}
                d={`M30,${90 + i * 14} C120,${60 + i * 12 + (i % 2) * 20} 240,${120 + i * 14 - (i % 2) * 30} 370,${90 + i * 14}`}
                fill="none"
                stroke={i === 4 ? '#936B45' : '#C7B9A3'}
                strokeWidth={i === 4 ? '2' : '1'}
                strokeOpacity={0.4 + i * 0.06}
              />
            ))}
            {/* Sleeping silhouette arc */}
            <path d="M150,220 C180,180 220,180 250,220" fill="none" stroke="#523F2B" strokeWidth="2" />
            <circle cx="200" cy="180" r="14" fill="#936B45" fillOpacity="0.2" stroke="#936B45" strokeWidth="1" />
            <text x="200" y="260" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              SYNTHETIC DRIFT · FOLIO 02
            </text>
          </svg>
        );

      case 'awkward-silence-anxiety':
        // Two facing profiles with 4-second gap
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF6EF" />
                <stop offset="100%" stopColor="#E4D9C5" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-3)" />
            {/* Two facing profiles minimal lines */}
            <path d="M100,230 C120,200 110,160 140,140 C130,120 140,90 120,70" fill="none" stroke="#7A5C3E" strokeWidth="1.8" />
            <path d="M300,230 C280,200 290,160 260,140 C270,120 260,90 280,70" fill="none" stroke="#7A5C3E" strokeWidth="1.8" />
            {/* Suspended silence meter */}
            <line x1="150" y1="140" x2="250" y2="140" stroke="#D1C3AD" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="200" cy="140" r="18" fill="#FAF6EF" stroke="#936B45" strokeWidth="1.5" />
            <text x="200" y="144" textAnchor="middle" fill="#936B45" fontSize="12" fontFamily="serif" fontWeight="bold">
              4.0s
            </text>
            <text x="200" y="260" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              THE PAUSE · FOLIO 03
            </text>
          </svg>
        );

      case 'anechoic-chamber-madness':
        // Isometric anechoic acoustic wedges & floating core
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDE5D5" />
                <stop offset="100%" stopColor="#D9CCB4" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-4)" />
            {/* Perimeter Acoustic Wedges */}
            {[...Array(8)].map((_, i) => (
              <polygon
                key={`top-${i}`}
                points={`${40 + i * 42},20 ${61 + i * 42},70 ${82 + i * 42},20`}
                fill="#C4B49B"
                stroke="#FAF7F2"
                strokeWidth="1"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <polygon
                key={`bot-${i}`}
                points={`${40 + i * 42},250 ${61 + i * 42},200 ${82 + i * 42},250`}
                fill="#B8A78F"
                stroke="#FAF7F2"
                strokeWidth="1"
              />
            ))}
            {/* Center Decibel Sphere */}
            <circle cx="200" cy="135" r="42" fill="#3D3226" />
            <circle cx="200" cy="135" r="38" fill="#FBF9F5" />
            <text x="200" y="139" textAnchor="middle" fill="#3D3226" fontSize="15" fontFamily="serif" fontWeight="bold">
              -9.4 dB
            </text>
            <text x="200" y="275" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              ORFIELD LABS · FOLIO 04
            </text>
          </svg>
        );

      case 'tinnitus-fear-of-silence':
        // Concentric acoustic rings ringing into the quiet
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9F5EC" />
                <stop offset="100%" stopColor="#E2D4BE" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-5)" />
            {/* Ear Canal Resonance Spiral */}
            <path
              d="M200,140 Q220,110 240,140 T280,140 T320,140"
              fill="none"
              stroke="#936B45"
              strokeWidth="2"
            />
            <path
              d="M200,140 Q180,170 160,140 T120,140 T80,140"
              fill="none"
              stroke="#B88A58"
              strokeWidth="1.5"
            />
            {[15, 30, 50, 75, 105].map((r, idx) => (
              <circle
                key={idx}
                cx="200"
                cy="140"
                r={r}
                fill="none"
                stroke="#7A5C3E"
                strokeWidth="1"
                strokeOpacity={0.7 - idx * 0.12}
                strokeDasharray={`${idx * 2 + 1} 3`}
              />
            ))}
            <text x="200" y="144" textAnchor="middle" fill="#523F2B" fontSize="10" fontFamily="sans-serif">
              6,000 Hz
            </text>
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              PHANTOM REVERB · FOLIO 05
            </text>
          </svg>
        );

      case 'horror-vacui-empty-mind':
        // Renaissance perspective grid leading to serene empty frame
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-6" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBF8F2" />
                <stop offset="100%" stopColor="#E5DBCA" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-6)" />
            {/* Architectural Perspective Lines to Vanishing Point */}
            <line x1="20" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            <line x1="80" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            <line x1="140" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            <line x1="380" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            <line x1="320" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            <line x1="260" y1="240" x2="200" y2="130" stroke="#C4B49B" strokeWidth="1" />
            {/* The Blank Frame */}
            <rect x="150" y="80" width="100" height="100" fill="#FAF7F2" stroke="#936B45" strokeWidth="1.5" />
            <rect x="160" y="90" width="80" height="80" fill="none" stroke="#D1C3AD" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="200" y="135" textAnchor="middle" fill="#936B45" fontSize="11" fontFamily="serif" fontStyle="italic">
              vacuitas
            </text>
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              THE EMPTY CANVAS · FOLIO 06
            </text>
          </svg>
        );

      case 'silence-in-relationships-stonewalling':
        // Two connected figures with a golden thread of shared silence
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9F6F0" />
                <stop offset="100%" stopColor="#E2D7C2" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-7)" />
            {/* Harmonic Rings */}
            <circle cx="160" cy="140" r="55" fill="none" stroke="#CBBBA4" strokeWidth="1.2" />
            <circle cx="240" cy="140" r="55" fill="none" stroke="#CBBBA4" strokeWidth="1.2" />
            {/* Intersection Highlight */}
            <path
              d="M200,98 A55,55 0 0,0 200,182 A55,55 0 0,0 200,98"
              fill="#936B45"
              fillOpacity="0.18"
              stroke="#936B45"
              strokeWidth="1.5"
            />
            {/* Golden Thread */}
            <line x1="80" y1="140" x2="320" y2="140" stroke="#7A5C3E" strokeWidth="1" strokeDasharray="4 4" />
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              CO-PRESENCE · FOLIO 07
            </text>
          </svg>
        );

      case 'digital-pacifiers-infinite-scroll':
        // Monolith screen casting silence shadow
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-8" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F6F1E6" />
                <stop offset="100%" stopColor="#DDD2BD" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-8)" />
            {/* Monolith Device */}
            <rect x="165" y="60" width="70" height="135" rx="10" fill="#2E2820" />
            <rect x="170" y="68" width="60" height="110" rx="4" fill="#EAE2D3" />
            {/* Concentric Signal Rings radiating out */}
            <circle cx="200" cy="120" r="50" fill="none" stroke="#936B45" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="200" cy="120" r="75" fill="none" stroke="#936B45" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 4" />
            <circle cx="200" cy="120" r="100" fill="none" stroke="#936B45" strokeWidth="0.8" strokeOpacity="0.15" />
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              THE GLASS SHIELD · FOLIO 08
            </text>
          </svg>
        );

      case 'default-mode-network':
        // Interconnected constellation network of resting brain
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-9" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8F4EC" />
                <stop offset="100%" stopColor="#E2D4BE" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-9)" />
            {/* Brain constellation nodes */}
            <g stroke="#936B45" strokeWidth="1" strokeOpacity="0.5">
              <line x1="140" y1="120" x2="200" y2="90" />
              <line x1="200" y1="90" x2="260" y2="120" />
              <line x1="260" y1="120" x2="240" y2="180" />
              <line x1="240" y1="180" x2="160" y2="180" />
              <line x1="160" y1="180" x2="140" y2="120" />
              <line x1="200" y1="90" x2="200" y2="150" />
              <line x1="140" y1="120" x2="200" y2="150" />
              <line x1="260" y1="120" x2="200" y2="150" />
            </g>
            {/* Glowing Hubs */}
            <circle cx="200" cy="90" r="6" fill="#7A5C3E" />
            <circle cx="140" cy="120" r="5" fill="#936B45" />
            <circle cx="260" cy="120" r="5" fill="#936B45" />
            <circle cx="200" cy="150" r="8" fill="#3D3226" />
            <circle cx="160" cy="180" r="4" fill="#B88A58" />
            <circle cx="240" cy="180" r="4" fill="#B88A58" />
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              TASK-NEGATIVE · FOLIO 09
            </text>
          </svg>
        );

      case 'befriending-the-void':
      default:
        // Zen stone in water ripples of stillness
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bg-10" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9F6F0" />
                <stop offset="100%" stopColor="#E0D3BC" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bg-10)" />
            {/* Concentric ripples */}
            {[25, 45, 70, 100, 135].map((r, i) => (
              <ellipse
                key={i}
                cx="200"
                cy="145"
                rx={r * 1.4}
                ry={r * 0.7}
                fill="none"
                stroke="#936B45"
                strokeWidth="1.2"
                strokeOpacity={0.6 - i * 0.1}
              />
            ))}
            {/* The Quiet Stone */}
            <ellipse cx="200" cy="142" rx="20" ry="12" fill="#382E22" />
            <ellipse cx="197" cy="139" rx="15" ry="8" fill="#524332" />
            <text x="200" y="265" textAnchor="middle" fill="#7A5C3E" fontSize="9" fontFamily="serif" letterSpacing="4">
              SANCTUARY · FOLIO 10
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {getIllustration()}
    </div>
  );
};
