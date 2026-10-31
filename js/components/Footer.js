// Component: Footer (Chân Trang Website phong cách tương tự HTX Thanh Bình)
export function createFooter(coopInfo) {
  const footer = document.createElement("footer");
  footer.className = "bg-emerald-950 text-white border-t border-emerald-900";
  footer.id = "contact";

  footer.innerHTML = `
    <!-- Main Footer Widgets (Tương tự 4 cột widget của HTX Thanh Bình) -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Cột 1: Về Chúng Tôi -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xl border border-amber-400">
              🥥
            </div>
            <div>
              <span class="block text-base font-bold font-heading text-white uppercase">${coopInfo.name}</span>
              <span class="block text-[10px] text-amber-400 font-semibold tracking-wider uppercase">SOCOOP TAM BÌNH • VĨNH LONG</span>
            </div>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed">
            Hợp tác xã nông nghiệp kiểu mới tiên phong ứng dụng công nghệ chế biến sâu tuần hoàn, mang giá trị cây dừa phù sa Tam Bình vươn tầm thế giới.
          </p>

          <div class="space-y-2 text-xs text-gray-300 pt-2">
            <p class="flex items-start gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>${coopInfo.address}</span>
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>Hotline: <b>${coopInfo.hotline}</b></span>
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>Email: ${coopInfo.email}</span>
            </p>
            <p class="text-[11px] text-gray-400 pt-1">
              MST: ${coopInfo.taxCode} • ${coopInfo.businessLicense}
            </p>
          </div>
        </div>

        <!-- Cột 2: Danh Mục Sản Phẩm -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading border-b border-emerald-900 pb-2">
            Sản Phẩm OCOP Tiêu Biểu
          </h4>
          <ul class="space-y-2 text-xs text-gray-300">
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Dừa Xiêm Lửa Gọt Kim Cương</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Dầu Dừa Nguyên Chất Ép Lạnh Ly Tâm</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Mật Hoa Dừa Cô Đặc Tự Nhiên</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Dừa Sáp Cấy Phôi Tam Bình Thượng Hạng</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Bát & Thìa Gáo Dừa Mỹ Nghệ Xuất Khẩu</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Than Hoạt Tính Gáo Dừa Lọc Nước</a></li>
            <li><a href="#products" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Giá Thể Mụn Dừa Sinh Học Trichoderma</a></li>
          </ul>
        </div>

        <!-- Cột 3: Liên Kết Nhanh & Chính Sách -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading border-b border-emerald-900 pb-2">
            Hỗ Trợ & Chính Sách
          </h4>
          <ul class="space-y-2 text-xs text-gray-300">
            <li><a href="#about" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Giới thiệu Hợp tác xã</a></li>
            <li><a href="#circular-economy" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Mô hình Kinh tế Tuần hoàn Cây Dừa</a></li>
            <li><a href="#traceability" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Cổng Tra cứu Nguồn gốc Nông sản Số</a></li>
            <li><a href="#eco-tour" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Đặt Tour Sinh Thái Vườn Dừa Song Phú</a></li>
            <li><a href="#b2b-export" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Chính sách Đại lý & Báo giá Xuất khẩu</a></li>
            <li><a href="#news" class="hover:text-amber-400 transition flex items-center gap-2"><span>•</span> Tin tức & Cẩm nang nông nghiệp xanh</a></li>
            <li><span class="hover:text-amber-400 transition flex items-center gap-2 cursor-pointer" onclick="alert('Chính sách HTX: Cam kết 1 đổi 1 tận nơi nếu sản phẩm dừa tươi không đạt chuẩn chất lượng!')"><span>•</span> Chính sách Cam kết Chất lượng 1 đổi 1</span></li>
          </ul>
        </div>

        <!-- Cột 4: Kết Nối & Đăng Ký Bản Tin Nông Sản Xanh -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading border-b border-emerald-900 pb-2">
            Đăng Ký Nhận Bản Tin
          </h4>
          <p class="text-xs text-gray-300 leading-relaxed">
            Nhận thông tin mùa vụ dừa mới nhất, ưu đãi quà tặng OCOP và mẹo sống xanh từ chuyên gia.
          </p>

          <form id="footer-newsletter-form" class="space-y-2">
            <input type="email" required placeholder="Nhập địa chỉ email của bạn..." class="w-full px-3.5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-800 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400">
            <button type="submit" class="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm">
              Đăng Ký Ngay
            </button>
          </form>

          <!-- Social Links -->
          <div class="pt-2">
            <span class="text-[11px] text-gray-400 block mb-2">Kết nối cùng HTX Dừa Song Phú:</span>
            <div class="flex items-center gap-3">
              <a href="${coopInfo.socials.facebook}" target="_blank" class="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition" title="Facebook">
                f
              </a>
              <a href="${coopInfo.socials.zalo}" target="_blank" class="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500 transition font-bold text-xs" title="Zalo">
                Z
              </a>
              <a href="${coopInfo.socials.youtube}" target="_blank" class="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition" title="YouTube">
                ▶
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Credit Footer Dưới Cùng (Tương tự footer-credit của HTX Thanh Bình) -->
    <div class="border-t border-emerald-900/80 bg-emerald-950/90 py-5 text-xs text-gray-400">
      <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          Copyright &copy; 2026 <b>HỢP TÁC XÃ DỪA SONG PHÚ (SOCOOP)</b>. Tất cả quyền được bảo lưu.
        </div>
        <div class="flex items-center gap-4 text-gray-400">
          <a href="#" class="hover:text-white">Điều khoản sử dụng</a>
          <span>•</span>
          <a href="#" class="hover:text-white">Bảo mật thông tin</a>
          <span>•</span>
          <a href="#traceability" class="hover:text-white">Truy xuất nguồn gốc</a>
        </div>
      </div>
    </div>
  `;

  footer.querySelector("#footer-newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cảm ơn Quý khách đã đăng ký nhận bản tin nông sản xanh của HTX Dừa Song Phú!");
    e.target.reset();
  });

  return footer;
}
