import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function CustomerReviewsSection({ onExploreProducts }) {
  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Thị Thu Hà',
      location: 'Quận 1, TP. Hồ Chí Minh',
      avatarText: 'H',
      avatarBg: 'bg-emerald-600',
      role: 'Khách hàng cá nhân',
      productName: 'Dừa xiêm gọt kim cương OCOP',
      rating: 5,
      date: '18/10/2026',
      comment: 'Dừa tươi ngọt thanh mát, nước nhiều và cơm dừa non béo ngậy. Gọt kim cương sạch sẽ để tủ lạnh uống rất tiện. Đóng thùng xốp giao hỏa tốc đến TP.HCM trong ngày vẫn giữ trọn vị tươi mát nguyên bản.',
      verified: true
    },
    {
      id: 2,
      name: 'Trần Văn Hưng',
      location: 'TP. Vĩnh Long',
      avatarText: 'H',
      avatarBg: 'bg-amber-600',
      role: 'Chủ chuỗi Cà Phê Mộc',
      productName: 'Nước dừa tươi & Dầu dừa ép lạnh',
      rating: 5,
      date: '12/10/2026',
      comment: 'Quán chúng tôi sử dụng dừa Song Phú làm nguyên liệu pha chế cà phê cốt dừa. Độ ngọt Brix lúc nào cũng đạt trên 8.5° tự nhiên, thực khách khen nức nở. Nguồn cung cấp từ HTX ổn định quanh năm.',
      verified: true
    },
    {
      id: 3,
      name: 'Lê Hoàng Minh',
      location: 'Ninh Kiều, Cần Thơ',
      avatarText: 'M',
      avatarBg: 'bg-teal-600',
      role: 'Khách hàng thân thiết',
      productName: 'Dừa sáp đặc sản Song Phú',
      rating: 5,
      date: '05/10/2026',
      comment: 'Quét tem mã QR Blockchain ra ngay tên xã viên trực tiếp chăm sóc và nhật ký bón phân hữu cơ. Cơm dừa sáp dẻo quánh béo ngậy chuẩn loại 1. HTX làm việc rất bài bản và uy tín.',
      verified: true
    },
    {
      id: 4,
      name: 'Đặng Mai Phương',
      location: 'Cầu Giấy, Hà Nội',
      avatarText: 'P',
      avatarBg: 'bg-indigo-600',
      role: 'Chuyên gia dinh dưỡng',
      productName: 'Mật hoa dừa OCOP & Cơm dừa sấy',
      rating: 5,
      date: '28/09/2026',
      comment: 'Mật hoa dừa thơm dịu, chỉ số đường huyết thấp phù hợp người ăn thực dưỡng. Dù vận chuyển ra Hà Nội xa xôi nhưng thùng carton bảo quản lạnh rất cẩn thận, sản phẩm nguyên vẹn hoàn hảo.',
      verified: true
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#fbfdfa] via-white to-[#f4f7f2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Phản hồi &amp; Niềm tin người tiêu dùng</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#0f4c3a] tracking-tight mb-3">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>

          <div className="w-20 h-1 bg-[#3b7e28] mx-auto rounded-full mb-4"></div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Hơn <b>5.000+</b> gia đình và đối tác ẩm thực trên khắp cả nước đã tin tưởng lựa chọn dừa xiêm tươi, dừa sáp và các dòng sản phẩm dừa chế biến sâu đạt chuẩn OCOP 4 sao của Hợp tác xã Dừa Song Phú.
          </p>
        </div>

        {/* Lưới 4 Thẻ Đánh Giá Tiêu Biểu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reviews.map((rev) => (
            <article 
              key={rev.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#d6e8cb] transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-emerald-100 absolute top-4 right-4 pointer-events-none group-hover:text-emerald-200 transition-colors" />

              <div>
                {/* 5 Sao Đánh Giá */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
                </div>

                {/* Nhận xét */}
                <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Thông tin khách hàng */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0`}>
                    {rev.avatarText}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-gray-900 truncate">
                      {rev.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">
                      {rev.location}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px]">
                  <span className="text-[#3b7e28] font-bold truncate max-w-[170px]" title={rev.productName}>
                    ✓ {rev.productName}
                  </span>
                  <span className="text-gray-400 shrink-0 font-mono">
                    {rev.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Thanh Chỉ Số Uy Tín & Nút Khám Phá */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#d6e8cb] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-center md:text-left">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#3b7e28]">4.9 / 5</span>
              <p className="text-[11px] text-gray-500 font-medium">Điểm đánh giá trung bình</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#3b7e28]">100%</span>
              <p className="text-[11px] text-gray-500 font-medium">Hài lòng về độ tươi ngon</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#3b7e28]">165+</span>
              <p className="text-[11px] text-gray-500 font-medium">Hộ xã viên liên kết VietGAP</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#3b7e28]">OCOP 4★</span>
              <p className="text-[11px] text-gray-500 font-medium">Chứng nhận UBND Vĩnh Long</p>
            </div>
          </div>

          <button
            onClick={onExploreProducts}
            className="btn-pill-green px-6 py-3 text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 shrink-0 hover:scale-105 transition-transform"
          >
            <span>XEM TẤT CẢ SẢN PHẨM &amp; ĐÁNH GIÁ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
