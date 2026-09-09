import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Lock, Shield, UserCheck, KeyRound, ArrowRight, 
  AlertCircle, CheckCircle2, Building2, User, FileText
} from "lucide-react";
import { useUser } from "../../contexts/UserContext";

interface AuthAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'client' | 'staff';
}

export function AuthAccessModal({ isOpen, onClose, defaultTab = 'client' }: AuthAccessModalProps) {
  const { loginAsClient, loginAsStaff, currentRole, logout } = useUser();
  const [activeTab, setActiveTab] = useState<'client' | 'staff'>(defaultTab);

  // Client form state
  const [clientId, setClientId] = useState("USCIS-CIN-2026-8841");
  const [clientPin, setClientPin] = useState("••••");

  // Staff form state
  const [staffPasscode, setStaffPasscode] = useState("");
  const [staffError, setStaffError] = useState("");
  const [staffSuccess, setStaffSuccess] = useState(false);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
    setStaffError("");
    setStaffSuccess(false);
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsClient(clientId);
    onClose();
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError("");
    const res = loginAsStaff(staffPasscode);
    if (res.success) {
      setStaffSuccess(true);
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setStaffError(res.message || "Code d'habilitation invalide.");
    }
  };

  const handleDemoFillClient = () => {
    setClientId("USCIS-CIN-2026-8841");
    setClientPin("1234");
  };

  const handleDemoFillStaff = () => {
    setStaffPasscode("OMK-2026-STAFF");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden z-10 flex flex-col my-auto text-slate-100"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Portail d'Accès Sécurisé</span>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    SÉPARATION DES RÔLES
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Authentification cloisonnée pour Bénéficiaires et Collaborateurs
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector: Client vs Staff */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('client');
                setStaffError("");
              }}
              className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>Espace Client Titulaire</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('staff');
                setStaffError("");
              }}
              className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-purple-300" />
              <span>Accès Staff / Cabinet</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* CURRENT USER STATUS IF ALREADY LOGGED IN */}
            {currentRole !== 'visiteur' && (
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <span className="text-slate-300">Session active : </span>
                    <strong className="text-white capitalize">{currentRole}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 font-bold transition-colors cursor-pointer"
                >
                  Se Déconnecter
                </button>
              </div>
            )}

            {/* TAB 1: CLIENT AUTHENTICATION */}
            {activeTab === 'client' && (
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accès Bénéficiaires & Dossiers en Cours</span>
                  </div>
                  <p className="text-[11px] text-emerald-300/80">
                    Consultez l'avancement de vos formulaires (I-589 / I-765), téléchargez vos actes scellés 8 CFR et suivez vos alertes USCIS.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Numéro de Dossier USCIS ou E-mail
                  </label>
                  <input
                    type="text"
                    required
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Ex: USCIS-CIN-2026-8841 ou jm.lelo@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Code Secret / PIN Personnel
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Reçu par SMS lors de l'Intake
                    </span>
                  </div>
                  <input
                    type="password"
                    value={clientPin}
                    onChange={(e) => setClientPin(e.target.value)}
                    placeholder="••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    type="button"
                    onClick={handleDemoFillClient}
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 cursor-pointer"
                  >
                    Remplir avec le Dossier Démo (Jean-Marc Lelo)
                  </button>
                  <span className="text-slate-500 font-mono">Partition auth.uid()</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Accéder à Mon Espace Client</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 2: STAFF / OPS AUTHENTICATION */}
            {activeTab === 'staff' && (
              <form onSubmit={handleStaffSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs leading-relaxed space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-purple-300">
                    <Shield className="w-4 h-4" />
                    <span>Zone Réservée aux Juristes & Collaborateurs</span>
                  </div>
                  <p className="text-[11px] text-purple-300/80">
                    Accès au Cockpit d'adjudication, à la file d'Intake SOP-LD05, au banc d'assermentation Ohio et aux métriques du cabinet.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Code d'Habilitation Collaborateur / Clé Staff
                    </label>
                    <span className="text-[10px] text-purple-400 font-mono">
                      Clé: OMK-2026-STAFF
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={staffPasscode}
                      onChange={(e) => {
                        setStaffPasscode(e.target.value);
                        setStaffError("");
                      }}
                      placeholder="Entrez le code d'accès Staff (ex: OMK-2026-STAFF)"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  </div>
                </div>

                {staffError && (
                  <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{staffError}</span>
                  </div>
                )}

                {staffSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Habilitation vérifiée avec succès. Connexion au Cockpit...</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    type="button"
                    onClick={handleDemoFillStaff}
                    className="text-purple-400 hover:text-purple-300 underline underline-offset-2 cursor-pointer"
                  >
                    Insérer la Clé de Démo Staff (M. Alexandre K.)
                  </button>
                  <span className="text-slate-500 font-mono">RLS Niveau 4</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Shield className="w-4 h-4" />
                  <span>Déverrouiller le Cockpit Staff</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400 px-6">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Cabinet The OMK Office · Hub Cincinnati</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
            >
              Continuer en Visiteur Public
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
