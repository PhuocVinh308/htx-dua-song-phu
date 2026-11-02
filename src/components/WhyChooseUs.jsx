import React from 'react';

export default function WhyChooseUs({ pillars }) {
  return (
    <section className="py-14 sm:py-20 bg-white relative" id="why-us">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Tiêu đề Script & Mô tả chuẩn Ảnh 1 */}
        <h2 className="font-script-title mb-2">
          Tại sao chọn chúng tôi
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed mb-3">
          Thực phẩm hữu cơ hay còn được biết đến rộng rãi với cái tên "thực phẩm Organic", không tự dưng xuất hiện mà xuất phát từ nhu cầu chăm sóc sức khoẻ rất khắt khe của người tiêu dùng.
        </p>

        {/* Biểu tượng mầm lá xanh nhỏ ở giữa (như trong ảnh) */}
        <div className="flex justify-center items-center mb-10">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#4fa32d] fill-current">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2-.1-1.2.2-2.4.9-3.4 1.2-1.7 3.2-2.8 5.4-2.8 1.5 0 2.9.5 4 1.4 1.2.9 2 2.3 2.2 3.8 2.5-1.7 4-4.5 4-7.2 0-5.5-4.5-10-9-10z" />
          </svg>
        </div>

        {/* Dải Nền Vườn Cây Xanh Mát Kèm 4 Vòng Tròn Ảnh & Logo Ở Giữa (Chuẩn 100% Ảnh 1) */}
        <div 
          className="relative rounded-3xl overflow-hidden py-10 px-4 sm:px-8 shadow-inner bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6)), url('./products/green-coconut.jpg')`,
          }}
        >
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {/* Vòng 1 */}
            <div className="flex flex-col items-center">
              <div className="circle-pillar">
                <img src={pillars[0].image} alt={pillars[0].title} className="w-full h-full object-cover" />
              </div>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-[#4fa32d] text-white text-xs font-bold shadow-md">
                {pillars[0].title}
              </span>
            </div>

            {/* Vòng 2 */}
            <div className="flex flex-col items-center">
              <div className="circle-pillar">
                <img src={pillars[1].image} alt={pillars[1].title} className="w-full h-full object-cover" />
              </div>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-[#4fa32d] text-white text-xs font-bold shadow-md">
                {pillars[1].title}
              </span>
            </div>

            {/* LOGO TRÒN NỔI BẬT Ở CHÍNH GIỮA (Như trong Ảnh 1) */}
            <div className="hidden lg:flex flex-col items-center justify-center mx-2">
              <div className="w-24 h-24 rounded-full bg-white shadow-xl border-4 border-[#4fa32d] flex items-center justify-center p-2">
                <div className="text-center">
                  <span className="text-2xl block">🥥</span>
                  <span className="text-[9px] font-black text-[#0f4c3a] block leading-none">SOCOOP</span>
                </div>
              </div>
            </div>

            {/* Vòng 3 */}
            <div className="flex flex-col items-center">
              <div className="circle-pillar">
                <img src={pillars[2].image} alt={pillars[2].title} className="w-full h-full object-cover" />
              </div>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-[#4fa32d] text-white text-xs font-bold shadow-md">
                {pillars[2].title}
              </span>
            </div>

            {/* Vòng 4 */}
            <div className="flex flex-col items-center">
              <div className="circle-pillar">
                <img src={pillars[3].image} alt={pillars[3].title} className="w-full h-full object-cover" />
              </div>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-[#4fa32d] text-white text-xs font-bold shadow-md">
                {pillars[3].title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
