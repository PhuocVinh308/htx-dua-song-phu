import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ProductionGallery({ images }) {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="py-14 sm:py-20 bg-[#fbfbfb]" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề & mô tả chuẩn Ảnh 1 */}
        <div className="text-center mb-10">
          <h2 className="font-script-title mb-2">
            Hình ảnh sản xuất
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mb-3">
            Sản phẩm được thu hoạch và chế biến một cách tỉ mỉ để bảo đảm độ tươi ngon và giữ lại tối đa giá trị dinh dưỡng.
          </p>
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4fa32d] fill-current">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2-.1-1.2.2-2.4.9-3.4 1.2-1.7 3.2-2.8 5.4-2.8 1.5 0 2.9.5 4 1.4 1.2.9 2 2.3 2.2 3.8 2.5-1.7 4-4.5 4-7.2 0-5.5-4.5-10-9-10z" />
            </svg>
          </div>
        </div>

        {/* Lưới 8 ảnh: 2 hàng x 4 cột chuẩn 100% Ảnh 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {images.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(item)}
              className="rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#4fa32d] text-sm font-bold flex items-center gap-1"
            >
              <X className="w-5 h-5" />
              Đóng
            </button>
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
            />
            <p className="text-white text-xs sm:text-sm mt-3 font-semibold text-center">
              {activePhoto.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
