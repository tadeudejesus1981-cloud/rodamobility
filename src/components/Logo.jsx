import React from 'react';

export default function Logo({ variant = 'dark', size = 'md', showSlogan = false }) {
  // variant: 'dark' (on dark background), 'light' (on white/light background), 'icon' (only the speed mark)

  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? 'text-white' : 'text-[#111111]';
  const subtextColor = isDarkBg ? 'text-zinc-400' : 'text-[#7C7C78]';

  const scaleClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl'
  };

  return (
    <div className="flex items-center gap-2.5 select-none font-['Montserrat']">
      {/* Dynamic Emblem: Stylized RODA speed badge in Verde Lima */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          className={size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer sleek badge */}
          <rect width="40" height="40" rx="8" fill="#111111" />
          {/* Lime Green Accent Border */}
          <rect x="1" y="1" width="38" height="38" rx="7" stroke="#C8F000" strokeWidth="1.5" strokeOpacity="0.4" />
          
          {/* Stylized Speed Slash R Wings in #C8F000 */}
          <path
            d="M12 28L18 12H23L17 28H12Z"
            fill="#C8F000"
          />
          <path
            d="M21 20L25 12H29L23.5 23L28.5 28H23.5L19.5 22L21 20Z"
            fill="#FFFFFF"
          />
          <circle cx="28" cy="14" r="2.5" fill="#C8F000" />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-tight font-black leading-none">
            <span className={`${textColor} ${scaleClasses[size] || 'text-2xl'} font-extrabold tracking-wider`}>
              R
            </span>
            {/* The Stylized O with Lime accent cut */}
            <span className="relative inline-block mx-[1px]">
              <span className={`${textColor} ${scaleClasses[size] || 'text-2xl'} font-extrabold`}>O</span>
              <span 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-[60%] h-[3px] bg-[#C8F000] rotate-[-45deg] rounded-full transform shadow-[0_0_8px_#C8F000]" />
              </span>
            </span>
            <span className={`${textColor} ${scaleClasses[size] || 'text-2xl'} font-extrabold tracking-wider`}>
              DA
            </span>
            <span className="text-[#C8F000] font-black ml-1.5 text-xs sm:text-sm tracking-widest uppercase">
              MOBILITY
            </span>
          </div>

          {showSlogan && (
            <span className={`text-[9px] sm:text-[10px] tracking-[0.25em] font-medium uppercase mt-0.5 ${subtextColor}`}>
              MUÉVETE A <span className="text-[#C8F000] font-bold">TU MANERA</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
