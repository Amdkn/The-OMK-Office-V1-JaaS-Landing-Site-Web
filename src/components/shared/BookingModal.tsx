import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Calendar, MapPin, Video, CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { MSG2_ALL_SERVICES } from "../../data/msg2MatrixData"

export function BookingModal({ 
  isOpen, 
  onClose,
  initialServiceId 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialServiceId?: string;
}) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState("jaas")
  const [mode, setMode] = useState("office")
  const [isSuccess, setIsSuccess] = useState(false)

  const matchedService = MSG2_ALL_SERVICES.find(s => s.id === initialServiceId || s.id === service)

  useEffect(() => {
    if (initialServiceId) {
      setService(initialServiceId)
    }
  }, [initialServiceId, isOpen])

  if (!isOpen) return null

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      setIsSuccess(true)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { 
      setStep(1); 
      setService("jaas"); 
      setMode("office");
      setIsSuccess(false);
    }, 400)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" 
          onClick={handleClose} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative inline-block align-bottom bg-white rounded-[2.5rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-slate-200"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-500 focus:outline-none bg-slate-100 rounded-full p-1 transition-colors">
              <span className="sr-only">Fermer</span>
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="px-6 pt-8 pb-6 bg-white sm:px-8">
            {isSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Rendez-Vous Enregistré !</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Votre demande pour <strong className="text-slate-900">{matchedService ? matchedService.titleFr : 'votre prestation'}</strong> a été transmise à notre secrétariat.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 text-left">
                  <div className="font-bold text-slate-800 mb-1">Détails :</div>
                  <div>Mode : {mode === 'office' ? 'Au Bureau (Erlanger / CVG)' : 'En Ligne (Visio HD)'}</div>
                  <div>SLA de prise en charge : &lt; 24h ouvrées</div>
                </div>
                <Button 
                  onClick={handleClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-2xl mt-4"
                >
                  Fermer
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-extrabold text-slate-900">Réservation en Ligne</h3>
                    <span className="text-sm font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">Étape {step}/3</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300 ease-out" 
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="min-h-[250px]">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-sm text-slate-500 mb-4">Sélectionnez le forfait ou l'acte souhaité.</p>
                      
                      {matchedService && (
                        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">
                              Acte Sélectionné : {matchedService.id}
                            </span>
                            <span className="text-xs font-bold text-slate-900 line-clamp-1">{matchedService.titleFr}</span>
                          </div>
                          <span className="font-mono text-sm font-black text-blue-700 shrink-0 ml-2">
                            ${matchedService.baseFeeUsd}
                          </span>
                        </div>
                      )}

                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                        {[
                          { id: "jaas", title: "JOB (JaaS 1.0 · Pack Annuel Carrière)", price: "$300" },
                          { id: "1.1-2", title: "Acte 1.1-2 · Renouvellement Permis EAD (I-765)", price: "$150" },
                          { id: "1.5-1", title: "Acte 1.5-1 · Traduction Certifiée Diplômes", price: "$45/p" },
                          { id: "2.1-1", title: "Acte 2.1-1 · Déclaration Fiscale 1040 W-2", price: "$120" },
                          { id: "2.1-3", title: "Acte 2.1-3 · Demande ITIN W-7 (CAA Certifié)", price: "$175" },
                          { id: "2.5-1", title: "Acte 2.5-1 · Création LLC & EIN", price: "$350" },
                          { id: "baas", title: "BUZZ (BaaS · Pack Annuel Business)", price: "$720" },
                          { id: "paas", title: "PRO (PaaS · Pack Pro Solarpunk)", price: "$1,500" }
                        ].map((s) => (
                          <label key={s.id} className={`flex items-center justify-between p-3 border rounded-2xl cursor-pointer transition-colors ${service === s.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-3">
                              <input type="radio" name="service" checked={service === s.id} onChange={() => setService(s.id)} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                              <span className="font-semibold text-slate-900 text-xs">{s.title}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-600 text-xs shrink-0">{s.price}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-sm text-slate-500 mb-4">Choisissez vos disponibilités et le mode de consultation.</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <label className={`flex flex-col items-center gap-2 p-4 border rounded-2xl cursor-pointer transition-colors ${mode === 'office' ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                          <input type="radio" name="mode" className="sr-only" checked={mode === 'office'} onChange={() => setMode('office')} />
                          <MapPin className="w-6 h-6" />
                          <span className="text-sm font-semibold text-center">Au Bureau<br/>(Erlanger / CVG)</span>
                        </label>
                        <label className={`flex flex-col items-center gap-2 p-4 border rounded-2xl cursor-pointer transition-colors ${mode === 'online' ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                          <input type="radio" name="mode" className="sr-only" checked={mode === 'online'} onChange={() => setMode('online')} />
                          <Video className="w-6 h-6" />
                          <span className="text-sm font-semibold text-center">En Ligne<br/>(Visio HD)</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date et heure souhaitées</label>
                        <div className="relative">
                          <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="datetime-local" className="w-full rounded-2xl border-slate-300 border py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-sm text-slate-500 mb-4">Vos coordonnées pour confirmer le rendez-vous.</p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                            <input type="text" className="w-full rounded-2xl border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Mamadou" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                            <input type="text" className="w-full rounded-2xl border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Diallo" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone (SMS)</label>
                          <input type="tel" className="w-full rounded-2xl border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(859) 555-0123" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                          <input type="email" className="w-full rounded-2xl border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="m.diallo@example.com" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
          
          {!isSuccess && (
            <div className="bg-slate-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-slate-200">
              <Button 
                onClick={handleNext} 
                disabled={step === 1 && !service}
                className="w-full sm:w-auto sm:ml-3 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {step === 3 ? "Confirmer la Réservation" : "Suivant"}
              </Button>
              <Button onClick={handleClose} variant="ghost" className="mt-3 w-full sm:mt-0 sm:w-auto">
                Annuler
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
