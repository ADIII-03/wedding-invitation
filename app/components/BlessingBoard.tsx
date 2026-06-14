"use client";

import React, { useState, useEffect } from 'react';
import { initialBlessings } from '../data';
import { Blessing } from '../types';
import { Heart, Sparkles, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBlessings, addBlessing } from '@/app/actions/blessings';

export default function BlessingsBoard() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Groom\'s Family');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorCleared, setErrorCleared] = useState(true);

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
    <div className="rounded-2xl border border-gold-primary/30 bg-gradient-to-b from-maroon-artistic/50 to-maroon-dark/90 p-6 md:p-8 backdrop-blur-md gold-shadow" id="blessings-board-container">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-gold-primary" />
          <h3 className="font-serif text-2xl text-gold-light uppercase tracking-widest">आशीर्वाद एवं स्नेहाशीष</h3>
          <Sparkles className="w-5 h-5 text-gold-primary" />
        </div>
        <p className="font-sans text-sm text-gold-light/70 italic">
          Leave your wishes & blessings for the beautiful couple of Muzaffarpur & Samastipur
        </p>
      </div>

      <div className={`grid grid-cols-1 ${blessings.length > 0 ? 'lg:grid-cols-12 gap-8' : 'max-w-xl mx-auto'}`}>
        {/* Left Side: Submit Blessing Forms */}
        <div className={`${blessings.length > 0 ? 'lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gold-primary/10 pb-8 lg:pb-0 lg:pr-8' : 'w-full'}`}>
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
                  <option value="Groom's Side (वर पक्ष)">Groom's Side (वर पक्ष)</option>
                  <option value="Bride's Side (वधू पक्ष)">Bride's Side (वधू पक्ष)</option>
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

        {/* Right Side: Scrollable Blessings List */}
        {blessings.length > 0 && (
          <div className="lg:col-span-7 flex flex-col h-[340px]">
            <h4 className="font-serif text-lg text-gold-primary mb-4 flex items-center justify-between">
              <span>Wishes & Blessings Book</span>
              <span className="text-xs bg-gold-primary/10 text-gold-light px-2.5 py-1 rounded-full border border-gold-primary/20 font-sans font-normal">
                {blessings.length} dedications
              </span>
            </h4>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              <AnimatePresence>
                {blessings.map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-maroon-dark/40 border border-gold-primary/10 rounded-xl p-4 relative overflow-hidden group"
                  >
                    {/* Subtle sparkle icon background */}
                    <div className="absolute top-2 right-2 text-gold-primary/20">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-serif font-bold text-sm text-gold-primary">{b.name}</span>
                      <span className="text-[10px] uppercase font-sans font-medium px-2 py-0.5 bg-gold-primary/20 text-gold-light rounded border border-gold-primary/30">
                        {b.relation}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-gold-light/90 leading-relaxed italic">
                      "{b.message}"
                    </p>

                    <div className="text-[9px] font-mono text-gold-light/40 text-right mt-1.5">
                      {new Date(b.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
