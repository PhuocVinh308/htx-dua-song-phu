import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutSection({ coopInfo, onMoreClick, onWatchVideo }) {
  return (
    <section className="py-14 sm:py-20 bg-[#fbfbfb] relative overflow-hidden" id="about">
      {/* Nền hoa văn mờ phác họa làng quê nông trại như trong Ảnh 1 */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none bg-[radial-gradient(#2b7021_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Cột Trái: Ảnh quả tươi dán tem tròn lồng ghép ảnh công nhân chế biến (như Ảnh 1) */}
          <div className="md:col-span-6 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Ảnh chính: Chùm dừa xanh dán tem tròn */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
                <img
                  src="./products/green-coconut.jpg"
                  alt="Dừa Song Phú"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                {/* Tem tròn thương hiệu dán trên quả như trong ảnh */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 p-1 shadow-md border border-[#4fa32d] flex items-center justify-center">
                  <div className="text-center leading-none">
                    <span className="block text-[8px] font-black text-[#0f4c3a]">SOCOOP</span>
                    <span className="block text-[7px] text-[#4fa32d] font-bold">OCOP 4★</span>
                  </div>
                </div>
              </div>

              {/* Ảnh phụ đè góc dưới: Dừa xiêm kim cương chế biến */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-44 sm:w-52 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="./products/diamond-coconut.jpg"
                  alt="Sản xuất chế biến dừa"
                  className="w-full h-24 sm:h-32 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Cột Phải: Tiêu đề script xanh lá & nội dung tự sự */}
          <div className="md:col-span-6 space-y-4 pt-6 md:pt-0">
            <h2 className="font-script-title">
              Hợp tác xã Song Phú
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                Chúng tôi bắt đầu nghề trồng dừa từ nhiều năm trước đây, với quy mô là những hộ gia đình cùng nhau sản xuất và chuyên canh nhiều giống dừa đặc sản tại vùng đất phù sa màu mỡ Song Phú ven dòng sông Măng Thít. Trải qua rất nhiều giai đoạn thăng trầm trong nghề nông truyền thống.
              </p>
              <p>
                Sau thời gian dài với những kinh nghiệm từ thực tiễn và sự tiến bộ của khoa học cũng như kinh tế xã hội. Chúng tôi đã quyết định thành lập nên hợp tác xã <b>SONG PHÚ COOP (SOCOOP)</b> nhằm liên kết chuỗi giá trị và đưa nông sản quê hương vươn xa.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onMoreClick}
                className="inline-flex items-center gap-2 btn-pill-green px-5 py-2 text-xs shadow-sm"
              >
                <span>Xem thêm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onWatchVideo}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#0f4c3a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-sm group"
                title="Xem thước phim giới thiệu HTX"
              >
                <span className="w-4 h-4 rounded-full bg-[#4fa32d] text-white flex items-center justify-center text-[9px] group-hover:scale-110 transition-transform">
                  ▶
                </span>
                <span>Thước phim HTX (Lồng tiếng AI)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
