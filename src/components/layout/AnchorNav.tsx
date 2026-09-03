import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AnchorNavProps {
  sections: { id: string; label: string }[];
}

export const AnchorNav: React.FC<AnchorNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container') || document.querySelector('.main-scroll-container') || window;
    
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Window;
      const scrollY = target === window ? window.scrollY : (target as HTMLElement).scrollTop;
      const scrollPosition = scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const container = document.getElementById('main-scroll-container');
          const elementOffset = container 
            ? section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
            : section.offsetTop;
            
          if (elementOffset <= scrollPosition) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(() => {
      handleScroll({ target: scrollContainer } as unknown as Event);
    }, 100);
    
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const scrollContainer = document.getElementById('main-scroll-container');
    if (id === 'hero-global' || id === 'accueil' || id === 'top' || id === 'baas-hero') {
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element && scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offsetPosition = elementTop - containerTop + scrollContainer.scrollTop - 90;

      scrollContainer.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (sections.length === 0) return null;

  // Render logic depending on theme
  const getDotStyle = (isActive: boolean) => {
    if (theme === 'brutalism') {
      return `w-4 h-4 border-2 border-black transition-all duration-300 ${isActive ? 'bg-[#FF5722] translate-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-yellow-300'}`;
    }
    if (theme === 'dark-oled') {
      return `w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] scale-125' : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'}`;
    }
    if (theme === 'warm-paper') {
      return `w-1.5 h-6 rounded-full transition-all duration-300 ${isActive ? 'bg-amber-600 scale-y-125' : 'bg-amber-200/50 hover:bg-amber-300'}`;
    }
    if (theme === 'claymorphism') {
      return `w-4 h-4 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-400 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] scale-125' : 'bg-[#e0e5ec] shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.7)] hover:bg-[#d1d9e6]'}`;
    }
    // glassmorphism
    return `w-3 h-3 rounded-full transition-all duration-300 border-2 ${isActive ? 'bg-blue-600 border-blue-600 scale-125 shadow-md' : 'bg-slate-300 border-transparent hover:bg-blue-400'}`;
  };

  const getLabelStyle = (isActive: boolean) => {
    if (theme === 'brutalism') {
      return `text-xs font-bold font-mono px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${isActive ? 'opacity-100 text-black' : 'opacity-0 group-hover:opacity-100 text-black'}`;
    }
    if (theme === 'dark-oled') {
      return `text-xs font-mono px-2 py-1 rounded bg-[#111] border border-slate-800 transition-all duration-300 ${isActive ? 'opacity-100 text-emerald-500' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`;
    }
    if (theme === 'warm-paper') {
      return `text-xs font-serif italic px-2 py-1 rounded bg-[#FDFBF7] border border-amber-100 shadow-sm transition-all duration-300 ${isActive ? 'opacity-100 text-amber-700 font-bold' : 'opacity-0 group-hover:opacity-100 text-amber-900/60'}`;
    }
    // Default / glass / clay
    return `text-xs font-medium px-2 py-1 rounded-md bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 ${isActive ? 'opacity-100 font-bold text-blue-600' : 'opacity-0 group-hover:opacity-100 text-slate-600'}`;
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end space-y-3 pointer-events-auto">
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center space-x-3 focus:outline-none"
            title={sec.label}
          >
            {/* Titre affiché uniquement au survol ou sur grands écrans */}
            <span className={getLabelStyle(isActive)}>
              {sec.label}
            </span>

            {/* Point indicateur (Anchor Dot) */}
            <div className={getDotStyle(isActive)} />
          </button>
        );
      })}
    </div>
  );
};
