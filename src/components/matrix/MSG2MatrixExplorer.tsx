import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, CheckCircle2, Clock, DollarSign, MapPin, 
  Video, Sparkles, ExternalLink, ShieldCheck, Scale, 
  Briefcase, GraduationCap, ArrowRight, Zap, Users, 
  FileText, Award, Truck, Lock, Building, Calculator,
  PieChart, Heart, Car, HelpCircle, X
} from 'lucide-react';
import { MSG2_POLES, MSG2_ALL_SERVICES } from '../../data/msg2MatrixData';
import { ServiceItem, ServicePole } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface MSG2MatrixExplorerProps {
  onSelectService?: (service: ServiceItem) => void;
  onOpenBooking?: (serviceId?: string) => void;
  defaultPole?: ServicePole | 'ALL';
  highlightJaaSOnly?: boolean;
}

export function MSG2MatrixExplorer({ 
  onSelectService, 
  onOpenBooking,
  defaultPole = 'ALL',
  highlightJaaSOnly = false
}: MSG2MatrixExplorerProps) {
  const { lang } = useLanguage();
  const [selectedPole, setSelectedPole] = useState<ServicePole | 'ALL'>(defaultPole);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jaasFilterOnly, setJaasFilterOnly] = useState<boolean>(highlightJaaSOnly);
  const [viewMode, setViewMode] = useState<'matrix' | 'cards' | 'table'>('matrix');
  const [activeActModal, setActiveActModal] = useState<ServiceItem | null>(null);

  // Filtered services
  const filteredServices = useMemo(() => {
    return MSG2_ALL_SERVICES.filter(item => {
      // Pole filter
      if (selectedPole !== 'ALL' && item.pole !== selectedPole) return false;
      
      // Subcategory filter
      if (selectedSubCategory !== 'ALL' && item.subCategoryCode !== selectedSubCategory) return false;
      
      // JaaS only filter
      if (jaasFilterOnly && !item.includedInJaaS) return false;
      
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.titleFr.toLowerCase().includes(q) || item.titleEn.toLowerCase().includes(q);
        const matchDesc = item.descriptionFr.toLowerCase().includes(q) || item.descriptionEn.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchSub = item.subCategoryNameFr.toLowerCase().includes(q) || item.subCategoryNameEn.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchId && !matchSub) return false;
      }
      
      return true;
    });
  }, [selectedPole, selectedSubCategory, jaasFilterOnly, searchQuery]);

  // Subcategories available for active pole
  const currentSubCategories = useMemo(() => {
    if (selectedPole === 'ALL') {
      return MSG2_POLES.flatMap(p => p.subCategories);
    }
    const pole = MSG2_POLES.find(p => p.id === selectedPole);
    return pole ? pole.subCategories : [];
  }, [selectedPole]);

  const handleActClick = (service: ServiceItem) => {
    setActiveActModal(service);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  const getPoleBadgeClass = (poleCode: number) => {
    switch (poleCode) {
      case 1: return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 2: return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 3: return 'bg-amber-500/10 text-amber-700 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDeliveryModeLabel = (mode: string) => {
    switch (mode) {
      case 'IN_PERSON_OFFICE':
        return { label: lang === 'fr' ? 'Au Bureau' : 'In Office', icon: MapPin, color: 'text-rose-600 bg-rose-50 border-rose-200' };
      case 'REMOTE_ONLINE':
        return { label: lang === 'fr' ? 'En Ligne / Visio' : 'Remote Online', icon: Video, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
      case 'HYBRID_DISPATCH':
        return { label: lang === 'fr' ? 'Dispatch Hybride' : 'Hybrid Dispatch', icon: Zap, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
      default:
        return { label: mode, icon: MapPin, color: 'text-slate-600 bg-slate-50 border-slate-200' };
    }
  };

  return (
    <div className="w-full">
      {/* MATRIX CONTROLS HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
        
        {/* Title and stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                Matrice MSG2 · 3×5×5
              </span>
              <span className="text-xs font-bold text-slate-500">
                {lang === 'fr' ? '75 Actes Opérationnels Réels' : '75 Real Operational Acts'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'fr' ? 'Explorateur de la Matrice Magnificent SG (MSG2)' : 'Magnificent SG (MSG2) Matrix Explorer'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {lang === 'fr' 
                ? 'Naviguez à travers les 3 pôles, 15 sous-cadres et 75 actes unitaires. Le socle JaaS 1.0 active 25 actes de carrière interconnectés avec le légal et la fiscalité.'
                : 'Browse through 3 poles, 15 sub-frameworks, and 75 unit acts. The JaaS 1.0 core unlocks 25 career acts interconnected with legal & finance.'}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-blue-700">Pôle 1 Légal</span>
              <span className="text-xl font-black text-blue-950">25 <span className="text-xs text-blue-600 font-semibold">actes</span></span>
            </div>
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">Pôle 2 Finance</span>
              <span className="text-xl font-black text-emerald-950">25 <span className="text-xs text-emerald-600 font-semibold">actes</span></span>
            </div>
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl px-4 py-2.5 text-center min-w-[110px] shadow-sm relative">
              <span className="absolute -top-2.5 -right-2 bg-amber-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                V1 Focus
              </span>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-800">Pôle 3 JaaS</span>
              <span className="text-xl font-black text-amber-950">25 <span className="text-xs text-amber-700 font-semibold">actes</span></span>
            </div>
          </div>
        </div>

        {/* Filters and Search toolbar */}
        <div className="pt-6 flex flex-col gap-4">
          {/* Main Pole Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setSelectedPole('ALL'); setSelectedSubCategory('ALL'); }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                selectedPole === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {lang === 'fr' ? 'Tous les 3 Pôles (75)' : 'All 3 Poles (75)'}
            </button>
            
            {MSG2_POLES.map(pole => {
              const isActive = selectedPole === pole.id;
              return (
                <button
                  key={pole.id}
                  onClick={() => { setSelectedPole(pole.id); setSelectedSubCategory('ALL'); }}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border flex items-center gap-2 ${
                    isActive
                      ? `${pole.badgeClass} shadow-sm border-current font-extrabold scale-[1.02]`
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    pole.code === 1 ? 'bg-blue-600' : pole.code === 2 ? 'bg-emerald-600' : 'bg-amber-500'
                  }`} />
                  <span>{lang === 'fr' ? pole.shortFr : pole.shortEn}</span>
                  {pole.code === 3 && (
                    <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded">JaaS</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search, Subcategory, JaaS toggle, View mode */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'fr' ? 'Rechercher un acte (ex: 3.2-1, EAD, Forklift, Tax)...' : 'Search an act (e.g. 3.2-1, EAD, Forklift, Tax)...'}
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sub-Category Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[240px]"
              >
                <option value="ALL">
                  {lang === 'fr' ? 'Tous les sous-cadres (15)' : 'All Sub-frameworks (15)'}
                </option>
                {currentSubCategories.map((sub) => (
                  <option key={sub.code} value={sub.code}>
                    {lang === 'fr' ? sub.nameFr : sub.nameEn}
                  </option>
                ))}
              </select>

              {/* JaaS Only Toggle */}
              <button
                onClick={() => setJaasFilterOnly(!jaasFilterOnly)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ${
                  jaasFilterOnly
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Inclus JaaS ($300)' : 'JaaS Included ($300)'}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                    viewMode === 'matrix' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Matrix 3x5 View"
                >
                  {lang === 'fr' ? 'Matrice' : 'Matrix'}
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                    viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Card Grid View"
                >
                  {lang === 'fr' ? 'Cartes' : 'Cards'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RESULTS COUNT & FILTER TAGS */}
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-slate-800">
            {filteredServices.length} {lang === 'fr' ? 'actes trouvés' : 'acts found'}
          </span>
          {jaasFilterOnly && (
            <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-200">
              Filtre JaaS actif
            </span>
          )}
          {searchQuery && (
            <span className="text-xs font-semibold text-slate-500">
              « {searchQuery} »
            </span>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500 hidden md:block">
          {lang === 'fr' 
            ? 'Cliquez sur n’importe quel acte pour inspecter les livrables et réserver'
            : 'Click on any act to inspect deliverables and book online'}
        </div>
      </div>

      {/* MATRIX VIEW (Organized by 3 Poles and 5 Subcategories) */}
      {viewMode === 'matrix' && (
        <div className="space-y-10">
          {MSG2_POLES.filter(p => selectedPole === 'ALL' || p.id === selectedPole).map((pole) => {
            const poleServices = filteredServices.filter(s => s.pole === pole.id);
            if (poleServices.length === 0) return null;

            return (
              <div key={pole.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                
                {/* Pole Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg ${
                      pole.code === 1 ? 'bg-blue-100 text-blue-700' :
                      pole.code === 2 ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700 border-2 border-amber-400'
                    }`}>
                      {pole.code}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-extrabold text-slate-900">
                          {lang === 'fr' ? pole.nameFr : pole.nameEn}
                        </h4>
                        {pole.code === 3 && (
                          <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            V1 Priority
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        5 {lang === 'fr' ? 'Sous-Cadres' : 'Sub-frameworks'} × 5 {lang === 'fr' ? 'Actes Opérationnels' : 'Operational Acts'} = 25 {lang === 'fr' ? 'Services' : 'Services'}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
                    {poleServices.length} / 25 {lang === 'fr' ? 'actes affichés' : 'acts displayed'}
                  </span>
                </div>

                {/* Subcategories Blocks */}
                <div className="space-y-6">
                  {pole.subCategories
                    .filter(sub => selectedSubCategory === 'ALL' || sub.code === selectedSubCategory)
                    .map(subCat => {
                      const subServices = poleServices.filter(s => s.subCategoryCode === subCat.code);
                      if (subServices.length === 0) return null;

                      return (
                        <div key={subCat.code} className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/60">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white rounded-md border border-slate-200 text-slate-700">
                                {subCat.code}
                              </span>
                              <h5 className="text-sm font-extrabold text-slate-800">
                                {lang === 'fr' ? subCat.nameFr : subCat.nameEn}
                              </h5>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">
                              {subServices.length} {lang === 'fr' ? 'actes' : 'acts'}
                            </span>
                          </div>

                          {/* 5 Acts Grid for this subcategory */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                            {subServices.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => handleActClick(service)}
                                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md ${
                                  service.includedInJaaS
                                    ? 'bg-white border-amber-200 hover:border-amber-400'
                                    : 'bg-white border-slate-200 hover:border-blue-300'
                                }`}
                              >
                                <div>
                                  {/* Act Code & Badges */}
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-[11px] font-black text-slate-800 px-1.5 py-0.5 bg-slate-100 rounded">
                                      {service.id}
                                    </span>
                                    {service.includedInJaaS && (
                                      <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded">
                                        JaaS $300
                                      </span>
                                    )}
                                  </div>

                                  {/* Title */}
                                  <h6 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                                    {lang === 'fr' ? service.titleFr : service.titleEn}
                                  </h6>

                                  {/* Short Description */}
                                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                    {lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                                  </p>
                                </div>

                                {/* Card Footer: Duration & Unit Price */}
                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {service.durationMinutes}m
                                  </span>
                                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                                    ${service.baseFeeUsd}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CARDS GRID VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleActClick(service)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-xl ${
                service.includedInJaaS 
                  ? 'bg-white border-amber-200/80 shadow-[0_8px_30px_rgba(245,158,11,0.06)]' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black px-2 py-1 bg-slate-900 text-white rounded-lg">
                      {service.id}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPoleBadgeClass(service.poleCode)}`}>
                      Pôle {service.poleCode}
                    </span>
                  </div>
                  {service.includedInJaaS ? (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                      JaaS Included
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      Acte Unitaire
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {lang === 'fr' ? service.subCategoryNameFr : service.subCategoryNameEn}
                </div>

                <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                  {lang === 'fr' ? service.titleFr : service.titleEn}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-1.5 mb-4">
                  {(lang === 'fr' ? service.deliverablesFr : service.deliverablesEn).slice(0, 2).map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.durationMinutes} min
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ${service.baseFeeUsd}
                  </span>
                </div>

                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {lang === 'fr' ? 'Détails' : 'Details'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL / DRAWER FOR SELECTED ACT */}
      <AnimatePresence>
        {activeActModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveActModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveActModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Act Code & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-sm font-black px-3 py-1 bg-slate-900 text-white rounded-xl">
                  Acte {activeActModal.id}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getPoleBadgeClass(activeActModal.poleCode)}`}>
                  {lang === 'fr' ? activeActModal.poleNameFr : activeActModal.poleNameEn}
                </span>
                {activeActModal.includedInJaaS && (
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500 text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Inclus Pack JaaS ($300/an)
                  </span>
                )}
              </div>

              {/* Title & Subcategory */}
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {lang === 'fr' ? activeActModal.subCategoryNameFr : activeActModal.subCategoryNameEn}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                {lang === 'fr' ? activeActModal.titleFr : activeActModal.titleEn}
              </h3>

              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed mb-6 font-medium">
                {lang === 'fr' ? activeActModal.descriptionFr : activeActModal.descriptionEn}
              </p>

              {/* JaaS Synergy Note if present */}
              {(activeActModal.jaasSynergyNoteFr || activeActModal.jaasSynergyNoteEn) && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                    <Zap className="w-4 h-4 text-amber-600" />
                    {lang === 'fr' ? 'Intégration dans le Flow JaaS 1.0 :' : 'JaaS 1.0 Flow Integration:'}
                  </div>
                  <p className="text-sm text-amber-900 font-medium">
                    {lang === 'fr' ? activeActModal.jaasSynergyNoteFr : activeActModal.jaasSynergyNoteEn}
                  </p>
                </div>
              )}

              {/* Deliverables List */}
              <div className="mb-6">
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  {lang === 'fr' ? 'Livrables & Attestations Remis :' : 'Official Deliverables & Credentials:'}
                </h4>
                <div className="space-y-2">
                  {(lang === 'fr' ? activeActModal.deliverablesFr : activeActModal.deliverablesEn).map((del, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Meta Info */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-100/70 border border-slate-200 mb-8 text-center">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Durée Standard</span>
                  <span className="text-sm font-extrabold text-slate-800">{activeActModal.durationMinutes} min</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tarif Unitaire</span>
                  <span className="text-sm font-extrabold text-slate-800">${activeActModal.baseFeeUsd}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mode Réalisation</span>
                  <span className="text-xs font-extrabold text-slate-800 capitalize">
                    {getDeliveryModeLabel(activeActModal.deliveryMode).label}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const actId = activeActModal.id;
                    setActiveActModal(null);
                    if (onOpenBooking) onOpenBooking(actId);
                  }}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{lang === 'fr' ? `Réserver cet Acte ($${activeActModal.baseFeeUsd})` : `Book this Act ($${activeActModal.baseFeeUsd})`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {activeActModal.includedInJaaS && (
                  <button
                    onClick={() => {
                      setActiveActModal(null);
                      if (onOpenBooking) onOpenBooking('jaas');
                    }}
                    className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-sm transition-all shadow-md"
                  >
                    {lang === 'fr' ? 'Activer le Pack JaaS ($300)' : 'Activate JaaS Pack ($300)'}
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
