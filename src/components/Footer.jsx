import React from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Facebook, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ coopInfo, onNavClick }) {
  return (
    <footer className="relative bg-[#0f4c3a] text-white font-sans overflow-hidden" id="contact">
      {/* DẢI HÌNH NỀN RẶNG DỪA & NÚI RỪNG THANH THOÁT PHÍA TRÊN FOOTER */}
      <div className="footer-mountain-bg w-full flex items-end">
        <div className="w-full bg-gradient-to-t from-[#0f4c3a] to-transparent h-12" />
      </div>

      {/* 4 Cột Widget Footer */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          
          {/* Cột 1: Về chúng tôi (4 Cột) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span>VỀ CHÚNG TÔI</span>
            </h4>
            <p className="text-emerald-100/90 leading-relaxed font-medium">
              <b>{coopInfo.englishName}</b> — Tiên phong liên kết nông hộ canh tác dừa sinh thái VietGAP, nâng cao giá trị chuỗi nông sản OCOP tỉnh Vĩnh Long.
            </p>
            <div className="space-y-2.5 pt-1 text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#3b7e28] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug">{coopInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#3b7e28] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Hotline tư vấn: <b className="text-white font-mono">{coopInfo.phoneDisplay}</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#3b7e28] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>Email: <span className="font-mono text-emerald-200">{coopInfo.email}</span></span>
              </div>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh (2.5 Cột) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              LIÊN KẾT NHANH
            </h4>
            <ul className="space-y-2.5 text-emerald-100/80 font-medium">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Giới thiệu HTX
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('products')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Danh mục sản phẩm
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('collections')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Bộ sưu tập &amp; Tin tức
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('certifications')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Bằng khen chứng nhận
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng (2.5 Cột) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="space-y-2.5 text-emerald-100/80 font-medium">
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Chính sách giao hàng hỏa tốc
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Đổi trả &amp; Hoàn tiền 100%
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Tra cứu nguồn gốc tem Blockchain
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('certifications')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Tiêu chuẩn VietGAP &amp; OCOP 4★
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('products')} className="hover:text-[#88d957] transition flex items-center gap-1">
                  <span>›</span> Hướng dẫn đặt hàng trực tuyến
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Facebook Fanpage & Kết nối (3 Cột) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              KẾT NỐI CỘNG ĐỒNG
            </h4>
            
            {/* Box Fanpage thiết kế chuẩn màu sắc xanh đồng bộ, sang trọng */}
            <div className="bg-[#0b382b]/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                  <Facebook className="w-5 h-5 fill-current" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-white leading-tight truncate flex items-center gap-1">
                    HTX Dừa Song Phú
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 inline" />
                  </h5>
                  <span className="text-[10px] text-emerald-300 block">12.580 người theo dõi</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[11px]">
                <a
                  href={coopInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold inline-flex items-center gap-1 transition shadow-sm"
                >
                  <span>Thích Trang</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-emerald-300/80 text-[10px]">Cộng đồng nông sản sạch</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-900 text-[11px] text-emerald-200/90 leading-relaxed flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#88d957] shrink-0" />
              <span>Sản phẩm kiểm định an toàn 100% không hóa chất.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Thanh Dưới Cùng: Copyright & Terms/FAQ chuẩn 100% Ảnh 1-5 */}
      <div className="border-t border-emerald-900/80 bg-[#082b21] py-3.5 text-[11px] text-emerald-200/70">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            Copyright &copy; 2026 <b>{coopInfo.name}</b>. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavClick('about')} className="hover:text-white transition">Chính sách &amp; Điều khoản</button>
            <span>/</span>
            <button onClick={() => onNavClick('about')} className="hover:text-white transition">Hỏi đáp (FAQ)</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
