// Component: WhyChooseUs (Khối Tại Sao Chọn Chúng Tôi tương tự phong cách HTX Thanh Bình)
export function createWhyChooseUs() {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-emerald-950 text-white relative overflow-hidden";
  section.id = "why-us";

  const pillars = [
    {
      num: "01",
      title: "100% Thuần Sinh Thái",
      subtitle: "Phù sa sông Măng Thít",
      desc: "Vùng dừa bãi bồi quanh năm nhận dưỡng chất từ sông Tiền và sông Măng Thít, giúp trái dừa tích tụ độ ngọt thanh dịu và hàm lượng khoáng chất vượt trội.",
      icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    {
      num: "02",
      title: "Canh Tác Chuẩn VietGAP",
      subtitle: "Quy trình số minh bạch",
      desc: "100% hộ nông dân xã viên tuân thủ nhật ký điện tử, tuyệt đối không dùng thuốc trừ sâu hóa học, chỉ dùng chế phẩm nấm đối kháng sinh học bảo vệ vườn dừa.",
      icon: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`
    },
    {
      num: "03",
      title: "Chế Biến Sâu Hiện Đại",
      subtitle: "Công nghệ ly tâm & ISO 22000",
      desc: "Đầu tư nhà xưởng đạt chuẩn ISO 22000:2018. Công nghệ ép lạnh ly tâm 3 pha không sinh nhiệt bảo toàn trên 51.8% Axit Lauric quý trong dầu dừa tươi.",
      icon: `<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`
    },
    {
      num: "04",
      title: "Kinh Tế Tuần Hoàn 0% Rác",
      subtitle: "Giá trị xanh bền vững",
      desc: "Tận dụng 100% cây dừa từ cơm dừa, nước dừa, gáo dừa, xơ dừa và hoa dừa. Giảm thiểu rác thải nông nghiệp, tạo sinh kế bền vững cho hàng trăm phụ nữ nông thôn.",
      icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`
    }
  ];

  section.innerHTML = `
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          GIÁ TRỊ KHÁC BIỆT CỦA HTX
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white mb-4">
          Tại Sao Chọn Dừa Song Phú?
        </h2>
        <div class="w-20 h-1 bg-amber-400 mx-auto mb-4 rounded-full"></div>
        <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
          Chúng tôi mang đến sản phẩm dừa sạch không chỉ vì mục đích thương mại, mà đó là tâm huyết giữ gìn danh tiếng nông sản quê hương Tam Bình và trách nhiệm với sức khỏe cộng đồng.
        </p>
      </div>

      <!-- 4 Pillars Grid (Tương tự cấu trúc widget why-us của trang mẫu) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        ${pillars.map(pillar => `
          <div class="relative p-6 sm:p-8 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900/90 border border-emerald-800/80 transition transform hover:-translate-y-2 group shadow-xl">
            <!-- Số thứ tự lớn trang trí mờ -->
            <div class="pillar-number select-none">
              ${pillar.num}
            </div>

            <div class="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-inner">
              ${pillar.icon}
            </div>

            <span class="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-1">
              ${pillar.subtitle}
            </span>

            <h3 class="text-xl font-bold font-heading text-white mb-3">
              ${pillar.title}
            </h3>

            <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">
              ${pillar.desc}
            </p>
          </div>
        `).join('')}
      </div>

      <!-- Băng chuyền cam kết chứng nhận -->
      <div class="mt-16 p-6 rounded-2xl bg-emerald-900/40 border border-emerald-800 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-gray-300">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
          <span>Chứng nhận <b>VietGAP Nông Sản</b></span>
        </div>
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-amber-400"></span>
          <span>Chứng nhận <b>OCOP 4 Sao Tỉnh Vĩnh Long</b></span>
        </div>
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-cyan-400"></span>
          <span>Hệ thống Quản lý An toàn <b>ISO 22000:2018</b></span>
        </div>
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-purple-400"></span>
          <span>Kiểm nghiệm Dư lượng <b>Viện Pasteur TP.HCM</b></span>
        </div>
      </div>
    </div>
  `;

  return section;
}
