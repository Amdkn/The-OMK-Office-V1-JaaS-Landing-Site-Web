import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Lock, Shield, UserCheck, Compass, ArrowRight, 
  CheckCircle2, Sparkles, FileText, Stamp, CreditCard, 
  Clock, FolderLock, Share2, Layers, ChevronRight
} from "lucide-react";
import { useUser, PersonaRole } from "../../contexts/UserContext";
import { PageView } from "../../types";

interface BackOfficeAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccess: (role: PersonaRole) => void;
}

export function BackOfficeAccessModal({
  isOpen,
  onClose,
  onSelectAccess
}: BackOfficeAccessModalProps) {
  const { activePersona } = useUser();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden z-10 flex flex-col my-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-white tracking-tight">
                    Portail Back-Office OS
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    3 ACCÈS DISPONIBLES
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sélectionnez votre espace pour accéder au Dashboard adapté à votre profil
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Grid: 3 Accesses */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/40">
            {/* 1. VISITEUR */}
            <div 
              onClick={() => onSelectAccess("visiteur")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                activePersona === "visiteur"
                  ? "bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/40 shadow-lg shadow-amber-950/30"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-white/10 hover:border-amber-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Accès Public
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                    Espace Visiteur
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Découverte & orientation pour nouveaux arrivants et prospects.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Diagnostic Initial en 4 étapes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Catalogue interactif 75 Actes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Simulateur JaaS $0 Net ($300/an)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Checklist gratuite 12 pièces</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>Entrer en Découverte</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. CLIENT */}
            <div 
              onClick={() => onSelectAccess("client")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                activePersona === "client"
                  ? "bg-emerald-950/30 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/30"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-white/10 hover:border-emerald-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Bénéficiaire
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                    Espace Client
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Logistique opérationnelle pour les bénéficiaires avec dossier actif.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Tracker I-589 / I-765 (J-15 USCIS)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Coffre-fort Scellé (Vault 8 CFR)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Espace Ambassadeur (+$50/parrainage)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Alertes & Convocations Biométriques</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Mon Suivi Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. STAFF / OPS */}
            <div 
              onClick={() => onSelectAccess("staff")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                activePersona === "staff"
                  ? "bg-purple-950/30 border-purple-500/60 ring-1 ring-purple-500/40 shadow-lg shadow-purple-950/30"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-white/10 hover:border-purple-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    RLS Niveau 4
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                    Cockpit Staff / Ops
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Administration, adjudication légale, notariat & supervision.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>File d'Intake SOP-LD05 & OCR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Dossiers Asile & 1 NOID critique (5j)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Banc d'Assermentation Notary Public</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Métriques de conformité SLA & Stripe</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/20"
                >
                  <span>Ouvrir le Cockpit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between text-[11px] text-slate-400 px-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hub Cincinnati actif · Permanences physiques 09h00 - 18h00 EST</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white font-semibold transition-colors"
            >
              Continuer sur le site public
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
