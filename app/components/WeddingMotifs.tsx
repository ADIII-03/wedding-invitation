import React from 'react';

// Ganesha SVG - Royal Gold Detailed representation
export function GaneshaJi({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Halo */}
      <circle cx="50" cy="50" r="42" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="50" cy="50" r="38" stroke="url(#goldGradient)" strokeWidth="0.5"/>
      
      {/* Ganesha Crown (Mukut) */}
      <path d="M42 22 L50 10 L58 22 L53 26 L50 24 L47 26 Z" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="0.5"/>
      <path d="M46 22 L50 15 L54 22 Z" fill="#FFE885" opacity="0.8"/>
      <circle cx="50" cy="14" r="1.5" fill="#FF1A1A"/>
      
      {/* Ears */}
      <path d="M40 28 C28 28, 25 38, 38 42" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M60 28 C72 28, 75 38, 62 42" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 31 C32 31, 30 36, 37 38" stroke="url(#goldGradient)" strokeWidth="0.5"/>
      <path d="M62 31 C68 31, 70 36, 63 38" stroke="url(#goldGradient)" strokeWidth="0.5"/>

      {/* Head & Forehead Tilak */}
      <path d="M38 28 C38 21, 62 21, 62 28" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5"/>
      <path d="M47 22 L53 22 L51 31 L49 31 Z" fill="#FF3333"/>
      <path d="M46 25 H54" stroke="url(#goldGradient)" strokeWidth="1"/>
      <path d="M47 27 H53" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="50" cy="29" r="1.5" fill="#FFE885"/>

      {/* Eyes */}
      <path d="M42 34 C44 35, 47 34, 47 33" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M58 34 C56 35, 53 34, 53 33" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Trunk (Sondh) bending to left (Auspicious Vamavarti trunk) */}
      <path d="M50 32 C50 49, 36 49, 36 56 C36 60, 41 62, 45 58" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 35 C50 46, 39 46, 39 54 C39 56, 41 57, 43 55" fill="none" stroke="#FFE885" strokeWidth="1" strokeLinecap="round"/>
      
      {/* One Tusk (Ekdant) */}
      <path d="M47 37 L44 38 L47 39 Z" fill="#FFFFFF"/>
      
      {/* Modak (Sweet) in trunk curve */}
      <circle cx="43" cy="54" r="2.5" fill="url(#goldGradient)" className="animate-pulse"/>
      <circle cx="43" cy="54" r="1" fill="#FF5500"/>

      {/* Body & Modak Plate */}
      <path d="M30 60 C30 50, 40 48, 48 50" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <path d="M70 60 C70 50, 60 48, 52 50" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      
      {/* Modak Plate (Laddus) */}
      <path d="M60 56 C64 56, 68 58, 66 61 H54 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="57" cy="58" r="1.5" fill="url(#goldGradient)"/>
      <circle cx="60" cy="57" r="1.5" fill="url(#goldGradient)"/>
      <circle cx="63" cy="58" r="1.5" fill="url(#goldGradient)"/>
      <circle cx="60" cy="55" r="1.5" fill="url(#goldGradient)"/>

      {/* Beautiful lotus footprint / base seat */}
      <path d="M30 68 C40 76, 60 76, 70 68" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <path d="M34 68 C38 65, 44 65, 48 68 C52 65, 58 65, 62 68 C66 65, 72 65, 76 68" fill="none" stroke="url(#goldGradient)" strokeWidth="1"/>
      
      {/* Definitions for gorgeous metallic gold color */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE885" />
          <stop offset="40%" stopColor="#D8A520" />
          <stop offset="70%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#FFE885" />
        </linearGradient>
        <linearGradient id="goldGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B38600" />
          <stop offset="100%" stopColor="#5A4300" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Beautiful Traditional Indian Peacock Pair for corner ornaments
export function DecorativePeacock({ className = "w-24 h-24", flip = false }: { className?: string, flip?: boolean }) {
  return (
    <svg className={`${className} ${flip ? '-scale-x-100' : ''}`} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Peacock Body */}
      <path d="M85 35 C75 15, 50 15, 45 35 C42 45, 48 55, 55 60 C62 65, 70 72, 70 82" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      
      {/* Elegant Crown Feathers */}
      <path d="M85 32 C88 24, 91 24, 90 28" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <circle cx="90" cy="22" r="2" fill="url(#goldGradient)"/>
      <path d="M83 32 C84 22, 87 22, 86 26" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <circle cx="86" cy="20" r="1.5" fill="url(#goldGradient)"/>

      {/* Exquisite Beak and Eye */}
      <path d="M92 34 L102 36 L94 40 Z" fill="url(#goldGradient)"/>
      <circle cx="84" cy="34" r="1.5" fill="#FFE885"/>

      {/* Royal Crest / Feathers Wings with intricate motifs */}
      <path d="M55 52 C35 52, 20 62, 10 82 M20 75 C30 65, 45 61, 56 61" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      
      {/* Stylized drop plumage feathers (Mithila Art style) */}
      <path d="M70 82 C55 92, 35 92, 15 88" stroke="url(#goldGradient)" strokeWidth="2"/>
      
      {/* Traditional Circle / Eye spots on tail */}
      <circle cx="20" cy="80" r="5" stroke="url(#goldGradient)" strokeWidth="1" />
      <circle cx="20" cy="80" r="2.5" fill="#FF3333" />

      <circle cx="35" cy="86" r="6" stroke="url(#goldGradient)" strokeWidth="1" />
      <circle cx="35" cy="86" r="3" fill="#D8A520" />

      <circle cx="55" cy="88" r="6" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="55" cy="88" r="3" fill="#FF3333" />

      <circle cx="73" cy="85" r="5" stroke="url(#goldGradient)" strokeWidth="1" />
      <circle cx="73" cy="85" r="2.5" fill="#D8A520" />

      {/* Small beautiful floral creepers */}
      <path d="M38 42 C15 35, 10 20, 22 15 C34 10, 48 18, 48 30" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2 2"/>
      <circle cx="22" cy="15" r="3" fill="url(#goldGradient)"/>
      <circle cx="34" cy="10" r="2" fill="url(#goldGradient)"/>
    </svg>
  );
}

// Hanging Kalash (Auspicious copper pot with coconut and mango leaves)
export function DivineKalash({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hanging Chain */}
      <line x1="50" y1="0" x2="50" y2="30" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="3 3"/>
      <circle cx="50" cy="20" r="3" stroke="url(#goldGradient)" strokeWidth="1"/>

      {/* Coconut at the Top */}
      <path d="M38 42 C40 30, 60 30, 62 42 Z" fill="url(#goldGradient)"/>
      <path d="M45 42 L50 30 L55 42 Z" fill="#FFE885" opacity="0.8"/>
      
      {/* Mango Leaves (Aam Patra) */}
      <path d="M30 46 C35 44, 45 45, 42 42 Z" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="0.5"/>
      <path d="M70 46 C65 44, 55 45, 58 42 Z" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="0.5"/>
      <path d="M50 44 L47 38 L50 35 L53 38 Z" fill="url(#goldGradient)"/>

      {/* Kalash Body */}
      <path d="M34 46 H66 L68 52 C76 60, 72 74, 50 74 C28 74, 24 60, 32 52 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5"/>
      <path d="M35 48 H65" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      
      {/* Coconut Hair line texture */}
      <path d="M38 52 C45 56, 55 56, 62 52" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="50" cy="62" r="3" fill="#FF5500"/>

      {/* Swastika / Auspicious sign painting on the pot */}
      <path d="M45 62 H55 M50 57 V67 M45 57 H48 V62 M55 67 H52 V62 M45 67 V64 H50 M55 57 V60 H50" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round"/>

      {/* Base ring */}
      <path d="M42 74 H58 L55 78 H45 Z" fill="url(#goldGradient)"/>

      {/* Hanging pearls at the bottom */}
      <line x1="50" y1="78" x2="50" y2="92" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="50" cy="92" r="3.5" fill="url(#goldGradient)" className="animate-bounce"/>
      <line x1="42" y1="76" x2="38" y2="86" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="38" cy="86" r="2.5" fill="url(#goldGradient)"/>
      <line x1="58" y1="76" x2="62" y2="86" stroke="url(#goldGradient)" strokeWidth="1"/>
      <circle cx="62" cy="86" r="2.5" fill="url(#goldGradient)"/>
    </svg>
  );
}

// Side Pillars (Mandap Pillars) - left or right depending on transform
export function MandapPillar({ className = "h-96" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 500" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* Base of Pillar */}
      <rect x="5" y="470" width="50" height="25" rx="2" fill="none" stroke="url(#goldGradient)" strokeWidth="2"/>
      <rect x="10" y="455" width="40" height="15" rx="1" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <path d="M15 455 L20 435 H40 L45 455 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5"/>

      {/* Shaft (Lines with traditional ornaments) */}
      <line x1="22" y1="80" x2="22" y2="435" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <line x1="38" y1="80" x2="38" y2="435" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <line x1="30" y1="80" x2="30" y2="435" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 8"/>

      {/* Ring bands */}
      <rect x="18" y="150" width="24" height="6" fill="url(#goldGradient)"/>
      <rect x="18" y="270" width="24" height="6" fill="url(#goldGradient)"/>
      <rect x="18" y="380" width="24" height="6" fill="url(#goldGradient)"/>

      {/* Swirl design inside column */}
      <path d="M22 170 Q30 190, 38 210 Q30 230, 22 250" stroke="url(#goldGradient)" strokeWidth="0.5"/>
      <path d="M38 170 Q30 190, 22 210 Q30 230, 38 250" stroke="url(#goldGradient)" strokeWidth="0.5"/>

      {/* Pillar Capital (Top portion) */}
      <path d="M15 80 L5 60 H55 L45 80 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <rect x="10" y="45" width="40" height="15" rx="1" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      
      {/* Temple Dome Top finish */}
      <path d="M20 45 C20 20, 40 20, 40 45 Z" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none"/>
      
      {/* Coconut leaf / banner decorations */}
      <path d="M5 60 C8 50, 18 45, 23 45" stroke="url(#goldGradient)" strokeWidth="1"/>
      <path d="M55 60 C52 50, 42 45, 37 45" stroke="url(#goldGradient)" strokeWidth="1"/>
    </svg>
  );
}

// Center Divider (Wedding Knot Symbol / Hast Milap / परिणय)
export function WeddingKnotSymbol({ className = "w-32 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Floral swirls left */}
      <path d="M10 40 Q40 10, 60 40 T110 40" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 45 C30 25, 45 55, 60 40" stroke="url(#goldGradient)" strokeWidth="1"/>
      
      {/* Floral swirls right */}
      <path d="M150 40 Q120 10, 100 40 T50 40" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" className="scale-x-[-1] origin-center" />
      
      {/* Centered Knot / Couple hands holding silhouette in gold circle */}
      <circle cx="80" cy="40" r="18" stroke="url(#goldGradient)" strokeWidth="2" fill="#2D050D"/>
      <circle cx="80" cy="40" r="15" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 2"/>
      
      {/* Knot tying / Hearts */}
      <path d="M72 40 C75 35, 78 45, 88 40" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M80 34 C80 25, 88 28, 80 44 C72 28, 80 25, 80 34" fill="#FF1A1A" stroke="url(#goldGradient)" strokeWidth="0.5"/>
      <circle cx="80" cy="40" r="1" fill="#FFE885"/>
    </svg>
  );
}

// Ornate Corner borders
export function CornerOrnament({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corner corner line */}
      <path d="M4 100 V4 H100" stroke="url(#goldGradient)" strokeWidth="3"/>
      <path d="M12 100 V12 H100" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M18 100 V18 H100" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      
      {/* Swirls inside corner */}
      <path d="M18 18 Q35 35, 50 18" stroke="url(#goldGradient)" strokeWidth="1"/>
      <path d="M18 18 Q35 35, 18 50" stroke="url(#goldGradient)" strokeWidth="1"/>
      
      {/* Intricate flower in the exact vertex corner */}
      <circle cx="18" cy="18" r="4" fill="url(#goldGradient)"/>
      <circle cx="10" cy="10" r="3.5" fill="#FF3333"/>
      <path d="M18 10 C18 14, 14 18, 10 18" stroke="url(#goldGradient)" strokeWidth="1"/>
      
      {/* Dots */}
      <circle cx="30" cy="30" r="2" fill="url(#goldGradient)"/>
      <circle cx="45" cy="45" r="1.5" fill="url(#goldGradient)"/>
    </svg>
  );
}

// Header Garland (Bandhanwar / Toran)
export function BandhanwarToran({ className = "w-full h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* Rope */}
      <line x1="0" y1="5" x2="600" y2="5" stroke="url(#goldGradient)" strokeWidth="2.5"/>
      
      {/* Repeating scallops (curved floral garland drops) */}
      <path d="M0 5 Q30 25, 60 5 T120 5 T180 5 T240 5 T300 5 T360 5 T420 5 T480 5 T540 5 T600 5" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5"/>
      <path d="M0 5 Q30 35, 60 5 T120 5 T180 5 T240 5 T300 5 T360 5 T420 5 T480 5 T540 5 T600 5" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="3 3"/>

      {/* Mango leaves & Marigold Flowers dropping down periodically */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = i * 60;
        return (
          <g key={i} transform={`translate(${x}, 5)`}>
            {/* Mango Leaf */}
            <path d="M-8 0 Q0 24, 0 32 Q0 24, 8 0 Z" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="0.5"/>
            {/* Marigold Flower */}
            <circle cx="0" cy="3" r="4.5" fill="#FFA500"/>
            <circle cx="0" cy="3" r="2.5" fill="#FF5500" className="animate-pulse"/>
            <circle cx="0" cy="3" r="1.5" fill="#FFD700"/>
          </g>
        );
      })}
    </svg>
  );
}
