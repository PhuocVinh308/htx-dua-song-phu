// Component: ProductionGallery (Bộ sưu tập hình ảnh sản xuất & đời sống xã viên tương tự HTX Thanh Bình)
export function createProductionGallery() {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-white relative";
  section.id = "gallery";

  const galleryItems = [
    {
      title: "Rặng dừa xiêm bãi bồi ven sông Măng Thít",
      category: "Vùng Trồng",
      image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Khâu tuyển chọn trái dừa già đạt độ béo cao",
      category: "Thu Hoạch",
      image: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Hệ thống máy ép ly tâm 3 pha không sinh nhiệt",
      category: "Chế Biến Sâu",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Tạo hình dừa gọt kim cương hút chân không xuất khẩu",
      category: "Đóng Gói",
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Nghệ nhân mài bóng gáo dừa thủ công mỹ nghệ",
      category: "Làng Nghề",
      image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Ủ vi sinh nấm Trichoderma cho giá thể mụn dừa nở",
      category: "Kinh Tế Tuần Hoàn",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Nấu xà phòng thảo dược dầu dừa theo phương pháp nguội",
      category: "Mỹ Phẩm Xanh",
      image: "https://images.unsplash.com/photo-1607006483702-3b8c31273934?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Xã viên phấn khởi bên vụ mùa dừa trĩu quả OCOP",
      category: "Đời Sống Xã Viên",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    }
  ];

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <!-- Section Header Tương Tự Thanh Bình -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          NHẬT KÝ NÔNG TRẠI & NHÀ XƯỞNG
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-emerald-950 mb-3">
          Hình Ảnh Sản Xuất Thực Tế
        </h2>
        <div class="w-20 h-1 bg-amber-400 mx-auto mb-4 rounded-full"></div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Từng trái dừa tại HTX Song Phú đều được chăm sóc bằng mồ hôi và tâm huyết của những người nông dân chân chất, chế biến trong môi trường vô trùng đạt chuẩn an toàn vệ sinh thực phẩm quốc tế.
        </p>
      </div>

      <!-- Gallery Grid 4 Cột (Tương tự gallery-columns-4) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        ${galleryItems.map((item, idx) => `
          <div class="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-md cursor-pointer gallery-item" data-index="${idx}">
            <img src="${item.image}" 
                 alt="${item.title}" 
                 loading="lazy" 
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
              <span class="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                ${item.category}
              </span>
              <h4 class="text-sm font-bold font-heading line-clamp-2">
                ${item.title}
              </h4>
              <div class="mt-2 flex items-center text-xs text-emerald-200">
                <span>Xem ảnh lớn</span>
                <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div id="gallery-lightbox" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        <button id="close-lightbox" class="absolute -top-12 right-0 text-white hover:text-amber-400 p-2 text-2xl font-bold">✕ Đóng</button>
        <img id="lightbox-img" src="" alt="" class="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl">
        <p id="lightbox-caption" class="text-white text-sm mt-3 font-semibold text-center"></p>
      </div>
    </div>
  `;

  const lightbox = section.querySelector("#gallery-lightbox");
  const lightboxImg = section.querySelector("#lightbox-img");
  const lightboxCaption = section.querySelector("#lightbox-caption");
  const closeLightbox = section.querySelector("#close-lightbox");

  section.querySelectorAll(".gallery-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.dataset.index);
      const item = galleryItems[idx];
      lightboxImg.src = item.image;
      lightboxCaption.textContent = `${item.category}: ${item.title}`;
      lightbox.classList.remove("opacity-0", "pointer-events-none");
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("opacity-0", "pointer-events-none");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("opacity-0", "pointer-events-none");
    }
  });

  return section;
}
