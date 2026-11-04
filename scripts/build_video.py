#!/usr/bin/env python3
import os
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE_DIR, "public", "products")
VIDEOS_DIR = os.path.join(BASE_DIR, "public", "videos")
TEMP_DIR = os.path.join(VIDEOS_DIR, "temp")
OUTPUT_VIDEO = os.path.join(VIDEOS_DIR, "htx-dua-song-phu-intro.mp4")
OUTPUT_POSTER = os.path.join(VIDEOS_DIR, "video-poster.jpg")
SOUNDTRACK = os.path.join(VIDEOS_DIR, "soundtrack.wav")
FFMPEG = "/opt/homebrew/bin/ffmpeg"

os.makedirs(TEMP_DIR, exist_ok=True)

# 7 cảnh giới thiệu, mỗi cảnh 4.5s = 113 frames @ 25fps
# d=113
SCENES = [
    {
        "file": "farm-coconut-grove.jpg",
        "name": "scene1",
        # Zoom in nhẹ trung tâm
        "filter": "zoompan=z='min(zoom+0.0018,1.20)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    },
    {
        "file": "farm-harvest-farmer.jpg",
        "name": "scene2",
        # Pan từ trái sang phải nhẹ
        "filter": "zoompan=z=1.12:x='(iw-iw/zoom)*(0.2+0.6*on/113)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    },
    {
        "file": "factory-processing.jpg",
        "name": "scene3",
        # Zoom in vào khu sơ chế
        "filter": "zoompan=z='min(zoom+0.0015,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    },
    {
        "file": "factory-cold-press.jpg",
        "name": "scene4",
        # Zoom out từ chi tiết máy ép ra rộng
        "filter": "zoompan=z='max(1.0,1.18-0.0016*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    },
    {
        "file": "farm-flower-nectar.jpg",
        "name": "scene5",
        # Zoom in vào mật hoa dừa
        "filter": "zoompan=z='min(zoom+0.0017,1.20)':x='(iw-iw/zoom)*0.6':y='(ih-ih/zoom)*0.4':d=113:s=1280x720:fps=25"
    },
    {
        "file": "farm-coir-drying.jpg",
        "name": "scene6",
        # Pan từ phải sang trái bãi phơi xơ dừa
        "filter": "zoompan=z=1.12:x='(iw-iw/zoom)*(0.8-0.6*on/113)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    },
    {
        "file": "cert-ocop-diploma.jpg",
        "name": "scene7",
        # Zoom in trang trọng vào văn bằng OCOP 4 sao
        "filter": "zoompan=z='min(zoom+0.0012,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=113:s=1280x720:fps=25"
    }
]

print("=== BẮT ĐẦU DỰNG 7 PHÂN CẢNH VIDEO ===")
clip_paths = []
for i, sc in enumerate(SCENES):
    img_path = os.path.join(PRODUCTS_DIR, sc["file"])
    out_clip = os.path.join(TEMP_DIR, f"{sc['name']}.mp4")
    clip_paths.append(out_clip)
    
    cmd = [
        FFMPEG, "-y",
        "-i", img_path,
        "-vf", f"{sc['filter']},format=yuv420p",
        "-c:v", "libx264",
        "-preset", "faster",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-t", "4.5",
        out_clip
    ]
    print(f"[{i+1}/7] Dựng cảnh {sc['file']}...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Lỗi ở cảnh {sc['file']}:", res.stderr.decode("utf-8")[-400:])
        exit(1)

print("Đã render xong 7 cảnh!")

# Tạo video poster
shutil.copyfile(os.path.join(PRODUCTS_DIR, "farm-coconut-grove.jpg"), OUTPUT_POSTER)

# Xây dựng filter_complex cho xfade nối 7 cảnh:
# Mỗi clip 4.5s. Transition fade 0.5s:
# Offset 0: 4.0s -> v01 dài 8.5s
# Offset 1: 8.0s -> v02 dài 12.5s
# Offset 2: 12.0s -> v03 dài 16.5s
# Offset 3: 16.0s -> v04 dài 20.5s
# Offset 4: 20.0s -> v05 dài 24.5s
# Offset 5: 24.0s -> v_final dài 28.5s
inputs = []
for p in clip_paths:
    inputs.extend(["-i", p])
inputs.extend(["-i", SOUNDTRACK])

filter_complex = (
    "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=4.0[v01];"
    "[v01][2:v]xfade=transition=fade:duration=0.5:offset=8.0[v02];"
    "[v02][3:v]xfade=transition=fade:duration=0.5:offset=12.0[v03];"
    "[v03][4:v]xfade=transition=fade:duration=0.5:offset=16.0[v04];"
    "[v04][5:v]xfade=transition=fade:duration=0.5:offset=20.0[v05];"
    "[v05][6:v]xfade=transition=fade:duration=0.5:offset=24.0,fade=t=out:st=27.0:d=1.5[v_final];"
    "[7:a]afade=t=in:st=0:d=1.0,afade=t=out:st=26.5:d=2.0[a_final]"
)

concat_cmd = [
    FFMPEG, "-y",
    *inputs,
    "-filter_complex", filter_complex,
    "-map", "[v_final]",
    "-map", "[a_final]",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "22",
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", "28.5",
    "-movflags", "+faststart",
    OUTPUT_VIDEO
]

print("Ghép xfade và hòa âm soundtrack...")
res_concat = subprocess.run(concat_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if res_concat.returncode != 0:
    print("Lỗi khi ghép xfade:", res_concat.stderr.decode("utf-8")[-600:])
    exit(1)

# Dọn dẹp thư mục tạm
shutil.rmtree(TEMP_DIR, ignore_errors=True)

size_mb = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
print(f"=== XUẤT VIDEO THÀNH CÔNG: {OUTPUT_VIDEO} ({size_mb:.2f} MB) ===")
