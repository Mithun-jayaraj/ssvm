import React from 'react';

export const GaneshaEmblem = ({ className = 'w-12 h-12', glow = true }) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${glow ? 'drop-shadow-[0_2px_8px_rgba(197,161,91,0.45)]' : ''} ${className}`}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sacred Aureole / Circular halo */}
        <circle cx="50" cy="50" r="46" stroke="#C5A15B" strokeWidth="2" strokeDasharray="3 3" opacity="0.6"/>
        <circle cx="50" cy="50" r="42" stroke="#C5A15B" strokeWidth="1.5"/>

        {/* Crown (Kireetam) */}
        <path d="M40 24 L50 12 L60 24 L56 26 L50 20 L44 26 Z" fill="#C5A15B" stroke="#9B792F" strokeWidth="1"/>
        <circle cx="50" cy="11" r="2.5" fill="#E6C987"/>
        <path d="M38 27 Q50 22 62 27 L60 32 Q50 28 40 32 Z" fill="#C5A15B"/>

        {/* Sacred Ears (Soorpa Karna) */}
        <path d="M38 32 C26 32 20 42 25 54 C28 60 35 62 38 56" stroke="#C5A15B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M62 32 C74 32 80 42 75 54 C72 60 65 62 62 56" stroke="#C5A15B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

        {/* Head & Forehead with Sacred Thirunamam / Tilak */}
        <path d="M42 32 Q50 30 58 32 Q56 42 50 44 Q44 42 42 32 Z" fill="#D5B573" opacity="0.3"/>
        <line x1="50" y1="28" x2="50" y2="38" stroke="#B01E28" strokeWidth="2" strokeLinecap="round"/>
        <line x1="46" y1="33" x2="54" y2="33" stroke="#FAF6ED" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="50" cy="38" r="1.5" fill="#B01E28"/>

        {/* Auspicious Eyes */}
        <ellipse cx="45" cy="40" rx="2" ry="1.2" fill="#4A1424"/>
        <ellipse cx="55" cy="40" rx="2" ry="1.2" fill="#4A1424"/>

        {/* Trunk (Vakratunda) curving gracefully left to hold Modakam */}
        <path
          d="M50 42 C48 50 46 62 40 68 C35 73 28 72 26 66 C24 61 28 57 33 60 C36 62 35 66 32 65"
          stroke="#C5A15B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Broken Tusk & Full Tusk */}
        <path d="M43 49 L39 52" stroke="#FAF6ED" strokeWidth="2" strokeLinecap="round"/>
        <path d="M57 49 L62 55" stroke="#FAF6ED" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Auspicious Modak sweet held in trunk tip */}
        <circle cx="30" cy="63" r="3.5" fill="#E6C987" stroke="#C5A15B" strokeWidth="1"/>

        {/* Right Hand in Abhaya Mudra */}
        <path d="M66 54 Q72 52 74 60 C75 66 70 70 66 68" stroke="#C5A15B" strokeWidth="2" fill="none"/>
        <circle cx="70" cy="61" r="1.8" fill="#B01E28"/>

        {/* Pedestal Base */}
        <path d="M30 84 Q50 81 70 84 L74 88 Q50 85 26 88 Z" fill="#C5A15B" opacity="0.8"/>
        <line x1="22" y1="89" x2="78" y2="89" stroke="#9B792F" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default GaneshaEmblem;
