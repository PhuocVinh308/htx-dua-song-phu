import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSlider({ banner, onExploreClick, onWatchVideo }) {
  return (
    <section className="relative overflow-hidden bg-[#0f4c3a] text-white" id="home">
      {/* Background Image: Vườn dừa với con đường ở giữa như trong Ảnh 1 */}
      <div 
        className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${banner.bgImage}')`,
        }}
      >
        {/* Overlay mờ nhẹ */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Khung Kính Mờ Frosted Glass Box Ở Giữa Chuẩn 100% Như Ảnh 1 */}
        <div className="relative z-10 mx-4 max-w-xl w-full bg-[#182a20]/75 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center border border-white/20 shadow-2xl">
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-white font-semibold drop-shadow mb-1 tracking-wide">
            {banner.subtitle}
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-white mb-3 uppercase font-barlow">
            {banner.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 mb-6 leading-relaxed max-w-md mx-auto">
            {banner.desc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 btn-pill-green px-5 sm:px-6 py-2.5 text-xs sm:text-sm shadow-md"
            >
              <span>{banner.btnText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onWatchVideo}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm transition-all shadow-md group"
              title="Xem video giới thiệu Hợp tác xã Dừa Song Phú"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                ▶
              </span>
              <span>Xem Video Giới Thiệu</span>
            </button>
          </div>
        </div>

        {/* Đáy banner: Viền cắt lượn sóng màu trắng cong nhẹ (Wave SVG Divider như trong Ảnh 1) */}
        <div className="absolute -bottom-1 inset-x-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-[#fbfbfb] fill-current">
            <path d="M0,0 C150,90 350,-40 500,45 C650,120 900,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
