import React, { useState, useEffect } from 'react';
import { 
  Star, Check, ArrowRight, ShoppingCart, Zap, ShieldCheck, 
  Truck, RefreshCw, Award, MapPin, ChevronRight, Phone, Heart, Share2, ThumbsUp,
  MessageSquare, Send, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductDetailPage({ 
  product, 
  allProducts = [], 
  onBack, 
  onAddToCart, 
  onBuyNow, 
  onSelectProduct,
  onTraceClick,
  initialTab = 'description'
}) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(initialTab || 'description');
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

  // Gallery hình ảnh thực tế đa góc nhìn chuẩn nông nghiệp & chế biến
  const galleryThumbnails = Array.from(new Set([
    product.image,
    ...(product.gallery || []),
    ...(product.category === 'my-pham' 
      ? ['./products/virgin-coconut-oil.jpg', './products/coconut-soap.jpg', './products/coconut-lip-balm.jpg', './products/factory-cold-press.jpg']
      : product.category === 'thu-cong' || product.category === 'vat-lieu'
      ? ['./products/coconut-bowl.jpg', './products/woven-bag.jpg', './products/coconut-teaset.jpg', './products/farm-coir-drying.jpg']
      : ['./products/farm-coconut-grove.jpg', './products/diamond-coconut.jpg', './products/green-coconut.jpg', './products/factory-processing.jpg'])
  ])).filter(Boolean).slice(0, 4);

  // Tự động chuyển tab và cuộn xuống nếu có initialTab
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      if (initialTab === 'reviews') {
        setTimeout(() => {
          const el = document.getElementById('product-tabs-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [initialTab, product?.id]);

  // Đánh giá thực tế từ khách hàng & xã viên
  const defaultReviews = [
    {
      id: 'rev-1',
      name: 'Nguyễn Thị Thu Hà',
      location: 'Quận 1, TP. Hồ Chí Minh',
      date: '18/10/2026',
      rating: 5,
      comment: 'Dừa tươi ngọt thanh mát, nước rất nhiều và cơm dừa mềm béo. Gọt kim cương sạch sẽ, để tủ lạnh uống rất đã. HTX phục vụ chu đáo, đóng thùng xốp giao nhanh trong ngày.',
      verified: true,
      helpful: 14,
      reply: 'HTX Dừa Song Phú trân trọng cảm ơn Chị Thu Hà đã tin dùng dừa xiêm gọt kim cương OCOP. Kính chúc Chị và gia đình nhiều sức khỏe!'
    },
    {
      id: 'rev-2',
      name: 'Trần Văn Hưng (Quán Cà Phê Mộc)',
      location: 'TP. Vĩnh Long',
      date: '12/10/2026',
      rating: 5,
      comment: 'Tôi nhập hàng thường xuyên của HTX Song Phú cho chuỗi cà phê. Chất lượng dừa đồng đều, nước brix lúc nào cũng đạt trên 8.5° độ ngọt tự nhiên. Khách khen nhiều.',
      verified: true,
      helpful: 9,
      reply: 'Rất vinh hạnh được đồng hành cùng Quán Cà Phê Mộc mang hương vị dừa Song Phú tươi nguyên chất đến đông đảo thực khách!'
    },
    {
      id: 'rev-3',
      name: 'Lê Hoàng Minh',
      location: 'Ninh Kiều, Cần Thơ',
      date: '05/10/2026',
      rating: 5,
      comment: 'Rất ấn tượng với tem QR Blockchain quét ra ngay thửa đất và xã viên trực tiếp chăm sóc. Sản phẩm dừa sạch, minh bạch nguồn gốc, ăn uống cực kỳ an tâm.',
      verified: true,
      helpful: 12,
      reply: 'Minh bạch nguồn gốc và canh tác sạch bền vững là tôn chỉ hàng đầu của bà con nông dân HTX Dừa Song Phú.'
    },
    {
      id: 'rev-4',
      name: 'Bác Ba Đạt (Xã viên hưu trí)',
      location: 'Ấp Phú Trường Yên, Song Phú',
      date: '28/09/2026',
      rating: 5,
      comment: 'Dừa xứ mình đất phù sa bãi bồi sông Măng Thít quanh năm nước ngọt nên trái lúc nào cũng ngọt nước và thơm hơn dừa vùng khác. Ủng hộ HTX phát triển thương hiệu quê nhà!',
      verified: true,
      helpful: 19
    },
    {
      id: 'rev-5',
      name: 'Phạm Thanh Thảo',
      location: 'Cầu Giấy, Hà Nội',
      date: '20/09/2026',
      rating: 4,
      comment: 'Đặt gửi ra Hà Nội ban đầu sợ dừa bị ảnh hưởng, nhưng đóng thùng carton và bao bì lạnh rất cẩn thận, dừa nhận được vẫn tươi rói ngọt lành.',
      verified: true,
      helpful: 7,
      reply: 'Dạ HTX sử dụng quy trình đóng thùng xốp/carton chuyên dụng lạnh giữ nhiệt chuẩn xuất khẩu nên giao toàn quốc vẫn nguyên độ tươi ngọt ạ.'
    }
  ];

  // Lưu trữ đánh giá mới từ người dùng trên trình duyệt (localStorage)
  const [userReviews, setUserReviews] = useState(() => {
    if (typeof localStorage !== 'undefined' && product?.id) {
      try {
        const stored = localStorage.getItem(`socoop_reviews_${product.id}`);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [reviewFilter, setReviewFilter] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewerLocation, setNewReviewerLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState({});

  const allReviewsList = [...userReviews, ...defaultReviews];
  const totalReviewsCount = (product.reviewsCount || 128) + userReviews.length;

  const filteredReviews = allReviewsList.filter(rev => {
    if (reviewFilter === '5') return rev.rating === 5;
    if (reviewFilter === '4') return rev.rating === 4;
    if (reviewFilter === 'verified') return rev.verified;
    return true;
  });

  const handleToggleHelpful = (revId) => {
    setHelpfulMap(prev => ({
      ...prev,
      [revId]: !prev[revId]
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    const newRev = {
      id: `user-rev-${Date.now()}`,
      name: newReviewerName.trim(),
      location: newReviewerLocation.trim() || 'Khách hàng mua hàng',
      date: new Date().toLocaleDateString('vi-VN'),
      rating: Number(newRating) || 5,
      comment: newComment.trim(),
      verified: true,
      helpful: 1,
      isUserGenerated: true
    };

    const updated = [newRev, ...userReviews];
    setUserReviews(updated);
    if (typeof localStorage !== 'undefined' && product?.id) {
      localStorage.setItem(`socoop_reviews_${product.id}`, JSON.stringify(updated));
    }
    setNewReviewerName('');
    setNewReviewerLocation('');
    setNewComment('');
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

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
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('reviews');
                      setTimeout(() => {
                        const el = document.getElementById('product-tabs-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="flex items-center gap-1 text-amber-500 text-xs font-bold hover:opacity-85 transition cursor-pointer group text-left"
                    title="Bấm để xem tất cả nhận xét đánh giá của khách hàng"
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-400 group-hover:scale-110 transition-transform" />
                      ))}
                    </div>
                    <span className="text-gray-800 ml-1 font-extrabold">{product.rating || '5.0'}</span>
                    <span className="text-[#3b7e28] underline decoration-dotted font-medium ml-1">
                      ({totalReviewsCount} đánh giá &amp; nhận xét)
                    </span>
                    <span className="text-gray-300 mx-1.5">|</span>
                    <span className="text-gray-600 font-normal">Đã bán 2.4k+</span>
                  </button>

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
        <div id="product-tabs-section" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-12 scroll-mt-24">
          {/* Tab Header Buttons */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-4 sm:gap-8 pb-3 mb-6 scrollbar-none">
            {[
              { id: 'description', label: 'MÔ TẢ CHI TIẾT' },
              { id: 'specifications', label: 'THÔNG SỐ & DINH DƯỠNG' },
              { id: 'traceability', label: 'TRUY XUẤT NGUỒN GỐC' },
              { 
                id: 'reviews', 
                label: `ĐÁNH GIÁ & NHẬN XÉT (${totalReviewsCount})`,
                isReviewTab: true
              }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-bold uppercase pb-3 transition relative shrink-0 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'text-[#3b7e28] border-b-2 border-[#3b7e28]'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.isReviewTab && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black">
                    ★ {product.rating || '5.0'}
                  </span>
                )}
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

          {/* Tab Content 4: Đánh giá khách hàng (Đầy đủ, Tương tác cao, Đọc & Viết nhận xét) */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-4xl">
              {/* TỔNG QUAN ĐIỂM ĐÁNH GIÁ & TIẾN ĐỘ SAO */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f8faf6] to-[#eef7e9] border border-[#d6e8cb] shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Cột Điểm Tổng */}
                  <div className="md:col-span-4 text-center md:border-r border-[#d6e8cb] md:pr-6">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#3b7e28]">
                      {product.rating || '5.0'}
                    </span>
                    <span className="text-sm text-gray-500 font-bold block mt-0.5">trên 5 sao</span>
                    <div className="flex items-center justify-center text-amber-400 gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      Dựa trên <b>{totalReviewsCount}</b> lượt đánh giá từ khách hàng toàn quốc
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Khách hàng hài lòng
                    </span>
                  </div>

                  {/* Cột Phân bổ thanh đo sao */}
                  <div className="md:col-span-5 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-12 font-bold flex items-center gap-0.5 shrink-0">5 sao</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3b7e28] rounded-full w-[94%]"></div>
                      </div>
                      <span className="w-10 text-right font-mono font-bold text-gray-700">94%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12 font-bold flex items-center gap-0.5 shrink-0">4 sao</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[6%]"></div>
                      </div>
                      <span className="w-10 text-right font-mono font-bold text-gray-700">6%</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="w-12 font-medium flex items-center gap-0.5 shrink-0">3 sao</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full w-[0%]"></div>
                      </div>
                      <span className="w-10 text-right font-mono">0%</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="w-12 font-medium flex items-center gap-0.5 shrink-0">2 sao</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 rounded-full w-[0%]"></div>
                      </div>
                      <span className="w-10 text-right font-mono">0%</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="w-12 font-medium flex items-center gap-0.5 shrink-0">1 sao</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full w-[0%]"></div>
                      </div>
                      <span className="w-10 text-right font-mono">0%</span>
                    </div>
                  </div>

                  {/* Cột Nút Kêu Gọi Viết Đánh Giá */}
                  <div className="md:col-span-3 text-center flex flex-col items-center justify-center md:pl-2">
                    <p className="text-xs text-gray-600 mb-2">Bạn đã sử dụng sản phẩm này?</p>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="btn-pill-green px-4 py-2.5 text-xs font-bold shadow flex items-center gap-1.5 w-full justify-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{showReviewForm ? 'Đóng khung đánh giá' : 'Viết đánh giá của bạn'}</span>
                    </button>
                    <span className="text-[10px] text-gray-400 mt-1.5">Chia sẻ cảm nhận nhận ngay ưu đãi</span>
                  </div>
                </div>
              </div>

              {/* THÔNG BÁO GỬI ĐÁNH GIÁ THÀNH CÔNG */}
              {reviewSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Cảm ơn bạn! Đánh giá của bạn đã được ghi nhận thành công và hiển thị ngay trên hệ thống của Hợp tác xã Dừa Song Phú.
                  </span>
                </div>
              )}

              {/* FORM VIẾT ĐÁNH GIÁ TƯƠNG TÁC */}
              {showReviewForm && (
                <form 
                  onSubmit={handleAddReview} 
                  className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#3b7e28]/30 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="text-sm font-extrabold text-[#0f4c3a] uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Gửi đánh giá cho sản phẩm {product.name}
                    </h4>
                    <span className="text-xs text-gray-400">* Thông tin minh bạch</span>
                  </div>

                  {/* Chọn số sao tương tác */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      1. Mức độ hài lòng của bạn (chọn số sao):
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setNewRating(starVal)}
                            className="p-1 text-2xl transition hover:scale-125 focus:outline-none"
                            title={`${starVal} sao`}
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                starVal <= newRating 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-gray-300 hover:text-amber-200'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        {newRating === 5 && '⭐⭐⭐⭐⭐ Cực kỳ hài lòng! Đúng chuẩn dừa OCOP'}
                        {newRating === 4 && '⭐⭐⭐⭐ Hài lòng, dừa tươi ngon'}
                        {newRating === 3 && '⭐⭐⭐ Bình thường'}
                        {newRating === 2 && '⭐⭐ Chưa hài lòng'}
                        {newRating === 1 && '⭐ Không hài lòng'}
                      </span>
                    </div>
                  </div>

                  {/* Họ tên và Tỉnh/Thành phố */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        2. Họ và tên của bạn: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        placeholder="Ví dụ: Chị Lan, Anh Tuấn..."
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b7e28]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        3. Tỉnh / Thành phố:
                      </label>
                      <input
                        type="text"
                        value={newReviewerLocation}
                        onChange={(e) => setNewReviewerLocation(e.target.value)}
                        placeholder="Ví dụ: Vĩnh Long, TP.HCM, Hà Nội..."
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b7e28]"
                      />
                    </div>
                  </div>

                  {/* Nhập nội dung đánh giá */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      4. Cảm nhận thực tế của bạn về sản phẩm: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Chia sẻ về độ ngọt tự nhiên, nước dừa, cơm dừa sáp, cách đóng gói bảo quản hoặc tốc độ giao hàng của HTX..."
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b7e28] leading-relaxed"
                    />
                  </div>

                  {/* Nút Gửi */}
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="btn-pill-green px-6 py-2.5 text-xs font-bold shadow-md flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>GỬI ĐÁNH GIÁ NGAY</span>
                    </button>
                  </div>
                </form>
              )}

              {/* BỘ LỌC ĐÁNH GIÁ */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 text-xs">
                <span className="font-bold text-gray-500 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Lọc theo:
                </span>
                {[
                  { id: 'all', label: `Tất cả (${allReviewsList.length})` },
                  { id: '5', label: `5 Sao (${allReviewsList.filter(r => r.rating === 5).length})` },
                  { id: '4', label: `4 Sao (${allReviewsList.filter(r => r.rating === 4).length})` },
                  { id: 'verified', label: `Đã mua hàng (${allReviewsList.filter(r => r.verified).length})` }
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setReviewFilter(f.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
                      reviewFilter === f.id
                        ? 'bg-[#3b7e28] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* DANH SÁCH REVIEW CHI TIẾT */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-8 text-xs text-gray-500">
                    Chưa có đánh giá nào phù hợp với bộ lọc này.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className={`p-4 rounded-xl border transition ${
                        rev.isUserGenerated 
                          ? 'bg-amber-50/40 border-amber-200' 
                          : 'bg-white border-gray-100 hover:border-gray-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Avatar & Thông tin tác giả */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3b7e28] to-emerald-400 text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                            {rev.name ? rev.name.charAt(0).toUpperCase() : 'K'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-xs sm:text-sm">
                                {rev.name}
                              </span>
                              {rev.verified && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                  <Check className="w-3 h-3" /> Đã mua hàng tại HTX
                                </span>
                              )}
                              {rev.isUserGenerated && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                                  ★ Đánh giá của bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400 block mt-0.5">
                              {rev.location ? `${rev.location} • ` : ''}{rev.date}
                            </span>
                          </div>
                        </div>

                        {/* Điểm số sao */}
                        <div className="flex items-center text-amber-400 shrink-0">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Nội dung nhận xét */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-3 pl-12">
                        {rev.comment}
                      </p>

                      {/* Phản hồi chính thức của HTX */}
                      {rev.reply && (
                        <div className="mt-3 ml-12 p-3 rounded-xl bg-gray-50 border-l-4 border-[#3b7e28] text-xs text-gray-600">
                          <span className="font-bold text-[#0f4c3a] block mb-1">
                            🌿 Phản hồi từ Hợp tác xã Dừa Song Phú:
                          </span>
                          <p>{rev.reply}</p>
                        </div>
                      )}

                      {/* Nút bấm hữu ích */}
                      <div className="mt-3 pl-12 flex items-center gap-4 text-xs text-gray-400">
                        <button
                          type="button"
                          onClick={() => handleToggleHelpful(rev.id)}
                          className={`inline-flex items-center gap-1 text-[11px] transition ${
                            helpfulMap[rev.id] 
                              ? 'text-[#3b7e28] font-bold' 
                              : 'text-gray-400 hover:text-gray-700'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${helpfulMap[rev.id] ? 'fill-current' : ''}`} />
                          <span>Hữu ích ({rev.helpful + (helpfulMap[rev.id] ? 1 : 0)})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
