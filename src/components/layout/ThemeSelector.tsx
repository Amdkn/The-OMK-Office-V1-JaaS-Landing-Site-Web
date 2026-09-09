import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Pin, PinOff, X, Check, Sparkles } from 'lucide-react';
import { useTheme, THEME_OPTIONS, ThemeMode } from '../../contexts/ThemeContext';

export function ThemeSelector() {
  const { 
    theme, 
    setTheme, 
    isThemePanelOpen, 
    setIsThemePanelOpen, 
    isThemePinned, 
    setIsThemePinned 
  } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  // Outside click handler (only closes when NOT pinned)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isThemePinned) return; // Keep persistent if pinned!
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsThemePanelOpen(false);
      }
    };

    if (isThemePanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemePanelOpen, isThemePinned, setIsThemePanelOpen]);

  const activeThemeObj = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      {/* Trigger Button: Compact and clean icon button */}
      <button
        type="button"
        onClick={() => setIsThemePanelOpen(!isThemePanelOpen)}
        className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all border shadow-xs cursor-pointer ${
          isThemePanelOpen
            ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-500/30'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
        }`}
        title={`Thème actif : ${theme.replace('-', ' ')} (Cliquer pour changer)`}
        aria-expanded={isThemePanelOpen}
      >
        <Palette className={`w-3.5 h-3.5 ${isThemePanelOpen ? 'text-slate-950' : 'text-amber-500'}`} />
        <span 
          className="absolute bottom-1 right-1 w-2 h-2 rounded-full ring-1 ring-white/70" 
          style={{ backgroundColor: activeThemeObj.accentColor }} 
        />
        {isThemePinned && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full ring-1 ring-white" />
        )}
      </button>

      {/* Persistent Theme Window */}
      <AnimatePresence>
        {isThemePanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 z-50 overflow-hidden text-slate-100"
            style={{ right: '0' }}
          >
            {/* Header: Title, Pin toggle, Close button */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Palette className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white tracking-tight flex items-center gap-1.5">
                    Thèmes Visuels
                    {isThemePinned && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ÉPINGLÉ
                      </span>
                    )}
                  </h3>
                  <p className="text-[9.5px] text-slate-400">
                    5 ambiances graphiques
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Pin / Persist Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsThemePinned(!isThemePinned)}
                  className={`p-1.5 rounded-xl text-xs transition-all border ${
                    isThemePinned
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/5'
                  }`}
                  title={isThemePinned ? "Détacher (se fermera au clic extérieur)" : "Épingler la fenêtre (reste ouverte pendant la navigation)"}
                >
                  {isThemePinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsThemePanelOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition-colors"
                  title="Fermer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List of Themes */}
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer border ${
                      isSelected
                        ? 'bg-white/15 border-amber-400/80 shadow-md ring-1 ring-amber-400/40'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Mini Swatch */}
                      <div 
                        className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${opt.previewBg} ${opt.previewBorder}`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: opt.accentColor }} 
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                            {opt.name}
                          </span>
                          {opt.id === 'glassmorphism' && (
                            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                              DÉFAUT
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 group-hover:text-slate-300 truncate mt-0.5">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/40" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-400">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Persistance permanente (localStorage)</span>
              </span>
              <button
                type="button"
                onClick={() => setTheme('glassmorphism')}
                className="hover:text-amber-300 transition-colors text-[9.5px] underline decoration-white/20 hover:decoration-amber-300"
              >
                Réinitialiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
