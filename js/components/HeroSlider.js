// Component: HeroSlider (Banner Carousel phong cách tương tự HTX Thanh Bình)
export function createHeroSlider(slides) {
  const container = document.createElement("section");
  container.className = "relative overflow-hidden bg-emerald-950 text-white select-none";
  container.id = "home";

  let currentSlide = 0;
  const totalSlides = slides.length;

  container.innerHTML = `
    <!-- Slides Wrapper -->
    <div id="hero-slider-track" class="relative w-full h-[520px] md:h-[620px] transition-transform duration-700 ease-in-out">
      ${slides.map((slide, index) => `
        <div class="hero-slide absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" 
             data-slide-index="${index}" 
             style="background-image: url('${slide.bgImage}');">
          <!-- Dark Organic Gradient Overlay -->
          <div class="absolute inset-0 hero-overlay"></div>
          
          <!-- Content Box -->
          <div class="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div class="max-w-2xl text-left">
              <span class="inline-block px-3 py-1 mb-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-full bg-emerald-600/80 text-emerald-100 backdrop-blur border border-emerald-400/30">
                ${slide.tag}
              </span>
              <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white mb-2">
                ${slide.title}
              </h2>
              <h3 class="text-amber-300 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide font-sans mb-4">
                ${slide.subtitle}
              </h3>
              <p class="text-gray-200 text-sm sm:text-base md:text-lg mb-8 leading-relaxed line-clamp-3">
                ${slide.desc}
              </p>
              <div class="flex flex-wrap items-center gap-4">
                <a href="${slide.btnLink}" class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-bold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-sm md:text-base">
                  <span>${slide.btnText}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
                <a href="#about" class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full border border-white/30 backdrop-blur transition text-sm md:text-base">
                  <span>Về Chúng Tôi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Navigation Arrows -->
    <button id="hero-prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-emerald-700 text-white flex items-center justify-center transition backdrop-blur border border-white/20" title="Slide trước">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
    <button id="hero-next" class="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-emerald-700 text-white flex items-center justify-center transition backdrop-blur border border-white/20" title="Slide tiếp theo">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

    <!-- Indicators (Dots) -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
      ${slides.map((_, index) => `
        <button class="hero-dot w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white'}" data-dot-index="${index}"></button>
      `).join('')}
    </div>
  `;

  // Slider Logic
  const slideElements = container.querySelectorAll(".hero-slide");
  const dotElements = container.querySelectorAll(".hero-dot");

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    slideElements.forEach((el, i) => {
      if (i === currentSlide) {
        el.classList.remove("opacity-0", "z-0");
        el.classList.add("opacity-100", "z-10");
      } else {
        el.classList.remove("opacity-100", "z-10");
        el.classList.add("opacity-0", "z-0");
      }
    });

    dotElements.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.className = "hero-dot h-3 rounded-full transition-all duration-300 bg-amber-400 w-8";
      } else {
        dot.className = "hero-dot h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white w-3";
      }
    });
  }

  container.querySelector("#hero-prev").addEventListener("click", () => {
    goToSlide(currentSlide - 1);
    resetAutoPlay();
  });

  container.querySelector("#hero-next").addEventListener("click", () => {
    goToSlide(currentSlide + 1);
    resetAutoPlay();
  });

  dotElements.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.dotIndex);
      goToSlide(idx);
      resetAutoPlay();
    });
  });

  let timer = setInterval(() => goToSlide(currentSlide + 1), 6000);

  function resetAutoPlay() {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  return container;
}
