"use client";

import React, { useState, useEffect } from 'react';
import { Blessing } from '../types';
import { Heart, Sparkles, Send, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBlessings, addBlessing } from '@/app/actions/blessings';

export default function BlessingsBoard() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Groom\'s Family');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadBlessings() {
      const dbBlessings = await getBlessings();
      setBlessings(dbBlessings || []);
    }
    loadBlessings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const blessingData = {
      name: name.trim(),
      relation: relation,
      message: message.trim(),
    };

    const res = await addBlessing(blessingData);

    if (res.success && res.blessing) {
      setBlessings(prev => [res.blessing!, ...prev]);
      
      // Clear form
      setName('');
      setMessage('');
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4500);
    }
  };


  return (
    <div className="relative rounded-2xl border border-gold-primary/30 bg-linear-to-b from-maroon-artistic/50 to-maroon-dark/90 p-6 md:p-8 backdrop-blur-md gold-shadow" id="blessings-board-container">
      {/* Top Right View Blessings Button */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-4 py-2 text-xs uppercase tracking-widest text-gold-light transition hover:border-gold-primary hover:bg-gold-primary/20 z-10 shadow-lg backdrop-blur-sm"
      >
        View Blessings
      </button>

      <div className="mb-8 pr-32 sm:pr-36 md:pr-44 text-left">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-gold-primary" />
          <h3 className="font-serif text-xl sm:text-2xl text-gold-light uppercase tracking-widest">आशीर्वाद एवं स्नेहाशीष</h3>
          <Sparkles className="w-5 h-5 text-gold-primary" />
        </div>
        <p className="font-sans text-xs sm:text-sm text-gold-light/70 italic max-w-2xl">
          Leave your wishes & blessings for the beautiful couple of Muzaffarpur & Samastipur
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Submit Blessing Forms */}
        <div className="w-full">
          <h4 className="font-serif text-lg text-gold-primary mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            Send Your Blessings / RSVP
          </h4>

          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-xl text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-full bg-emerald-500/20 items-center justify-center text-emerald-300 mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h5 className="font-serif text-base text-emerald-200 mb-1">कृप्या धन्यवाद!</h5>
              <p className="font-sans text-xs text-gold-light/80">
                Your blessing has been successfully added to the royal invite guest book and saved securely.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-serif tracking-wider text-gold-light/80 uppercase mb-1">
                  Your Full Name / अपना नाम
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Kumar"
                  className="w-full bg-maroon-dark/60 border border-gold-primary/30 rounded-lg px-3 py-2 text-sm text-gold-light placeholder-gold-light/30 focus:outline-none focus:border-gold-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-serif tracking-wider text-gold-light/80 uppercase mb-1">
                  Relation with Family / संबंध
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full bg-maroon-dark/80 border border-gold-primary/30 rounded-lg px-3 py-2 text-sm text-gold-light focus:outline-none focus:border-gold-primary"
                >
                  <option value="Groom's Side (वर पक्ष)">Groom&apos;s Side (वर पक्ष)</option>
                  <option value="Bride's Side (वधू पक्ष)">Bride&apos;s Side (वधू पक्ष)</option>
                  <option value="Friend (मित्र / स्नेही)">Friend (मित्र / स्नेही)</option>
                  <option value="Well Wisher (शुभचिन्तक)">Well Wisher (शुभचिन्तक)</option>
                  <option value="Relative (रिश्तेदार)">Relative (रिश्तेदार)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif tracking-wider text-gold-light/80 uppercase mb-1">
                  Your Blessing Message / मंगल कामना
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your blessings and message for Rahul and Sushmita..."
                  className="w-full bg-maroon-dark/60 border border-gold-primary/30 rounded-lg px-3 py-2 text-sm text-gold-light placeholder-gold-light/30 focus:outline-none focus:border-gold-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg gold-bg-gradient hover:opacity-95 font-serif font-semibold text-maroon-dark text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                DEDICATE BLESSING
              </button>
            </form>
          )}

          {/* Elegant Traditional Shagun Card */}
          <div className="mt-8 pt-6 border-t border-gold-primary/20 flex flex-col items-center w-full">
            <div className="w-full bg-[#3d050c]/80 border border-gold-primary/30 rounded-2xl p-5 text-center gold-shadow relative overflow-hidden">
              {/* Embossed fine texture overlay */}
              <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none" />
              
              {/* Corner Ornaments */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold-primary/50" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-gold-primary/50" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-gold-primary/50" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold-primary/50" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-gold-primary" />
                <h5 className="font-serif text-xs font-bold gold-text-gradient uppercase tracking-widest">
                  पारंपरिक शगुन (Traditional Shagun)
                </h5>
                <Sparkles className="w-4 h-4 text-gold-primary" />
              </div>
              
              <p className="text-[11px] text-gold-light/70 font-sans max-w-xs mx-auto mb-4 leading-relaxed">
                If you wish to send your love and blessings as a token of shagun, you can scan the UPI QR code below.
              </p>
              
              {/* QR Code Container with white/gold frame */}
              <div className="inline-block p-3.5 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gold-primary/40 relative transform hover:scale-[1.02] transition-transform duration-300">
                {/* Micro gold corner brackets inside the frame */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gold-primary/60" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gold-primary/60" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gold-primary/60" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gold-primary/60" />
                
              
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Daradityaraman0518-1%40oksbi%26pn%3DAditya%2520Raman%26cu%3DINR"
                  alt="Aditya Raman UPI QR Code"
                  className="w-36 h-36 object-contain"
                />
              </div>

              <div className="mt-4">
                <span className="font-mono text-[10px] text-gold-light tracking-wide bg-maroon-dark/60 border border-gold-primary/10 px-2.5 py-1 rounded-full inline-block">
                  UPI ID: <span className="text-gold-primary font-bold">aradityaraman0518-1@oksbi</span>
                </span>
                <span className="text-[9px] text-gold-light/40 font-sans block mt-2">
                  Scan with GPay, PhonePe, Paytm, or any UPI app
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="w-full max-w-5xl overflow-hidden rounded-3xl border-2 border-gold-primary/40 bg-gradient-to-b from-[#3a030a] to-[#1a0003] p-5 sm:p-7 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl relative"
            >
              {/* Decorative Corner Ornaments inside modal */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-primary/30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-primary/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-primary/30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-primary/30 pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-gold-primary/20 pb-4 mb-6 gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-gold-light uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-primary hidden sm:inline-block" />
                    RSVP & Blessing Book
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs md:text-sm text-gold-light/70 max-w-xl leading-relaxed">
                    Browse all wishes and congratulations left by our guests. Use the inline buttons to read full messages.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-primary/30 bg-maroon-dark/60 text-gold-light hover:text-gold-primary hover:border-gold-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shrink-0"
                  aria-label="Close blessings popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of Blessings Card list */}
              <div className="max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4 scrollbar-thin">
                {blessings.length > 0 ? (
                  blessings.map((b) => {
                    const isExpanded = expandedMessages[b.id] ?? false;
                    const shouldTruncate = b.message.length > 140;
                    const displayMessage = shouldTruncate && !isExpanded
                      ? `${b.message.slice(0, 140)}...`
                      : b.message;

                    return (
                      <motion.div 
                        key={b.id} 
                        layout="position"
                        className="rounded-2xl border border-gold-primary/25 bg-maroon-dark/70 p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all duration-300 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-gold-primary/60 before:rounded-r"
                      >
                        {/* Heart accent icon in card background */}
                        <div className="absolute top-3 right-3 text-gold-primary/10 pointer-events-none">
                          <Heart className="w-8 h-8 fill-gold-primary/5" />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="space-y-0.5">
                            <p className="font-serif text-sm sm:text-base text-gold-light font-bold tracking-wide">{b.name}</p>
                            <span className="inline-block text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-gold-primary/15 text-gold-primary rounded-md border border-gold-primary/20">
                              {b.relation}
                            </span>
                          </div>
                          <span className="rounded-full bg-[#3d050c]/80 px-2.5 py-1 text-[10px] text-gold-light/60 border border-gold-primary/10">
                            {new Date(b.timestamp).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-gold-light/90 leading-relaxed italic whitespace-pre-line">
                          &quot;{displayMessage}&quot;
                        </p>

                        {shouldTruncate && (
                          <button
                            type="button"
                            onClick={() => setExpandedMessages((prev) => ({
                              ...prev,
                              [b.id]: !prev[b.id],
                            }))}
                            className="mt-3 inline-flex items-center text-[10px] sm:text-xs uppercase tracking-widest text-gold-primary hover:text-gold-light font-serif border-b border-gold-primary/30 hover:border-gold-light transition duration-200"
                          >
                            {isExpanded ? 'Show Less ↑' : 'Read More ↓'}
                          </button>
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
                    <Heart className="w-10 h-10 text-gold-primary/40 mb-3 animate-pulse" />
                    <p className="font-serif text-gold-primary/80 text-base mb-1">No blessings till now</p>
                    <p className="font-sans text-xs text-gold-light/50">Send your blessings using the form on the main board.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
