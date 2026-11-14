"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export const TOTAL_EGGS = 15;

type EggCtx = {
  found: string[];
  find: (id: string, label: string) => void;
  sound: boolean;
  setSound: (v: boolean) => void;
  click: () => void;
};

const Ctx = createContext<EggCtx | null>(null);

export function EggProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<string[]>([]);
  const [toast, setToast] = useState<{ key: number; label: string } | null>(null);
  const [sound, setSoundState] = useState(false);
  const audio = useRef<AudioContext | null>(null);

  const find = useCallback((id: string, label: string) => {
    setFound((prev) => {
      if (prev.includes(id)) return prev;
      setToast({ key: Date.now(), label });
      return [...prev, id];
    });
  }, []);

  // Tiny Web-Audio "tick" for tactile feedback
  const click = useCallback(() => {
    if (!sound) return;
    const ctx = audio.current ?? new AudioContext();
    audio.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }, [sound]);

  const setSound = useCallback((v: boolean) => setSoundState(v), []);

  return (
    <Ctx.Provider value={{ found, find, sound, setSound, click }}>
      {children}
      <div className="egg-pill" aria-live="polite">
        <i /> {found.length}/{TOTAL_EGGS} <span>found</span>
      </div>
      {toast && (
        <div key={toast.key} className="toast" onAnimationEnd={() => setToast(null)}>
          Found: {toast.label}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useEggs() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useEggs must be used inside EggProvider");
  return c;
}
