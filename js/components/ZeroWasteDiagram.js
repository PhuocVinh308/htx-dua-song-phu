// Component Sáng Tạo: ZeroWasteDiagram (Sơ đồ Kinh Tế Tuần Hoàn Cây Dừa Tương Tác)
export function createZeroWasteDiagram(parts) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 relative";
  section.id = "circular-economy";

  let activeIndex = 0;

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <!-- Section Title -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
          ĐỘT PHÁ NÔNG NGHIỆP XANH
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-emerald-950 mb-3">
          Mô Hình Kinh Tế Tuần Hoàn 100% Cây Dừa
        </h2>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Tại HTX Dừa Song Phú, <b>"Không có gì là rác thải"</b>. Mỗi bộ phận của cây dừa đều được khai thác khoa học, ứng dụng công nghệ cao để nhân giá trị lên gấp 4 đến 5 lần so với bán dừa trái truyền thống.
        </p>
      </div>

      <!-- Main Interactive Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Cột Danh Sách Các Bộ Phận Cây Dừa (Tabs tương tác) -->
        <div class="lg:col-span-5 space-y-3" id="zero-waste-tabs">
          ${parts.map((item, index) => `
            <button class="zw-tab-btn w-full text-left p-4 rounded-xl transition duration-300 flex items-center justify-between border ${index === 0 ? 'bg-emerald-800 text-white shadow-lg border-emerald-800 ring-2 ring-emerald-600/30' : 'bg-white hover:bg-emerald-50 text-gray-700 border-gray-200'}" 
                    data-part-index="${index}">
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${index === 0 ? 'bg-emerald-700 text-amber-300' : 'bg-emerald-100 text-emerald-800'}">
                  ${item.percentage}
                </div>
                <div>
                  <h4 class="font-bold text-sm sm:text-base leading-snug">${item.part}</h4>
                  <span class="text-xs opacity-80 line-clamp-1">${item.products.slice(0, 2).join(', ')}</span>
                </div>
              </div>
              <svg class="w-5 h-5 shrink-0 ${index === 0 ? 'text-amber-300' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          `).join('')}
        </div>

        <!-- Cột Hiển Thị Chi Tiết Chuỗi Giá Trị & Sản Phẩm Đầu Ra -->
        <div class="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-100" id="zero-waste-detail">
          <!-- Sẽ được cập nhật bằng JS -->
        </div>
      </div>

      <!-- Banner Tóm Tắt Tác Động Bền Vững -->
      <div class="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="space-y-1">
          <h4 class="text-lg font-bold text-amber-300 font-heading">Cam Kết Net Zero & Tăng Trưởng Xanh 2030</h4>
          <p class="text-xs sm:text-sm text-gray-200 max-w-xl">
            Mỗi hecta dừa sinh thái tại Song Phú hấp thụ tới 75 tấn CO2 mỗi năm. Chọn sản phẩm Dừa Song Phú là bạn đang đồng hành phủ xanh đồng bằng và giảm phát thải khí nhà kính!
          </p>
        </div>
        <a href="#products" class="shrink-0 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-md transition transform hover:scale-105">
          Ủng Hộ Sản Phẩm Xanh
        </a>
      </div>
    </div>
  `;

  const detailContainer = section.querySelector("#zero-waste-detail");
  const tabButtons = section.querySelectorAll(".zw-tab-btn");

  function renderDetail(index) {
    const data = parts[index];
    detailContainer.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">Chuỗi chế biến khép kín</span>
            <h3 class="text-2xl font-bold text-emerald-950 font-heading">${data.part}</h3>
          </div>
          <span class="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-sm border border-amber-200">
            Chiếm ${data.percentage} khối lượng
          </span>
        </div>

        <!-- Quy trình chế biến -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Quy Trình Khoa Học Tại Xưởng HTX</h4>
          <p class="text-sm text-gray-700 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
            ${data.process}
          </p>
        </div>

        <!-- Sản phẩm chế biến sâu đầu ra -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sản Phẩm Đầu Ra Giá Trị Cao</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${data.products.map(prod => `
              <div class="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-800">
                <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${prod}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Giá trị gia tăng cho nông dân -->
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
          <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          <div>
            <strong class="font-bold">Lợi ích kinh tế tuần hoàn:</strong>
            <p class="text-xs text-amber-800 mt-0.5">${data.valueAdded}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Render khởi tạo
  renderDetail(activeIndex);

  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.dataset.partIndex);
      activeIndex = idx;

      tabButtons.forEach((b, i) => {
        if (i === idx) {
          b.className = "zw-tab-btn w-full text-left p-4 rounded-xl transition duration-300 flex items-center justify-between border bg-emerald-800 text-white shadow-lg border-emerald-800 ring-2 ring-emerald-600/30";
          b.querySelector("svg").className = "w-5 h-5 shrink-0 text-amber-300";
          b.querySelector(".w-10").className = "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-emerald-700 text-amber-300";
        } else {
          b.className = "zw-tab-btn w-full text-left p-4 rounded-xl transition duration-300 flex items-center justify-between border bg-white hover:bg-emerald-50 text-gray-700 border-gray-200";
          b.querySelector("svg").className = "w-5 h-5 shrink-0 text-gray-400";
          b.querySelector(".w-10").className = "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-emerald-100 text-emerald-800";
        }
      });

      renderDetail(idx);
    });
  });

  return section;
}
