import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

const SCENE_CAPTIONS = [
  {
    start: 0,
    end: 6.8,
    title: '1. Vùng nguyên liệu hữu cơ',
    desc: 'Chào mừng quý khách đến với Hợp tác xã Dừa Song Phú, nằm bên dòng sông Măng Thít trù phú tỉnh Vĩnh Long.',
  },
  {
    start: 6.8,
    end: 14.1,
    title: '2. Thu hoạch dừa bánh tẻ',
    desc: 'Bà con nông dân chuyên canh những vườn dừa hữu cơ, tuyển chọn từng quả dừa bánh tẻ tươi ngon và giàu dinh dưỡng.',
  },
  {
    start: 14.1,
    end: 21.4,
    title: '3. Xưởng sơ chế chuẩn OCOP',
    desc: 'Dừa tươi được sơ chế và gọt tạo hình kim cương xuất khẩu, đạt nghiêm ngặt các tiêu chuẩn an toàn thực phẩm.',
  },
  {
    start: 21.4,
    end: 28.5,
    title: '4. Ép ly tâm lạnh 3 pha',
    desc: 'Dây chuyền ép ly tâm lạnh ba pha hiện đại, giúp giữ trọn vẹn dưỡng chất tinh khiết của dầu dừa nguyên chất.',
  },
  {
    start: 28.5,
    end: 36.0,
    title: '5. Thu mật hoa dừa tự nhiên',
    desc: 'Những giọt mật hoa dừa tự nhiên được thu hái công phu lúc rạng đông, mang đến vị ngọt thanh lành cho sức khỏe.',
  },
  {
    start: 36.0,
    end: 43.5,
    title: '6. Kinh tế tuần hoàn xơ dừa',
    desc: 'Mô hình kinh tế tuần hoàn không phế thải, tận dụng xơ dừa sinh thái để phục vụ nông nghiệp và xuất khẩu quốc tế.',
  },
  {
    start: 43.5,
    end: 52.0,
    title: '7. Chứng nhận OCOP 4 sao',
    desc: 'Hợp tác xã Dừa Song Phú tự hào đạt chứng nhận OCOP bốn sao, khẳng định uy tín và chất lượng nông sản Việt Nam.',
  },
];

export default function VideoShowcaseSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(51.5);
  const [activeCaption, setActiveCaption] = useState(SCENE_CAPTIONS[0]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);

    const match = SCENE_CAPTIONS.find((c) => t >= c.start && t < c.end);
    if (match) {
      setActiveCaption(match);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTo = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#fbfbfb] via-[#f0f7ef] to-[#fbfbfb] relative overflow-hidden" id="video-showcase">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-200/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#0f4c3a] border border-emerald-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>THƯỚC PHIM TÀI LIỆU HTX • GIỌNG ĐỌC VBEE AI</span>
          </div>
          <h2 className="font-script-title mb-2">
            Thước Phim HTX Dừa Song Phú
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Khám phá trọn vẹn hành trình từ những rặng dừa hữu cơ ven phù sa sông Măng Thít đến các sản phẩm chế biến sâu đạt chuẩn OCOP 4 sao tỉnh Vĩnh Long.
          </p>
        </div>

        {/* Video Player Box Embedded */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black group">
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src="./videos/htx-dua-song-phu-intro.mp4"
              poster="./videos/video-poster.jpg"
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />

            {/* Watermark logo góc trên phải */}
            <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <img src="./favicon.svg" alt="SOCOOP" className="w-4 h-4" />
              <span className="text-[11px] font-bold tracking-wider text-emerald-300">SOCOOP TAM BÌNH</span>
            </div>

            {/* Big Play Button Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 cursor-pointer transition-opacity"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-emerald-500/30 animate-ping" />
                  <button className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#4fa32d] hover:bg-[#3d8323] text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1.5 fill-white" />
                  </button>
                </div>
                <p className="mt-4 text-xs sm:text-sm font-bold text-white drop-shadow tracking-wider uppercase bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                  ▶ Bấm Để Xem Phim (Có Giọng Đọc Vbee AI)
                </p>
              </div>
            )}

            {/* Dynamic Subtitle/Caption Overlay */}
            {isPlaying && (
              <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 pointer-events-none transition-all duration-300">
                <div className="max-w-xl mx-auto bg-black/75 backdrop-blur-md rounded-xl p-3 border border-white/20 text-center shadow-2xl">
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                    {activeCaption.title}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-100 font-medium">
                    {activeCaption.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 flex flex-col gap-2">
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max={duration || 51.5}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#4fa32d] hover:h-2 transition-all"
              />

              <div className="flex items-center justify-between text-xs text-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="hover:text-emerald-400 transition-colors p-1"
                    title={isPlaying ? 'Tạm dừng' : 'Phát'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors p-1"
                    title="Phát lại từ đầu"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="hover:text-emerald-400 transition-colors p-1"
                    title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="font-mono text-xs text-gray-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[11px] text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-0.5 rounded-full font-medium">
                    720p HD • Giọng đọc Vbee AI & Nhạc Nam Bộ
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="hover:text-emerald-400 transition-colors p-1"
                    title="Toàn màn hình"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scene Timeline Pills */}
          <div className="p-3 sm:p-4 bg-[#0a1e15] border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[11px] text-gray-400 font-semibold whitespace-nowrap mr-1">
              Phân cảnh:
            </span>
            {SCENE_CAPTIONS.map((sc, idx) => {
              const isActive = currentTime >= sc.start && currentTime < sc.end;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = sc.start;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className={`text-[11px] px-3 py-1.5 rounded-md whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#4fa32d] text-white font-bold shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/15'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{sc.title.replace(/^\d+\.\s*/, '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Direct Download & Share link */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-500 px-2 gap-2">
          <span>* Thước phim giới thiệu chính thức của Hợp tác xã Dừa Song Phú (SOCOOP).</span>
          <a
            href="./videos/htx-dua-song-phu-intro.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center gap-1"
          >
            <span>Mở video trong tab mới / Tải video về máy (MP4 720p) ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
