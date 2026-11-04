#!/usr/bin/env python3
import os
import subprocess
import shutil
import math
import random
import wave
import struct

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE_DIR, "public", "products")
VIDEOS_DIR = os.path.join(BASE_DIR, "public", "videos")
TEMP_DIR = os.path.join(VIDEOS_DIR, "temp_vbee")
OUTPUT_VIDEO = os.path.join(VIDEOS_DIR, "htx-dua-song-phu-intro.mp4")
OUTPUT_POSTER = os.path.join(VIDEOS_DIR, "video-poster.jpg")
VBEE_SRC = "/Users/phuocvinh/.gemini/antigravity/brain/360086b7-a9af-4926-8127-bd24529f4501/.user_uploaded/uploaded_media_1793774555504.mp3"
FFMPEG = "/opt/homebrew/bin/ffmpeg"

os.makedirs(TEMP_DIR, exist_ok=True)

print("=== BƯỚC 1: XỬ LÝ VÀ CHUẨN HÓA ÂM THANH VBEE ===")
# Cắt bỏ phần outro watermark Vbee (từ 51.5s trở đi) và làm sạch âm thanh
vbee_voice_wav = os.path.join(TEMP_DIR, "vbee_voice.wav")
subprocess.run([
    FFMPEG, "-y",
    "-i", VBEE_SRC,
    "-t", "51.5",
    "-af", "afade=t=out:st=51.0:d=0.5,volume=1.25,highpass=f=100",
    "-ar", "44100",
    "-ac", "2",
    vbee_voice_wav
], check=True)
print("  Đã chuẩn hóa âm thanh Vbee: 51.5s")

# 7 phân cảnh khớp với timeline giọng đọc Vbee
# Timeline chuyển cảnh lý tưởng:
# Cảnh 1: 0.0s -> 6.8s (dài 7.3s, overlap 0.5s)
# Cảnh 2: 6.8s -> 14.1s (dài 7.8s, overlap 0.5s)
# Cảnh 3: 14.1s -> 21.4s (dài 7.8s, overlap 0.5s)
# Cảnh 4: 21.4s -> 28.5s (dài 7.6s, overlap 0.5s)
# Cảnh 5: 28.5s -> 36.0s (dài 8.0s, overlap 0.5s)
# Cảnh 6: 36.0s -> 43.5s (dài 8.0s, overlap 0.5s)
# Cảnh 7: 43.5s -> 51.5s (dài 8.5s)
SCENES = [
    {
        "id": 1,
        "file": "farm-coconut-grove.jpg",
        "dur": 7.3,
        "offset": 0.0,
        "motion": "zoompan=z='min(zoom+0.0011,1.24)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 2,
        "file": "farm-harvest-farmer.jpg",
        "dur": 7.8,
        "offset": 6.8,
        "motion": "zoompan=z=1.14:x='(iw-iw/zoom)*(0.15+0.70*on/d)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 3,
        "file": "factory-processing.jpg",
        "dur": 7.8,
        "offset": 14.1,
        "motion": "zoompan=z='min(zoom+0.0010,1.20)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 4,
        "file": "factory-cold-press.jpg",
        "dur": 7.6,
        "offset": 21.4,
        "motion": "zoompan=z='max(1.0,1.20-0.0010*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 5,
        "file": "farm-flower-nectar.jpg",
        "dur": 8.0,
        "offset": 28.5,
        "motion": "zoompan=z='min(zoom+0.0012,1.25)':x='(iw-iw/zoom)*0.65':y='(ih-ih/zoom)*0.35'"
    },
    {
        "id": 6,
        "file": "farm-coir-drying.jpg",
        "dur": 8.0,
        "offset": 36.0,
        "motion": "zoompan=z=1.13:x='(iw-iw/zoom)*(0.85-0.70*on/d)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 7,
        "file": "cert-ocop-diploma.jpg",
        "dur": 8.5,
        "offset": 43.5,
        "motion": "zoompan=z='min(zoom+0.0008,1.16)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    }
]

print("\n=== BƯỚC 2: RENDER 7 CẢNH CHUYỂN ĐỘNG GEMINI FLOW CINEMATIC ===")
clip_files = []
fps = 25

for sc in SCENES:
    frames = int(sc["dur"] * fps)
    img_path = os.path.join(PRODUCTS_DIR, sc["file"])
    out_clip = os.path.join(TEMP_DIR, f"clip_{sc['id']}.mp4")
    clip_files.append(out_clip)
    
    motion_filter = sc["motion"].replace("d", str(frames))
    vf = (
        f"{motion_filter}:d={frames}:s=1280x720:fps={fps},"
        "eq=contrast=1.06:brightness=0.01:saturation=1.12,"
        "format=yuv420p"
    )
    
    cmd = [
        FFMPEG, "-y",
        "-i", img_path,
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "faster",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-t", str(sc["dur"]),
        out_clip
    ]
    print(f"  Dựng cảnh {sc['id']}/7 ({sc['dur']}s)...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Lỗi render cảnh {sc['id']}:", res.stderr.decode("utf-8")[-400:])
        exit(1)

print("\n=== BƯỚC 3: TỔNG HỢP NHẠC NỀN DUCKING ĐỒNG BỘ ===")
music_dur = 54.0
sample_rate = 44100
num_samples = int(music_dur * sample_rate)
soundtrack_wav = os.path.join(TEMP_DIR, "soundtrack.wav")

left_samples = [0.0] * num_samples
right_samples = [0.0] * num_samples

notes = [
    (0.5, 261.63, 3.5, 0.35),
    (2.2, 329.63, 3.5, 0.30),
    (4.0, 392.00, 3.5, 0.35),
    (6.0, 523.25, 4.0, 0.38),
    (8.0, 440.00, 3.5, 0.30),
    (10.2, 392.00, 3.5, 0.32),
    (12.5, 329.63, 3.5, 0.35),
    (15.0, 261.63, 4.0, 0.38),
    (17.5, 329.63, 3.5, 0.32),
    (19.8, 392.00, 3.5, 0.35),
    (22.0, 440.00, 4.0, 0.38),
    (24.5, 523.25, 4.0, 0.40),
    (27.0, 587.33, 3.5, 0.35),
    (29.5, 523.25, 4.0, 0.38),
    (32.0, 440.00, 3.5, 0.32),
    (34.5, 392.00, 3.5, 0.35),
    (37.0, 329.63, 3.5, 0.32),
    (39.5, 261.63, 4.0, 0.35),
    (42.0, 329.63, 3.5, 0.32),
    (44.5, 392.00, 4.0, 0.35),
    (47.0, 261.63, 4.5, 0.40),
    (49.5, 196.00, 4.5, 0.45),
    (51.5, 130.81, 4.5, 0.50),
]

for start_t, freq, note_dur, amp in notes:
    start_idx = int(start_t * sample_rate)
    note_len = int(note_dur * sample_rate)
    end_idx = min(num_samples, start_idx + note_len)
    pan_l = 0.5 + 0.25 * math.sin(start_t * 0.7)
    pan_r = 1.0 - pan_l
    for s_i in range(start_idx, end_idx):
        t = (s_i - start_idx) / sample_rate
        decay = math.exp(-2.8 * t)
        val = (
            1.00 * math.sin(2 * math.pi * freq * t) +
            0.40 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-3.5 * t) +
            0.20 * math.sin(2 * math.pi * freq * 3 * t) * math.exp(-5.0 * t)
        ) * amp * decay
        left_samples[s_i] += val * pan_l
        right_samples[s_i] += val * pan_r

rng = random.Random(42)
b0_l = b0_r = 0.0
for s_i in range(num_samples):
    t = s_i / sample_rate
    vol_env = min(1.0, t / 1.5) * min(1.0, (music_dur - t) / 2.0)
    white_l = rng.uniform(-1.0, 1.0)
    white_r = rng.uniform(-1.0, 1.0)
    b0_l = 0.95 * b0_l + 0.05 * white_l
    b0_r = 0.95 * b0_r + 0.05 * white_r
    water = 0.025 * (1.0 + 0.3 * math.sin(2 * math.pi * 0.2 * t))
    drone = 0.04 * math.sin(2 * math.pi * 65.4 * t)
    left_samples[s_i] = (left_samples[s_i] + b0_l * water + drone) * vol_env
    right_samples[s_i] = (right_samples[s_i] + b0_r * water + drone) * vol_env

raw_bytes = bytearray()
for s_i in range(num_samples):
    vl = max(-1.0, min(1.0, left_samples[s_i]))
    vr = max(-1.0, min(1.0, right_samples[s_i]))
    raw_bytes.extend(struct.pack('<hh', int(vl * 32767), int(vr * 32767)))

with wave.open(soundtrack_wav, 'wb') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sample_rate)
    wf.writeframes(raw_bytes)

print("\n=== BƯỚC 4: GHÉP XFADE VỚI GIỌNG ĐỌC VBEE VÀ XUẤT VIDEO HOÀN CHỈNH ===")
inputs = []
for p in clip_files:
    inputs.extend(["-i", p])
inputs.extend(["-i", vbee_voice_wav]) # index 7
inputs.extend(["-i", soundtrack_wav]) # index 8

v_filters = []
curr_v = "0:v"
for i in range(1, 7):
    next_v = f"{i}:v"
    out_v = f"v{i}" if i < 6 else "v_raw"
    offset = SCENES[i]["offset"]
    v_filters.append(f"[{curr_v}][{next_v}]xfade=transition=fade:duration=0.5:offset={offset:.2f}[{out_v}]")
    curr_v = out_v

v_filters.append(f"[v_raw]fade=t=out:st=50.3:d=1.2[v_final]")

# Xử lý âm thanh: Giọng Vbee rõ nét + Nhạc nền ducking 0.18
v_filters.append(f"[8:a]volume=0.18,afade=t=in:st=0:d=1.0,afade=t=out:st=49.5:d=2.0[music_track]")
v_filters.append(f"[7:a][music_track]amix=inputs=2:normalize=0,volume=1.25[a_final]")

filter_complex = ";\n".join(v_filters)

final_cmd = [
    FFMPEG, "-y",
    *inputs,
    "-filter_complex", filter_complex,
    "-map", "[v_final]",
    "-map", "[a_final]",
    "-c:v", "libx264",
    "-profile:v", "main",
    "-level", "3.1",
    "-pix_fmt", "yuv420p",
    "-preset", "faster",
    "-crf", "23",
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", "51.5",
    "-movflags", "+faststart",
    OUTPUT_VIDEO
]

print("Đang encode video hoàn chỉnh...")
res_final = subprocess.run(final_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if res_final.returncode != 0:
    print("Lỗi encode final video:", res_final.stderr.decode("utf-8")[-600:])
    exit(1)

# Sao chép poster
shutil.copyfile(os.path.join(PRODUCTS_DIR, "farm-coconut-grove.jpg"), OUTPUT_POSTER)

# Dọn dẹp thư mục tạm
shutil.rmtree(TEMP_DIR, ignore_errors=True)

size_mb = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
print(f"\n=======================================================")
print(f"XUẤT VIDEO VBEE THÀNH CÔNG: {OUTPUT_VIDEO}")
print(f"Thời lượng: 51.5s | Dung lượng: {size_mb:.2f} MB | Độ phân giải: 1280x720 HD")
print(f"=======================================================")
