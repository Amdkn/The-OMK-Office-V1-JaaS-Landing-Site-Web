import React, { useState, useRef, useEffect } from "react";
import { useUser, UserRole, PersonaRole } from "../../contexts/UserContext";
import { Compass, UserCheck, Shield, ChevronDown, Check, Sparkles, Layers } from "lucide-react";

export type { PersonaRole };

export interface RoleOption {
  id: PersonaRole;
  userRole: UserRole;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  activeBg: string;
  activeText: string;
  ringColor: string;
  badge: string;
  dotColor: string;
  description: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'visiteur',
    userRole: 'visiteur',
    label: 'Visiteur',
    shortLabel: 'Visiteur',
    tagline: 'Découverte & Diagnostic',
    icon: Compass,
    activeBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
    activeText: 'text-slate-950 font-black',
    ringColor: 'ring-amber-400',
    badge: 'PROSPECT',
    dotColor: 'bg-amber-500',
    description: 'Catalogue des 75 actes, simulateur $0 Net et checklist gratuite'
  },
  {
    id: 'client',
    userRole: 'client',
    label: 'Client',
    shortLabel: 'Client',
    tagline: 'Bénéficiaire & Vault',
    icon: UserCheck,
    activeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    activeText: 'text-white font-bold',
    ringColor: 'ring-emerald-400',
    badge: 'ACTIF',
    dotColor: 'bg-emerald-500',
    description: 'Suivi logistique direct (I-589), coffre-fort scellé et parrainage'
  },
  {
    id: 'staff',
    userRole: 'admin',
    label: 'Staff/Ops',
    shortLabel: 'Staff',
    tagline: 'Intake & Adjudication',
    icon: Shield,
    activeBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    activeText: 'text-white font-bold',
    ringColor: 'ring-purple-400',
    badge: 'BACK-OFFICE',
    dotColor: 'bg-purple-500',
    description: 'File intake SOP-LD05, banc 8 CFR, alertes NOID/RFE et facturation'
  }
];

export interface RoleSwitcherProps {
  activeRole?: PersonaRole | UserRole;
  onRoleChange?: (role: PersonaRole) => void;
  className?: string;
  showModeLabel?: boolean;
}

export function RoleSwitcher({ 
  activeRole: controlledRole, 
  onRoleChange, 
  className = "",
  showModeLabel = false
}: RoleSwitcherProps) {
  // Try to use UserContext safely
  const userContext = useUser();
  const contextRole = userContext?.activeRole || userContext?.currentRole;
  const setContextRole = userContext?.setRole;

  // Local state for activeRole to guarantee self-contained local state when needed
  const [internalRole, setInternalRole] = useState<PersonaRole>(() => {
    if (controlledRole) {
      return (controlledRole === 'visiteur' || controlledRole === 'client') ? controlledRole : 'staff';
    }
    if (contextRole) {
      return (contextRole === 'visiteur' || contextRole === 'client') ? contextRole : 'staff';
    }
    try {
      const saved = localStorage.getItem('omk_active_role');
      if (saved === 'visiteur' || saved === 'client') return saved;
      if (saved === 'admin' || saved === 'staff') return 'staff';
    } catch {
      // ignore
    }
    return 'visiteur';
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [justSwitched, setJustSwitched] = useState<PersonaRole | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal role if controlled prop or context changes
  useEffect(() => {
    if (controlledRole) {
      const resolved: PersonaRole = (controlledRole === 'visiteur' || controlledRole === 'client') ? controlledRole : 'staff';
      setInternalRole(resolved);
    } else if (contextRole) {
      const resolved: PersonaRole = (contextRole === 'visiteur' || contextRole === 'client') ? contextRole : 'staff';
      setInternalRole(resolved);
    }
  }, [controlledRole, contextRole]);

  // Current active role
  const effectiveRole: PersonaRole = controlledRole
    ? ((controlledRole === 'visiteur' || controlledRole === 'client') ? controlledRole : 'staff')
    : internalRole;

  const currentOption = ROLE_OPTIONS.find(r => r.id === effectiveRole) || ROLE_OPTIONS[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRole = (option: RoleOption) => {
    setInternalRole(option.id);
    setJustSwitched(option.id);
    setDropdownOpen(false);

    // Save to localStorage
    try {
      localStorage.setItem('omk_active_role', option.userRole);
    } catch {
      // ignore
    }

    // Update Context if available
    if (setContextRole) {
      setContextRole(option.userRole);
    }

    // Call callback prop
    onRoleChange?.(option.id);

    // Clear flash notification after 1.2s
    setTimeout(() => {
      setJustSwitched(null);
    }, 1200);
  };

  return (
    <div 
      className={`relative inline-flex items-center gap-1.5 ${className}`} 
      ref={dropdownRef}
      id="omk-header-role-switcher"
    >
      {showModeLabel && (
        <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-slate-500 mr-0.5">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>Mode :</span>
        </span>
      )}

      {/* DESKTOP / TABLET SEGMENTED PILL (Visible on sm screens and up) */}
      <div 
        role="radiogroup" 
        aria-label="Sélecteur de mode opérationnel (Visiteur, Client, Staff/Ops)"
        className="hidden sm:inline-flex items-center p-1 bg-slate-100/95 border border-slate-200/90 rounded-full shadow-inner backdrop-blur-md transition-all"
      >
        {ROLE_OPTIONS.map((option) => {
          const isActive = effectiveRole === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => handleSelectRole(option)}
              title={`${option.label} (${option.tagline}) : ${option.description}`}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? `${option.activeBg} ${option.activeText} shadow-md shadow-slate-900/15 ring-1 ${option.ringColor} scale-[1.02]`
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'opacity-100' : 'text-slate-500'}`} />
              
              <span className="font-bold tracking-tight whitespace-nowrap">
                {option.label}
              </span>

              {isActive && (
                <span className="hidden xl:inline-block text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-black/20 text-white/95">
                  {option.badge}
                </span>
              )}

              {justSwitched === option.id && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* MOBILE TRIGGER BUTTON (Visible on mobile < sm screens) */}
      <div className="sm:hidden inline-flex items-center">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-sm ${
            effectiveRole === 'visiteur'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : effectiveRole === 'client'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-purple-50 border-purple-300 text-purple-900'
          }`}
          title="Changer de mode (Visiteur / Client / Staff/Ops)"
          aria-expanded={dropdownOpen}
        >
          <span className={`w-2 h-2 rounded-full ${currentOption.dotColor} animate-pulse`}></span>
          <currentOption.icon className="w-3.5 h-3.5 shrink-0" />
          <span className="max-w-[70px] truncate">{currentOption.shortLabel}</span>
          <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Dropdown Overlay Menu */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
              <span>Mode Opérationnel</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>

            {ROLE_OPTIONS.map((option) => {
              const isActive = effectiveRole === option.id;
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectRole(option)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                    isActive
                      ? `${option.activeBg} ${option.activeText} shadow-sm`
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">{option.label}</div>
                      {isActive && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`text-[11px] truncate ${isActive ? 'opacity-90' : 'text-slate-500'}`}>
                      {option.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
