// Component: AboutSection (Khối Giới thiệu HTX Dừa Song Phú tương tự phong cách HTX Thanh Bình)
export function createAboutSection(coopInfo) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-white relative overflow-hidden";
  section.id = "about";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Cột Nội Dung Giới Thiệu -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            VỀ CHÚNG TÔI
          </div>
          
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading leading-tight">
            Hợp Tác Xã Dừa Song Phú
          </h2>

          <h3 class="text-base sm:text-lg font-medium text-amber-700 italic">
            "Liên kết nông dân - Nâng tầm giá trị cây dừa xứ Tam Bình phù sa trù phú"
          </h3>

          <div class="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p>
              Chúng tôi khởi nguồn từ nhiều thế hệ nông dân gắn bó thủy chung với rặng dừa nước, dừa xiêm xanh và dừa sáp đặc sản dọc theo dòng sông Măng Thít và kinh Thầy Cai thuộc xã Song Phú, huyện Tam Bình, tỉnh Vĩnh Long. Trải qua bao thăng trầm của giá nông sản bấp bênh, chúng tôi thấu hiểu rằng: <i>chỉ có liên kết tập thể và chế biến sâu mới giúp cây dừa bứt phá</i>.
            </p>
            <p>
              Năm 2018, <b>Hợp Tác Xã Dừa Song Phú (SOCOOP)</b> chính thức được thành lập. Đến nay, HTX đã quy tụ hơn <b>165 hộ xã viên</b> chuyên canh với diện tích trên <b>350 héc-ta</b> đạt chuẩn VietGAP và OCOP 4 sao. Không dừng lại ở việc bán dừa thô, chúng tôi đầu tư hệ thống ép lạnh ly tâm hiện đại, sản xuất mật hoa dừa, than gáo dừa hoạt tính và giá thể mụn dừa sinh học theo chuỗi giá trị tuần hoàn khép kín.
            </p>
          </div>

          <!-- 4 Cam kết cốt lõi -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-emerald-950 text-sm">Vùng Trồng Chuẩn Hóa</h4>
                <p class="text-xs text-gray-500 mt-0.5">Không thuốc diệt cỏ, bón phân hữu cơ vi sinh 100%.</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-emerald-950 text-sm">Chế Biến Chuẩn ISO 22000</h4>
                <p class="text-xs text-gray-500 mt-0.5">Quy trình ly tâm không gia nhiệt, giữ trọn vi chất.</p>
              </div>
            </div>
          </div>

          <div class="pt-4 flex flex-wrap items-center gap-4">
            <a href="#circular-economy" class="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-6 py-3 rounded-full transition shadow-md text-sm">
              <span>Xem Mô Hình Tuần Hoàn</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a href="#contact" class="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold px-4 py-3 rounded-full hover:bg-emerald-50 transition text-sm">
              <span>Liên Hệ Hợp Tác Xã</span>
            </a>
          </div>
        </div>

        <!-- Cột Hình Ảnh & Video Giới Thiệu (Tương tự HTX Thanh Bình) -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Ảnh Lớn Chính (Vườn dừa Tam Bình) -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80" 
                   alt="Vườn dừa Hợp tác xã Dừa Song Phú" 
                   class="w-full h-[380px] object-cover hover:scale-105 transition duration-700">
              
              <!-- Nút Play Video Giả lập giới thiệu HTX -->
              <button id="btn-watch-video" class="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl transition transform hover:scale-110 backdrop-blur group" title="Xem video giới thiệu vườn dừa">
                <svg class="w-8 h-8 ml-1 text-white group-hover:text-amber-300 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>

              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs">
                <p class="font-bold text-amber-300">Phóng sự Nông nghiệp Xanh Vĩnh Long</p>
                <p class="text-gray-200">Ghé thăm xưởng chế biến và rặng dừa sinh thái Xã Song Phú</p>
              </div>
            </div>

            <!-- Ảnh Phụ Nhỏ đè góc (Chế biến dừa OCOP) -->
            <div class="hidden sm:block absolute -bottom-8 -left-8 w-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80" 
                   alt="Dầu dừa ly tâm Song Phú" 
                   class="w-full h-28 object-cover">
              <div class="p-2 text-center bg-white">
                <span class="block text-[11px] font-bold text-emerald-900">Chuẩn OCOP 4 Sao</span>
                <span class="block text-[9px] text-gray-500">Sở NN & PTNT Vĩnh Long</span>
              </div>
            </div>

            <!-- Huy hiệu Nông Nghiệp Tuần Hoàn -->
            <div class="absolute -top-4 -right-4 bg-amber-500 text-emerald-950 font-black rounded-full w-20 h-20 flex flex-col items-center justify-center text-center shadow-lg border-2 border-white transform rotate-12">
              <span class="text-xs uppercase leading-none font-bold">100%</span>
              <span class="text-[10px] leading-tight font-extrabold">HỮU CƠ</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Khối Thống Kê Số Liệu Ấn Tượng (Counter Grid) -->
      <div class="mt-20 pt-10 border-t border-gray-100">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          ${coopInfo.stats.map(stat => `
            <div class="p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition border border-emerald-100/50">
              <div class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-900 font-heading">
                ${stat.count}
              </div>
              <div class="text-xs md:text-sm text-gray-600 mt-1 font-medium">
                ${stat.label}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Video Modal Popup -->
    <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="relative bg-black rounded-2xl overflow-hidden max-w-3xl w-full aspect-video shadow-2xl">
        <button id="close-video-modal" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
          <div class="w-16 h-16 rounded-full bg-emerald-600/80 flex items-center justify-center mb-4 text-amber-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-xl font-bold font-heading mb-2">Phim Tài Liệu: Khám Phá Vườn Dừa Song Phú Tam Bình</h3>
          <p class="text-gray-300 text-sm max-w-lg mb-6">Thước phim ghi lại nhịp sống lao động chăm chỉ của bà con nông dân Xã Song Phú, công đoạn thu hoạch dừa xiêm ngọt mát và kỹ thuật ly tâm ép lạnh dầu dừa OCOP đạt chuẩn quốc tế.</p>
          <a href="https://www.youtube.com/results?search_query=dừa+vĩnh+long+tam+bình" target="_blank" class="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm inline-flex items-center gap-2 transition">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            Xem Thước Phim Trực Tiếp
          </a>
        </div>
      </div>
    </div>
  `;

  // Video modal logic
  const btnWatchVideo = section.querySelector("#btn-watch-video");
  const videoModal = section.querySelector("#video-modal");
  const closeVideoModal = section.querySelector("#close-video-modal");

  if (btnWatchVideo && videoModal) {
    btnWatchVideo.addEventListener("click", () => {
      videoModal.classList.remove("opacity-0", "pointer-events-none");
    });
  }

  if (closeVideoModal && videoModal) {
    closeVideoModal.addEventListener("click", () => {
      videoModal.classList.add("opacity-0", "pointer-events-none");
    });
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.classList.add("opacity-0", "pointer-events-none");
      }
    });
  }

  return section;
}
