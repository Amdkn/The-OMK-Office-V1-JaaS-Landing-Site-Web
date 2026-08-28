import { useState, useEffect } from "react"
import { 
  Lock, Unlock, Smartphone, Fingerprint, ShieldCheck, Zap, 
  MessageSquare, DollarSign, Briefcase, Cpu, Settings, 
  Bell, Sparkles, CheckCircle2, ArrowLeft, ChevronRight, 
  Send, Battery, Wifi, Signal, Flame, Award, Activity, 
  Server, Terminal, Shield, KeyRound, Check, RefreshCw
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useLanguage } from "../../contexts/LanguageContext"

interface SessionState {
  role: 'founder' | 'baas_partner' | 'paas_operator';
  user: string;
  token: string;
  status: 'authenticated' | 'locked';
  lastPing: string;
}

export function MobileOSView() {
  const { lang } = useLanguage()

  // State Management
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [pinCode, setPinCode] = useState<string>("")
  const [pinError, setPinError] = useState(false)
  const [isFaceIdScanning, setIsFaceIdScanning] = useState(false)
  const [osStyle, setOsStyle] = useState<'ios' | 'android'>('ios')
  const [activeSystemApp, setActiveSystemApp] = useState<string | null>(null)
  
  // Real-time Clock
  const [currentTime, setCurrentTime] = useState({
    hours: "09",
    minutes: "41",
    dayStr: "Mercredi 19 Août"
  })

  // Active Authenticated Session Mock
  const [session, setSession] = useState<SessionState>({
    role: 'founder',
    user: 'CEO Fondateur',
    token: 'OMK-SEC-9984-X7',
    status: 'locked',
    lastPing: '12ms'
  })

  // Simulated System Live Stats
  const [systemMetrics, setSystemMetrics] = useState({
    apiLatency: 14,
    nodeStatus: 'HEALTHY',
    activeWorkers: 4,
    memoryUsage: '38%',
    complianceScore: '100%',
    taxDeadline: '15 Septembre',
    referralCount: 5,
    totalRevenue: 750,
    breakEvenReached: true,
    lastBackup: '09:30 AM'
  })

  // Simulated AI Chat in OMK OS
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'coach', text: string }>>([
    { 
      sender: 'coach', 
      text: "Système OMK Mobile OS Core initialisé. 0 anomalie détectée dans les registres. Prêt pour l'exécution d'actes." 
    }
  ])
  const [chatInput, setChatInput] = useState("")
  const [isAiTyping, setIsAiTyping] = useState(false)

  // Internal System Notifications Stack
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      app: "Agent OMK OS",
      time: "Il y a 2 min",
      title: "Rapprochement bancaire complété",
      desc: "32 flux comptables validés sans anomalie.",
      icon: Sparkles,
      color: "bg-blue-500"
    },
    {
      id: 2,
      app: "Registre BaaS",
      time: "Il y a 10 min",
      title: "Seuil Règle des 5 atteint",
      desc: "5 entreprises parrainées : Forfait $720 amorti à 100% (+$30 Net).",
      icon: DollarSign,
      color: "bg-emerald-500"
    },
    {
      id: 3,
      app: "Solarpunk PaaS Node",
      time: "Il y a 30 min",
      title: "Micro-service local actif",
      desc: "Lead qualifié dans la zone Ohio transféré au funnel.",
      icon: Zap,
      color: "bg-amber-500"
    }
  ])

  // Live Clock Updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }
      const dayStr = now.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options)
      setCurrentTime({ hours, minutes, dayStr: dayStr.charAt(0).toUpperCase() + dayStr.slice(1) })
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [lang])

  // Keypad PIN entry
  const handleKeypadPress = (digit: string) => {
    if (pinCode.length < 4) {
      const newPin = pinCode + digit
      setPinCode(newPin)
      if (newPin.length === 4) {
        // Instant unlock
        setTimeout(() => {
          setIsUnlocked(true)
          setPinCode("")
          setSession(prev => ({ ...prev, status: 'authenticated' }))
        }, 300)
      }
    }
  }

  const handleDeletePin = () => {
    setPinCode(prev => prev.slice(0, -1))
  }

  // FaceID biometrics trigger
  const triggerFaceId = () => {
    setIsFaceIdScanning(true)
    setTimeout(() => {
      setIsFaceIdScanning(false)
      setIsUnlocked(true)
      setSession(prev => ({ ...prev, status: 'authenticated' }))
    }, 1100)
  }

  // Role Profile Quick Login
  const handleSelectRole = (role: 'founder' | 'baas_partner' | 'paas_operator') => {
    setIsFaceIdScanning(true)
    setTimeout(() => {
      setIsFaceIdScanning(false)
      setIsUnlocked(true)
      const roleNames = {
        founder: 'CEO Fondateur (OMK OS)',
        baas_partner: 'Associé BaaS (Corporate)',
        paas_operator: 'Opérateur PaaS (Solarpunk)'
      }
      setSession({
        role,
        user: roleNames[role],
        token: `OMK-AUTH-${role.toUpperCase()}-77`,
        status: 'authenticated',
        lastPing: '9ms'
      })
      setChatMessages([
        { sender: 'coach', text: `Session validée pour le rôle [${roleNames[role]}]. Accès aux registres internes déverrouillé.` }
      ])
    }, 500)
  }

  // Handle Command AI message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    const userText = chatInput
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }])
    setChatInput("")
    setIsAiTyping(true)

    setTimeout(() => {
      setIsAiTyping(false)
      let reply = "Requête interprétée par le Runtime OMK. Statut des nœuds vérifié."
      if (userText.toLowerCase().includes("fiscal") || userText.toLowerCase().includes("tax")) {
        reply = "Échéances fiscales synchronisées. Clôture des déclarations 1099 prévue le 15 Septembre. Conformité : 100%."
      } else if (userText.toLowerCase().includes("roi") || userText.toLowerCase().includes("5") || userText.toLowerCase().includes("gain")) {
        reply = "La Règle des 5 : 5 recommandations = $750 encaissés. Votre coût annuel BaaS ($720) est intégralement amorti avec +$30 de bénéfice net."
      } else if (userText.toLowerCase().includes("serveur") || userText.toLowerCase().includes("node") || userText.toLowerCase().includes("api")) {
        reply = "Backend Express Monorepo en ligne sur le port 3000. Latence API : 12ms. Mémoire utilisée : 38%."
      }
      setChatMessages(prev => [...prev, { sender: 'coach', text: reply }])
    }, 800)
  }

  return (
    <div className="w-full bg-slate-950 min-h-screen text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* SECTION HEADER */}
      <div id="mobile-preview" className="max-w-7xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-4">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            {lang === 'fr' ? 'Authentification & Hub Mobile-First' : 'Mobile-First Auth & Hub Portal'}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          OMK Mobile OS &nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            (Portail Système Sécurisé)
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          {lang === 'fr'
            ? "Écran de verrouillage tactile avec biométrie, contrôle des sessions, et widgets d'état système temps réel."
            : "Tactile lock screen with biometric login, session governance, and real-time system health widgets."}
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE SMARTPHONE CHASSIS */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          
          {/* OS Paradigm Selector */}
          <div className="flex items-center gap-3 mb-5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            <button
              onClick={() => setOsStyle('ios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                osStyle === 'ios' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iOS Dynamic Island</span>
            </button>
            <button
              onClick={() => setOsStyle('android')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                osStyle === 'android' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Android Material You</span>
            </button>
          </div>

          {/* PHONE DEVICE FRAME */}
          <div className="relative w-[340px] sm:w-[380px] h-[720px] sm:h-[770px] bg-slate-950 rounded-[50px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_12px_#1e293b,0_0_0_14px_#334155] border-4 border-slate-800/80 flex flex-col overflow-hidden select-none">
            
            {/* Screen Glass Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-40 rounded-[44px]"></div>

            {/* SCREEN CANVAS */}
            <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-[40px] flex flex-col overflow-hidden text-white font-sans">
              
              {/* TOP STATUS BAR */}
              <div className="w-full px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold z-30 tracking-tight">
                <span>{currentTime.hours}:{currentTime.minutes}</span>
                
                {/* DYNAMIC ISLAND / NOTCH */}
                {osStyle === 'ios' ? (
                  <div className={`transition-all duration-300 bg-black border border-white/10 rounded-full px-3 py-1 flex items-center gap-2 shadow-md ${
                    isFaceIdScanning ? 'w-48 justify-center bg-blue-950 border-blue-500/50' : 'w-24 justify-center'
                  }`}>
                    {isFaceIdScanning ? (
                      <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-mono animate-pulse">
                        <Fingerprint className="w-3.5 h-3.5" />
                        <span>Vérification FaceID...</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-blue-900"></div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-black border border-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                  </div>
                )}

                <div className="flex items-center space-x-1.5 text-slate-300">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* SCREEN INTERACTION AREA */}
              {!isUnlocked ? (
                /* === ÉCRAN DE VERROUILLAGE / AUTHENTIFICATION === */
                <div id="mobile-auth" className="flex-1 flex flex-col justify-between p-6 overflow-y-auto relative z-20">
                  
                  {/* Top Clock & Lock Icon */}
                  <div className="flex flex-col items-center text-center mt-1">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 mb-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 tracking-wide">{currentTime.dayStr}</span>
                    <h2 className="text-5xl sm:text-6xl font-light tracking-tighter text-white my-1">
                      {currentTime.hours}:{currentTime.minutes}
                    </h2>
                    <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Session Verrouillée
                    </span>
                  </div>

                  {/* FaceID Scanning Animation */}
                  {isFaceIdScanning && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                      <div className="w-24 h-24 rounded-3xl border-2 border-blue-500 flex items-center justify-center relative animate-pulse shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        <Fingerprint className="w-12 h-12 text-blue-400" />
                        <div className="absolute inset-0 border-t-2 border-blue-400 rounded-3xl animate-spin"></div>
                      </div>
                      <span className="text-xs font-bold text-blue-300 mt-4">Biométrie Active...</span>
                    </div>
                  )}

                  {/* Push Notifications Carousel */}
                  <div className="flex flex-col gap-2 my-2">
                    {notifications.slice(0, 2).map((n) => (
                      <div key={n.id} className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-lg flex items-start gap-3 text-left">
                        <div className={`p-2 rounded-xl text-white ${n.color} shrink-0`}>
                          <n.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">{n.app}</span>
                            <span className="text-[9px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-xs font-bold text-white truncate">{n.title}</p>
                          <p className="text-[11px] text-slate-300 leading-snug line-clamp-1">{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tactile Keypad */}
                  <div className="flex flex-col items-center">
                    
                    {/* 4 PIN Dots */}
                    <div className="flex items-center gap-3 mb-3">
                      {[0, 1, 2, 3].map((idx) => (
                        <div 
                          key={idx} 
                          className={`w-3 h-3 rounded-full transition-all duration-200 border ${
                            pinCode.length > idx 
                              ? 'bg-blue-500 border-blue-400 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                              : 'bg-white/10 border-white/20'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Numeric Keypad Grid */}
                    <div className="grid grid-cols-3 gap-2.5 w-full max-w-[240px]">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                        <button
                          key={digit}
                          onClick={() => handleKeypadPress(digit)}
                          className="h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-blue-600/40 text-lg font-medium text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          {digit}
                        </button>
                      ))}
                      
                      {/* FaceID Quick Trigger */}
                      <button
                        onClick={triggerFaceId}
                        className="h-11 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-all flex items-center justify-center border border-blue-500/30"
                        title="FaceID"
                      >
                        <Fingerprint className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleKeypadPress('0')}
                        className="h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-blue-600/40 text-lg font-medium text-white transition-all flex items-center justify-center"
                      >
                        0
                      </button>
                      
                      <button
                        onClick={handleDeletePin}
                        className="h-11 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-semibold transition-all flex items-center justify-center"
                      >
                        Effacer
                      </button>
                    </div>

                    {/* Instant Unlock Button */}
                    <div className="mt-3 w-full">
                      <button
                        onClick={() => {
                          setIsUnlocked(true)
                          setSession(prev => ({ ...prev, status: 'authenticated' }))
                        }}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Déverrouiller le Hub</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* === HUB MOBILE-FIRST DÉVERROUILLÉ === */
                <div id="mobile-apps" className="flex-1 flex flex-col justify-between p-4 overflow-y-auto relative z-20">
                  
                  {activeSystemApp === null ? (
                    <>
                      {/* Top System Status Bar & AI Assistant */}
                      <div className="space-y-3 mt-1">
                        
                        {/* Session Banner */}
                        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/30 p-3.5 rounded-2xl backdrop-blur-md">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/40">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-white">{session.user}</h3>
                                <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                  Session Active · Token {session.token.slice(-6)}
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-blue-300 bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800">
                              {session.lastPing}
                            </span>
                          </div>

                          <div 
                            onClick={() => setActiveSystemApp('ai-chat')}
                            className="bg-black/50 hover:bg-black/70 border border-white/10 p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                          >
                            <span className="text-xs text-slate-300">OMK OS : "Bilan fiscal du mois..."</span>
                            <Send className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                        </div>

                        {/* Internal Widget: La Règle des 5 */}
                        <div 
                          onClick={() => setActiveSystemApp('treasury-widget')}
                          className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/30 p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <DollarSign className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400">Trésorerie & ROI</span>
                              <div className="text-sm font-extrabold text-emerald-400">+$30 Net (100% Amorti)</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-lg border border-emerald-500/30">
                            5/5 Filleuls
                          </span>
                        </div>
                      </div>

                      {/* SYSTEM WIDGETS & INTERNAL HUBS GRID */}
                      <div className="grid grid-cols-4 gap-3 my-4">
                        
                        {/* Widget 1: Assistant OMK */}
                        <button
                          onClick={() => setActiveSystemApp('ai-chat')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">OMK AI</span>
                        </button>

                        {/* Widget 2: Registre BaaS */}
                        <button
                          onClick={() => setActiveSystemApp('baas-status')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">BaaS Statut</span>
                        </button>

                        {/* Widget 3: Nœud PaaS */}
                        <button
                          onClick={() => setActiveSystemApp('node-health')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                            <Server className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Nœuds OS</span>
                        </button>

                        {/* Widget 4: Trésorerie */}
                        <button
                          onClick={() => setActiveSystemApp('treasury-widget')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Trésorerie</span>
                        </button>

                        {/* Widget 5: Sécurité / RBAC */}
                        <button
                          onClick={() => setActiveSystemApp('security-widget')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
                            <Shield className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Sécurité</span>
                        </button>

                        {/* Widget 6: Terminal Express */}
                        <button
                          onClick={() => setActiveSystemApp('terminal-widget')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-105 transition-transform">
                            <Terminal className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Terminal</span>
                        </button>

                        {/* Widget 7: Notification Bell */}
                        <button
                          onClick={() => setActiveSystemApp('notif-center')}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-105 transition-transform relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Alertes</span>
                        </button>

                        {/* Widget 8: Re-verrouiller */}
                        <button
                          onClick={() => {
                            setIsUnlocked(false)
                            setSession(prev => ({ ...prev, status: 'locked' }))
                          }}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-lg group-hover:scale-105 transition-transform">
                            <Lock className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-200">Lock</span>
                        </button>

                      </div>

                      {/* BOTTOM APP DOCK */}
                      <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-2 rounded-[28px] flex items-center justify-around shadow-2xl mt-auto">
                        <button onClick={() => setActiveSystemApp('ai-chat')} className="p-2.5 rounded-2xl bg-blue-500 text-white shadow-md">
                          <MessageSquare className="w-5 h-5" />
                        </button>
                        <button onClick={() => setActiveSystemApp('baas-status')} className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md">
                          <Briefcase className="w-5 h-5" />
                        </button>
                        <button onClick={() => setActiveSystemApp('treasury-widget')} className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md">
                          <DollarSign className="w-5 h-5" />
                        </button>
                        <button onClick={() => setActiveSystemApp('node-health')} className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 shadow-md">
                          <Activity className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* === VUE DE DÉTAIL DU WIDGET INTERNE SÉLECTIONNÉ === */
                    <div className="flex-1 flex flex-col h-full bg-slate-900 rounded-3xl p-4 border border-white/10 overflow-hidden">
                      
                      {/* Header Widget */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                        <button 
                          onClick={() => setActiveSystemApp(null)}
                          className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Hub Principal</span>
                        </button>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {activeSystemApp.replace('-widget', '').replace('-app', '')}
                        </span>
                        <div className="w-4"></div>
                      </div>

                      {/* OMK AI Chat Dialog */}
                      {activeSystemApp === 'ai-chat' && (
                        <div className="flex-1 flex flex-col justify-between overflow-hidden">
                          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                            {chatMessages.map((msg, i) => (
                              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                                  msg.sender === 'user' 
                                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                                    : 'bg-slate-800 text-slate-200 border border-white/10 rounded-tl-sm'
                                }`}>
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                            {isAiTyping && (
                              <div className="flex items-center gap-1 text-slate-400 p-2 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-200"></span>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Commande système ou question..."
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={handleSendMessage}
                              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Widget: État BaaS & Conformité */}
                      {activeSystemApp === 'baas-status' && (
                        <div className="space-y-3 text-xs overflow-y-auto">
                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Entité Fédérale</span>
                            <h4 className="text-sm font-extrabold text-white">OMK Solutions LLC</h4>
                            <p className="text-slate-400 text-[11px]">EIN: 84-XXXX109 · Registered Agent Active</p>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Good Standing État</span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Valide
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Tenue Comptable</span>
                              <span className="text-blue-400 font-bold">À jour (Août 2026)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Calendrier Fiscal</span>
                              <span className="text-amber-400 font-bold">15 Septembre</span>
                            </div>
                          </div>

                          <div className="bg-blue-950/40 p-3 rounded-2xl border border-blue-500/20 text-[11px] text-blue-200">
                            ✓ Rapports annuels et formulaires W2/1099 synchronisés avec le registre.
                          </div>
                        </div>
                      )}

                      {/* Widget: Nœuds & Serveurs */}
                      {activeSystemApp === 'node-health' && (
                        <div className="space-y-3 text-xs overflow-y-auto">
                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 font-mono">Backend Express Monorepo</span>
                              <span className="text-emerald-400 font-bold">PORT 3000</span>
                            </div>
                            <div className="text-lg font-black text-white mt-1">{systemMetrics.nodeStatus}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                              <span className="text-[10px] text-slate-400 block">Latence Ping</span>
                              <span className="text-sm font-bold text-white">{systemMetrics.apiLatency} ms</span>
                            </div>
                            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                              <span className="text-[10px] text-slate-400 block">Mémoire VM</span>
                              <span className="text-sm font-bold text-white">{systemMetrics.memoryUsage}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Workers Autonomes</span>
                              <span className="text-white font-bold">{systemMetrics.activeWorkers} actifs</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Dernier Snapshot</span>
                              <span className="text-slate-400">{systemMetrics.lastBackup}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Widget: Trésorerie & ROI */}
                      {activeSystemApp === 'treasury-widget' && (
                        <div className="space-y-3 text-xs text-center overflow-y-auto">
                          <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/20">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Gains Recommandations</span>
                            <div className="text-3xl font-black text-emerald-400 my-1">${systemMetrics.totalRevenue}.00</div>
                            <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                              Forfait BaaS $720/an 100% Amorti
                            </span>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 text-left space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Affiliations validées</span>
                              <span className="text-white font-bold">5 entreprises</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Commission unitaire</span>
                              <span className="text-white font-bold">$150 / entreprise</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Bénéfice Net</span>
                              <span className="text-emerald-400 font-bold">+$30.00 Net</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Widget: Sécurité & RBAC */}
                      {activeSystemApp === 'security-widget' && (
                        <div className="space-y-3 text-xs overflow-y-auto">
                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Chiffrement</span>
                            <h4 className="text-sm font-bold text-white">AES-256 GCM (Souverain)</h4>
                            <p className="text-slate-400 text-[11px]">Stockage local sécurisé sans fuite de clés.</p>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Session Actuelle</span>
                              <span className="text-amber-400 font-mono font-bold">{session.role}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Signature Token</span>
                              <span className="text-blue-400 font-mono">{session.token}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Widget: Terminal Log */}
                      {activeSystemApp === 'terminal-widget' && (
                        <div className="flex-1 bg-black p-3 rounded-2xl font-mono text-[10px] text-emerald-400 overflow-y-auto space-y-1">
                          <p className="text-slate-500">[09:41:02] INIT OMK-RUNTIME v2.4</p>
                          <p>[09:41:03] Express Server bound on 0.0.0.0:3000</p>
                          <p>[09:41:05] Auth JWT Verified: {session.token}</p>
                          <p>[09:41:08] BaaS Ledger Check: 5 referrals valid</p>
                          <p>[09:41:10] Solarpunk Worker 01 listening...</p>
                          <p className="text-blue-400">[09:41:12] Heartbeat OK · Latency: 12ms</p>
                        </div>
                      )}

                      {/* Widget: Notifications Center */}
                      {activeSystemApp === 'notif-center' && (
                        <div className="space-y-2 text-xs overflow-y-auto">
                          {notifications.map((n) => (
                            <div key={n.id} className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                              <div className="flex justify-between font-bold text-white text-[11px]">
                                <span>{n.title}</span>
                                <span className="text-[9px] text-slate-500">{n.time}</span>
                              </div>
                              <p className="text-slate-400 text-[10px] mt-0.5">{n.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}

                  {/* BOTTOM HOME INDICATOR */}
                  <div className="w-full flex justify-center pt-2">
                    <div 
                      onClick={() => setActiveSystemApp(null)}
                      className="w-32 h-1 bg-white/40 hover:bg-white/80 rounded-full cursor-pointer transition-colors"
                    />
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SYSTEM STATE MONITOR & RBAC SWITCHER */}
        <div id="mobile-specs" className="lg:col-span-6 space-y-6">
          
          {/* Card 1: Session & Role Switcher */}
          <div className="glass-dark p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Contrôle de Session & Profils</h3>
                <p className="text-xs text-slate-400">Basculez d'identité sans recharger la page</p>
              </div>
            </div>

            <div className="space-y-2.5 mb-6">
              <button
                onClick={() => handleSelectRole('founder')}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  session.role === 'founder'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    👑
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">CEO Fondateur (OMK OS)</div>
                    <div className="text-[10px] text-slate-400">Accès root, ontologie globale, arbitrages</div>
                  </div>
                </div>
                {session.role === 'founder' && <Check className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                onClick={() => handleSelectRole('baas_partner')}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  session.role === 'baas_partner'
                    ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    💼
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Associé BaaS (Corporate & Fiscal)</div>
                    <div className="text-[10px] text-slate-400">Immatriculations, déclarations 1099, SOPs</div>
                  </div>
                </div>
                {session.role === 'baas_partner' && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={() => handleSelectRole('paas_operator')}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  session.role === 'paas_operator'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Opérateur PaaS (Solarpunk Node)</div>
                    <div className="text-[10px] text-slate-400">Micro-services, pipelines de leads, API</div>
                  </div>
                </div>
                {session.role === 'paas_operator' && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsUnlocked(prev => !prev)
                  setSession(prev => ({ ...prev, status: prev.status === 'locked' ? 'authenticated' : 'locked' }))
                }}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
              >
                {isUnlocked ? <Lock className="w-4 h-4 text-amber-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                <span>{isUnlocked ? 'Verrouiller l’OS' : 'Déverrouiller l’OS'}</span>
              </button>

              <button
                onClick={triggerFaceId}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Fingerprint className="w-4 h-4 text-blue-400" />
                <span>Simuler Biométrie</span>
              </button>
            </div>
          </div>

          {/* Card 2: Live System Status Widgets (No external links) */}
          <div className="glass-dark p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Widgets d'État Système Temps Réel</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold">Backend Runtime</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-base font-black text-white">Express + Vite Node</div>
                <p className="text-[11px] text-slate-500 mt-1">Architecture Full-Stack Monorepo</p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold">Latence API</span>
                  <span className="text-blue-400 font-mono font-bold">14 ms</span>
                </div>
                <div className="text-base font-black text-white">Zéro Vendor Lock-in</div>
                <p className="text-[11px] text-slate-500 mt-1">Chiffrement AES-256 local</p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold">Conformité Fiscale</span>
                  <span className="text-emerald-400 font-bold">100% OK</span>
                </div>
                <div className="text-base font-black text-white">LLC / IRS 1099</div>
                <p className="text-[11px] text-slate-500 mt-1">Prochaine clôture : 15 Sept.</p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold">Trésorerie "Règle des 5"</span>
                  <span className="text-emerald-400 font-bold">Amorti</span>
                </div>
                <div className="text-base font-black text-white">+$30.00 Net</div>
                <p className="text-[11px] text-slate-500 mt-1">5 entreprises x $150 = $750</p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
