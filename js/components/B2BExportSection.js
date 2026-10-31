// Component: B2BExportSection (Khối Cung Ứng B2B & Xuất Khẩu Nông Sản Dừa)
export function createB2BExportSection(coopInfo) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-white relative";
  section.id = "b2b-export";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
        <!-- Background Pattern -->
        <div class="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-600/10 blur-2xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          <!-- Text Info -->
          <div class="lg:col-span-6 space-y-6">
            <span class="inline-block px-3.5 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold uppercase tracking-wider">
              DÀNH CHO ĐỐI TÁC B2B & XUẤT KHẨU
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
              Cung Ứng Nguồn Dừa Ổn Định Số Lượng Lớn
            </h2>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
              HTX Dừa Song Phú hiện là đối tác tin cậy của hơn 30 chuỗi cửa hàng thực phẩm sạch, hệ thống pha chế đồ uống và các đơn vị xuất khẩu nông sản sang Nhật Bản, EU và Hoa Kỳ.
            </p>

            <div class="space-y-3 pt-2 text-xs sm:text-sm">
              <div class="flex items-center gap-3 text-emerald-200">
                <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Sản lượng dừa tươi đạt trên <b>500.000 trái / tháng</b></span>
              </div>
              <div class="flex items-center gap-3 text-emerald-200">
                <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Dầu dừa ly tâm công suất <b>10.000 lít / tháng</b> chuẩn ISO 22000</span>
              </div>
              <div class="flex items-center gap-3 text-emerald-200">
                <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Hỗ trợ hồ sơ kiểm định, CO, Phytosanitary và xuất hóa đơn đỏ VAT đầy đủ</span>
              </div>
            </div>

            <div class="pt-4 flex items-center gap-4 text-xs text-gray-300">
              <span class="font-bold text-amber-300">Hotline Giám đốc HTX:</span>
              <a href="tel:0918268379" class="underline hover:text-white font-mono text-sm font-bold">0918 268 379 (Mr. Hùng)</a>
            </div>
          </div>

          <!-- Quick Request Form -->
          <div class="lg:col-span-6 bg-white text-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 class="text-xl font-bold font-heading text-emerald-950 mb-1">
              Gửi Yêu Cầu Báo Giá Nhanh
            </h3>
            <p class="text-xs text-gray-500 mb-6">
              Ban điều hành HTX Song Phú sẽ liên hệ lại trong vòng 2 giờ làm việc.
            </p>

            <form id="b2b-form" class="space-y-4 text-xs sm:text-sm">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Tên Doanh Nghiệp / Cá Nhân *</label>
                <input type="text" required placeholder="Ví dụ: Công ty TNHH Thực Phẩm Xanh" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Số Điện Thoại / Zalo *</label>
                  <input type="tel" required placeholder="09xx xxx xxx" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
                </div>
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Email Công Ty</label>
                  <input type="email" placeholder="contact@company.com" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
                </div>
              </div>

              <div>
                <label class="block font-bold text-gray-700 mb-1">Sản Phẩm Quan Tâm</label>
                <select class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 bg-white">
                  <option>Dừa Xiêm gọt kim cương xuất khẩu</option>
                  <option>Dầu dừa ly tâm nguyên chất (Can 20L / Phuy 200L)</option>
                  <option>Mật hoa dừa cô đặc OCOP</option>
                  <option>Dừa sáp Tam Bình đặc sản</option>
                  <option>Than hoạt tính gáo dừa & Giá thể xơ dừa</option>
                  <option>Hợp đồng gia công OEM / Nhãn hàng riêng</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-gray-700 mb-1">Ghi Chú Sản Lượng Dự Kiến</label>
                <textarea rows="3" placeholder="Số lượng ước tính mỗi tháng, cảng giao hàng hoặc quy cách đóng gói riêng..." class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"></textarea>
              </div>

              <button type="submit" class="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold transition shadow-md">
                Gửi Đề Nghị Báo Giá Sỉ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  section.querySelector("#b2b-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Dạ HTX Dừa Song Phú đã tiếp nhận thông tin yêu cầu báo giá của Quý doanh nghiệp! Bộ phận kinh doanh B2B sẽ chủ động liên hệ gửi bảng giá chiết khấu và mẫu thử nghiệm trong thời gian sớm nhất ạ.");
    e.target.reset();
  });

  return section;
}
