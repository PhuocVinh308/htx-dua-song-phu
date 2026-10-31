// Component Sáng Tạo: TraceabilitySection (Hệ Thống Truy Xuất Nguồn Gốc Số & QR Blockchain)
export function createTraceabilitySection(batches) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-emerald-950 text-white relative overflow-hidden";
  section.id = "traceability";

  const batchKeys = Object.keys(batches);
  let selectedBatchKey = batchKeys[0];

  section.innerHTML = `
    <!-- Decorative background elements -->
    <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-800/20 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          SỐ HÓA CHUỖI CUNG ỨNG NÔNG SẢN
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white mb-3">
          Tra Cứu Nguồn Gốc Lô Hàng
        </h2>
        <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
          Mỗi sản phẩm xuất xưởng từ HTX Dừa Song Phú đều mang mã định danh duy nhất. Quý khách có thể kiểm tra tường minh lý lịch nông hộ, thời gian thu hoạch và chứng nhận kiểm nghiệm độc lập.
        </p>
      </div>

      <!-- Batch Selector & Search Bar -->
      <div class="max-w-xl mx-auto mb-10">
        <div class="bg-emerald-900/80 p-2 rounded-2xl border border-emerald-700/80 flex flex-col sm:flex-row items-center gap-2">
          <input type="text" 
                 id="trace-input-code" 
                 placeholder="Nhập mã lô (Ví dụ: SP-DXL-2026-01)" 
                 value="${selectedBatchKey}"
                 class="w-full bg-emerald-950/80 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-emerald-800 text-sm focus:outline-none focus:border-amber-400 font-mono">
          <button id="btn-trace-search" class="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span>Tra Cứu</span>
          </button>
        </div>

        <!-- Quick Select Buttons -->
        <div class="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs">
          <span class="text-gray-400">Gợi ý mã xem thử:</span>
          ${batchKeys.map(key => `
            <button class="quick-batch-btn font-mono px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border border-emerald-700/50 transition" 
                    data-code="${key}">
              ${key}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Traceability Result Card Container -->
      <div id="trace-result-card" class="bg-emerald-900/70 border border-emerald-700/70 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <!-- Rendered by JS -->
      </div>
    </div>
  `;

  const inputCode = section.querySelector("#trace-input-code");
  const btnSearch = section.querySelector("#btn-trace-search");
  const resultCard = section.querySelector("#trace-result-card");
  const quickBtns = section.querySelectorAll(".quick-batch-btn");

  function renderBatch(code) {
    const data = batches[code] || batches["SP-DXL-2026-01"];
    inputCode.value = data.batchCode;

    resultCard.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Cột Ảnh & Mã QR -->
        <div class="lg:col-span-4 space-y-4 text-center">
          <div class="rounded-2xl overflow-hidden aspect-video sm:aspect-square border-2 border-emerald-700/60 shadow-lg">
            <img src="${data.image}" alt="${data.productName}" class="w-full h-full object-cover">
          </div>
          
          <!-- Giả lập Mã QR Code -->
          <div class="p-4 rounded-2xl bg-white text-emerald-950 flex flex-col items-center justify-center shadow-md">
            <div class="w-24 h-24 bg-gray-900 p-2 rounded-lg flex items-center justify-center text-white mb-2">
              <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h6v6H4V4zm2 2v2h2V6H6zm8-2h6v6h-6V4zm2 2v2h2V6h-2zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm10-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-6-2h2v4h-2v-4z"/>
              </svg>
            </div>
            <span class="text-xs font-mono font-bold text-gray-800">${data.batchCode}</span>
            <span class="text-[10px] text-gray-500">Mã QR truy xuất bảo mật</span>
          </div>
        </div>

        <!-- Cột Thông Tin Nhật Ký Canh Tác & Kiểm Định -->
        <div class="lg:col-span-8 space-y-6">
          <div class="border-b border-emerald-800 pb-4">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold font-mono">
                ${data.batchCode}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-xs font-medium">
                Đã xác thực số
              </span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold font-heading text-white">
              ${data.productName}
            </h3>
          </div>

          <!-- Thông tin nông hộ & Thửa đất -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
              <span class="text-gray-400 block text-xs mb-1">Nông Hộ Xã Viên Phụ Trách:</span>
              <strong class="text-amber-300 text-sm font-semibold">${data.farmOwner}</strong>
            </div>

            <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
              <span class="text-gray-400 block text-xs mb-1">Vị Trí Vùng Trồng:</span>
              <strong class="text-white text-xs">${data.location}</strong>
            </div>

            <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
              <span class="text-gray-400 block text-xs mb-1">Quy Mô & Đất Trồng:</span>
              <strong class="text-white text-xs">${data.farmArea} • ${data.soilType}</strong>
            </div>

            <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
              <span class="text-gray-400 block text-xs mb-1">Ngày Thu Hoạch & Chế Biến:</span>
              <strong class="text-white text-xs">${data.harvestDate} (Đạt chuẩn)</strong>
            </div>
          </div>

          <!-- Kết Quả Kiểm Nghiệm Phòng Lab -->
          <div class="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80">
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Kết Quả Xét Nghiệm Chất Lượng (LAB TEST)
            </h4>
            <p class="text-xs text-gray-200 leading-relaxed font-mono">
              ${data.labTest}
            </p>
            <div class="mt-2 text-[11px] text-gray-400 flex items-center justify-between border-t border-emerald-800/80 pt-2">
              <span>Đơn vị kiểm nghiệm: <b>${data.auditor}</b></span>
              <span class="text-amber-400 font-mono">${data.blockchainTx}</span>
            </div>
          </div>

          <!-- Danh sách chứng nhận của lô -->
          <div>
            <span class="text-xs text-gray-400 block mb-2">Chứng nhận chất lượng áp dụng cho lô hàng này:</span>
            <div class="flex flex-wrap gap-2">
              ${data.certifications.map(c => `
                <span class="px-3 py-1 rounded-lg bg-emerald-800 text-emerald-100 text-xs font-semibold border border-emerald-700">
                  ${c}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Khởi tạo
  renderBatch(selectedBatchKey);

  // Sự kiện tra cứu
  btnSearch.addEventListener("click", () => {
    const code = inputCode.value.trim().toUpperCase();
    if (code) {
      renderBatch(code);
    }
  });

  inputCode.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const code = inputCode.value.trim().toUpperCase();
      if (code) renderBatch(code);
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.code;
      renderBatch(code);
    });
  });

  // Hỗ trợ gọi từ bên ngoài khi nhấp vào thẻ sản phẩm
  section.lookupCode = (code) => {
    renderBatch(code);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return section;
}
