import { useState, useEffect } from "react";
import { useUser, UserRole, DEMO_PROFILES } from "../../contexts/UserContext";
import { 
  X, Shield, Briefcase, UserCheck, Compass, CheckCircle2, Lock, 
  Building2, MapPin, Phone, Clock, FileText, ArrowRight, 
  ExternalLink, KeyRound, Sparkles, ChevronRight, Share2, Calendar,
  LogOut, AlertTriangle
} from "lucide-react";

interface UserProfileModalProps {
  onOpenBookingModal: () => void;
}

export function UserProfileModal({ onOpenBookingModal }: UserProfileModalProps) {
  const { 
    currentUser, 
    currentRole, 
    isProfileOpen, 
    activeProfileTab, 
    openProfile, 
    closeProfile,
    openAuthModal,
    logout
  } = useUser();

  const [activeTab, setActiveTab] = useState<'profile' | 'roles' | 'office'>(activeProfileTab);
  const [copiedReferral, setCopiedReferral] = useState(false);

  useEffect(() => {
    setActiveTab(activeProfileTab);
  }, [activeProfileTab]);

  // Sync state if activeProfileTab changes externally
  if (!isProfileOpen) return null;

  const handleCopyReferral = (code: string) => {
    navigator.clipboard.writeText(`https://theomkoffice.com?ref=${code}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5 text-purple-400" />;
      case 'employer':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'client':
        return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'visiteur':
      default:
        return <Compass className="w-5 h-5 text-amber-400" />;
    }
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case 'employer':
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case 'client':
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case 'visiteur':
      default:
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={closeProfile}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('office')}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-900/60 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>CINCINNATI HUB · EN LIGNE</span>
            </button>
            <span className="text-xs text-slate-500 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">Tenant: {currentUser.tenantId}</span>
          </div>

          <button 
            onClick={closeProfile}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Identity Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border-2 shadow-lg ${currentUser.avatarBg}`}>
                {currentUser.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">
                    {currentRole === 'visiteur' ? 'Visiteur Public' : currentUser.name}
                  </h2>
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full border ${getRoleBadgeStyle(currentRole)}`}>
                    {currentUser.roleBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{currentUser.roleTitleFr}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                  <span>{currentUser.email}</span>
                  <span>•</span>
                  <span>{currentUser.officeCity}</span>
                </div>
              </div>
            </div>

            {/* Switch Role / Auth Fast Pill */}
            {currentRole === 'visiteur' ? (
              <button
                onClick={() => {
                  closeProfile();
                  openAuthModal('client');
                }}
                className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Connexion Espace Client</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeProfile();
                }}
                className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Se Déconnecter</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {getRoleIcon(currentRole)}
            <span>Espace {currentUser.roleBadge}</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'roles'
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Sécurité & Cloisonnement</span>
          </button>
          <button
            onClick={() => setActiveTab('office')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'office'
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Active Office Cincinnati</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          {/* TAB 1: Profile & Role Specific Capabilities */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Role-Specific Banner */}
              {currentRole === 'admin' && (
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                        Périmètre Super Admin & Direction
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700">
                      75/75 ACTES DÉVERROUILLÉS
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Vous disposez de l'accès souverain sur l'ensemble du tenant Cincinnati. Vous pouvez auditer les requêtes PostgreSQL RLS, superviser les 3 pôles opérationnels et affecter les rôles de l'équipe.
                  </p>
                  <div className="mt-3 pt-3 border-t border-purple-900/60 flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-purple-900/50 px-2.5 py-1 rounded text-purple-300">
                      🔐 {currentUser.securityClearance}
                    </span>
                    <span className="text-[11px] font-mono bg-purple-900/50 px-2.5 py-1 rounded text-purple-300">
                      ⚡ 14 Politiques RLS actives
                    </span>
                  </div>
                </div>
              )}

              {currentRole === 'employer' && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
                        Console Opérateur & Case Manager
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700">
                      FILE : 14 DOSSIERS
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    Affectation sur les dossiers Pôle 1 (Immigration 8 CFR) et Pôle 3 (Dispatch CVG Hub). Vous êtes habilitée pour l'assermentation des traductions et la transmission des preuves scellées.
                  </p>
                  <div className="mt-3 pt-3 border-t border-blue-900/60 flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-blue-900/50 px-2.5 py-1 rounded text-blue-300">
                      📋 3 traductions en attente de visa
                    </span>
                    <span className="text-[11px] font-mono bg-blue-900/50 px-2.5 py-1 rounded text-blue-300">
                      📍 Présence physique : Bureau Cincinnati
                    </span>
                  </div>
                </div>
              )}

              {currentRole === 'client' && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                        Espace Bénéficiaire · Dossier Actif
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 border border-emerald-700">
                      SCELLÉ 8 CFR
                    </span>
                  </div>
                  <div className="text-xs text-emerald-200/90 space-y-1">
                    <div className="font-bold">Dossier N° : <span className="font-mono text-emerald-300">{currentUser.caseNumber}</span></div>
                    <div>Catégorie : {currentUser.caseCategory}</div>
                    <div className="text-emerald-400/90 font-mono text-[11px] mt-1">Status : {currentUser.caseStatus}</div>
                  </div>

                  {/* Parrainage "Zéro Dollar" Card */}
                  <div className="mt-3 pt-3 border-t border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-900/20 p-3 rounded-xl">
                    <div>
                      <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Programme "Zéro Dollar" (Parrainage $50)
                      </div>
                      <div className="text-[10px] text-emerald-400/80">
                        Solde acquis : <strong className="text-white">${currentUser.referralEarnings}</strong> (3 filleuls / 6 pour amortissement 100%)
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyReferral(currentUser.referralCode || 'LELO-50')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold font-mono transition-colors shrink-0"
                    >
                      <Share2 className="w-3 h-3" />
                      {copiedReferral ? "Lien Copié !" : "Code : " + currentUser.referralCode}
                    </button>
                  </div>
                </div>
              )}

              {currentRole === 'visiteur' && (
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                        Mode Consultation & Visiteur Public
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-700">
                      GUEST SANDBOX
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    Vous explorez actuellement le portail The OMK Office en accès libre. Vous pouvez tester nos simulateurs d'actes (Pôle 1, 2 et 3) et réserver un appel ou une consultation physique au bureau de Cincinnati.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        closeProfile();
                        onOpenBookingModal();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Prendre Rendez-vous au Bureau (Book a Call)
                    </button>
                    <button
                      onClick={() => setActiveTab('roles')}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-800/50 text-amber-300 border border-amber-700/60 font-bold text-xs transition-all"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Tester un profil Client ou Employé
                    </button>
                  </div>
                </div>
              )}

              {/* Permissions Grid */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  Politiques d'Accès & Permissions RLS (PostgreSQL)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    currentUser.permissions.canViewAllCases ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200" : "bg-slate-950/40 border-slate-800 text-slate-400"
                  }`}>
                    <span>Lecture globale des dossiers (Tenant)</span>
                    {currentUser.permissions.canViewAllCases ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    currentUser.permissions.canUploadDocuments ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200" : "bg-slate-950/40 border-slate-800 text-slate-400"
                  }`}>
                    <span>Téléversement de pièces scellées</span>
                    {currentUser.permissions.canUploadDocuments ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    currentUser.permissions.canAccessAdminRLS ? "bg-purple-950/20 border-purple-800/40 text-purple-200" : "bg-slate-950/40 border-slate-800 text-slate-400"
                  }`}>
                    <span>Console RLS & Audit PostgreSQL</span>
                    {currentUser.permissions.canAccessAdminRLS ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> : <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    currentUser.permissions.canAccessStaffQueue ? "bg-blue-950/20 border-blue-800/40 text-blue-200" : "bg-slate-950/40 border-slate-800 text-slate-400"
                  }`}>
                    <span>File d'instruction des actes</span>
                    {currentUser.permissions.canAccessStaffQueue ? <CheckCircle2 className="w-4 h-4 text-blue-400" /> : <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer for Tab 1 */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {(currentRole === 'client' || currentRole === 'visiteur') && (
                  <button
                    onClick={() => {
                      closeProfile();
                      onOpenBookingModal();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Prendre Rendez-vous (Book a Call)
                  </button>
                )}

                {currentRole === 'employer' && (
                  <button
                    onClick={() => {
                      closeProfile();
                      window.location.hash = "#pole1-checker";
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Accéder à la File d'Instruction (14 Dossiers)
                  </button>
                )}

                {currentRole === 'admin' && (
                  <button
                    onClick={() => {
                      closeProfile();
                      window.location.hash = "#matrix";
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    Supervision Intégrale Matrice MSG2 (75 Actes)
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('office')}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Bureau Cincinnati
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Roles & Permissions Matrix */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed">
                <div className="font-bold text-white mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Architecture d'Accès Cloisonnée (RLS & Séparation des Rôles)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Le cabinet The OMK Office applique une séparation stricte des privilèges. Les visiteurs anonymes ne peuvent pas s'identifier comme administrateur ou accéder aux dossiers clients sans authentification préalable.
                </p>
              </div>

              {/* CURRENT SESSION STATE */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  État Actuel de votre Session
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${currentUser.avatarBg}`}>
                      {currentUser.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{currentUser.name}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getRoleBadgeStyle(currentRole)}`}>
                          {currentUser.roleBadge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {currentUser.roleTitleFr}
                      </div>
                    </div>
                  </div>

                  {currentRole !== 'visiteur' && (
                    <button
                      onClick={() => {
                        logout();
                        closeProfile();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Déconnexion</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SEPARATED ACCESS TIERS */}
              <div className="space-y-3 pt-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-1">
                  Périmètres d'Accès Séparés
                </div>

                {/* Tier 1: Visiteur Public */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  currentRole === 'visiteur'
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-950/30 border-slate-800/80 opacity-70'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">Niveau 1 · Visiteur Public (Consultation Ouverte)</span>
                    </div>
                    {currentRole === 'visiteur' && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Session Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Accès au diagnostic d'éligibilité, au catalogue public des 75 actes, au simulateur $0 Net et à la prise de rendez-vous guichet.
                  </p>
                </div>

                {/* Tier 2: Espace Client */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  currentRole === 'client'
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-slate-950/30 border-slate-800/80'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Niveau 2 · Espace Client Titulaire (Dossier I-589 / I-765)</span>
                    </div>
                    {currentRole === 'client' ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Session Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded bg-emerald-950/40">
                        Accès Réservé Titulaires
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Partition souveraine <code className="text-emerald-400 font-mono">auth.uid() = client_id</code>. Coffre-fort documentaire certifié, téléchargement des actes scellés 8 CFR et suivi de dossier.
                  </p>

                  {currentRole !== 'client' && (
                    <button
                      onClick={() => {
                        closeProfile();
                        openAuthModal('client');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>S'identifier comme Client (Numéro de Dossier / PIN)</span>
                    </button>
                  )}
                </div>

                {/* Tier 3: Staff & Collaborateurs */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  (currentRole === 'admin' || currentRole === 'employer')
                    ? 'bg-purple-950/30 border-purple-500/50'
                    : 'bg-slate-950/30 border-slate-800/80'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold text-white">Niveau 3 · Direction & Collaborateurs Staff (Habilité RLS-4)</span>
                    </div>
                    {(currentRole === 'admin' || currentRole === 'employer') ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Session Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-purple-400 border border-purple-800/60 px-2 py-0.5 rounded bg-purple-950/40">
                        Clé Staff Requise
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Zone réservée au personnel assermenté. Pilotage des adjudications, file de triage SOP-LD05, banc d'assermentation Ohio et audit des accès multi-tenants.
                  </p>

                  {currentRole !== 'admin' && currentRole !== 'employer' && (
                    <button
                      onClick={() => {
                        closeProfile();
                        openAuthModal('staff');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                      <span>Authentification Staff / Collaborateur (Code personnel)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Active Office Cincinnati */}
          {activeTab === 'office' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <h3 className="text-sm font-bold text-white">Bureau Central · Cincinnati, Ohio</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded border border-emerald-700">
                    HUB OPÉRATIONNEL ACTIF
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Adresse Physique :</span><br />
                      2600 Civic Center Drive, Cincinnati, OH 45216 (États-Unis)
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Horaires de Permanence :</span><br />
                      Lundi au Vendredi : 08:00 - 18:30 EST (Accueil & Assermentation)
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Standard & Hotline Légale :</span><br />
                      +1 (513) 984-8000 / Direct Legal Desk : ext. 104
                    </div>
                  </div>
                </div>
              </div>

              {/* Guichet Services */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Services Disponibles au Bureau de Cincinnati :
                </h4>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Légalisation et sceau notarié sur place (Actes 1.1 à 1.5)</li>
                  <li>Scan et certification conforme des actes originaux (Traduction 8 CFR)</li>
                  <li>Enrôlement physique pour les packages JaaS ($300/an), BaaS ($720) et PaaS</li>
                  <li>Remise des badges Ambassadeur et activation du code de suivi parrainage</li>
                </ul>

                <button
                  onClick={() => {
                    closeProfile();
                    onOpenBookingModal();
                  }}
                  className="w-full mt-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Réserver un Créneau au Bureau de Cincinnati
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-between px-6">
          <span className="font-mono">OMK Security Kernel · RLS Partitionnée</span>
          <span className="text-slate-400">Rôle Actif : <strong className="text-slate-200 font-mono capitalize">{currentRole}</strong></span>
        </div>
      </div>
    </div>
  );
}
