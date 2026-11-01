import React, { useState } from 'react';
import { 
  Star, Check, ArrowRight, ShoppingCart, Zap, ShieldCheck, 
  Truck, RefreshCw, Award, MapPin, ChevronRight, Phone, Heart, Share2, ThumbsUp
} from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductDetailPage({ 
  product, 
  allProducts = [], 
  onBack, 
  onAddToCart, 
  onBuyNow, 
  onSelectProduct,
  onTraceClick 
}) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center font-sans">
        <p className="text-gray-500 mb-4 text-base">Không tìm thấy thông tin sản phẩm.</p>
        <button
          onClick={onBack}
          className="btn-pill-green px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md"
        >
          ‹ Quay lại danh mục sản phẩm
        </button>
      </div>
    );
  }

  const currentImage = selectedImage || product.image || '/products/diamond-coconut.jpg';

  // Định dạng giá tiền
  const formattedPrice = Number.isFinite(product.price)
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
    : '0 ₫';

  const originalPrice = product.originalPrice || Math.round(product.price * 1.2);
  const formattedOriginal = Number.isFinite(originalPrice)
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)
    : null;

  const discountPercent = originalPrice > product.price 
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100) 
    : null;

  // Lô truy xuất
  const traceCode = product.traceBatch || 'SP-DXL-2026-01';

  // Sản phẩm liên quan
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || Math.random() > 0.5))
    .slice(0, 4);

  // Gallery hình ảnh phụ
  const galleryThumbnails = [
    product.image,
    'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?auto=format&fit=crop&w=600&q=80',
  ].filter(Boolean);

  const reviews = [
    {
      name: 'Nguyễn Thị Thu Hà',
      date: '18/10/2026',
      rating: 5,
      comment: 'Dừa tươi ngọt thanh, nước rất nhiều và béo mát. Gọt kim cương sạch sẽ, để tủ lạnh uống rất đã. HTX phục vụ chu đáo, đóng thùng giao nhanh.',
      verified: true
    },
    {
      name: 'Trần Văn Hưng (Quán Cà Phê Mộc Vĩnh Long)',
      date: '12/10/2026',
      rating: 5,
      comment: 'Tôi nhập hàng thường xuyên của HTX Song Phú cho quán. Chất lượng dừa đồng đều, nước brix lúc nào cũng trên 8.5 độ ngọt tự nhiên. Khách khen nhiều.',
      verified: true
    },
    {
      name: 'Lê Hoàng Minh',
      date: '05/10/2026',
      rating: 5,
      comment: 'Rất ấn tượng với tem QR Blockchain quét ra ngay thửa đất và xã viên trồng dừa. Sản phẩm sạch, có trách nhiệm với người tiêu dùng.',
      verified: true
    }
  ];

  return (
    <div className="bg-[#fbfbfb] min-h-screen py-6 sm:py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap">
          <button onClick={onBack} className="hover:text-[#3b7e28] transition font-medium">Trang chủ</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#3b7e28] transition font-medium">Sản phẩm</button>
          <span>/</span>
          <span className="text-[#3b7e28] font-bold uppercase truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Khối Thông Tin Chính Sản Phẩm (2 Cột) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Cột Trái: Gallery Hình Ảnh (5 Cột) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center p-4">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full shadow bg-[#3b7e28]">
                  {product.badge || 'OCOP 4 SAO'}
                </span>
                {discountPercent && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-black text-white rounded-full bg-red-600 shadow">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Dải thumbnail xem ảnh */}
              <div className="grid grid-cols-4 gap-2.5">
                {galleryThumbnails.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 bg-gray-50 transition p-1 ${
                      currentImage === img ? 'border-[#3b7e28] ring-2 ring-[#70a340]/20' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Thông tin nhanh nguồn gốc */}
              <div className="p-3.5 rounded-xl bg-[#f4f7f2] border border-[#e2edd8] text-xs text-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#3b7e28] shrink-0" />
                  <span>Vườn: <b>{product.farmerName || 'Tổ Xã Viên Ấp Phú Trường Yên'}</b></span>
                </div>
                <button
                  onClick={() => onTraceClick && onTraceClick(traceCode)}
                  className="text-[#3b7e28] hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Mã: {traceCode}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Cột Phải: Thông Tin Chi Tiết & Giá Tiền (7 Cột) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-700 ml-1">5.0</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount || 128} đánh giá)</span>
                    <span className="text-gray-300 mx-1.5">|</span>
                    <span className="text-gray-600 font-normal">Đã bán 2.4k+</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-full border transition ${
                        isFavorite ? 'bg-red-50 text-red-500 border-red-200' : 'text-gray-400 border-gray-200 hover:text-red-500'
                      }`}
                      title="Yêu thích"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 transition" title="Chia sẻ">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Mã sản phẩm (SKU): <span className="font-mono font-bold text-gray-800">{product.id}</span> | Thương hiệu: <span className="font-bold text-[#0f4c3a]">SOCOOP FARM</span>
                </p>
              </div>

              {/* BẢNG GIÁ TIỀN & ƯU ĐÃI (RÕ RÀNG, CHUYÊN NGHIỆP) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f4f7f2] to-[#eef7e9] border border-[#d6e8cb]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#3b7e28]">
                    {formattedPrice}
                  </span>
                  {formattedOriginal && (
                    <span className="text-base text-gray-400 line-through">
                      {formattedOriginal}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-100 text-red-700 border border-red-200">
                      Tiết kiệm {discountPercent}%
                    </span>
                  )}
                  {product.unit && (
                    <span className="text-xs font-semibold text-gray-600">
                      / 1 {product.unit}
                    </span>
                  )}
                </div>

                {/* Chính sách giá sỉ / mua số lượng lớn */}
                <div className="mt-3 pt-3 border-t border-[#d8e8cd] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#70a340]"></span>
                    <span>Mua từ <b>50 {product.unit || 'sản phẩm'}</b>: Giảm ngay 10%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#70a340]"></span>
                    <span>Hợp đồng sỉ đại lý / xuất khẩu: Giá xuất xưởng</span>
                  </div>
                </div>
              </div>

              {/* Mô tả ngắn */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.desc || 'Sản phẩm dừa đặc sản chọn lọc từ những nông hộ xã viên chuyên canh tại vùng bãi bồi trù phú Song Phú ven dòng sông Măng Thít. Thu hoạch đúng độ bánh tẻ, giữ trọn vị tươi ngọt và dinh dưỡng tự nhiên.'}
              </p>

              {/* Đặc điểm gạch đầu dòng */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-[#70a340] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* BỘ CHỌN SỐ LƯỢNG VÀ CÁC NÚT MUA HÀNG */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 shadow-sm">
                    <button
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition font-bold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-mono font-bold text-gray-900 text-sm">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    (Còn hơn 500 {product.unit || 'sản phẩm'} sẵn tại kho)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => onAddToCart && onAddToCart(product, qty)}
                    className="w-full sm:flex-1 py-3 px-6 rounded-full border-2 border-[#70a340] text-[#3b7e28] hover:bg-[#f4f7f2] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(product, qty);
                      if (onBuyNow) onBuyNow(product, qty);
                    }}
                    className="w-full sm:flex-1 py-3 px-6 rounded-full bg-[#70a340] hover:bg-[#5d8e30] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap className="w-4 h-4" />
                    <span>MUA NGAY (GIAO TẬN NƠI)</span>
                  </button>
                </div>

                <div className="text-center sm:text-left pt-1">
                  <a
                    href="tel:0918268379"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#3b7e28] transition font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#70a340]" />
                    <span>Tư vấn đặt hàng nhanh & giá sỉ: <b>0918 268 379</b> (Hotline HTX Song Phú)</span>
                  </a>
                </div>
              </div>

              {/* 4 CAM KẾT VÀNG TỪ HỢP TÁC XÃ */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#70a340] shrink-0" />
                  <span>100% Tự nhiên VietGAP</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#70a340] shrink-0" />
                  <span>Đổi trả 1-1 trong 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#70a340] shrink-0" />
                  <span>Giao nhanh toàn quốc</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#70a340] shrink-0" />
                  <span>OCOP 4 Sao Vĩnh Long</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* KHỐI TABS THÔNG TIN CHI TIẾT (MÔ TẢ, THÔNG SỐ, TRUY XUẤT, ĐÁNH GIÁ) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-12">
          {/* Tab Header Buttons */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-4 sm:gap-8 pb-3 mb-6 scrollbar-none">
            {[
              { id: 'description', label: 'MÔ TẢ CHI TIẾT' },
              { id: 'specifications', label: 'THÔNG SỐ & DINH DƯỠNG' },
              { id: 'traceability', label: 'TRUY XUẤT NGUỒN GỐC' },
              { id: 'reviews', label: `ĐÁNH GIÁ KHÁCH HÀNG (${reviews.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-bold uppercase pb-3 transition relative shrink-0 ${
                  activeTab === tab.id
                    ? 'text-[#3b7e28] border-b-2 border-[#3b7e28]'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Mô tả chi tiết */}
          {activeTab === 'description' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-4xl">
              <h3 className="font-bold text-gray-900 text-base">
                Giới thiệu nguồn gốc {product.name} tại Hợp Tác Xã Dừa Song Phú
              </h3>
              <p>
                Xã Song Phú (huyện Tam Bình, tỉnh Vĩnh Long) từ lâu đã nổi danh khắp đồng bằng sông Cửu Long nhờ dải đất bãi bồi phù sa trù phú ven dòng sông Măng Thít. Nguồn nước ngọt quanh năm cùng lượng khoáng chất phù sa dồi dào là điều kiện thổ nhưỡng lý tưởng để những rặng dừa tại đây tích tụ hàm lượng đường tự nhiên, tạo nên vị ngọt mát thanh khiết không nơi nào sánh được.
              </p>
              <p>
                Toàn bộ sản phẩm <b>{product.name}</b> được thu hoạch từ vùng trồng liên kết của hơn 165 hộ xã viên theo quy trình VietGAP khép kín. Chúng tôi tuyệt đối nói không với phân bón hóa học và thuốc bảo vệ thực vật độc hại, áp dụng các giải pháp sinh học như nuôi kiến vàng trị sâu bọ và sử dụng phân trùn quế hữu cơ.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                <p className="font-bold">⭐ Quy chuẩn đóng gói & Bảo quản chuẩn xuất khẩu:</p>
                <p>- Mỗi quả/sản phẩm đều được dán tem định danh mã QR truy xuất nguồn gốc số.</p>
                <p>- Đóng thùng carton 3-5 lớp chống va đập, bảo quản lạnh ở nhiệt độ tiêu chuẩn 2°C - 5°C.</p>
                <p>- Hạn sử dụng: Từ 30 - 45 ngày giữ nguyên vị tươi ngọt tự nhiên.</p>
              </div>
            </div>
          )}

          {/* Tab Content 2: Thông số kỹ thuật & Dinh dưỡng */}
          {activeTab === 'specifications' && (
            <div className="max-w-2xl text-xs sm:text-sm">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-500 w-1/3">Tên sản phẩm</td>
                    <td className="py-2.5 text-gray-900 font-semibold">{product.name}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="py-2.5 font-bold text-gray-500">Mã SKU</td>
                    <td className="py-2.5 text-gray-900 font-mono">{product.id}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-500">Xuất xứ</td>
                    <td className="py-2.5 text-gray-900">Ấp Phú Trường Yên, Xã Song Phú, Tỉnh Vĩnh Long</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="py-2.5 font-bold text-gray-500">Độ ngọt tự nhiên (Brix)</td>
                    <td className="py-2.5 text-gray-900">8.5° - 9.2° Brix</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-500">Chứng nhận chất lượng</td>
                    <td className="py-2.5 text-gray-900">OCOP 4 Sao, VietGAP, ISO 22000:2018</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="py-2.5 font-bold text-gray-500">Hàm lượng khoáng chất</td>
                    <td className="py-2.5 text-gray-900">Giàu Kali (250mg/100ml), Magie, Natri, Axit Lauric</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-500">Hướng dẫn sử dụng</td>
                    <td className="py-2.5 text-gray-900">Uống trực tiếp, ngon hơn khi ướp lạnh</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content 3: Truy xuất nguồn gốc */}
          {activeTab === 'traceability' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 max-w-3xl">
              <div className="p-4 rounded-xl bg-[#f4f7f2] border border-[#d6e8cb] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#3b7e28]">
                    Lý lịch nông hộ số trên Blockchain
                  </span>
                  <h4 className="text-base font-extrabold text-[#0f4c3a]">
                    Mã lô: {traceCode}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Canh tác bởi: <b>{product.farmerName || 'Xã viên Chú Bảy Nghĩa (Ấp Phú Trường Yên)'}</b>
                  </p>
                </div>
                <button
                  onClick={() => onTraceClick && onTraceClick(traceCode)}
                  className="btn-pill-green px-5 py-2.5 text-xs font-bold shadow shrink-0"
                >
                  Tra cứu chi tiết lô hàng
                </button>
              </div>
              <p className="text-gray-600">
                Toàn bộ dữ liệu từ ngày thụ phấn, ngày bón phân hữu cơ vi sinh, kết quả kiểm nghiệm dư lượng thuốc BVTV (0.00 ppm) và ngày thu hoạch đều được mã hóa bằng hàm băm Blockchain minh bạch, bảo đảm người tiêu dùng mua đúng dừa sạch chất lượng.
              </p>
            </div>
          )}

          {/* Tab Content 4: Đánh giá khách hàng */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-center pr-4 border-r border-gray-200">
                  <span className="text-3xl font-extrabold text-[#3b7e28]">5.0</span>
                  <div className="flex items-center text-amber-500 text-xs mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-0.5">128 đánh giá</span>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-bold text-gray-800">100% khách hàng hài lòng về chất lượng sản phẩm</p>
                  <p className="text-gray-500 mt-0.5">Dừa ngọt tự nhiên, đóng gói cẩn thận, giao hàng đúng hẹn.</p>
                </div>
              </div>

              {/* Danh sách review */}
              <div className="space-y-4">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200">
                            <Check className="w-3 h-3" /> Đã mua hàng
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* KHỐI SẢN PHẨM CÙNG DANH MỤC LIÊN QUAN */}
        {relatedProducts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-gray-900">
                SẢN PHẨM TƯƠNG TỰ TỪ DỪA
              </h3>
              <button
                onClick={onBack}
                className="text-xs font-bold text-[#3b7e28] hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onQuickView={(p) => {
                    if (onSelectProduct) onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
