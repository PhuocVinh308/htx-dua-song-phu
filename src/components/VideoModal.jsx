import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

const SCENE_CAPTIONS = [
  {
    start: 0,
    end: 7.3,
    title: '1. Vùng nguyên liệu hữu cơ',
    desc: 'Chào mừng quý khách đến với Hợp tác xã Dừa Song Phú, bên dòng sông Măng Thít trù phú tỉnh Vĩnh Long.',
  },
  {
    start: 7.3,
    end: 14.7,
    title: '2. Thu hoạch dừa bánh tẻ',
    desc: 'Bà con nông dân chuyên canh những vườn dừa hữu cơ, tuyển chọn từng quả dừa bánh tẻ tươi ngon và giàu dinh dưỡng.',
  },
  {
    start: 14.7,
    end: 21.9,
    title: '3. Xưởng sơ chế chuẩn OCOP',
    desc: 'Dừa tươi được sơ chế và gọt tạo hình kim cương xuất khẩu, đạt nghiêm ngặt các tiêu chuẩn an toàn thực phẩm.',
  },
  {
    start: 21.9,
    end: 28.8,
    title: '4. Ép ly tâm lạnh 3 pha',
    desc: 'Dây chuyền ép ly tâm lạnh ba pha hiện đại, giúp giữ trọn vẹn dưỡng chất tinh khiết của dầu dừa nguyên chất.',
  },
  {
    start: 28.8,
    end: 36.1,
    title: '5. Thu mật hoa dừa tự nhiên',
    desc: 'Những giọt mật hoa dừa tự nhiên được thu hái công phu lúc rạng đông, mang đến vị ngọt thanh lành cho sức khỏe.',
  },
  {
    start: 36.1,
    end: 43.8,
    title: '6. Kinh tế tuần hoàn xơ dừa',
    desc: 'Mô hình kinh tế tuần hoàn không phế thải, tận dụng xơ dừa sinh thái để phục vụ nông nghiệp và xuất khẩu quốc tế.',
  },
  {
    start: 43.8,
    end: 53.0,
    title: '7. Chứng nhận OCOP 4 sao',
    desc: 'Hợp tác xã Dừa Song Phú tự hào đạt chứng nhận OCOP bốn sao, khẳng định uy tín và chất lượng nông sản Việt Nam.',
  },
];

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(52.4);
  const [activeCaption, setActiveCaption] = useState(SCENE_CAPTIONS[0]);

  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto play when modal opens
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          // Autoplay policy may require muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
      }
    }, 200);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#0a2318] to-[#04100b] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#4fa32d] text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              VIDEO AI • LỒNG TIẾNG THUYẾT MINH
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Thước phim giới thiệu HTX Dừa Song Phú (OCOP 4 Sao)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            title="Đóng (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black group overflow-hidden">
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
          <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
            <img src="./favicon.svg" alt="SOCOOP" className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wider text-emerald-300">SOCOOP TAM BÌNH</span>
          </div>

          {/* Big Play Button Overlay when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer transition-opacity"
            >
              <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4fa32d] hover:bg-[#3d8323] text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
              </button>
            </div>
          )}

          {/* Dynamic Caption Overlay */}
          <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 pointer-events-none transition-all duration-300">
            <div className="max-w-xl mx-auto bg-black/70 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 text-center shadow-2xl">
              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                {activeCaption.title}
              </span>
              <p className="text-xs sm:text-sm text-gray-100 font-medium">
                {activeCaption.desc}
              </p>
            </div>
          </div>

          {/* Custom Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 flex flex-col gap-2">
            {/* Progress / Seek bar */}
            <input
              type="range"
              min="0"
              max={duration || 28.5}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#4fa32d] hover:h-2 transition-all"
            />

            <div className="flex items-center justify-between text-xs text-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-emerald-400 transition-colors p-1"
                  title={isPlaying ? 'Tạm dừng (Space)' : 'Phát (Space)'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
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
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={toggleMute}
                  className="hover:text-emerald-400 transition-colors p-1"
                  title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-gray-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  720p HD • Lồng tiếng AI & Nhạc Nam Bộ
                </span>
                <button
                  onClick={handleFullscreen}
                  className="hover:text-emerald-400 transition-colors p-1"
                  title="Toàn màn hình"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scene selector strip */}
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
                className={`text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap transition-all flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#4fa32d] text-white font-bold shadow-sm'
                    : 'bg-white/5 text-gray-300 hover:bg-white/15'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
