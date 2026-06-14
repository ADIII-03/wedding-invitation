"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const melodyIntervalRef = useRef<any>(null);

  // Traditional Raga Bhupali/Yaman-like notes (pentatonic, highly serene, meditative)
  const ragNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  // Synth-based playback
  const startDrone = () => {
    stopSynth();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.5);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      const baseFreq = 130.81; // C3
      const harmonics = [1, 1.5, 2, 3, 4];
      
      harmonics.forEach((h, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = index % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * h + (Math.random() * 0.5 - 0.25), ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.3, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + (index * 80), ctx.currentTime);
        filter.Q.setValueAtTime(2, ctx.currentTime);

        const vol = 0.16 / (index + 1);
        oscGain.gain.setValueAtTime(vol, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(mainGain);

        osc.start();
        
        oscillatorsRef.current.push(osc);
        oscillatorsRef.current.push(lfo);
      });

      let noteIndex = 0;
      const playMelodyNote = () => {
        if (ctx.state === 'suspended') return;
        
        const now = ctx.currentTime;
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const noteFilter = ctx.createBiquadFilter();

        const change = Math.random() > 0.4 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        noteIndex = Math.max(0, Math.min(ragNotes.length - 1, noteIndex + change));
        const freq = ragNotes[noteIndex];

        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now);

        noteOsc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.15);
        noteOsc.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.48, now + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        noteFilter.type = 'bandpass';
        noteFilter.frequency.setValueAtTime(freq * 1.5, now);
        noteFilter.Q.setValueAtTime(1.5, now);

        const delay = ctx.createDelay();
        const delayGain = ctx.createGain();
        delay.delayTime.setValueAtTime(0.35, now);
        delayGain.gain.setValueAtTime(0.35, now);

        noteOsc.connect(noteFilter);
        noteFilter.connect(noteGain);
        noteGain.connect(mainGain);

        noteGain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(delay);
        delayGain.connect(mainGain);

        noteOsc.start();
        noteOsc.stop(now + 1.5);
      };

      melodyIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.15) {
          playMelodyNote();
        }
      }, 1600);

    } catch (error) {
      console.error('Failed to play custom wedding ambiance synth:', error);
    }
  };

  const stopSynth = () => {
    const activeCtx = audioCtxRef.current;
    const activeGain = gainNodeRef.current;
    const activeOscillators = oscillatorsRef.current;
    
    if (activeGain && activeCtx) {
      const now = activeCtx.currentTime;
      try {
        activeGain.gain.cancelScheduledValues(now);
        activeGain.gain.linearRampToValueAtTime(0, now + 0.5);
        
        setTimeout(() => {
          activeOscillators.forEach((osc) => {
            try { osc.stop(); } catch(e) {}
          });
          
          try {
            activeCtx.close().catch(() => {});
          } catch (e) {}
          
          if (audioCtxRef.current === activeCtx) {
            audioCtxRef.current = null;
          }
          if (gainNodeRef.current === activeGain) {
            gainNodeRef.current = null;
          }
          if (oscillatorsRef.current === activeOscillators) {
            oscillatorsRef.current = [];
          }
        }, 600);
      } catch (e) {
        console.error(e);
      }
    }
    
    if (melodyIntervalRef.current) {
      clearInterval(melodyIntervalRef.current);
      melodyIntervalRef.current = null;
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startDrone();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startDrone();
    }

    const resumeAudio = () => {
      if (isPlaying) {
        if (audioCtxRef.current) {
          if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume().catch((e) => console.error(e));
          }
        } else {
          startDrone();
        }
      }
    };

    window.addEventListener('click', resumeAudio);
    window.addEventListener('touchstart', resumeAudio);
    window.addEventListener('scroll', resumeAudio);

    return () => {
      stopSynth();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
      window.removeEventListener('scroll', resumeAudio);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" id="wedding-audio-widget">
      {/* Visual Indicator of what is playing */}
      {isPlaying && (
        <div className="flex flex-col gap-1 items-end">
          <div className="bg-maroon-dark/95 border border-gold-primary/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md text-xs font-serif text-gold-light animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-gold-primary animate-spin-slow" />
            <span>Playing Vedic Sitar Synth ॐ</span>
          </div>
        </div>
      )}

      {/* Main Play/Pause circular control button */}
      <button
        onClick={handleToggle}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-500 gold-shadow ${
          isPlaying 
            ? 'bg-gold-light border-gold-primary hover:bg-gold-primary' 
            : 'bg-gradient-to-br from-maroon-artistic to-maroon-dark border-gold-primary/80 hover:scale-105'
        }`}
        title={isPlaying ? "Mute wedding sitar synth" : "Play wedding sitar synth"}
        id="audio-toggle-btn"
      >
        {isPlaying ? (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-20 animate-ping" />
            <span className="absolute inset-1 rounded-full border border-gold-primary/40 animate-[pulse-ring_2s_infinite]" />
            <Volume2 className="w-6 h-6 text-maroon-dark" />
          </>
        ) : (
          <VolumeX className="w-6 h-6 text-gold-light" />
        )}
      </button>
    </div>
  );
}
