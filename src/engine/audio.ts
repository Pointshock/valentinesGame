import type { SceneId } from './types';

// ────────────────────────────────────────────────────────────
//  Note frequency table (Hz)
// ────────────────────────────────────────────────────────────
const N: Record<string, number> = {
  E2: 82.41,
  A2: 110.0,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0,
  A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0,
  A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.26, F5: 698.46, G5: 783.99, A5: 880.0,
  C6: 1046.5, E6: 1318.51,
};

// ────────────────────────────────────────────────────────────
//  Scene → music track mapping
// ────────────────────────────────────────────────────────────
export const SCENE_TRACK: Record<SceneId, string> = {
  title: 'menu',
  setup: 'menu',
  tavern: 'tavern',
  forest: 'forest',
  market: 'market',
  ruins: 'ruins',
  boss: 'boss',
  festival: 'festival',
  proposal: 'romantic',
  end: 'celebration',
};

// ────────────────────────────────────────────────────────────
//  Track configurations
// ────────────────────────────────────────────────────────────
interface TrackConfig {
  padNotes: number[];
  padWave: OscillatorType;
  padFilter: number;
  padVol: number;
  arpNotes: number[];
  arpWave: OscillatorType;
  arpSpeed: number; // notes per second
  arpVol: number;
  arpFilter: number;
  bassNote: number;
  bassVol: number;
}

const TRACKS: Record<string, TrackConfig> = {
  // Title / Setup — warm, inviting
  menu: {
    padNotes: [N.C4, N.E4, N.G4],
    padWave: 'triangle', padFilter: 1200, padVol: 0.06,
    arpNotes: [N.C5, N.E5, N.G5, N.C6, N.G5, N.E5],
    arpWave: 'sine', arpSpeed: 2, arpVol: 0.08, arpFilter: 2000,
    bassNote: N.C3, bassVol: 0.05,
  },
  // Tavern — cozy, medieval
  tavern: {
    padNotes: [N.D4, N.F4, N.A4],
    padWave: 'triangle', padFilter: 1000, padVol: 0.06,
    arpNotes: [N.D4, N.A4, N.F4, N.D5, N.A4, N.F4],
    arpWave: 'triangle', arpSpeed: 3, arpVol: 0.07, arpFilter: 1800,
    bassNote: N.D3, bassVol: 0.05,
  },
  // Whispering Forest — ethereal, mysterious
  forest: {
    padNotes: [N.A3, N.C4, N.E4],
    padWave: 'sine', padFilter: 800, padVol: 0.05,
    arpNotes: [N.A4, N.C5, N.E5, N.A5, N.E5, N.C5],
    arpWave: 'sine', arpSpeed: 1.2, arpVol: 0.06, arpFilter: 1500,
    bassNote: N.A2, bassVol: 0.04,
  },
  // Moonlit Market — shimmery, lively
  market: {
    padNotes: [N.G4, N.B4, N.D5],
    padWave: 'triangle', padFilter: 1400, padVol: 0.05,
    arpNotes: [N.G4, N.B4, N.D5, N.G5, N.D5, N.B4],
    arpWave: 'triangle', arpSpeed: 4, arpVol: 0.06, arpFilter: 2200,
    bassNote: N.G3, bassVol: 0.04,
  },
  // Crumbled Ruins — dark, atmospheric
  ruins: {
    padNotes: [N.E3, N.G3, N.B3],
    padWave: 'sawtooth', padFilter: 500, padVol: 0.03,
    arpNotes: [N.E4, N.B4, N.E5],
    arpWave: 'sine', arpSpeed: 0.6, arpVol: 0.05, arpFilter: 1200,
    bassNote: N.E2, bassVol: 0.05,
  },
  // Boss encounter — tense, dramatic
  boss: {
    padNotes: [N.A3, N.C4, N.E4],
    padWave: 'square', padFilter: 700, padVol: 0.03,
    arpNotes: [N.A3, N.E4, N.A4, N.C5, N.E5, N.C5],
    arpWave: 'sawtooth', arpSpeed: 5, arpVol: 0.04, arpFilter: 1000,
    bassNote: N.A2, bassVol: 0.06,
  },
  // Festival — bright, celebratory
  festival: {
    padNotes: [N.C4, N.E4, N.G4, N.C5],
    padWave: 'triangle', padFilter: 1600, padVol: 0.05,
    arpNotes: [N.C5, N.D5, N.E5, N.G5, N.E5, N.D5],
    arpWave: 'triangle', arpSpeed: 4, arpVol: 0.07, arpFilter: 2500,
    bassNote: N.C3, bassVol: 0.05,
  },
  // Romantic proposal — soft, intimate
  romantic: {
    padNotes: [N.F4, N.A4, N.C5],
    padWave: 'sine', padFilter: 1000, padVol: 0.05,
    arpNotes: [N.F4, N.A4, N.C5, N.F5, N.C5, N.A4],
    arpWave: 'sine', arpSpeed: 1.5, arpVol: 0.06, arpFilter: 1800,
    bassNote: N.F3, bassVol: 0.04,
  },
  // Ending celebration — triumphant, warm
  celebration: {
    padNotes: [N.C4, N.E4, N.G4, N.C5],
    padWave: 'triangle', padFilter: 2000, padVol: 0.06,
    arpNotes: [N.C5, N.E5, N.G5, N.C6, N.G5, N.E5],
    arpWave: 'triangle', arpSpeed: 3.5, arpVol: 0.08, arpFilter: 3000,
    bassNote: N.C3, bassVol: 0.05,
  },
};

// ────────────────────────────────────────────────────────────
//  SFX definitions (procedural one-shot sounds)
// ────────────────────────────────────────────────────────────
type SfxFn = (ctx: AudioContext, dest: AudioNode) => void;

function sfxClick(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.06);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.25, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.connect(g).connect(dest);
  osc.start(t);
  osc.stop(t + 0.1);
}

function sfxDiceRoll(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  const dur = 1.4;
  // Filtered noise with LFO modulation → rattling dice
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 3500;
  bp.Q.value = 2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.12, t);
  g.gain.setTargetAtTime(0.001, t + dur * 0.7, 0.15);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 18;
  const lfoG = ctx.createGain();
  lfoG.gain.value = 0.08;
  lfo.connect(lfoG).connect(g.gain);
  noise.connect(bp).connect(g).connect(dest);
  lfo.start(t);
  noise.start(t);
  noise.stop(t + dur);
  lfo.stop(t + dur);
}

function sfxDiceReveal(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  [N.C5, N.E5, N.G5].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t + i * 0.07);
    g.gain.linearRampToValueAtTime(0.18, t + i * 0.07 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.3);
    osc.connect(g).connect(dest);
    osc.start(t + i * 0.07);
    osc.stop(t + i * 0.07 + 0.35);
  });
}

function sfxShardCollect(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  [N.E5, N.G5, N.C6, N.E6].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t + i * 0.1);
    g.gain.linearRampToValueAtTime(0.14, t + i * 0.1 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.35);
    osc.connect(g).connect(dest);
    osc.start(t + i * 0.1);
    osc.stop(t + i * 0.1 + 0.4);
  });
}

function sfxTransition(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.setValueAtTime(2000, t);
  hp.frequency.exponentialRampToValueAtTime(8000, t + 0.3);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.1, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  noise.connect(hp).connect(g).connect(dest);
  noise.start(t);
  noise.stop(t + 0.4);
}

function sfxBossAppear(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  // Low dramatic drone
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.8);
  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 400;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.15, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
  osc.connect(filt).connect(g).connect(dest);
  osc.start(t);
  osc.stop(t + 1.1);
  // Impact thud
  const imp = ctx.createOscillator();
  imp.type = 'sine';
  imp.frequency.setValueAtTime(100, t);
  imp.frequency.exponentialRampToValueAtTime(40, t + 0.3);
  const ig = ctx.createGain();
  ig.gain.setValueAtTime(0.2, t);
  ig.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  imp.connect(ig).connect(dest);
  imp.start(t);
  imp.stop(t + 0.4);
}

function sfxVictory(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  [N.C5, N.E5, N.G5, N.C6].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t + i * 0.12);
    g.gain.linearRampToValueAtTime(0.15, t + i * 0.12 + 0.03);
    g.gain.setTargetAtTime(0.001, t + i * 0.12 + 0.5, 0.15);
    osc.connect(g).connect(dest);
    osc.start(t + i * 0.12);
    osc.stop(t + i * 0.12 + 1.0);
  });
}

function sfxRomantic(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  [N.F4, N.A4, N.C5].forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.1, t + 0.3);
    g.gain.setTargetAtTime(0.001, t + 1.5, 0.3);
    osc.connect(g).connect(dest);
    osc.start(t);
    osc.stop(t + 2.5);
  });
}

function sfxHeartbeat(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  [0, 0.28].forEach((offset) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, t + offset);
    osc.frequency.exponentialRampToValueAtTime(30, t + offset + 0.15);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.2, t + offset);
    g.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.2);
    osc.connect(g).connect(dest);
    osc.start(t + offset);
    osc.stop(t + offset + 0.25);
  });
}

function sfxConfetti(ctx: AudioContext, dest: AudioNode) {
  const t = ctx.currentTime;
  // Pop
  const pop = ctx.createOscillator();
  pop.type = 'sine';
  pop.frequency.setValueAtTime(800, t);
  pop.frequency.exponentialRampToValueAtTime(200, t + 0.15);
  const pg = ctx.createGain();
  pg.gain.setValueAtTime(0.2, t);
  pg.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  pop.connect(pg).connect(dest);
  pop.start(t);
  pop.stop(t + 0.2);
  // Random sparkles
  for (let i = 0; i < 6; i++) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1000 + Math.random() * 3000;
    const g = ctx.createGain();
    const st = t + 0.05 + Math.random() * 0.3;
    g.gain.setValueAtTime(0.001, st);
    g.gain.linearRampToValueAtTime(0.06, st + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, st + 0.15);
    osc.connect(g).connect(dest);
    osc.start(st);
    osc.stop(st + 0.2);
  }
}

const SFX_MAP: Record<string, SfxFn> = {
  click: sfxClick,
  diceRoll: sfxDiceRoll,
  diceReveal: sfxDiceReveal,
  shardCollect: sfxShardCollect,
  transition: sfxTransition,
  bossAppear: sfxBossAppear,
  victory: sfxVictory,
  romantic: sfxRomantic,
  heartbeat: sfxHeartbeat,
  confetti: sfxConfetti,
};

// ────────────────────────────────────────────────────────────
//  Audio Engine (singleton)
// ────────────────────────────────────────────────────────────
const MUSIC_VOL = 0.25;
const SFX_VOL = 0.4;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private musicEnabled = true;
  private sfxEnabled = true;
  private initialized = false;

  private desiredTrackId: string | null = null;
  private currentTrackId: string | null = null;
  private trackCleanup: (() => void) | null = null;

  /** Call on first user interaction to unlock the AudioContext. */
  init() {
    if (this.initialized) return;
    try {
      this.ctx = new AudioContext();
    } catch {
      return;
    }
    this.initialized = true;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.musicEnabled ? MUSIC_VOL : 0;
    this.musicGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = this.sfxEnabled ? SFX_VOL : 0;
    this.sfxGain.connect(this.ctx.destination);

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Start the music track that was requested before init
    if (this.desiredTrackId) {
      this._startTrack(this.desiredTrackId);
    }
  }

  setMusicEnabled(on: boolean) {
    this.musicEnabled = on;
    if (this.musicGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(t);
      this.musicGain.gain.setTargetAtTime(on ? MUSIC_VOL : 0, t, 0.3);
    }
  }

  setSfxEnabled(on: boolean) {
    this.sfxEnabled = on;
    if (this.sfxGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.sfxGain.gain.cancelScheduledValues(t);
      this.sfxGain.gain.setTargetAtTime(on ? SFX_VOL : 0, t, 0.1);
    }
  }

  /** Set the background music track. Crossfades if already playing. */
  playTrack(trackId: string) {
    this.desiredTrackId = trackId;
    if (!this.initialized) return;
    if (trackId === this.currentTrackId) return;
    this._startTrack(trackId);
  }

  stopMusic() {
    this.desiredTrackId = null;
    this._stopTrack();
  }

  /** Play a one-shot sound effect. */
  playSfx(sfxId: string) {
    if (!this.sfxEnabled) return;
    if (!this.initialized) return;
    if (!this.ctx || !this.sfxGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const fn = SFX_MAP[sfxId];
    if (fn) fn(this.ctx, this.sfxGain);
  }

  // ── Internal ──────────────────────────────────────────────

  private _startTrack(trackId: string) {
    if (!this.ctx || !this.musicGain) return;
    // Fade out & clean up previous track (creates a crossfade)
    this._stopTrack();
    this.currentTrackId = trackId;

    const cfg = TRACKS[trackId];
    if (!cfg) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Sub-gain for this track (fade in)
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0, now);
    tg.gain.linearRampToValueAtTime(1, now + 0.8);
    tg.connect(this.musicGain);

    const allOscs: OscillatorNode[] = [];

    // ── PAD (detuned chord) ──
    const padFilt = ctx.createBiquadFilter();
    padFilt.type = 'lowpass';
    padFilt.frequency.value = cfg.padFilter;
    padFilt.Q.value = 0.7;
    padFilt.connect(tg);

    for (const freq of cfg.padNotes) {
      for (const det of [-5, 0, 5]) {
        const osc = ctx.createOscillator();
        osc.type = cfg.padWave;
        osc.frequency.value = freq;
        osc.detune.value = det;
        const g = ctx.createGain();
        g.gain.value = cfg.padVol / 3;
        osc.connect(g).connect(padFilt);
        osc.start(now);
        allOscs.push(osc);
      }
    }

    // ── BASS DRONE ──
    const bassOsc = ctx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.value = cfg.bassNote;
    const bassG = ctx.createGain();
    bassG.gain.value = cfg.bassVol;
    const bassFilt = ctx.createBiquadFilter();
    bassFilt.type = 'lowpass';
    bassFilt.frequency.value = 180;
    bassOsc.connect(bassG).connect(bassFilt).connect(tg);
    bassOsc.start(now);
    allOscs.push(bassOsc);

    // ── ARPEGGIO (scheduled plucked notes with delay reverb) ──
    const arpFilt = ctx.createBiquadFilter();
    arpFilt.type = 'lowpass';
    arpFilt.frequency.value = cfg.arpFilter;
    const arpDelay = ctx.createDelay(1);
    arpDelay.delayTime.value = 0.25;
    const delayFb = ctx.createGain();
    delayFb.gain.value = 0.2;
    arpFilt.connect(tg);
    arpFilt.connect(arpDelay);
    arpDelay.connect(delayFb).connect(tg);

    let arpIdx = 0;
    const arpMs = 1000 / cfg.arpSpeed;

    const arpTimer = window.setInterval(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const freq = cfg.arpNotes[arpIdx % cfg.arpNotes.length]!;
      const noteDur = (arpMs / 1000) * 0.65;

      const osc = this.ctx.createOscillator();
      osc.type = cfg.arpWave;
      osc.frequency.value = freq;
      const ng = this.ctx.createGain();
      ng.gain.setValueAtTime(0.001, t);
      ng.gain.linearRampToValueAtTime(cfg.arpVol, t + 0.01);
      ng.gain.setTargetAtTime(0.001, t + noteDur, 0.04);
      osc.connect(ng).connect(arpFilt);
      osc.start(t);
      osc.stop(t + noteDur + 0.15);

      arpIdx++;
    }, arpMs);

    // ── CLEANUP ──
    this.trackCleanup = () => {
      clearInterval(arpTimer);
      const t = ctx.currentTime;
      tg.gain.cancelScheduledValues(t);
      tg.gain.setTargetAtTime(0, t, 0.25);
      // Allow fade-out to complete, then hard-stop oscillators
      setTimeout(() => {
        for (const o of allOscs) {
          try { o.stop(); } catch { /* already stopped */ }
        }
        try { tg.disconnect(); } catch { /* ok */ }
      }, 1500);
    };
  }

  private _stopTrack() {
    if (this.trackCleanup) {
      this.trackCleanup();
      this.trackCleanup = null;
    }
    this.currentTrackId = null;
  }
}

export const audioEngine = new AudioEngine();
