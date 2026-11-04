import React from 'react';

export default function AboutPage({ coopInfo, onWatchVideo }) {
  return (
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Title & Breadcrumb chuẩn Ảnh 2 */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            GIỚI THIỆU
          </h1>
          <p className="text-xs text-gray-400">
            Trang chủ &nbsp;/&nbsp; <span className="text-[#3b8224] font-medium">Giới thiệu</span>
          </p>
        </div>

        {/* Tiêu đề in hoa đậm */}
        <h2 className="text-xl sm:text-2xl font-black text-center text-gray-900 uppercase tracking-tight mb-8">
          HỢP TÁC XÃ DỪA SONG PHÚ – SONG PHU COOPERATIVE
        </h2>

        {/* Nội dung giới thiệu dạng gạch đầu dòng chuẩn Ảnh 2 */}
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-4xl mx-auto">
          <p className="font-semibold text-gray-900">
            Hợp tác xã Song Phú (SONG PHU COOP) được thành lập với tôn chỉ:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-600 pl-2">
            <li>Là một nhóm gồm hơn 165 thành viên chuyên canh trồng dừa xiêm, dừa sáp và các loại cây ăn trái đặc sản bãi bồi Tam Bình.</li>
            <li>Cơ sở sản xuất của Song Phu Coop đạt tiêu chuẩn Nông trại được chứng nhận VietGAP, HACCP và ISO 22000:2018.</li>
            <li>Song Phu Coop tham gia vào các hoạt động từ nuôi trồng, thu hoạch, xử lý sau thu hoạch, phân loại, đóng gói, kinh doanh và xuất khẩu các loại sản phẩm từ dừa: dừa tươi, dầu dừa ly tâm, mật hoa dừa, than gáo dừa, giá thể xơ dừa, v.v.</li>
            <li>Song Phu Coop cung ứng nông sản sạch, lành mạnh và an toàn cho người tiêu dùng.</li>
            <li>Song Phu Coop đại diện cho lợi ích của các thành viên nông dân đối với các cơ quan quản lý và các tổ chức đối tác quốc tế.</li>
            <li>Tổ chức các khóa đào tạo, tập huấn định kỳ để đảm bảo tất cả các thành viên của HTX đều được cập nhật kỹ thuật tiên tiến trong trồng trọt, bảo vệ thực vật sinh học và sản xuất theo tiêu chuẩn quốc tế.</li>
            <li>Hướng tới việc bảo tồn nguồn gen các giống dừa bản địa quý hiếm của vùng đất Nam Bộ.</li>
            <li>Đại diện kinh doanh của Song Phu Coop tham gia các hoạt động gặp gỡ khách hàng, cập nhật nhu cầu và ký kết hợp đồng cung ứng nông sản ổn định lâu dài.</li>
            <li>Chúng tôi đang tìm kiếm các nhà nhập khẩu, phân phối trên toàn thế giới, đặc biệt là thị trường Châu Á, Châu Âu và Bắc Mỹ.</li>
          </ul>
        </div>

        {/* Khối Video Showcase Giới Thiệu HTX OCOP 4 Sao */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 group">
            <img
              src="./videos/video-poster.jpg"
              alt="Video Giới thiệu HTX Dừa Song Phú"
              className="w-full h-64 sm:h-80 md:h-96 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4fa32d] text-white shadow-md flex items-center gap-1.5">
                  ★ THƯỚC PHIM GIỚI THIỆU HTX
                </span>
                <span className="text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  Thời lượng: 0:52 • Lồng tiếng AI & HD 720p
                </span>
              </div>

              <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-white drop-shadow uppercase tracking-wide">
                    Hành trình Nông sản Xanh Song Phú
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl">
                    Từ rạch phù sa sông Măng Thít đến các sản phẩm dừa xiêm, dầu dừa ly tâm và mật hoa dừa đạt chuẩn OCOP 4 sao tỉnh Vĩnh Long.
                  </p>
                </div>
                <button
                  onClick={onWatchVideo}
                  className="flex-shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#4fa32d] hover:bg-[#3d8323] text-white font-bold text-sm shadow-xl transform hover:scale-105 transition-all group"
                  title="Nhấn để phát video"
                >
                  <span className="w-8 h-8 rounded-full bg-white text-[#4fa32d] flex items-center justify-center font-black shadow-inner">
                    ▶
                  </span>
                  <span>XEM VIDEO</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Khối Giới Thiệu & Giấy Chứng Nhận Đăng Ký Quyền Tác Giả / Nhãn Hiệu (Chuẩn Ảnh 2) */}
        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              Chúng tôi bắt đầu nghề trồng dừa từ nhiều năm trước đây, với quy mô là những hộ gia đình cùng nhau sản xuất và chuyên canh dừa tại vùng đất Song Phú màu mỡ này. Trải qua rất nhiều giai đoạn thăng trầm trong nghề nông truyền thống.
            </p>
            <p>
              Sau thời gian dài với những kinh nghiệm từ thực tiễn và sự tiến bộ của khoa học cũng như kinh tế xã hội. Chúng tôi đã quyết định thành lập nên hợp tác xã <b>SONG PHU COOP</b>.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Giấy chứng nhận Logo thương hiệu như Ảnh 2 */}
            <div className="w-64 p-4 border border-gray-200 rounded-xl shadow-md bg-white text-center">
              <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 15 C30 35 25 65 50 85 C75 65 70 35 50 15 Z" fill="#7bc144" />
                  <path d="M40 30 C25 50 30 75 50 85 C40 70 40 45 40 30 Z" fill="#2d7f36" />
                  <circle cx="50" cy="50" r="10" fill="#facc15" />
                </svg>
              </div>
              <h4 className="font-black text-sm text-[#0f4c3a]">SOCOOP FARM</h4>
              <p className="text-[10px] text-gray-400 mt-1">Biểu tượng thương hiệu đã đăng ký bản quyền</p>
            </div>
          </div>
        </div>

        {/* Khối Giấy Chứng Nhận Đăng Ký Quyền Tác Giả (như Ảnh 2) */}
        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-72 p-3 border-2 border-amber-200 rounded-xl shadow-lg bg-[#fffdf7]">
              <div className="p-3 border border-dashed border-amber-400 rounded text-center">
                <span className="text-xs font-bold text-red-700 block uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                <span className="text-[9px] text-gray-600 block mb-2">Độc lập - Tự do - Hạnh phúc</span>
                <div className="w-8 h-8 rounded-full bg-red-700 text-amber-300 mx-auto flex items-center justify-center text-xs font-bold mb-2">★</div>
                <h5 className="font-bold text-xs text-gray-900 uppercase">GIẤY CHỨNG NHẬN ĐĂNG KÝ QUYỀN TÁC GIẢ</h5>
                <p className="text-[10px] text-gray-500 mt-2">Tác phẩm: Nhãn hiệu logo HTX Dừa Song Phú</p>
                <p className="text-[10px] text-gray-500">Chủ sở hữu: Hợp tác xã Dừa Song Phú</p>
                <div className="mt-3 pt-2 border-t border-gray-200 text-[9px] text-red-600 font-bold">
                  CỤC BẢN QUYỀN TÁC GIẢ CHỨNG NHẬN
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed order-1 md:order-2">
            <p>
              Đối với các dự án của chúng tôi, quy mô lớn hay nhỏ không phải là vấn đề then chốt.
            </p>
            <p>
              Vào đầu năm 2018, chúng tôi đã bắt tay vào thực hiện các dự án và không mục tiêu nào trước đó bị coi là quá tầm, mặc dù có những thách thức to lớn và rất nhiều mục tiêu cần hoàn thiện, nhưng tất cả đều cần thiết cho cộng đồng và <b>SONG PHU COOP</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
