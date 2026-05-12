// Lightweight web audio hover/click sounds — no external assets
let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function playTone(freq = 660, duration = 0.08, type: OscillatorType = "sine", gain = 0.04) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.02);
}

export const hoverSound = () => playTone(880, 0.06, "sine", 0.025);
export const clickSound = () => {
  playTone(520, 0.09, "triangle", 0.05);
  setTimeout(() => playTone(780, 0.1, "sine", 0.04), 40);
};
