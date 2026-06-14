"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';

const SHEHNAI_URL = 'https://archive.org/download/ustadbismillahkhanshehnai/01.%20Kafi%20Dhun.mp3';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackType, setTrackType] = useState<'shehnai' | 'synth'>('shehnai');
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const melodyIntervalRef = useRef<any>(null);

  // Traditional Raga Bhupali/Yaman-like notes (pentatonic, highly serene, meditative)
  const ragNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  // 1. Synth-based playback as a clean offline/network fallback
  const startDrone = () => {
    stopSynth();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.5); // Increased from 0.18
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

        const vol = 0.16 / (index + 1); // Increased from 0.08
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
        noteGain.gain.linearRampToValueAtTime(0.48, now + 0.08); // Increased from 0.22
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

  // 2. Playback Controllers
  const playTraditionalAudio = () => {
    // Stop any synth if running
    stopSynth();

    if (!audioRef.current) {
      const audio = new Audio(SHEHNAI_URL);
      audio.loop = true;
      audio.volume = 0.75; // Increased shehnai volume from 0.35
      
      // Handle loading/error events dynamically
      audio.addEventListener('error', (e) => {
        console.warn("Shehnai MP3 failed to load from CDNs. Activating high-quality local synth fallback.", e);
        setHasError(true);
        setTrackType('synth');
        // If we are supposed to be playing, start the synth
        if (isPlaying) {
          startDrone();
        }
      });

      audioRef.current = audio;
    }

    setHasError(false);
    audioRef.current.play().catch((err) => {
      console.warn("Interactive play promise rejected. Browser autoplay policies may require user tap.", err);
      // Fallback in case of CORS or media load block issues
      setTrackType('synth');
      startDrone();
    });
  };

  const stopTraditionalAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      if (trackType === 'shehnai') {
        stopTraditionalAudio();
      } else {
        stopSynth();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (trackType === 'shehnai') {
        playTraditionalAudio();
      } else {
        startDrone();
      }
    }
  };

  const handleTrackSwitch = (type: 'shehnai' | 'synth') => {
    if (type === trackType) return;
    
    // Stop whatever is playing
    if (isPlaying) {
      if (trackType === 'shehnai') {
        stopTraditionalAudio();
      } else {
        stopSynth();
      }
    }

    setTrackType(type);

    // If already playing, start the new track immediately
    if (isPlaying) {
      if (type === 'shehnai') {
        playTraditionalAudio();
      } else {
        startDrone();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      stopTraditionalAudio();
      if (audioRef.current) {
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" id="wedding-audio-widget">
      {/* Visual Indicator of what is playing */}
      {isPlaying && (
        <div className="flex flex-col gap-1 items-end">
          <div className="bg-maroon-dark/95 border border-gold-primary/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md text-xs font-serif text-gold-light animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-gold-primary animate-spin-slow" />
            <span>
              {trackType === 'shehnai' 
                ? 'Playing Sacred Shehnai ॐ' 
                : 'Playing Vedic Sitar Synth ॐ'
              }
            </span>
          </div>
          
          {/* Track selector during playback to allow user choice */}
          <div className="flex gap-1.5 bg-maroon-dark/90 border border-gold-primary/20 rounded-full p-0.5 shadow-lg backdrop-blur-sm self-end">
            <button 
              onClick={() => handleTrackSwitch('shehnai')}
              disabled={hasError}
              className={`px-2 py-0.5 text-[9px] font-serif rounded-full transition-all tracking-wider ${
                trackType === 'shehnai' 
                  ? 'bg-gold-primary text-maroon-dark font-semibold' 
                  : 'text-gold-light/60 hover:text-gold-light disabled:opacity-40'
              }`}
              title={hasError ? "Shehnai offline" : "Switch to live Shehnai instrumental"}
            >
              Classic Shehnai
            </button>
            <button 
              onClick={() => handleTrackSwitch('synth')}
              className={`px-2 py-0.5 text-[9px] font-serif rounded-full transition-all tracking-wider ${
                trackType === 'synth' 
                  ? 'bg-gold-primary text-maroon-dark font-semibold' 
                  : 'text-gold-light/60 hover:text-gold-light'
              }`}
              title="Switch to atmospheric Sitar synthesizer"
            >
              Vedic Sitar
            </button>
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
        title={isPlaying ? "Mute traditional wedding music" : "Play traditional wedding music"}
        id="audio-toggle-btn"
      >
        {isPlaying ? (
          <>
            {/* Elegant multi-ring decorative ripple resonance */}
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
