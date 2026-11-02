import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  CheckCircle2,
  Tag,
  ChevronRight,
  Eye,
  ThumbsUp,
  ShieldCheck,
  Award,
  FileText,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ArticleDetailPage({
  article,
  allArticles = [],
  onBack,
  onSelectArticle,
  onExploreProducts,
  onContactClick,
  showToast
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [copied, setCopied] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(false);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-gray-500 mb-4">Không tìm thấy nội dung bài viết yêu cầu.</p>
        <button
          onClick={onBack}
          className="btn-pill-green px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
      </div>
    );
  }

  const isCert = Boolean(article.code || article.category === 'Chứng nhận');
  const title = article.title || 'Thông tin từ HTX Dừa Song Phú';
  const category = isCert ? 'Chứng nhận' : (article.category || 'Bộ Sưu Tập');
  const date = article.date || 'August 7, 2026';
  const author = article.author || 'Ban Truyền Thông & Kỹ Thuật SOCOOP';
  const readTime = article.readTime || '4 phút đọc';
  const image = article.image || './products/diamond-coconut.jpg';

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      if (showToast) showToast('Cảm ơn bạn đã yêu thích bài viết!');
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (showToast) showToast('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Lọc danh sách bài viết liên quan (loại trừ bài hiện tại)
  const relatedList = (allArticles || [])
    .filter((a) => (a.id && a.id !== article.id) || (a.code && a.code !== article.code))
    .slice(0, 3);

  // Nội dung phong phú mặc định nếu chưa có cấu trúc riêng
  const defaultParagraphs = [
    article.desc || 'Hợp tác xã Dừa Song Phú cam kết mang đến những giá trị nông sản sạch, an toàn và bền vững nhất.',
    'Nằm tại vị trí đắc địa ven dòng sông Măng Thít trù phú, xã Song Phú, tỉnh Vĩnh Long được thiên nhiên ưu đãi lượng phù sa dồi dào quanh năm. Đây là điều kiện lý tưởng để cây dừa xiêm, dừa sáp và các dòng dừa đặc sản tích lũy độ ngọt thanh khiết, lượng khoáng chất vượt trội so với các vùng trồng khác.',
    'Nhằm đáp ứng các yêu cầu khắt khe của thị trường quốc tế, HTX Dừa Song Phú đã tiên phong áp dụng quy trình canh tác hữu cơ theo định hướng kinh tế tuần hoàn Zero-Waste (không rác thải). Mọi bộ phận của cây dừa từ nước dừa, cơm dừa, gáo dừa đến chỉ xơ dừa đều được sơ chế và tinh luyện thành các sản phẩm có giá trị gia tăng cao.',
    'Thông qua liên kết chuỗi giá trị bền vững cùng hơn 120 hộ nông dân thành viên, SOCOOP không chỉ giải quyết bài toán tiêu thụ nông sản ổn định mà còn nâng tầm vị thế dừa Vĩnh Long trên bản đồ xuất khẩu thế giới.'
  ];

  const contentParagraphs = Array.isArray(article.content) ? article.content : defaultParagraphs;

  return (
    <article className="bg-[#fbfbfb] min-h-screen py-8 sm:py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* BREADCRUMB & BACK BUTTON */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-200/80 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <button
              onClick={() => onBack && onBack('home')}
              className="hover:text-[#2e6b27] transition shrink-0"
            >
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button
              onClick={() => onBack && onBack(isCert ? 'certifications' : 'collections')}
              className="hover:text-[#2e6b27] transition text-[#3b8224] font-medium shrink-0"
            >
              {isCert ? 'Chứng nhận' : 'Bộ Sưu Tập'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-700 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {title}
            </span>
          </nav>

          <button
            onClick={() => onBack && onBack(isCert ? 'certifications' : 'collections')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#4fa32d] bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm transition hover:shadow"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh mục</span>
          </button>
        </div>

        {/* MAIN ARTICLE HEADER */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#eef7e9] text-[#2e6b27] border border-[#d2ebc5]">
              {category}
            </span>
            {article.code && (
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Mã: {article.code}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0f4c3a] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                SO
              </div>
              <div>
                <p className="font-bold text-gray-800">{author}</p>
                <p className="text-[11px] text-gray-400">Hợp tác xã Dừa Song Phú (SOCOOP)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition ${
                  liked
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
                title="Yêu thích bài viết"
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#2e6b27] text-xs font-semibold shadow-sm transition"
                title="Sao chép liên kết"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép link' : 'Chia sẻ'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* HERO IMAGE BANNER */}
        <div className="mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white group">
            <img
              src={image}
              alt={title}
              className={`w-full ${isCert ? 'max-h-[500px] object-contain p-4 bg-gray-50' : 'aspect-[16/10] sm:aspect-[21/9] object-cover'} group-hover:scale-102 transition-transform duration-500`}
            />

            {isCert && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md border border-green-200 flex items-center gap-1.5 text-xs font-bold text-[#0f4c3a]">
                <ShieldCheck className="w-4 h-4 text-[#3b8224]" />
                <span>Văn Bằng Chứng Nhận Chính Thức</span>
              </div>
            )}
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-2.5 italic">
            {isCert
              ? `Hình ảnh chứng từ kiểm định / văn bằng chính thức mã số ${article.code || 'SOCOOP'}`
              : `Nguồn ảnh tư liệu thực tế tại vùng nguyên liệu & nhà xưởng HTX Dừa Song Phú`}
          </p>
        </div>

        {/* LEAD HIGHLIGHT / TÓM TẮT MỞ ĐẦU */}
        {article.desc && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#eef7e9] to-[#f4faf0] border-l-4 border-[#4fa32d] shadow-sm">
            <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed italic">
              "{article.desc}"
            </p>
          </div>
        )}

        {/* CHỨNG NHẬN: BẢNG THÔNG SỐ VĂN BẰNG NẾU LÀ CERTIFICATION */}
        {isCert && (
          <div className="mb-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#0f4c3a]">
              <Award className="w-5 h-5 text-[#3b8224]" />
              <h2 className="font-bold text-base uppercase tracking-wide">
                Hồ Sơ Pháp Lý & Thẩm Định Chất Lượng
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block mb-0.5 font-medium">Tên văn bằng / Tiêu chuẩn</span>
                <span className="font-bold text-gray-800 text-sm">{title}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block mb-0.5 font-medium">Số hiệu đăng ký</span>
                <span className="font-mono font-bold text-[#2e6b27] text-sm">{article.code || 'VN-SOCOOP-2026'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block mb-0.5 font-medium">Cơ quan thẩm quyền cấp</span>
                <span className="font-semibold text-gray-800">
                  {article.issuer || 'Chi cục Trồng trọt & Bảo vệ Thực vật / Tổ chức kiểm định quốc tế'}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block mb-0.5 font-medium">Phạm vi áp dụng</span>
                <span className="font-semibold text-gray-800">
                  {article.scope || 'Toàn bộ vùng nguyên liệu dừa xã Song Phú & cơ sở chế biến sâu SOCOOP'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tình trạng: Có hiệu lực chính thức</span>
              </span>
              <span className="text-gray-400">Thời hạn: 2024 - 2029</span>
            </div>
          </div>
        )}

        {/* DETAILED BODY CONTENT */}
        <section className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-5 mb-10">
          {contentParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-[15px] leading-relaxed text-gray-700 text-justify">
              {paragraph}
            </p>
          ))}

          {/* HIGHLIGHT CAM KẾT */}
          <div className="my-8 p-6 bg-white rounded-2xl border border-[#d2ebc5] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#4fa32d]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#3b8224] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                  Cam Kết Chất Lượng Từ Ban Giám Đốc HTX Dừa Song Phú
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                  Tất cả sản phẩm và quy trình công bố đều được thực hiện theo nguyên tắc minh bạch, trung thực, tôn trọng môi trường sinh thái và đảm bảo quyền lợi tốt nhất cho người tiêu dùng và bà con nông dân.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4fa32d]" />
                    <span>100% không chất bảo quản tổng hợp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4fa32d]" />
                    <span>Nguồn gốc xuất xứ rõ ràng qua mã QR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4fa32d]" />
                    <span>Đạt chuẩn VietGAP / OCOP 4 sao</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4fa32d]" />
                    <span>Hỗ trợ bao tiêu đầu ra cho xã viên</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TAGS & SHARING BAR */}
        <div className="py-6 border-t border-b border-gray-200/80 mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400 font-medium">Từ khóa:</span>
            {['Dừa Song Phú', 'OCOP Vĩnh Long', 'Nông sản sạch', 'Kinh tế tuần hoàn'].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition text-[11px]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 btn-pill-green px-4 py-2 text-xs font-bold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ bài viết</span>
            </button>
          </div>
        </div>

        {/* CTA BANNER: TRẢI NGHIỆM SẢN PHẨM HOẶC LIÊN HỆ */}
        <div className="mb-14 rounded-2xl bg-gradient-to-r from-[#0f4c3a] to-[#1e6f5c] text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">
              Trải nghiệm thực tế
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Khám phá các sản phẩm từ vùng dừa sạch Song Phú
            </h3>
            <p className="text-xs text-emerald-100 max-w-md">
              Thưởng thức nước dừa tươi ngọt thanh, dừa sáp béo ngậy và các dòng sản phẩm chế biến sâu đạt chuẩn OCOP 4 sao.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onExploreProducts}
              className="btn-pill-green px-5 py-2.5 text-xs font-bold shadow-md hover:scale-105 transition"
            >
              Xem Sản Phẩm
            </button>
            <button
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-full border border-white/40 hover:bg-white/10 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Liên Hệ Báo Giá</span>
            </button>
          </div>
        </div>

        {/* RELATED ARTICLES (BÀI VIẾT LIÊN QUAN) */}
        {relatedList.length > 0 && (
          <section className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 uppercase">
                Bài Viết & Thông Tin Liên Quan
              </h2>
              <button
                onClick={() => onBack && onBack(isCert ? 'certifications' : 'collections')}
                className="text-xs font-bold text-[#4fa32d] hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedList.map((item) => (
                <div
                  key={item.id || item.code}
                  onClick={() => onSelectArticle && onSelectArticle(item)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1.5">
                        <span>{item.date || 'August 2026'}</span>
                        <span className="text-[#3b8224] font-semibold">{item.category || 'Bộ Sưu Tập'}</span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-800 uppercase line-clamp-2 leading-snug group-hover:text-[#2e6b27] transition mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4fa32d] group-hover:underline uppercase">
                      <span>ĐỌC TIẾP</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
