// Component: NewsSection (Khối Tin tức & Kiến thức Dừa OCOP tương tự phong cách HTX Thanh Bình)
export function createNewsSection(newsList) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-emerald-50/40 relative";
  section.id = "news";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          TIN TỨC & KIẾN THỨC NÔNG NGHIỆP
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-emerald-950 mb-3">
          Hoạt Động & Câu Chuyện HTX
        </h2>
        <div class="w-20 h-1 bg-emerald-600 mx-auto mb-4 rounded-full"></div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Cập nhật những chuyển biến mới nhất trong chuỗi giá trị dừa hữu cơ Song Phú, các bài chia sẻ dinh dưỡng và câu chuyện đồng hành cùng bà con nông dân.
        </p>
      </div>

      <!-- News Grid (3 Cột tương tự swiper desktop 3 của HTX Thanh Bình) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${newsList.map(item => `
          <article class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <!-- Image Cover (ar-3-2 tương tự HTX Thanh Bình) -->
              <div class="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                <img src="${item.image}" 
                     alt="${item.title}" 
                     loading="lazy"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                
                <!-- Category Tag -->
                <span class="absolute top-3 left-3 bg-emerald-800/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur">
                  ${item.category}
                </span>
              </div>

              <!-- Article Content -->
              <div class="p-6">
                <!-- Meta: Time & Read Time -->
                <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${item.date}
                  </span>
                  <span>${item.readTime}</span>
                </div>

                <!-- Title -->
                <h3 class="font-bold text-lg text-emerald-950 group-hover:text-emerald-700 transition leading-snug mb-3">
                  <a href="#news">${item.title}</a>
                </h3>

                <!-- Excerpt -->
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  ${item.excerpt}
                </p>
              </div>
            </div>

            <!-- Footer: View Detail -->
            <div class="px-6 pb-6 pt-2 border-t border-gray-50">
              <a href="#news" class="inline-flex items-center text-xs font-bold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1 transition duration-200">
                <span>Xem chi tiết bài viết</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}
