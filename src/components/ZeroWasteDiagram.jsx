import React, { useState } from 'react';
import { ChevronRight, Check, TrendingUp } from 'lucide-react';

export default function ZeroWasteDiagram({ parts, onExploreProducts }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePart = parts[activeIdx];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 relative" id="circular-economy">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            ĐỘT PHÁ NÔNG NGHIỆP XANH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-emerald-950 mb-3">
            Mô Hình Kinh Tế Tuần Hoàn 100% Cây Dừa
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Tại HTX Dừa Song Phú, <b>"Không có gì là rác thải"</b>. Mỗi bộ phận của cây dừa đều được khai thác khoa học, ứng dụng công nghệ cao để nhân giá trị lên gấp 4 đến 5 lần so với bán dừa trái truyền thống.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {parts.map((item, index) => {
              const isActive = index === activeIdx;
              return (
                <button
                  key={item.part}
                  onClick={() => setActiveIdx(index)}
                  className={`w-full text-left p-4 rounded-xl transition duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-lg border-emerald-800 ring-2 ring-emerald-600/30'
                      : 'bg-white hover:bg-emerald-50 text-gray-700 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                        isActive ? 'bg-emerald-700 text-amber-300' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.percentage}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base leading-snug">{item.part}</h4>
                      <span className="text-xs opacity-80 line-clamp-1">{item.products.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 shrink-0 ${isActive ? 'text-amber-300' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Chuỗi chế biến khép kín
                </span>
                <h3 className="text-2xl font-bold text-emerald-950 font-heading">{activePart.part}</h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-sm border border-amber-200">
                Chiếm {activePart.percentage} khối lượng
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Quy Trình Khoa Học Tại Xưởng HTX
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                {activePart.process}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Sản Phẩm Đầu Ra Giá Trị Cao
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePart.products.map((prod) => (
                  <div key={prod} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Lợi ích kinh tế tuần hoàn:</strong>
                <p className="text-xs text-amber-800 mt-0.5">{activePart.valueAdded}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Net Zero Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-amber-300 font-heading">Cam Kết Net Zero & Tăng Trưởng Xanh 2030</h4>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              Mỗi hecta dừa sinh thái tại Song Phú hấp thụ tới 75 tấn CO2 mỗi năm. Chọn sản phẩm Dừa Song Phú là bạn đang đồng hành phủ xanh đồng bằng và giảm phát thải khí nhà kính!
            </p>
          </div>
          <button
            onClick={() => {
              if (onExploreProducts) {
                onExploreProducts();
              } else {
                window.location.hash = '#products';
              }
            }}
            className="shrink-0 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-md transition transform hover:scale-105"
          >
            Ủng Hộ Sản Phẩm Xanh
          </button>
        </div>
      </div>
    </section>
  );
}
