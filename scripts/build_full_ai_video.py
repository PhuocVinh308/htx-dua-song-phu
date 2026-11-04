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
TEMP_DIR = os.path.join(VIDEOS_DIR, "temp_render")
OUTPUT_VIDEO = os.path.join(VIDEOS_DIR, "htx-dua-song-phu-intro.mp4")
OUTPUT_POSTER = os.path.join(VIDEOS_DIR, "video-poster.jpg")
FFMPEG = "/opt/homebrew/bin/ffmpeg"
FFPROBE = "/opt/homebrew/bin/ffprobe"

os.makedirs(TEMP_DIR, exist_ok=True)

# 7 phân cảnh kèm câu lồng tiếng thuyết minh chi tiết
SCENES = [
    {
        "id": 1,
        "file": "farm-coconut-grove.jpg",
        "title": "Vùng nguyên liệu hữu cơ",
        "desc": "Rạch phù sa ven sông Măng Thít, Tam Bình, Vĩnh Long",
        "voice": "Chào mừng quý khách đến với Hợp tác xã Dừa Song Phú, nằm bên dòng sông Măng Thít trù phú tỉnh Vĩnh Long.",
        # Zoom in sâu vào rạch dừa
        "motion": "zoompan=z='min(zoom+0.0010,1.22)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 2,
        "file": "farm-harvest-farmer.jpg",
        "title": "Thu hoạch dừa bánh tẻ",
        "desc": "Xã viên tuyển chọn từng buồng dừa trĩu quả an toàn",
        "voice": "Bà con nông dân chuyên canh những vườn dừa hữu cơ, tuyển chọn từng quả dừa bánh tẻ tươi ngon và giàu dinh dưỡng.",
        # Pan từ trái sang phải
        "motion": "zoompan=z=1.14:x='(iw-iw/zoom)*(0.15+0.70*on/d)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 3,
        "file": "factory-processing.jpg",
        "title": "Xưởng sơ chế chuẩn OCOP",
        "desc": "Gọt tỉa dừa xiêm kim cương sạch khuẩn xuất khẩu",
        "voice": "Dừa tươi được sơ chế và gọt tạo hình kim cương xuất khẩu, đạt nghiêm ngặt các tiêu chuẩn an toàn thực phẩm.",
        # Zoom in vào khu sơ chế
        "motion": "zoompan=z='min(zoom+0.0009,1.20)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 4,
        "file": "factory-cold-press.jpg",
        "title": "Ép ly tâm lạnh 3 pha",
        "desc": "Chiết xuất dầu dừa nguyên chất tinh khiết không gia nhiệt",
        "voice": "Dây chuyền ép ly tâm lạnh ba pha hiện đại, giúp giữ trọn vẹn dưỡng chất tinh khiết của dầu dừa nguyên chất.",
        # Zoom out mở rộng khung cảnh máy móc
        "motion": "zoompan=z='max(1.0,1.20-0.0009*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 5,
        "file": "farm-flower-nectar.jpg",
        "title": "Thu mật hoa dừa tự nhiên",
        "desc": "Nghệ nhân mát-xa búp hoa thu từng giọt mật thanh lành",
        "voice": "Những giọt mật hoa dừa tự nhiên được thu hái công phu lúc rạng đông, mang đến vị ngọt thanh lành cho sức khỏe.",
        # Zoom in búp hoa
        "motion": "zoompan=z='min(zoom+0.0011,1.24)':x='(iw-iw/zoom)*0.65':y='(ih-ih/zoom)*0.35'"
    },
    {
        "id": 6,
        "file": "farm-coir-drying.jpg",
        "title": "Kinh tế tuần hoàn xơ dừa",
        "desc": "Chế biến xơ dừa sinh thái xuất khẩu ra thế giới",
        "voice": "Mô hình kinh tế tuần hoàn không phế thải, tận dụng xơ dừa sinh thái để phục vụ nông nghiệp và xuất khẩu quốc tế.",
        # Pan ngang bãi phơi
        "motion": "zoompan=z=1.13:x='(iw-iw/zoom)*(0.85-0.70*on/d)':y='ih/2-(ih/zoom/2)'"
    },
    {
        "id": 7,
        "file": "cert-ocop-diploma.jpg",
        "title": "Văn bằng chứng nhận OCOP 4 sao",
        "desc": "Khẳng định uy tín và chất lượng nông sản Song Phú",
        "voice": "Hợp tác xã Dừa Song Phú tự hào đạt chứng nhận OCOP bốn sao, khẳng định uy tín và chất lượng nông sản Việt Nam.",
        # Zoom in trang trọng
        "motion": "zoompan=z='min(zoom+0.0008,1.16)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    }
]

print("=== BƯỚC 1: LỒNG TIẾNG AI CHO TỪNG PHÂN CẢNH ===")
scene_durations = []
voice_files = []

for sc in SCENES:
    voice_aiff = os.path.join(TEMP_DIR, f"voice_{sc['id']}.aiff")
    voice_wav = os.path.join(TEMP_DIR, f"voice_{sc['id']}.wav")
    
    # Dùng TTS tiếng Việt của Apple macOS
    subprocess.run(["say", "-v", "Linh", "-o", voice_aiff, sc["voice"]], check=True)
    
    # Đo thời lượng câu nói
    res = subprocess.run(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", voice_aiff],
        stdout=subprocess.PIPE, text=True, check=True
    )
    v_dur = float(res.stdout.strip())
    
    # Mỗi cảnh dài hơn câu nói khoảng 0.8s để có khoảng nghỉ mượt mà
    clip_dur = round(v_dur + 0.8, 1)
    scene_durations.append(clip_dur)
    
    # Chuẩn hóa voice sang wav 44.1kHz stereo, thêm padding im lặng trước 0.3s
    pad_filter = f"adelay=300|300,apad=whole_dur={clip_dur},volume=1.35,highpass=f=120"
    subprocess.run(
        [FFMPEG, "-y", "-i", voice_aiff, "-af", pad_filter, "-ar", "44100", "-ac", "2", voice_wav],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True
    )
    voice_files.append(voice_wav)
    print(f"  [Cảnh {sc['id']}] Giọng đọc: {v_dur:.2f}s -> Thời lượng cảnh: {clip_dur:.1f}s | {sc['title']}")

total_raw_duration = sum(scene_durations)
print(f"Tổng thời lượng sơ bộ 7 cảnh: {total_raw_duration:.1f}s")

print("\n=== BƯỚC 2: RENDER CÁC PHÂN CẢNH VIDEO CHUYỂN ĐỘNG KEN BURNS ===")
clip_files = []
fps = 25

for i, sc in enumerate(SCENES):
    dur = scene_durations[i]
    frames = int(dur * fps)
    img_path = os.path.join(PRODUCTS_DIR, sc["file"])
    out_clip = os.path.join(TEMP_DIR, f"clip_{sc['id']}.mp4")
    clip_files.append(out_clip)
    
    # Thay thế d bằng số frame trong motion filter
    motion_filter = sc["motion"].replace("d", str(frames))
    
    # Kết hợp color grading điện ảnh nhẹ và định dạng 1280x720 25fps
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
        "-t", str(dur),
        out_clip
    ]
    print(f"  Dựng video cảnh {sc['id']}/7 ({dur}s)...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Lỗi render cảnh {sc['id']}:", res.stderr.decode("utf-8")[-400:])
        exit(1)

print("\n=== BƯỚC 3: TỔNG HỢP NHẠC NỀN NAM BỘ ĐỒNG BỘ ===")
# Tạo bản nhạc nền 55 giây ấm áp phù sa sông Măng Thít
soundtrack_wav = os.path.join(TEMP_DIR, "soundtrack_long.wav")
total_video_dur = total_raw_duration - (len(SCENES) - 1) * 0.5  # Do xfade 0.5s mỗi transition
music_dur = total_video_dur + 3.0
sample_rate = 44100
num_samples = int(music_dur * sample_rate)

left_samples = [0.0] * num_samples
right_samples = [0.0] * num_samples

# Giai điệu ngũ cung Nam Bộ nhẹ nhàng thư thái
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
    (52.0, 130.81, 5.0, 0.50),
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

# Tiếng nước phù sa sông róc rách & tiếng gió
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

# Ghi ra file WAV
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

print(f"  Đã tạo soundtrack Nam Bộ: {music_dur:.1f}s")

print("\n=== BƯỚC 4: GHÉP VIDEO XFADE, LỒNG TIẾNG VÀ HÒA ÂM DUCKING ===")
# Nối voiceover thành 1 stream duy nhất tương ứng với thời điểm của từng phân cảnh
# Mỗi cảnh i bắt đầu tại timeline thực tế sau khi tính crossfade 0.5s:
# Cảnh 0: bắt đầu 0s
# Cảnh 1: bắt đầu (dur0 - 0.5s)
# Cảnh 2: bắt đầu (dur0 - 0.5s) + (dur1 - 0.5s)...
timeline_offsets = [0.0]
for i in range(len(scene_durations) - 1):
    timeline_offsets.append(timeline_offsets[-1] + scene_durations[i] - 0.5)

final_dur = timeline_offsets[-1] + scene_durations[-1]
print(f"Thời lượng tổng của video hoàn chỉnh: {final_dur:.1f}s")

# Xây dựng filter_complex xfade cho 7 video clips
# 0 -> 1: offset timeline_offsets[1]
# ...
inputs = []
for p in clip_files:
    inputs.extend(["-i", p])
for v in voice_files:
    inputs.extend(["-i", v])
inputs.extend(["-i", soundtrack_wav])

# Video indices: 0..6
# Voice indices: 7..13
# Music index: 14

v_filters = []
curr_v = "0:v"
for i in range(1, 7):
    next_v = f"{i}:v"
    out_v = f"v{i}" if i < 6 else "v_raw"
    offset = timeline_offsets[i]
    v_filters.append(f"[{curr_v}][{next_v}]xfade=transition=fade:duration=0.5:offset={offset:.2f}[{out_v}]")
    curr_v = out_v

# Thêm fade out đuôi video
v_filters.append(f"[v_raw]fade=t=out:st={final_dur - 1.2:.2f}:d=1.2[v_final]")

# Xử lý âm thanh:
# 1. Trộn 7 đoạn voice theo đúng timeline offset (dùng adelay)
voice_delayed = []
for i in range(7):
    v_idx = 7 + i
    offset_ms = int(timeline_offsets[i] * 1000)
    out_a = f"va{i}"
    v_filters.append(f"[{v_idx}:a]adelay={offset_ms}|{offset_ms}[{out_a}]")
    voice_delayed.append(f"[{out_a}]")

# Gộp tất cả voice lại thành [voice_track]
v_filters.append(f"{''.join(voice_delayed)}amix=inputs=7:normalize=0[voice_track]")

# 2. Nhạc nền ducking: âm lượng nền ở mức 0.18 (-15dB) để giọng nói nổi bật và rõ ràng, fade out ở cuối
v_filters.append(f"[14:a]volume=0.20,afade=t=in:st=0:d=1.0,afade=t=out:st={final_dur - 2.0:.2f}:d=2.0[music_track]")

# 3. Hòa trộn voice_track và music_track
v_filters.append(f"[voice_track][music_track]amix=inputs=2:normalize=0,volume=1.2[a_final]")

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
    "-t", f"{final_dur:.2f}",
    "-movflags", "+faststart",
    OUTPUT_VIDEO
]

print("Đang tiến hành encode video hoàn chỉnh với giọng lồng tiếng AI...")
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
print(f"XUẤT VIDEO LỒNG TIẾNG THÀNH CÔNG: {OUTPUT_VIDEO}")
print(f"Thời lượng: {final_dur:.1f}s | Dung lượng: {size_mb:.2f} MB | Độ phân giải: 1280x720 HD")
print(f"=======================================================")

# In ra các mốc thời gian để cập nhật phụ đề và caption
print("\nTIMELINE PHÂN CẢNH:")
for i, sc in enumerate(SCENES):
    start = timeline_offsets[i]
    end = start + scene_durations[i] - (0.5 if i < 6 else 0.0)
    print(f"  Cảnh {i+1}: {start:.1f}s -> {end:.1f}s : {sc['title']} - \"{sc['voice'][:40]}...\"")
