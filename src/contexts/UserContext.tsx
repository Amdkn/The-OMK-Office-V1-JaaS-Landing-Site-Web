import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = 'admin' | 'employer' | 'client' | 'visiteur';

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitleFr: string;
  roleTitleEn: string;
  roleBadge: string;
  avatarBg: string;
  initials: string;
  phone: string;
  tenantId: string;
  tenantName: string;
  officeCity: string;
  officeAddress: string;
  officeHours: string;
  officePhone: string;
  // Role specific details
  caseNumber?: string;
  caseCategory?: string;
  caseStatus?: string;
  assignedCasesCount?: number;
  unreviewedTranslations?: number;
  referralCode?: string;
  referralEarnings?: number;
  securityClearance?: string;
  rlsPoliciesCount?: number;
  // Permissions boolean flags
  permissions: {
    canViewAllCases: boolean;
    canEditCases: boolean;
    canUploadDocuments: boolean;
    canAccessAdminRLS: boolean;
    canAccessStaffQueue: boolean;
    canBookAppointments: boolean;
    canManageTeam: boolean;
  };
}

export const DEMO_PROFILES: Record<UserRole, UserProfileData> = {
  admin: {
    id: "usr-admin-01",
    name: "M. Alexandre K.",
    email: "alexandre.k@theomkoffice.com",
    role: "admin",
    roleTitleFr: "Directeur de Cabinet & Super Admin",
    roleTitleEn: "Managing Partner & Super Admin",
    roleBadge: "ADMIN / OWNER",
    avatarBg: "bg-purple-600 text-white border-purple-400",
    initials: "AK",
    phone: "+1 (513) 984-8001",
    tenantId: "cincinnati-hub-hq",
    tenantName: "The OMK Office · Hub Central Cincinnati",
    officeCity: "Cincinnati, OH",
    officeAddress: "2600 Civic Center Drive, Cincinnati, OH 45216",
    officeHours: "Lun - Ven : 08:00 - 18:30 EST",
    officePhone: "+1 (513) 984-8000",
    securityClearance: "Niveau 4 · Kernel RLS Bypass & Audit",
    rlsPoliciesCount: 14,
    permissions: {
      canViewAllCases: true,
      canEditCases: true,
      canUploadDocuments: true,
      canAccessAdminRLS: true,
      canAccessStaffQueue: true,
      canBookAppointments: true,
      canManageTeam: true,
    }
  },
  employer: {
    id: "usr-emp-08",
    name: "Sarah Jenkins",
    email: "s.jenkins@theomkoffice.com",
    role: "employer",
    roleTitleFr: "Case Manager & Traductrice Assermentée",
    roleTitleEn: "Case Manager & Certified Translator",
    roleBadge: "EMPLOYEUR / STAFF",
    avatarBg: "bg-blue-600 text-white border-blue-400",
    initials: "SJ",
    phone: "+1 (513) 984-8004",
    tenantId: "cincinnati-hub-hq",
    tenantName: "The OMK Office · Hub Central Cincinnati",
    officeCity: "Cincinnati, OH",
    officeAddress: "2600 Civic Center Drive, Cincinnati, OH 45216",
    officeHours: "Lun - Ven : 08:30 - 17:30 EST",
    officePhone: "+1 (513) 984-8000",
    assignedCasesCount: 14,
    unreviewedTranslations: 3,
    securityClearance: "Niveau 2 · Opérateur Légal 8 CFR",
    permissions: {
      canViewAllCases: true,
      canEditCases: true,
      canUploadDocuments: true,
      canAccessAdminRLS: false,
      canAccessStaffQueue: true,
      canBookAppointments: true,
      canManageTeam: false,
    }
  },
  client: {
    id: "usr-cli-442",
    name: "Jean-Marc Lelo",
    email: "jm.lelo@gmail.com",
    role: "client",
    roleTitleFr: "Client Titulaire · Dossier LELO-MUMBANDA",
    roleTitleEn: "Active Client · Case LELO-MUMBANDA",
    roleBadge: "CLIENT ACTIF",
    avatarBg: "bg-emerald-600 text-white border-emerald-400",
    initials: "JL",
    phone: "+1 (513) 402-7719",
    tenantId: "cincinnati-hub-hq",
    tenantName: "The OMK Office · Hub Central Cincinnati",
    officeCity: "Cincinnati, OH",
    officeAddress: "2600 Civic Center Drive, Cincinnati, OH 45216",
    officeHours: "Lun - Ven : 09:00 - 17:00 EST",
    officePhone: "+1 (513) 984-8000",
    caseNumber: "USCIS-CIN-2026-8841",
    caseCategory: "Asile & Régularisation Formulaire I-589 / I-765",
    caseStatus: "Actes scellés · Traduction certifiée transmise (SLA 45m)",
    referralCode: "LELO-CIN-50",
    referralEarnings: 150,
    securityClearance: "Niveau 1 · Partition Client RLS (auth.uid())",
    permissions: {
      canViewAllCases: false,
      canEditCases: false,
      canUploadDocuments: true,
      canAccessAdminRLS: false,
      canAccessStaffQueue: false,
      canBookAppointments: true,
      canManageTeam: false,
    }
  },
  visiteur: {
    id: "usr-gst-001",
    name: "Visiteur Public",
    email: "visiteur@guest.omk",
    role: "visiteur",
    roleTitleFr: "Visiteur · Consultation Libre",
    roleTitleEn: "Visitor · Open Access",
    roleBadge: "VISITEUR",
    avatarBg: "bg-slate-700 text-slate-100 border-slate-500",
    initials: "VP",
    phone: "Non renseigné",
    tenantId: "cincinnati-hub-hq",
    tenantName: "The OMK Office · Hub Central Cincinnati",
    officeCity: "Cincinnati, OH",
    officeAddress: "2600 Civic Center Drive, Cincinnati, OH 45216",
    officeHours: "Lun - Ven : 08:30 - 18:00 EST",
    officePhone: "+1 (513) 984-8000",
    securityClearance: "Accès Public · Sandbox & Diagnostic Express",
    permissions: {
      canViewAllCases: false,
      canEditCases: false,
      canUploadDocuments: false,
      canAccessAdminRLS: false,
      canAccessStaffQueue: false,
      canBookAppointments: true,
      canManageTeam: false,
    }
  }
};

export type PersonaRole = 'visiteur' | 'client' | 'staff';

interface UserContextType {
  currentUser: UserProfileData;
  currentRole: UserRole;
  activeRole: UserRole;
  activePersona: PersonaRole;
  setRole: (role: UserRole) => void;
  setActiveRole: (role: UserRole) => void;
  setActivePersona: (persona: PersonaRole) => void;
  loginAsClient: (identifier?: string) => void;
  loginAsStaff: (passcode?: string) => { success: boolean; message?: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalDefaultTab: 'client' | 'staff';
  openAuthModal: (tab?: 'client' | 'staff') => void;
  closeAuthModal: () => void;
  isProfileOpen: boolean;
  activeProfileTab: 'profile' | 'roles' | 'office';
  openProfile: (tab?: 'profile' | 'roles' | 'office') => void;
  closeProfile: () => void;
  activeDashboardTab: string;
  setActiveDashboardTab: (tab: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('omk_active_role');
      if (saved && (saved === 'visiteur' || saved === 'client' || saved === 'admin' || saved === 'employer')) {
        return saved as UserRole;
      }
    } catch {
      // ignore storage errors
    }
    return 'visiteur';
  });

  const [activeDashboardTab, setActiveDashboardTab] = useState<string>(() => {
    try {
      const savedRole = localStorage.getItem('omk_active_role');
      if (savedRole === 'client') return 'tracker';
      if (savedRole === 'admin' || savedRole === 'employer') return 'inbox';
      return 'diagnostic';
    } catch {
      return 'diagnostic';
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem('omk_active_role') as UserRole;
      if (saved && DEMO_PROFILES[saved]) {
        return DEMO_PROFILES[saved];
      }
    } catch {
      // ignore storage errors
    }
    return DEMO_PROFILES.visiteur;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'profile' | 'roles' | 'office'>('profile');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'client' | 'staff'>('client');

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_PROFILES[role]);
    if (role === 'client') setActiveDashboardTab('tracker');
    else if (role === 'admin' || role === 'employer') setActiveDashboardTab('inbox');
    else setActiveDashboardTab('diagnostic');
    try {
      localStorage.setItem('omk_active_role', role);
    } catch {
      // ignore storage errors
    }
  };

  const loginAsClient = (identifier?: string) => {
    setRole('client');
    setActiveDashboardTab('tracker');
    setIsAuthModalOpen(false);
  };

  const loginAsStaff = (passcode?: string): { success: boolean; message?: string } => {
    const cleanPass = (passcode || '').trim().toUpperCase();
    // Allow demo passcode OMK-2026-STAFF or ADMIN or STAFF or direct demo call
    if (!cleanPass || cleanPass === 'OMK-2026-STAFF' || cleanPass === 'ADMIN' || cleanPass === 'STAFF' || cleanPass === 'AK2026') {
      setRole('admin');
      setActiveDashboardTab('inbox');
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { 
      success: false, 
      message: "Code d'habilitation incorrect. Utilisez le code d'accès personnel Staff (ex: OMK-2026-STAFF)." 
    };
  };

  const logout = () => {
    setRole('visiteur');
    setActiveDashboardTab('diagnostic');
    try {
      localStorage.setItem('omk_active_role', 'visiteur');
    } catch {
      // ignore
    }
  };

  const openAuthModal = (tab: 'client' | 'staff' = 'client') => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const setActivePersona = (persona: PersonaRole) => {
    const role: UserRole = persona === 'staff' ? 'admin' : persona;
    setRole(role);
  };

  const activePersona: PersonaRole = 
    currentRole === 'visiteur' ? 'visiteur' :
    currentRole === 'client' ? 'client' : 'staff';

  const openProfile = (tab: 'profile' | 'roles' | 'office' = 'profile') => {
    setActiveProfileTab(tab);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentRole,
        activeRole: currentRole,
        activePersona,
        setRole,
        setActiveRole: setRole,
        setActivePersona,
        loginAsClient,
        loginAsStaff,
        logout,
        isAuthModalOpen,
        authModalDefaultTab,
        openAuthModal,
        closeAuthModal,
        isProfileOpen,
        activeProfileTab,
        openProfile,
        closeProfile,
        activeDashboardTab,
        setActiveDashboardTab,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
