/**
 * @file sound.js
 * @description Audio synthesis utilities for interactive feedback.
 * Uses the Web Audio API (AudioContext) to synthesize physical contact thuds
 * and sliding clay/stone rustling noises. Requires no static assets.
 */

let audioContextInstance = null;

/**
 * Initializes and returns a singleton AudioContext instance.
 * Resumes audio context if it was suspended due to browser autoplay policies.
 * @returns {AudioContext} The active AudioContext.
 */
function getAudioContext() {
  if (!audioContextInstance) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in this browser.');
    }
    audioContextInstance = new AudioContextClass();
  }
  
  if (audioContextInstance.state === 'suspended') {
    audioContextInstance.resume();
  }
  
  return audioContextInstance;
}

/**
 * Plays a deep bass synthesised contact thud sound (sine wave sweep).
 * Triggers when physics bodies collide.
 */
export function playThud() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.3;
    const peakVolume = 0.45;

    // TODO: Create synthesised oscillator node for impact thud sound.
    // 1. Create a sine wave oscillator.
    // 2. Set start frequency to 60Hz and sweep it down to 20Hz.
    // 3. Apply an exponential gain decay curve to simulate physical impact decay.
    // 4. Connect nodes to destination and start.

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, now);
    oscillator.frequency.exponentialRampToValueAtTime(20, now + duration);

    gainNode.gain.setValueAtTime(peakVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (error) {
    console.debug('AudioContext synthesis blocked or failed:', error);
  }
}

/**
 * Plays a quick synthesised rustle noise (white noise passed through a bandpass filter).
 * Triggers when physics bodies are grabbed or dragged.
 */
export function playRustle() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.15;
    const peakVolume = 0.2;

    // TODO: Synthesise white noise audio buffer.
    // 1. Create a 1-channel buffer filled with random values (-1.0 to 1.0).
    // 2. Connect buffer to a BiquadFilterNode configured as a high-pass or bandpass filter (e.g. 2000Hz).
    // 3. Apply gain envelope decay.
    // 4. Start playback.

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Populate with random float values to create noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filterNode = ctx.createBiquadFilter();
    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(2000, now);
    filterNode.Q.setValueAtTime(2.0, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(peakVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + duration);
  } catch (error) {
    console.debug('AudioContext synthesis blocked or failed:', error);
  }
}
