# 🥥 HỢP TÁC XÃ DỪA SONG PHÚ (SOCOOP TAM BÌNH - VĨNH LONG)
> Ứng dụng web React 18 & Tailwind CSS giới thiệu **Hợp tác xã Dừa Song Phú** theo phong cách tương tự [Hợp tác xã Thanh Bình](https://hoptacxathanhbinh.com/). Kiến trúc **Component dùng chung** (Reusable Components), tạo lập **sản phẩm dừa AI sáng tạo** và tích hợp các **công nghệ số đột phá**.

---

## ⚡ 1. Công Nghệ Sử Dụng
* **Framework**: React 18 + Vite 5 (Hot Module Replacement)
* **Styling**: Tailwind CSS 3.4 + Custom organic design system
* **Icons**: Lucide React Icons
* **Kiến trúc**: Component-based (Dùng chung & tái sử dụng tối đa)

---

## 🚀 2. Điểm Sáng Tạo & Đột Phá
1. **Trợ Lý Ảo Nông Nghiệp & Dừa Xanh (AI CoCo Assistant)**:
   - Tích hợp widget chatbox AI thông minh góc màn hình (`AICoCoAssistant.jsx`).
   - Tự động giải đáp công dụng dầu dừa ép lạnh ly tâm, mật hoa dừa cho người ăn kiêng, hướng dẫn tra cứu nguồn gốc và chính sách mua sỉ.
2. **Hệ Thống Truy Xuất Nguồn Gốc Số Blockchain (Digital Traceability)**:
   - Tra cứu trực quan theo mã lô hàng (`SP-DXL-2026-01`, `SP-DDL-2026-03`, `SP-MHD-2026-02`).
   - Hiển thị nông hộ phụ trách, thửa đất tại Tam Bình, ngày thu hoạch, chứng nhận VietGAP và kết quả kiểm nghiệm phòng Lab vi sinh Pasteur.
3. **Mô Hình Kinh Tế Tuần Hoàn 100% Cây Dừa (Zero-Waste Flowchart)**:
   - Bản đồ tương tác nhấp vào từng bộ phận: Cơm dừa (28%), Nước dừa (25%), Gáo dừa (15%), Xơ dừa (30%), Búp hoa dừa (2%).
   - Tăng giá trị gia tăng gấp 4.5 lần so với bán dừa trái thô.
4. **Tham Quan Ảo Vườn Dừa Sinh Thái 360° (Eco-Farm Virtual Tour)**:
   - Khám phá tour du lịch nông nghiệp bơi xuồng ba lá ven rạch dừa mát rượi tại Tam Bình.
5. **Giỏ Hàng Trượt Mini Cart & Kênh B2B Xuất Khẩu**:
   - Giỏ hàng trượt Drawer, tăng giảm số lượng, lưu trữ giỏ hàng, kết nối đặt nhanh qua Zalo HTX và form báo giá xuất khẩu container.

---

## 📦 3. Danh Mục Sản Phẩm Đổi Mới Sáng Tạo (AI Products)
1. **Dừa Xiêm Lửa Song Phú Gọt Kim Cương** (OCOP 4 Sao, bọc màng sinh học, kèm ống hút cỏ).
2. **Dầu Dừa Nguyên Chất Ép Lạnh Ly Tâm 3 Pha** (Giữ > 51.8% Axit Lauric tự nhiên, không gia nhiệt).
3. **Mật Hoa Dừa Song Phú Cô Đặc Lên Men** (Chỉ số đường huyết thấp GI ~ 38, dồi dào khoáng chất).
4. **Dừa Sáp Cấy Phôi Tam Bình Thượng Hạng** (Cơm dày xốp dẻo như kem, nước kẹo sền sệt béo bùi).
5. **Than Hoạt Tính Gáo Dừa Lọc Nước & Khử Mùi** (Hoạt hóa hơi nước 900°C, Iodine > 950 mg/g).
6. **Viên Nén Giá Thể Mụn Dừa Sinh Học Trichoderma** (Rửa sạch chát, nén nở x5 lần trồng rau sạch).
7. **Bộ Bát & Thìa Gáo Dừa Mỹ Nghệ Khắc Nam Bộ** (Thủ công mỹ nghệ xuất khẩu Âu - Mỹ).
8. **Xà Phòng Sinh Học Dầu Dừa & Cám Gạo Sông Măng** (Dưỡng ẩm, bọt mịn kháng khuẩn thiên nhiên).

---

## 🧱 4. Cấu Trúc React Component Dùng Chung
```
htx/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.jsx                     # Entry point React 18
│   ├── App.jsx                      # App component điều phối State giỏ hàng, modal, search
│   ├── index.css                    # Tailwind CSS directives & Organic theme
│   ├── data/
│   │   └── coopData.js              # Dữ liệu HTX, sản phẩm, truy xuất, tri thức AI
│   └── components/
│       ├── Navbar.jsx               # Header điều hướng đa cấp, topbar & hotline
│       ├── HeroSlider.jsx           # Banner Carousel tự động chuyển slide
│       ├── AboutSection.jsx         # Giới thiệu HTX & video tour modal
│       ├── WhyChooseUs.jsx          # 4 trụ cột giá trị khác biệt
│       ├── ZeroWasteDiagram.jsx     # Sơ đồ kinh tế tuần hoàn tương tác
│       ├── ProductCard.jsx          # Thẻ sản phẩm dùng chung (Reusable Product Card)
│       ├── ProductSection.jsx       # Danh mục sản phẩm, bộ lọc tab & live search
│       ├── TraceabilitySection.jsx  # Cổng tra cứu nguồn gốc số & mã QR
│       ├── EcoTourSection.jsx       # Tour tham quan vườn dừa Tam Bình
│       ├── ProductionGallery.jsx    # Album hình ảnh thực tế xưởng & xã viên kèm lightbox
│       ├── NewsSection.jsx          # Tin tức & cẩm nang nông nghiệp
│       ├── B2BExportSection.jsx     # Báo giá sỉ cho đối tác doanh nghiệp
│       ├── CartDrawer.jsx           # Giỏ hàng trượt Drawer mini cart
│       ├── ProductModal.jsx         # Modal xem chi tiết sản phẩm chuẩn E-commerce
│       ├── AICoCoAssistant.jsx      # Trợ lý ảo AI CoCo tương tác thông minh
│       └── Footer.jsx               # Chân trang thông tin pháp lý & liên hệ
└── dist/                            # Bản Production Build sẵn sàng triển khai
```

---

## 💻 5. Hướng Dẫn Chạy Dự Án
### Chế độ phát triển (Development):
```bash
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:3000` (hỗ trợ Hot-Reload tức thì).

### Đóng gói triển khai (Production Build):
```bash
npm run build
```
Kết quả build được xuất ra thư mục `dist/`.

### Xem trước bản build:
```bash
npm run preview
```
