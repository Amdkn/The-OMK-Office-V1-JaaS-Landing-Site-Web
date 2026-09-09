import React, { useState, useRef, useEffect } from "react";
import { useUser, UserRole } from "../../contexts/UserContext";
import { 
  Shield, Briefcase, UserCheck, Compass, ChevronDown, 
  Calendar, KeyRound, Building2, User, LayoutDashboard,
  LogOut, Lock, CheckCircle2, ArrowRight
} from "lucide-react";

interface UserProfileButtonProps {
  onOpenBookingModal: () => void;
  onNavigateToDashboard?: () => void;
}

export function UserProfileButton({ onOpenBookingModal, onNavigateToDashboard }: UserProfileButtonProps) {
  const { currentUser, currentRole, logout, openAuthModal, openProfile } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          icon: <Shield className="w-3.5 h-3.5 text-purple-400" />,
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          pillText: "Staff / Direction",
          buttonBg: "hover:border-purple-500/50 bg-slate-900/90 text-purple-100",
          dotColor: "bg-purple-500",
          roleType: "Personnel Habilité"
        };
      case 'employer':
        return {
          icon: <Briefcase className="w-3.5 h-3.5 text-blue-400" />,
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          pillText: "Staff Ops",
          buttonBg: "hover:border-blue-500/50 bg-slate-900/90 text-blue-100",
          dotColor: "bg-blue-500",
          roleType: "Gestionnaire Dossiers"
        };
      case 'client':
        return {
          icon: <UserCheck className="w-3.5 h-3.5 text-emerald-400" />,
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          pillText: "Client Titulaire",
          buttonBg: "hover:border-emerald-500/50 bg-slate-900/90 text-emerald-100",
          dotColor: "bg-emerald-500",
          roleType: "Espace Bénéficiaire"
        };
      case 'visiteur':
      default:
        return {
          icon: <Compass className="w-3.5 h-3.5 text-amber-400" />,
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          pillText: "Visiteur",
          buttonBg: "hover:border-amber-500/50 bg-slate-900/90 text-amber-100",
          dotColor: "bg-amber-500",
          roleType: "Accès Public"
        };
    }
  };

  const config = getRoleConfig(currentRole);

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      {/* Unified User Profile Button */}
      <div className="inline-flex items-center rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md p-1 hover:border-slate-500 transition-all">
        
        {/* Main Profile Trigger */}
        <button
          onClick={() => {
            if (currentRole === 'visiteur') {
              setDropdownOpen(!dropdownOpen);
            } else {
              openProfile('profile');
            }
          }}
          className="flex items-center gap-2 px-2 sm:px-2.5 py-1 text-left transition-colors group cursor-pointer"
          title={`Profil : ${currentUser.name} (${config.pillText})`}
        >
          {/* Avatar with Status indicator */}
          <div className="relative flex items-center justify-center">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${currentUser.avatarBg}`}>
              {currentUser.initials}
            </div>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 ${config.dotColor}`} />
          </div>

          {/* User Name & Role Pill */}
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                {currentRole === 'visiteur' ? 'Accès Public' : currentUser.name.split(' ')[0]}
              </span>
              <span className={`text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded border ${config.badgeColor}`}>
                {config.pillText}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {config.roleType}
            </span>
          </div>
        </button>

        {/* Dropdown Toggle */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          title="Ouvrir le menu d'accès"
          aria-label="Menu d'accès et de connexion"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-white' : ''}`} />
        </button>

        {/* Direct Action for Public / Client */}
        {currentRole === 'visiteur' ? (
          <button
            onClick={() => openAuthModal('client')}
            className="ml-1 hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all cursor-pointer"
            title="Connexion à votre dossier client"
          >
            <Lock className="w-3 h-3" />
            <span>Espace Client</span>
          </button>
        ) : (
          <button
            onClick={onOpenBookingModal}
            className="ml-1 hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm transition-all cursor-pointer"
            title="Prendre rendez-vous / Book a Call"
          >
            <Calendar className="w-3 h-3" />
            <span>RDV Guichet</span>
          </button>
        )}
      </div>

      {/* Structured, Secure Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl p-2.5 z-50 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header depending on role */}
          <div className="px-3 py-2 border-b border-slate-800">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>{config.roleType}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] border ${config.badgeColor}`}>
                {config.pillText}
              </span>
            </div>
            <div className="text-xs font-bold text-white mt-1">{currentUser.name}</div>
            <div className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</div>
          </div>

          {/* VISITEUR VIEW: AUTHENTICATION ENTRANCES */}
          {currentRole === 'visiteur' && (
            <div className="py-2 space-y-1.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 pb-0.5">
                Authentification & Portails Dédiés
              </div>

              {/* Door 1: Espace Client */}
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  openAuthModal('client');
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Connexion Espace Client
                    </div>
                    <div className="text-[10px] text-emerald-400/80">
                      Suivi Dossier (I-589 / I-765) & Vault
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              {/* Door 2: Staff / Cabinet (Restricted) */}
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  openAuthModal('staff');
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-950/70 border border-purple-500/30 text-purple-200 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 flex items-center gap-1.5">
                      <span>Accès Collaborateurs Staff</span>
                      <span className="text-[9px] px-1 rounded bg-purple-900 text-purple-300 border border-purple-700">Code</span>
                    </div>
                    <div className="text-[10px] text-purple-400/80">
                      Cockpit d'Adjudication & SOP-LD05
                    </div>
                  </div>
                </div>
                <Lock className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          )}

          {/* CLIENT VIEW: AUTHENTICATED ACTIONS */}
          {currentRole === 'client' && (
            <div className="py-2 space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 pb-0.5">
                Espace Client Partitionné
              </div>

              {onNavigateToDashboard && (
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onNavigateToDashboard();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-950/40 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mon Suivi Dossier & Documents Scellés</span>
                </button>
              )}

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  openProfile('profile');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Détails de mon Compte Bénéficiaire</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl flex items-center gap-2.5 border border-rose-900/40 mt-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Se Déconnecter de l'Espace Client</span>
              </button>
            </div>
          )}

          {/* STAFF / DIRECTION VIEW: SECURE ACTIONS */}
          {(currentRole === 'admin' || currentRole === 'employer') && (
            <div className="py-2 space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 px-3 pb-0.5">
                Cockpit Staff (RLS Niveau 4)
              </div>

              {onNavigateToDashboard && (
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onNavigateToDashboard();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-purple-300 hover:bg-purple-950/40 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Cockpit d'Opérations & Intake</span>
                </button>
              )}

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  openProfile('profile');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Habilitation Juridique & Audit</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl flex items-center gap-2.5 border border-rose-900/40 mt-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Fermer la Session Staff</span>
              </button>
            </div>
          )}

          {/* SHARED PUBLIC SERVICES */}
          <div className="pt-2 border-t border-slate-800 space-y-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                openProfile('office');
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Bureau & Permanence (Civic Center Dr)</span>
            </button>

            <button
              onClick={() => {
                setDropdownOpen(false);
                onOpenBookingModal();
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Prendre Rendez-vous (Book a Call)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
