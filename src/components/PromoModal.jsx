import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Tag, Gift } from 'lucide-react';

export default function PromoModal({
  isOpen,
  onClose,
  onApplyVoucher,
  onExploreProducts,
}) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  if (!isOpen) return null;

  const handleCopy = (code) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleDismiss = () => {
    if (dontShowAgain && typeof localStorage !== 'undefined') {
      // Don't show again for 24 hours
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('socoop_promo_dismissed_until', String(expiry));
    }
    onClose();
  };

  const handleAction = (code) => {
    if (onApplyVoucher) {
      onApplyVoucher(code);
    }
    if (onExploreProducts) {
      onExploreProducts();
    }
    handleDismiss();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      <div 
        className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 flex flex-col md:flex-row transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút Đóng Modal */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-md transition"
          aria-label="Đóng popup khuyến mãi"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cột Trái: Banner Hình Ảnh Nông Sản OCOP (Desktop) / Header (Mobile) */}
        <div className="relative md:w-5/12 bg-gradient-to-br from-[#0f4c3a] to-[#26532b] text-white p-6 flex flex-col justify-between overflow-hidden">
          {/* Background image mờ sang trọng */}
          <img
            src="./products/diamond-coconut.jpg"
            alt="Dừa xiêm gọt kim cương OCOP 4 sao"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
          />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider shadow">
              <Sparkles className="w-3 h-3" />
              OCOP 4 SAO VĨNH LONG
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              Đặc Sản Dừa Tam Bình
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Trực tiếp từ vùng bãi bồi sông Măng Thít trù phú.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[11px] text-emerald-200 block uppercase font-bold tracking-wider">
                Ưu Đãi Vụ Mùa
              </span>
              <span className="text-3xl font-extrabold text-amber-300 font-serif">
                GIẢM 10%
              </span>
              <span className="text-[11px] text-white/90 block mt-0.5">
                Toàn bộ đơn hàng trực tuyến
              </span>
            </div>
          </div>
        </div>

        {/* Cột Phải: Nội Dung Chi Tiết & Mã Khuyến Mãi */}
        <div className="md:w-7/12 p-5 sm:p-7 flex flex-col justify-between space-y-4 bg-white">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b7e28] mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT</span>
            </div>

            <h2 id="promo-title" className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
              Thưởng Thức Dừa Song Phú <br className="hidden sm:inline" />
              <span className="text-[#3b7e28]">Tươi Ngọt Tận Vườn</span>
            </h2>

            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Nhập mã ưu đãi độc quyền để nhận ngay chiết khấu trực tiếp và trải nghiệm dừa sạch chuẩn OCOP.
            </p>
          </div>

          {/* Hộp Mã Giảm Giá SOCOOP10 */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#f4f7f2] to-[#eef7e9] border border-[#d6e8cb] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0f4c3a] flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-[#3b7e28]" />
                Mã giảm 10% đơn hàng:
              </span>
              <span className="text-[10px] text-gray-500">HSD: Áp dụng hôm nay</span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-dashed border-[#3b7e28]">
              <span className="font-mono text-base font-extrabold text-[#3b7e28] tracking-wider">
                SOCOOP10
              </span>
              <button
                type="button"
                onClick={() => handleCopy('SOCOOP10')}
                className="px-3 py-1 rounded-lg bg-[#eef7e9] hover:bg-[#d6e8cb] text-[#2d681c] text-xs font-bold transition flex items-center gap-1 shrink-0"
              >
                {copiedCode === 'SOCOOP10' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
              <span>Hoặc mã <b>FREESHIP</b> (Đơn từ 200k)</span>
              <button
                type="button"
                onClick={() => handleCopy('FREESHIP')}
                className="text-[#3b7e28] font-bold hover:underline"
              >
                {copiedCode === 'FREESHIP' ? '✓ Đã chép' : 'Chép mã ship'}
              </button>
            </div>
          </div>

          {/* Cam kết chất lượng */}
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3b7e28] shrink-0" />
              <span>Dừa xiêm kim cương, dừa sáp thu hái trực tiếp trong ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3b7e28] shrink-0" />
              <span>Đóng thùng lạnh bảo quản chuẩn xuất khẩu giao toàn quốc</span>
            </div>
          </div>

          {/* Nút Kêu Gọi Hành Động (CTA) */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => handleAction('SOCOOP10')}
              className="w-full btn-pill-green py-3 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <span>ÁP DỤNG MÃ &amp; MUA NGAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Checkbox Không Hiện Lại Hôm Nay */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-gray-600">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded border-gray-300 text-[#3b7e28] focus:ring-[#3b7e28] w-3.5 h-3.5"
                />
                <span>Không hiển thị lại hôm nay</span>
              </label>

              <button
                type="button"
                onClick={handleDismiss}
                className="hover:underline text-gray-400 hover:text-gray-600"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
