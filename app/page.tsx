"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Share2, 
  Clock, 
  Download, 
  Baby, 
  Users, 
  PhoneCall, 
  ChevronRight, 
  BookOpen, 
  Bookmark,
  Map,
  X,
  MailOpen
} from 'lucide-react';
import { 
  GaneshaJi, 
  DecorativePeacock, 
  DivineKalash, 
  MandapPillar, 
  WeddingKnotSymbol, 
  CornerOrnament, 
  BandhanwarToran 
} from './components/WeddingMotifs';
import { 
  ceremonies, 
  weddingGroom, 
  weddingBride, 
  balAagrah, 
  inviters, 
  wellWishers, 
  mapLocations 
} from './data';
import AudioPlayer from './components/AudioPlayer';
import BlessingsBoard from './components/BlessingBoard';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeSection, setActiveSection] = useState<'invite' | 'rituals' | 'venues' | 'blessings'>('invite');
  const [selectedMapUrl, setSelectedMapUrl] = useState<string | null>(null);

  // Background gold dust floating particles state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const arr = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10
    }));
    setParticles(arr);

    // Wedding Countdown Timer for 24 June 2026 (শুভ বিবাহ)
    const weddingDate = new Date('2026-06-24T18:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = (ceremony: any) => {
    const title = `Rahul & Sushmita - ${ceremony.nameEnglish}`;
    const desc = `${ceremony.descriptionEnglish} (${ceremony.time || 'All Day'})`;
    const loc = ceremony.id === 'reception' ? mapLocations.reception.name : mapLocations.wedding.name;
    
    // Parse start and end date based on actual wedding dates (June 2026)
    const year = 2026;
    const month = '05'; // June is 05 in JS Date string month parsing format YYYY-MM-DD
    const day = ceremony.dateEnglish.split(' ')[0];
    
    const formattedDate = `${year}06${day}`;
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}T100000Z/${formattedDate}T220000Z&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
    
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-maroon-dark flex justify-center items-center overflow-x-hidden relative select-none">
      
      {/* Hand-made premium paper embossed pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-60 pointer-events-none" />

      {/* Dynamic Golden Floating Particles in background */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-primary/40 blur-[0.5px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float 8s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ==========================================
             1. ELEGANT TRADITIONAL COVER ENVELOPE (Photo 4)
             ========================================== */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-lg min-h-[90vh] mx-4 my-6 bg-gradient-to-b from-maroon-artistic to-maroon-dark rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-4 border-double border-gold-primary/40 gold-shadow z-20"
            id="invitation-envelope"
          >
            {/* Fine embossed paper texture line overlay */}
            <div className="absolute inset-0 embossed-texture opacity-[0.03] pointer-events-none" />

            {/* Premium Gold border frame lines inside card */}
            <div className="absolute inset-2 border-2 border-gold-primary/20 pointer-events-none rounded-2xl" />
            <div className="absolute inset-4 border border-gold-light/10 pointer-events-none rounded-2xl" />

            {/* Corner Ornaments */}
            <div className="absolute top-0 left-0"><CornerOrnament className="w-16 h-16 rotate-0 opacity-45" /></div>
            <div className="absolute top-0 right-0"><CornerOrnament className="w-16 h-16 rotate-90 opacity-45" /></div>
            <div className="absolute bottom-0 left-0"><CornerOrnament className="w-16 h-16 -rotate-90 opacity-45" /></div>
            <div className="absolute bottom-0 right-0"><CornerOrnament className="w-16 h-16 -rotate-180 opacity-45" /></div>

            {/* Mithila Toran Bandhanwar */}
            <BandhanwarToran className="absolute top-0 left-0 w-full opacity-65 pointer-events-none" />

            {/* Traditional Header Calligraphy */}
            <div className="text-center mt-12 mb-4 relative z-10">
              <span className="font-hindi text-base text-gold-light tracking-wider">|| श्री गणेशाय नमः ||</span>
            </div>

            {/* Ganesha Seal / Medallion with light glow (Matching Photo 4 Die-Cut) */}
            <div className="flex flex-col items-center justify-center my-6 relative z-10">
              {/* Outer Glowing Circle Aura */}
              <div className="absolute w-34 h-34 rounded-full bg-gold-primary/10 blur-xl animate-pulse" />
              
              <div 
                onClick={() => setIsOpen(true)}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-gold-light via-gold-primary to-amber-800 p-1 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 gold-shadow group"
                id="envelope-seal-trigger"
              >
                <div className="w-full h-full rounded-full bg-maroon-dark flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/30 via-transparent to-transparent opacity-60" />
                  <GaneshaJi className="w-20 h-20 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <span className="text-[10px] text-gold-light/60 uppercase tracking-widest font-mono mt-3 animate-pulse">Click Golden Seal to Open</span>
            </div>

            {/* Core Cover Titles */}
            <div className="text-center space-y-4 relative z-10">
              <div className="space-y-1">
                <span className="font-hindi text-3xl font-bold gold-text-gradient tracking-wide block gap-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>शुभ विवाह</span>
                <span className="font-hindi text-lg text-gold-light tracking-widest block">।। स्नेह निमंत्रण ।।</span>
              </div>

              {/* Heart Shaped Couple Frame */}
              <div className="inline-flex items-center justify-center gap-3 bg-maroon-dark/60 border border-gold-primary/30 px-6 py-2.5 rounded-full backdrop-blur-sm gold-shadow">
                <span className="font-hindi text-lg font-medium text-gold-light">राहुल</span>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="font-hindi text-lg font-medium text-gold-light">सुष्मिता</span>
              </div>

              {/* Wedding Invitation Dates */}
              <div className="py-2">
                <span className="font-serif text-gold-primary font-semibold tracking-widest block text-base">24 JUNE 2026</span>
                <span className="font-hindi text-xs text-gold-light/70 block">बुधवार (Wednesday)</span>
              </div>
            </div>

            {/* Senders / Dispatch details */}
            <div className="text-center mt-6 mb-12 border-t border-gold-primary/10 pt-4 max-w-xs mx-auto relative z-10">
              <span className="font-hindi text-xs text-gold-light/50 block mb-1">प्रेषक :</span>
              <span className="font-hindi text-sm font-semibold text-gold-primary block">श्री अजय प्रसाद साहु</span>
              <span className="font-hindi text-[10px] text-gold-light/70 block">ग्राम+पो०-तहड़ा गोपालपुर, समस्तीपुर (बिहार)</span>
            </div>

            {/* Interactive Open Invitation Button */}
            <div className="flex justify-center mt-4 pb-4 relative z-10">
              <button
                onClick={() => setIsOpen(true)}
                className="gold-bg-gradient hover:opacity-95 text-maroon-dark font-serif font-bold text-sm tracking-widest px-8 py-3 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
                id="open-invite-btn"
              >
                <MailOpen className="w-4 h-4 text-maroon-dark" />
                OPEN INVITATION
              </button>
            </div>
          </motion.div>
        ) : (
          /* ==========================================
             2. LUXURY DIGITAL INVITATION CARD (SINGLE-PAGE PORTRAIT)
             ========================================== */
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-2xl mx-3 my-6 bg-gradient-to-b from-maroon-artistic via-maroon-dark to-black rounded-3xl p-5 md:p-8 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-4 border-gold-primary/40 gold-shadow z-20"
            id="wedding-invitation-card"
          >
            {/* Fine embossed paper texture line overlay */}
            <div className="absolute inset-0 embossed-texture opacity-[0.03] pointer-events-none" />

            {/* Audio Widget & Sitar Synth Player */}
            <AudioPlayer />

            {/* Outer Elegant Frame lines */}
            <div className="absolute inset-2 border-2 border-gold-primary/20 pointer-events-none rounded-2xl" />
            <div className="absolute inset-4 border border-gold-light/10 pointer-events-none rounded-2xl" />

            {/* Symmetrical Corner Ornaments */}
            <div className="absolute top-1 left-1"><CornerOrnament className="w-14 h-14 rotate-0 opacity-40" /></div>
            <div className="absolute top-1 right-1"><CornerOrnament className="w-14 h-14 rotate-90 opacity-40" /></div>
            <div className="absolute bottom-1 left-1"><CornerOrnament className="w-14 h-14 -rotate-90 opacity-40" /></div>
            <div className="absolute bottom-1 right-1"><CornerOrnament className="w-14 h-14 -rotate-180 opacity-40" /></div>

            {/* Archway Side Columns (Pillars) in absolute background */}
            <div className="absolute top-12 left-2 bottom-12 w-8 opacity-20 pointer-events-none hidden sm:block">
              <MandapPillar className="h-full w-full" />
            </div>
            <div className="absolute top-12 right-2 bottom-12 w-8 opacity-20 pointer-events-none hidden sm:block scale-x-[-1]">
              <MandapPillar className="h-full w-full" />
            </div>

            {/* Mithila Bandhanwar Garland */}
            <BandhanwarToran className="absolute top-0 left-0 w-full opacity-80 pointer-events-none" />

            {/* Interactive Section Selector Floating Tab Bar */}
            <div className="flex justify-center gap-2 mb-8 mt-10 relative z-30 flex-wrap">
              {(['invite', 'rituals', 'venues', 'blessings'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-widest uppercase border transition-all duration-300 ${
                    activeSection === sec
                      ? 'bg-gold-primary text-maroon-dark border-gold-light font-bold shadow-lg'
                      : 'bg-maroon-dark/40 text-gold-light/70 border-gold-primary/10 hover:bg-maroon-dark/80 hover:text-gold-light'
                  }`}
                  id={`tab-select-${sec}`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* ==========================================
               SECTION A: CORE INVITATION INFO
               ========================================== */}
            <AnimatePresence mode="wait">
              {activeSection === 'invite' && (
                <motion.div
                  key="sec-invite"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 relative z-10"
                >
                  {/* Ganesha Ji Top Placement */}
                  <div className="flex flex-col items-center">
                    <GaneshaJi className="w-20 h-20 animate-float-slow" />
                    <span className="font-hindi text-base text-gold-primary tracking-wider mt-1">|| श्री गणेशाय नमः ||</span>
                    <span className="font-hindi text-[10px] text-gold-light/50 max-w-sm text-center tracking-wide block mt-1 italic font-light">
                      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
                    </span>
                  </div>

                  {/* Auspicious Traditional Welcome Verse */}
                  <div className="bg-[#4a0808]/40 border border-gold-primary/15 p-3 rounded-xl text-center max-w-md mx-auto">
                    <p className="font-hindi text-xs text-gold-light/90 leading-relaxed italic">
                      "विघ्न हरण मंगल करण, श्री गणपति महाराज।<br />
                      प्रथम निमंत्रण आपको, पूरण कीजे काज।"
                    </p>
                  </div>

                  {/* Main Call Invitation Wordings */}
                  <div className="text-center space-y-2">
                    <p className="text-xs font-serif text-gold-light/70 tracking-widest uppercase">
                      With the blessings of Lord Ganesha and our elders,
                    </p>
                    <p className="text-sm font-sans text-gold-light/90 leading-relaxed max-w-md mx-auto px-4">
                      We cordially invite you and your family to grace the auspicious wedding celebrations of our beloved
                    </p>
                  </div>

                  {/* Couples Grid Layout (Focal Point) */}
                  <div className="relative py-6 max-w-lg mx-auto">
                    {/* Background Golden Halo Glow behind names */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-primary/5 to-transparent blur-2xl pointer-events-none" />

                    <div className="flex flex-col items-center justify-center gap-2">
                      
                      {/* Groom Panel */}
                      <div className="text-center space-y-1">
                        <span className="font-serif text-xs uppercase tracking-widest text-gold-primary font-semibold block">The Groom</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-[#a17a18] drop-shadow-md">
                          {weddingGroom.name}
                        </h2>
                        <span className="font-hindi text-sm text-gold-light/80 block">{weddingGroom.nameHindi}</span>
                      </div>

                      {/* Sacred Wedding Knot / Love Symbol */}
                      <div className="flex flex-col items-center py-2">
                        <WeddingKnotSymbol className="w-36 h-14" />
                        <span className="font-hindi text-xs text-gold-primary font-semibold tracking-widest shrink-0">परिणय सूत्र बन्धन</span>
                      </div>

                      {/* Bride Panel */}
                      <div className="text-center space-y-1">
                        <span className="font-serif text-xs uppercase tracking-widest text-gold-primary font-semibold block">The Bride</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-[#a17a18] drop-shadow-md">
                          {weddingBride.name}
                        </h2>
                        <span className="font-hindi text-sm text-gold-light/80 block">{weddingBride.nameHindi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Wedding Countdown Clock Widget */}
                  <div className="max-w-md mx-auto border border-gold-primary/30 bg-maroon-dark/60 rounded-2xl p-4 gold-shadow">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gold-primary animate-spin" style={{ animationDuration: '8s' }} />
                      <span className="font-serif text-xs tracking-wider text-gold-light uppercase font-semibold">Tying Knot In</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-[#4a0808]/50 p-2 rounded-lg border border-gold-primary/10">
                        <span className="font-serif text-base md:text-lg font-bold text-gold-light block">{countdown.days}</span>
                        <span className="text-[9px] font-mono uppercase text-gold-light/60">Days</span>
                      </div>
                      <div className="bg-[#4a0808]/50 p-2 rounded-lg border border-gold-primary/10">
                        <span className="font-serif text-base md:text-lg font-bold text-gold-light block">{countdown.hours}</span>
                        <span className="text-[9px] font-mono uppercase text-gold-light/60">Hours</span>
                      </div>
                      <div className="bg-[#4a0808]/50 p-2 rounded-lg border border-gold-primary/10">
                        <span className="font-serif text-base md:text-lg font-bold text-gold-light block">{countdown.minutes}</span>
                        <span className="text-[9px] font-mono uppercase text-gold-light/60">Mins</span>
                      </div>
                      <div className="bg-[#4a0808]/50 p-2 rounded-lg border border-gold-primary/10">
                        <span className="font-serif text-base md:text-lg font-bold text-gold-light block">{countdown.seconds}</span>
                        <span className="text-[9px] font-mono uppercase text-gold-light/60">Secs</span>
                      </div>
                    </div>
                  </div>

                  {/* Parent & Lineage Details Comparison Blocks (Exact Photo Details) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {/* Groom Ancestry */}
                    <div className="border border-gold-primary/15 bg-maroon-dark/40 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                      <div className="absolute top-2 right-2 opacity-5"><Users className="w-16 h-16 text-gold-light" /></div>
                      <h4 className="font-serif text-xs uppercase tracking-widest text-gold-primary border-b border-gold-primary/10 pb-1 font-semibold">Groom's Lineage</h4>
                      <p className="font-hindi text-xs text-gold-light/90 space-y-1.5 leading-relaxed">
                        <span className="block">पोत्र : <b className="text-gold-light">{weddingGroom.grandfatherHindi}</b></span>
                        <span className="block">सुपुत्र : <b className="text-gold-light">{weddingGroom.fatherHindi}</b></span>
                        <span className="block">एवं : <b className="text-gold-light">{weddingGroom.motherHindi}</b></span>
                        <span className="block text-gold-light/60 text-[10px] mt-1 italic">
                          निवास: {weddingGroom.address.villagePost}, वैनी, समस्तीपुर (बिहार)
                        </span>
                      </p>
                    </div>

                    {/* Bride Ancestry */}
                    <div className="border border-gold-primary/15 bg-maroon-dark/40 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                      <div className="absolute top-2 right-2 opacity-5"><Users className="w-16 h-16 text-gold-light" /></div>
                      <h4 className="font-serif text-xs uppercase tracking-widest text-gold-primary border-b border-gold-primary/10 pb-1 font-semibold">Bride's Lineage</h4>
                      <p className="font-hindi text-xs text-gold-light/90 space-y-1.5 leading-relaxed">
                        <span className="block">सुपुत्री : <b className="text-gold-light">{weddingBride.motherHindi}</b></span>
                        <span className="block">एवं : <b className="text-gold-light">{weddingBride.fatherHindi}</b></span>
                        <span className="block text-gold-light/60 text-[10px] mt-1.5 italic">
                          निवास: {weddingBride.address.villageHindi}, सिलौत, मनियारी, मुजफ्फरपुर
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==========================================
                 SECTION B: WEDDING RITUALS & CELEBRATION DAYS
                 ========================================== */}
              {activeSection === 'rituals' && (
                <motion.div
                  key="sec-rituals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-gold-primary tracking-wider flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold-primary" />
                      मंगलिक कार्यक्रम / Rituals Timeline
                    </h3>
                  </div>

                  {/* Mithila Peacock Pair Frame */}
                  <div className="flex justify-between items-center px-4 opacity-75 max-w-sm mx-auto">
                    <DecorativePeacock className="w-16 h-16" />
                    <DivineKalash className="w-12 h-12" />
                    <DecorativePeacock className="w-16 h-16" flip={true} />
                  </div>

                  {/* Scheduled Cards - traditional Hanging style (Photo 2) */}
                  <div className="space-y-4">
                    {ceremonies.map((c) => (
                      <div 
                        key={c.id}
                        className="bg-gradient-to-r from-maroon-dark/50 via-maroon-artistic/45 to-maroon-dark/50 border border-gold-primary/20 rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gold-primary/50 transition-all duration-300 gold-shadow group"
                      >
                        {/* Hanging string representation decorative overlay */}
                        <div className="absolute top-0 left-6 right-6 h-1 bg-gold-primary/10 pointer-events-none" />
                        
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl md:text-2xl">{c.bgDecorativeSymbol}</span>
                            <div>
                              <h4 className="font-hindi text-base md:text-lg font-bold text-gold-light block">
                                {c.nameHindi}
                              </h4>
                              <span className="font-serif text-[10px] text-gold-primary font-bold tracking-widest block uppercase">
                                {c.nameEnglish}
                              </span>
                            </div>
                          </div>

                          <p className="font-hindi text-xs text-gold-light/80">
                            {c.descriptionHindi} • <span className="font-sans italic font-light">{c.descriptionEnglish}</span>
                          </p>

                          {c.time && (
                            <p className="font-hindi text-[11px] text-gold-light bg-gold-primary/10 inline-block px-2.5 py-0.5 rounded-full border border-gold-primary/20">
                              🕒 {c.time}
                            </p>
                          )}
                        </div>

                        {/* Date Tag */}
                        <div className="flex flex-col items-center justify-center bg-maroon-dark border border-gold-primary/25 px-4 py-2.5 rounded-xl min-w-[120px] self-stretch md:self-auto text-center group-hover:border-gold-primary/50 transition-all duration-300">
                          <span className="font-serif text-gold-light text-sm font-extrabold tracking-wide block">
                            {c.dateEnglish}
                          </span>
                          <span className="font-hindi text-[10px] text-gold-light/50 block">
                            वर्ष: २०२६
                          </span>
                          <span className="font-hindi text-[11px] text-gold-primary font-semibold block mt-0.5">
                            {c.dayHindi}
                          </span>

                          {/* Quick Calendar Booking Button */}
                          <button
                            onClick={() => handleAddToCalendar(c)}
                            colors-attr="gold"
                            className="mt-2 text-[9px] font-serif text-maroon-dark font-bold tracking-wider bg-gradient-to-r from-gold-light to-gold-primary px-2 py-1 rounded hover:opacity-90 active:scale-95 flex items-center gap-1 transition-all duration-300"
                            title="Add ceremony event to Google Calendar"
                          >
                            <Calendar className="w-2.5 h-2.5 text-maroon-dark" />
                            SAVE DATE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Transit note extracted from Photo 2 */}
                  <div className="border border-gold-primary/30 bg-[#4a0808]/40 p-4 rounded-xl text-center shadow-lg max-w-lg mx-auto">
                    <p className="font-hindi text-xs font-semibold text-gold-primary leading-relaxed">
                      ⚠️ बारात प्रस्थान सूचना (Transit details):<br />
                      <span className="font-normal text-gold-light">
                        बारात मेरे निवास स्थान <b className="text-gold-light">तहड़ा गोपालपुर से आरक्षित सवारी द्वारा</b> संध्या <b className="text-gold-primary">07:00 बजे</b> मध्य मनियारी के लिए प्रस्थान करेगी।
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==========================================
                 SECTION C: VENUES & MAP RECTIONS
                 ========================================== */}
              {activeSection === 'venues' && (
                <motion.div
                  key="sec-venues"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-gold-primary tracking-wider flex items-center justify-center gap-2">
                      <MapPin className="w-5 h-5 text-gold-primary" />
                      शुभ स्थल / Venues of Celebrations
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Wedding Ceremony Venue (Muzaffarpur side) */}
                    <div className="bg-[#4a0808]/40 border border-gold-primary/20 rounded-2xl p-5 space-y-4 hover:border-gold-primary/40 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-serif uppercase tracking-widest text-gold-light bg-gold-primary/10 px-2.5 py-0.5 rounded-full border border-gold-primary/25 inline-block">
                          Wedding Venue (वधू पक्ष)
                        </span>
                        <h4 className="font-serif text-lg font-bold text-gold-light">
                          Mahant Maniyari, Muzaffarpur
                        </h4>
                        <p className="font-hindi text-xs text-gold-light/95 leading-relaxed">
                          <b>स्थान (Address):</b> मध्य मनियारी, पो०-सिलौत, थाना-मनियारी, जिला-मुजफ्फरपुर, बिहार।
                        </p>
                        <p className="font-sans text-[11px] text-gold-light/55 italic">
                          Host of Senduri, Haldi, Mehndi and Wedding Pheras.
                        </p>
                      </div>

                      <button
                        onClick={() => window.open(mapLocations.wedding.link, '_blank')}
                        className="py-2.5 rounded-xl border border-gold-primary/30 text-gold-light text-xs font-serif font-bold tracking-widest hover:bg-gold-primary hover:text-maroon-dark transition-all duration-350 flex items-center justify-center gap-2 w-full mt-4 bg-maroon-dark/60"
                      >
                        <Map className="w-4 h-4" />
                        NAVIGATE VENUE MAP
                      </button>
                    </div>

                    {/* Wedding Reception Venue (Samastipur side) */}
                    <div className="bg-[#4a0808]/40 border border-gold-primary/20 rounded-2xl p-5 space-y-4 hover:border-gold-primary/40 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-serif uppercase tracking-widest text-gold-light bg-gold-primary/10 px-2.5 py-0.5 rounded-full border border-gold-primary/25 inline-block">
                          Reception Venue (वर पक्ष)
                        </span>
                        <h4 className="font-serif text-lg font-bold text-gold-light">
                          Thahra Gopalpur, Samastipur
                        </h4>
                        <p className="font-hindi text-xs text-gold-light/95 leading-relaxed">
                          <b>स्थान (Address):</b> ग्राम+पो०-तहड़ा गोपालपुर, थाना-वैनी, जिला-समस्तीपुर-848115, बिहार।
                        </p>
                        <p className="font-sans text-[11px] text-gold-light/55 italic">
                          Host of Ghrithdari Puja and Welcoming Grand Reception Ceremony.
                        </p>
                      </div>

                      <button
                        onClick={() => window.open(mapLocations.reception.link, '_blank')}
                        className="py-2.5 rounded-xl border border-gold-primary/30 text-gold-light text-xs font-serif font-bold tracking-widest hover:bg-gold-primary hover:text-maroon-dark transition-all duration-350 flex items-center justify-center gap-2 w-full mt-4 bg-maroon-dark/60"
                      >
                        <Map className="w-4 h-4" />
                        NAVIGATE VENUE MAP
                      </button>
                    </div>
                  </div>

                  {/* Traditional Call/Contact for Help */}
                  <div className="border border-gold-primary/15 bg-maroon-dark/30 p-4 rounded-xl flex items-center justify-between gap-3 max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                        <PhoneCall className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-serif text-[10px] text-gold-light/60 uppercase block">Inquiries / Help Desk</span>
                        <span className="font-mono text-sm text-gold-light font-bold block">Mob: 9934295084</span>
                      </div>
                    </div>
                    <a 
                      href="tel:+919934295084"
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-emerald-50 text-xs font-serif font-bold tracking-widest transition-all duration-300"
                    >
                      CALL NOW
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ==========================================
                 SECTION D: GUEST BOOK & BLESSINGS
                 ========================================== */}
              {activeSection === 'blessings' && (
                <motion.div
                  key="sec-blessings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 relative z-10"
                >
                  <BlessingsBoard />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bal Aagrah / Child appeal Section (Adorable Traditional Touch from Photo 4) */}
            <div className="border-t border-b border-gold-primary/10 py-5 my-8 text-center max-w-lg mx-auto relative overflow-hidden bg-maroon-dark/30 rounded-xl">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-5 pointer-events-none">
                <Baby className="w-20 h-20 text-gold-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Baby className="w-4 h-4 text-gold-primary" />
                <span className="font-hindi text-gold-primary font-bold text-sm tracking-wide">बाल आग्रह (Sweet Appeal)</span>
              </div>
              <p className="font-hindi text-xs text-gold-light/90 max-w-md mx-auto px-6 italic leading-relaxed">
                "{balAagrah.text}"
                <span className="block font-sans font-bold text-gold-primary font-serif text-[11px] tracking-wide mt-1.5 not-italic">
                  — {balAagrah.by}
                </span>
              </p>
            </div>

            {/* Senders / Invitations Credits (आकांक्षी / दर्शनाभिलाषी) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center text-xs leading-relaxed max-w-lg mx-auto border-t border-gold-primary/10 pt-6">
              {/* Senders (आकांक्षी) */}
              <div className="space-y-1">
                <span className="font-hindi text-gold-primary font-bold block mb-1">आकांक्षी (Inviters)</span>
                {inviters.namesHindi.map((name, i) => (
                  <span key={i} className="font-hindi text-gold-light font-semibold block">{name}</span>
                ))}
                <span className="font-sans text-[10px] text-gold-light/50 block">along with family members</span>
              </div>

              {/* Welcoming guests (दर्शनाभिलाषी) */}
              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-gold-primary/10 pt-4 sm:pt-0 sm:pl-4">
                <span className="font-hindi text-gold-primary font-bold block mb-1">दर्शनाभिलाषी (Welcomers)</span>
                <p className="font-hindi text-[11px] text-gold-light/90 leading-relaxed">
                  {wellWishers.join(', ')} <span className="text-gold-light/50">एवं समस्त परिवार।</span>
                </p>
              </div>
            </div>

            {/* Footer Blessings Message */}
            <div className="text-center space-y-2 mt-8 mb-4 max-w-md mx-auto">
              <div className="flex justify-center text-rose-500"><Heart className="w-5 h-5 fill-rose-500 animate-pulse" /></div>
              <p className="font-sans text-xs text-gold-light/85 tracking-wide">
                Your presence and blessings will make our celebrations complete. We look forward to celebrating this beautiful occasion with you and your family!
              </p>
              <p className="font-hindi text-xs text-gold-primary font-medium">
                ।। सादर आमंत्रित ।।
              </p>
            </div>

            {/* Floating Action Button Controls for Guests (Download PDF Print / Share / RSVP) */}
            <div className="flex gap-3 justify-center pt-6 border-t border-gold-primary/10 flex-wrap relative z-30">
              {/* Copy/Share Link with responsive toast Feedback */}
              <button
                onClick={handleShare}
                className="px-5 py-2.5 rounded-full border border-gold-primary/30 text-gold-light bg-maroon-dark/70 text-xs font-serif font-bold tracking-widest hover:bg-gold-primary hover:text-maroon-dark transition-all duration-300 flex items-center gap-2"
                id="share-link-btn"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? 'LINK COPIED!' : 'SHARE INVITE'}
              </button>


              {/* Return to Envelope cover Option */}
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-full border border-gold-primary/20 text-gold-light/60 text-xs font-serif font-semibold hover:text-gold-light transition-all duration-300"
                id="view-envelope-btn"
              >
                Cover Page
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
