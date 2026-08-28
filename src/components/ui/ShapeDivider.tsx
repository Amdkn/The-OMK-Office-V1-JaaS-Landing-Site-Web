import React from 'react';

type ShapeType = 'wave' | 'curve' | 'tilt' | 'drops' | 'waves-opacity';

interface ShapeDividerProps {
  type?: ShapeType;
  position?: 'top' | 'bottom';
  color?: string; // e.g. "fill-white" or "fill-slate-950"
  className?: string;
}

export function ShapeDivider({ type = 'wave', position = 'bottom', color = 'fill-white', className = '' }: ShapeDividerProps) {
  const isTop = position === 'top';
  
  // By default, all shapes have their flat edge at the top (y=0).
  // If we position it at the bottom of a section, we want the flat edge at the bottom, so we rotate it.
  const transform = position === 'bottom' ? 'rotate(180deg)' : '';

  const renderShape = () => {
    switch (type) {
      case 'curve':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[60px] sm:h-[100px] ${color}`} style={{ transform }}>
            <path d="M0,0V90c100,0,200-30,300-30s200,30,300,30s200-30,300-30s200,30,300,30V0H0z" />
          </svg>
        );
      case 'tilt':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[50px] sm:h-[80px] ${color}`} style={{ transform }}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
          </svg>
        );
      case 'drops':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[60px] sm:h-[90px] ${color}`} style={{ transform }}>
            <path d="M0 0v56.63C71.35 44 145.47 38.6 211.75 49.33 306.94 64.74 380 94.75 464 96.5c86.42 1.79 164.55-25.1 247-49.8 83-24.85 168.64-47 259-45.74 81 1.13 158.4 17.5 230 46.25V0H0z" />
          </svg>
        );
      case 'waves-opacity':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[70px] sm:h-[120px] ${color}`} style={{ transform }}>
            <path opacity=".25" d="M0,75.24c250,50,500-50,750-24.8c250,25.2,500,49.6,750,24.8V0H0V75.24z" />
            <path opacity=".5" d="M0,50.24c250,50,500-50,750-24.8c250,25.2,500,49.6,750,24.8V0H0V50.24z" />
            <path d="M0,25.24c250,50,500-50,750-24.8c250,25.2,500,49.6,750,24.8V0H0V25.24z" />
          </svg>
        );
      case 'wave':
      default:
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[50px] sm:h-[100px] ${color}`} style={{ transform }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        );
    }
  };

  return (
    <div className={`absolute left-0 right-0 w-full overflow-hidden leading-[0] z-10 ${isTop ? 'top-[-1px]' : 'bottom-[-1px]'} ${className}`}>
      {renderShape()}
    </div>
  );
}
