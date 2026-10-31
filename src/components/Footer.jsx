import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ coopInfo, onNavClick }) {
  return (
    <footer className="relative bg-[#0f4c3a] text-white font-sans overflow-hidden" id="contact">
      {/* DẢI HÌNH NỀN NÚI RỪNG & RẶNG DỪA PHÍA TRÊN FOOTER CHUẨN XÁC 100% CỦA 5 ẢNH CHỤP */}
      <div className="footer-mountain-bg w-full flex items-end">
        <div className="w-full bg-gradient-to-t from-[#0f4c3a] to-transparent h-24" />
      </div>

      {/* 4 Cột Widget Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-xs">
          {/* Cột 1: Về chúng tôi */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              VỀ CHÚNG TÔI
            </h4>
            <p className="text-gray-200 leading-relaxed">
              <b>{coopInfo.englishName}</b> Cam kết luôn đảm bảo chất lượng sản phẩm
            </p>
            <div className="space-y-2.5 pt-1 text-gray-300">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#4fa32d] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{coopInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#4fa32d] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Hotline: {coopInfo.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#4fa32d] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>Email: {coopInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              LIÊN KẾT NHANH
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onNavClick('home')} className="hover:text-[#4fa32d] transition">Trang chủ</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-[#4fa32d] transition">Giỏ hàng</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-[#4fa32d] transition">Sản phẩm</button></li>
              <li><button onClick={() => onNavClick('about')} className="hover:text-[#4fa32d] transition">Tài khoản</button></li>
              <li><button onClick={() => onNavClick('contact')} className="hover:text-[#4fa32d] transition">Thanh toán</button></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onNavClick('home')} className="hover:text-[#4fa32d] transition">Trang chủ</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-[#4fa32d] transition">Giỏ hàng</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-[#4fa32d] transition">Sản phẩm</button></li>
              <li><button onClick={() => onNavClick('about')} className="hover:text-[#4fa32d] transition">Tài khoản</button></li>
              <li><button onClick={() => onNavClick('contact')} className="hover:text-[#4fa32d] transition">Thanh toán</button></li>
            </ul>
          </div>

          {/* Cột 4: Facebook Fanpage */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              FACEBOOK
            </h4>
            {/* Box mô phỏng Facebook Page Widget như trong ảnh */}
            <div className="bg-white rounded-lg p-3 text-gray-800 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-lg">
                  f
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900 leading-tight">HTX Dừa Song Phú</h5>
                  <span className="text-[10px] text-gray-500">12.580 người theo dõi</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={coopInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded bg-[#f0f2f5] hover:bg-[#e4e6eb] text-[11px] font-bold text-[#1877f2] flex items-center gap-1"
                >
                  <span>Thích Trang</span>
                </a>
                <span className="text-[10px] text-gray-400">Chia sẻ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh Dưới Cùng: Copyright & Terms/FAQ chuẩn 100% Ảnh 1-5 */}
      <div className="border-t border-emerald-900/60 bg-[#0b3b2c] py-3.5 text-[11px] text-gray-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            Copyright &copy; 2026 <b>{coopInfo.name}</b>. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavClick('about')} className="hover:text-white transition">Terms</button>
            <span>/</span>
            <button onClick={() => onNavClick('about')} className="hover:text-white transition">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
