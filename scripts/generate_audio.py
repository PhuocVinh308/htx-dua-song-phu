#!/usr/bin/env python3
import os
import math
import struct
import wave
import subprocess

def generate_ambient_audio(output_wav, duration=30.0, sample_rate=44100):
    """
    Generate a serene, organic acoustic soundtrack:
    - Melodic pentatonic notes (pluck envelope with harmonics)
    - Gentle ambient river stream pink noise
    - Warm bass drone
    """
    num_samples = int(duration * sample_rate)
    
    # Pentatonic melody notes in Hz (C major / A minor pentatonic: C, D, E, G, A)
    # Warm Nam Bo folk resonance
    notes = [
        # (time_sec, freq, duration, amplitude)
        (0.5, 261.63, 3.0, 0.4),   # C4
        (1.8, 329.63, 3.0, 0.35),  # E4
        (3.0, 392.00, 3.5, 0.4),   # G4
        (4.2, 523.25, 4.0, 0.45),  # C5
        
        (6.0, 440.00, 3.0, 0.35),  # A4
        (7.2, 392.00, 3.0, 0.35),  # G4
        (8.5, 329.63, 3.5, 0.4),   # E4
        (10.0, 293.66, 3.5, 0.35), # D4
        (11.5, 261.63, 4.0, 0.45), # C4
        
        (13.5, 329.63, 3.0, 0.4),  # E4
        (14.8, 392.00, 3.0, 0.4),  # G4
        (16.0, 440.00, 3.5, 0.45), # A4
        (17.5, 587.33, 4.0, 0.4),  # D5
        (19.0, 523.25, 4.0, 0.45), # C5
        
        (21.0, 392.00, 3.5, 0.4),  # G4
        (22.5, 329.63, 3.5, 0.4),  # E4
        (24.0, 261.63, 4.5, 0.45), # C4
        (26.0, 196.00, 4.0, 0.5),  # G3 (resolving root)
        (27.5, 130.81, 4.5, 0.6)   # C3 (deep warm acoustic finish)
    ]
    
    # Pre-render samples buffer
    left_samples = [0.0] * num_samples
    right_samples = [0.0] * num_samples
    
    # 1. Add notes with rich plucking envelope & harmonics (guitar/dan tranh acoustic hybrid)
    for start_t, freq, note_dur, amp in notes:
        start_idx = int(start_t * sample_rate)
        note_len = int(note_dur * sample_rate)
        end_idx = min(num_samples, start_idx + note_len)
        
        # Panning between left and right for stereophonic space
        pan_l = 0.5 + 0.3 * math.sin(start_t * 0.7)
        pan_r = 1.0 - pan_l
        
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / sample_rate
            # Pluck exponential decay
            decay = math.exp(-3.2 * t)
            
            # Fundamental + harmonics
            val = (
                1.00 * math.sin(2 * math.pi * freq * t) +
                0.45 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-4.5 * t) +
                0.25 * math.sin(2 * math.pi * freq * 3 * t) * math.exp(-6.0 * t) +
                0.12 * math.sin(2 * math.pi * freq * 4 * t) * math.exp(-8.0 * t)
            ) * amp * decay
            
            left_samples[i] += val * pan_l
            right_samples[i] += val * pan_r
            
    # 2. Add warm flowing river water ambience & soft wind
    # Pseudo pink noise via filtered random
    import random
    rng = random.Random(42)
    b0_l = b1_l = b2_l = 0.0
    b0_r = b1_r = b2_r = 0.0
    
    for i in range(num_samples):
        # Fade in & out
        t = i / sample_rate
        vol_env = min(1.0, t / 2.0) * min(1.0, (duration - t) / 2.0)
        
        white_l = rng.uniform(-1.0, 1.0)
        white_r = rng.uniform(-1.0, 1.0)
        
        # Simple IIR low-pass for gentle water murmur
        b0_l = 0.95 * b0_l + 0.05 * white_l
        b0_r = 0.95 * b0_r + 0.05 * white_r
        
        # Gentle river modulation (waves)
        water_mod = 0.035 * (1.0 + 0.3 * math.sin(2 * math.pi * 0.25 * t))
        
        # Warm ambient drone
        drone = 0.05 * math.sin(2 * math.pi * 65.4 * t) * vol_env # C2
        
        left_samples[i] = (left_samples[i] + b0_l * water_mod + drone) * vol_env
        right_samples[i] = (right_samples[i] + b0_r * water_mod + drone) * vol_env

    # Normalize audio to prevent clipping
    max_amp = max(max(abs(s) for s in left_samples), max(abs(s) for s in right_samples), 0.001)
    scale = 0.85 / max_amp
    
    with wave.open(output_wav, 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2) # 16-bit
        wav_file.setframerate(sample_rate)
        
        raw_data = bytearray()
        for i in range(num_samples):
            l = int(max(-32767, min(32767, left_samples[i] * scale * 32767)))
            r = int(max(-32767, min(32767, right_samples[i] * scale * 32767)))
            raw_data.extend(struct.pack('<hh', l, r))
            
        wav_file.writeframes(raw_data)
        
    print(f"Generated soundtrack: {output_wav} ({duration}s)")

if __name__ == '__main__':
    generate_ambient_audio('public/videos/soundtrack.wav', 30.0)
