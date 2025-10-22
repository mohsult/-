
import React from 'react';

const AliaCharacter: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 10)">
      {/* Head */}
      <circle cx="50" cy="30" r="28" fill="#FCE4EC" />
      <circle cx="40" cy="28" r="3" fill="#263238" />
      <circle cx="60" cy="28" r="3" fill="#263238" />
      <path d="M 45 38 Q 50 45 55 38" stroke="#EC407A" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Hair */}
      <path d="M 25 30 Q 50 0 75 30 L 78 40 Q 50 20 22 40 Z" fill="#4A148C" />
      <path d="M 22 40 C 15 50, 18 60, 25 55" fill="#4A148C" />
      <path d="M 78 40 C 85 50, 82 60, 75 55" fill="#4A148C" />

      {/* Body */}
      <path d="M 35 60 L 30 100 H 70 L 65 60 Z" fill="#80DEEA" />
      <circle cx="50" cy="70" r="5" fill="#E0F7FA" />

      {/* Arms */}
      <path d="M 35 65 Q 20 75 30 85" stroke="#FCE4EC" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 65 65 Q 80 75 70 85" stroke="#FCE4EC" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export default AliaCharacter;
