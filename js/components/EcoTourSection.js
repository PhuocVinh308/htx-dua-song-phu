// Component Sáng Tạo: EcoTourSection (Tour Tham Quan Vườn Dừa Sinh Thái Song Phú)
export function createEcoTourSection() {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 eco-farm-banner text-white relative";
  section.id = "eco-tour";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur border border-emerald-500/40">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            DU LỊCH NÔNG NGHIỆP TRẢI NGHIỆM
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
            Về Song Phú Chèo Xuồng Ba Lá Ngắm Vườn Dừa Xanh Mát
          </h2>

          <p class="text-gray-200 text-sm sm:text-base leading-relaxed">
            HTX Dừa Song Phú không chỉ là nơi sản xuất nông sản, mà còn là điểm đến du lịch sinh thái nông nghiệp hấp dẫn tại huyện Tam Bình. Hãy một lần về với miền sông nước Vĩnh Long để tận hưởng bầu không khí trong lành, uống trái dừa xiêm vừa hái trên ngọn và trải nghiệm làm nông dân thực thụ!
          </p>

          <!-- 3 Điểm nhấn tour -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
              <span class="text-2xl mb-1 block">🛶</span>
              <h4 class="font-bold text-sm text-amber-300">Chèo Xuồng Rạch Dừa</h4>
              <p class="text-xs text-gray-300 mt-1">Len lỏi qua những con rạch rợp bóng dừa mát rượi.</p>
            </div>

            <div class="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
              <span class="text-2xl mb-1 block">🥥</span>
              <h4 class="font-bold text-sm text-amber-300">Hái Dừa Tại Ngọn</h4>
              <p class="text-xs text-gray-300 mt-1">Học kỹ năng chọn dừa ngọt và thưởng thức tại chỗ.</p>
            </div>

            <div class="p-4 rounded-xl bg-black/40 backdrop-blur border border-white/20">
              <span class="text-2xl mb-1 block">🍯</span>
              <h4 class="font-bold text-sm text-amber-300">Làm Kẹo & Ép Dầu</h4>
              <p class="text-xs text-gray-300 mt-1">Tự tay ngào kẹo dừa và chưng cất dầu dừa mang về.</p>
            </div>
          </div>

          <div class="pt-4 flex flex-wrap items-center gap-4">
            <button id="btn-book-tour" class="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition shadow-lg flex items-center gap-2 transform hover:scale-105">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Đăng Ký Tham Quan Nông Trại</span>
            </button>
            <a href="tel:0918268379" class="px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-sm backdrop-blur transition">
              Hotline Tư Vấn: 0918 268 379
            </a>
          </div>
        </div>

        <!-- 360 Eco Card Simulation -->
        <div class="lg:col-span-5">
          <div class="bg-black/50 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
            <div class="flex items-center justify-between border-b border-white/20 pb-4">
              <div>
                <span class="text-amber-300 font-bold text-xs uppercase tracking-wider">Lịch Trình Trong Ngày</span>
                <h3 class="text-xl font-bold font-heading text-white">Tour "Một Ngày Làm Xã Viên Dừa"</h3>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                Chỉ 250k / Khách
              </span>
            </div>

            <ul class="space-y-3.5 text-xs sm:text-sm text-gray-200">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                <span><b>08:30:</b> Đón khách tại Trụ sở HTX Song Phú, thưởng thức nước dừa xiêm tươi giải nhiệt.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                <span><b>09:30:</b> Bơi xuồng ba lá tham quan rạch kinh Thầy Cai và vườn dừa sáp 300 gốc.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                <span><b>11:30:</b> Dùng cơm trưa miệt vườn (Cá lóc nướng trui, củ hũ dừa xào tép sông, ốc luộc xả).</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-emerald-500/30 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs">4</span>
                <span><b>14:00:</b> Trải nghiệm tại xưởng: Học mát-xa búp hoa dừa và nhận quà lưu niệm OCOP.</span>
              </li>
            </ul>

            <div class="p-3.5 rounded-xl bg-white/10 text-xs text-gray-200 border border-white/10 flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Nhận đoàn từ 4 khách trở lên. Đặt trước 24h để HTX chuẩn bị chu đáo.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  section.querySelector("#btn-book-tour").addEventListener("click", () => {
    alert("Dạ cảm ơn quý khách! Vui lòng liên hệ Hotline/Zalo: 0918 268 379 để được nhân viên HTX Song Phú xếp lịch tham quan nông trại phù hợp nhất ạ!");
  });

  return section;
}
