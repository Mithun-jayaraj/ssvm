import React from 'react';

export const OrnamentalDivider = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 text-gold-600 my-1 ${className}`}>
      {/* Left Ornamental Line */}
      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="text-gold-600">
        <path d="M0 6 H40 Q50 6 54 2 Q58 6 60 6" stroke="#C5A15B" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="56" cy="3" r="1.5" fill="#C5A15B"/>
      </svg>
      
      {/* Center Floral Diamond Emblem */}
      <span className="text-gold-600 text-xs tracking-widest font-serif">❖</span>
      
      {/* Right Ornamental Line */}
      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="text-gold-600">
        <path d="M60 6 H20 Q10 6 6 2 Q2 6 0 6" stroke="#C5A15B" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="4" cy="3" r="1.5" fill="#C5A15B"/>
      </svg>
    </div>
  );
};

export default OrnamentalDivider;
