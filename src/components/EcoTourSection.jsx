import React from 'react';
import { Calendar, Info } from 'lucide-react';

export default function EcoTourSection() {
  const handleBooking = () => {
    alert('Dạ cảm ơn quý khách! Vui lòng liên hệ Hotline/Zalo: 0918 268 379 để được nhân viên HTX Song Phú xếp lịch tham quan nông trại phù hợp nhất ạ!');
  };

  return (
    <section className="py-16 md:py-24 eco-farm-banner text-white relative" id="eco-tour">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              DU LỊCH NÔNG NGHIỆP TRẢI NGHIỆM
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
              Về Song Phú Chèo Xuồng Ba Lá Ngắm Vườn Dừa Xanh Mát
            </h2>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              HTX Dừa Song Phú không chỉ là nơi sản xuất nông sản, mà còn là điểm đến du lịch sinh thái nông nghiệp hấp dẫn tại huyện Tam Bình. Hãy một lần về với miền sông nước Vĩnh Long để tận hưởng bầu không khí trong lành, uống trái dừa xiêm vừa hái trên ngọn và trải nghiệm làm nông dân thực thụ!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
                <span className="text-2xl mb-1 block">🛶</span>
                <h4 className="font-bold text-sm text-amber-300">Chèo Xuồng Rạch Dừa</h4>
                <p className="text-xs text-gray-300 mt-1">Len lỏi qua những con rạch rợp bóng dừa mát rượi.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
                <span className="text-2xl mb-1 block">🥥</span>
                <h4 className="font-bold text-sm text-amber-300">Hái Dừa Tại Ngọn</h4>
                <p className="text-xs text-gray-300 mt-1">Học kỹ năng chọn dừa ngọt và thưởng thức tại chỗ.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
                <span className="text-2xl mb-1 block">🍯</span>
                <h4 className="font-bold text-sm text-amber-300">Làm Kẹo & Ép Dầu</h4>
                <p className="text-xs text-gray-300 mt-1">Tự tay ngào kẹo dừa và chưng cất dầu dừa mang về.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleBooking}
                className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition shadow-lg flex items-center gap-2 transform hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>Đăng Ký Tham Quan Nông Trại</span>
              </button>
              <a
                href="tel:0918268379"
                className="px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-sm backdrop-blur transition"
              >
                Hotline Tư Vấn: 0918 268 379
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">Lịch Trình Trong Ngày</span>
                  <h3 className="text-xl font-bold font-heading text-white">Tour "Một Ngày Làm Xã Viên Dừa"</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  Chỉ 250k / Khách
                </span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                  <span><b>08:30:</b> Đón khách tại Trụ sở HTX Song Phú, thưởng thức nước dừa xiêm tươi giải nhiệt.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                  <span><b>09:30:</b> Bơi xuồng ba lá tham quan rạch kinh Thầy Cai và vườn dừa sáp 300 gốc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                  <span><b>11:30:</b> Dùng cơm trưa miệt vườn (Cá lóc nướng trui, củ hũ dừa xào tép sông, ốc luộc xả).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">4</span>
                  <span><b>14:00:</b> Trải nghiệm tại xưởng: Học mát-xa búp hoa dừa và nhận quà lưu niệm OCOP.</span>
                </li>
              </ul>

              <div className="p-3.5 rounded-xl bg-white/10 text-xs text-gray-200 border border-white/10 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Nhận đoàn từ 4 khách trở lên. Đặt trước 24h để HTX chuẩn bị chu đáo.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
