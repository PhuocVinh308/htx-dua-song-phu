// Cơ sở dữ liệu và thông tin Hợp tác xã Dừa Song Phú
export const coopData = {
  coopInfo: {
    name: "HỢP TÁC XÃ DỪA SONG PHÚ",
    englishName: "SONG PHU COCONUT COOPERATIVE",
    shortName: "SOCOOP TAM BÌNH",
    slogan: "Tinh hoa dừa đất bãi phù sa - Nông nghiệp tuần hoàn vì tương lai xanh",
    establishedYear: 2018,
    address: "Tổ 19, Ấp Phú Trường Yên, Xã Song Phú, Tỉnh Vĩnh Long, Việt Nam",
    hotline: "0918 268 379 - 0270 386 9988",
    email: "htxduasongphu@gmail.com",
    website: "https://htxduasongphu.vn",
    director: "Kỹ sư Nông nghiệp Nguyễn Văn Hùng",
    taxCode: "1501098866",
    businessLicense: "Số 15/GP-UBND Huyện Tam Bình cấp ngày 12/03/2018",
    workingHours: "Thứ Hai - Thứ Bảy: 07:30 - 17:30 (Chủ nhật làm việc online)",
    socials: {
      facebook: "https://facebook.com/htxduasongphu",
      zalo: "https://zalo.me/0918268379",
      youtube: "https://youtube.com/@htxduasongphu",
      tiktok: "https://tiktok.com/@duasongphu"
    },
    stats: [
      { id: "members", count: "165+", label: "Hộ Xã Viên Liên Kết", icon: "users" },
      { id: "area", count: "350+", label: "Héc-ta Vùng Dừa Chuẩn OCOP & VietGAP", icon: "map" },
      { id: "products", count: "28+", label: "Sản Phẩm Đổi Mới Sáng Tạo Từ Dừa", icon: "package" },
      { id: "output", count: "6.500+", label: "Tấn Thu Hoạch Hàng Năm", icon: "trending-up" },
      { id: "waste", count: "0%", label: "Tỷ Lệ Phát Thải (Kinh Tế Tuần Hoàn)", icon: "recycle" }
    ]
  },

  heroSlides: [
    {
      id: 1,
      tag: "VÙNG NGUYÊN LIỆU ĐẶC SẢN TAM BÌNH",
      title: "HỢP TÁC XÃ DỪA SONG PHÚ",
      subtitle: "HƯƠNG VỊ NGỌT LÀNH TỪ DÒNG PHÙ SA SÔNG MĂNG THÍT",
      desc: "Quy tụ hơn 165 hộ nông dân chuyên canh theo tiêu chuẩn hữu cơ sinh thái, tạo ra những sản phẩm từ dừa đạt chuẩn OCOP 4 sao và tiêu chuẩn xuất khẩu quốc tế.",
      btnText: "Khám Phá Sản Phẩm",
      btnLink: "#products",
      bgImage: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1920&q=80",
      accent: "100% Thuần Tự Nhiên"
    },
    {
      id: 2,
      tag: "CÔNG NGHỆ CHẾ BIẾN SÂU SỐNG XANH",
      title: "CHUỖI GIÁ TRỊ TUẦN HOÀN ZERO-WASTE",
      subtitle: "TẬN DỤNG TRỌN VẸN 100% CÂY DỪA SONG PHÚ",
      desc: "Từ cơm dừa, nước dừa, gáo dừa cho đến vỏ xơ dừa đều được ứng dụng công nghệ ép lạnh ly tâm, than sinh học và giá thể hữu cơ thân thiện tuyệt đối với môi trường.",
      btnText: "Mô Hình Tuần Hoàn",
      btnLink: "#circular-economy",
      bgImage: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?auto=format&fit=crop&w=1920&q=80",
      accent: "Kinh Tế Xanh Bền Vững"
    },
    {
      id: 3,
      tag: "MINH BẠCH - SỐ HOÁ NÔNG SẢN",
      title: "TRUY XUẤT NGUỒN GỐC SỐ THEO TỪNG VƯỜN",
      subtitle: "CAM KẾT CHẤT LƯỢNG ĐẾN TẬN TAY NGƯỜI TIÊU DÙNG",
      desc: "Quét mã QR để xem ngay lý lịch cây dừa, nhật ký bón phân sinh học của từng hộ xã viên tại Xã Song Phú, kết quả kiểm định an toàn và chứng nhận OCOP 4 sao.",
      btnText: "Tra Cứu Lô Hàng",
      btnLink: "#traceability",
      bgImage: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1920&q=80",
      accent: "Chuẩn VietGAP & OCOP"
    }
  ],

  categories: [
    { id: "all", name: "Tất Cả Sản Phẩm", icon: "grid", count: 8 },
    { id: "fresh", name: "Dừa Tươi Đặc Sản", icon: "droplet", count: 2 },
    { id: "oils", name: "Tinh Dầu & Chăm Sóc Sức Khỏe", icon: "sparkles", count: 2 },
    { id: "food", name: "Thực Phẩm & Mật Hoa Dừa", icon: "coffee", count: 2 },
    { id: "craft", name: "Thủ Công Mỹ Nghệ Gáo Dừa", icon: "feather", count: 1 },
    { id: "eco", name: "Nông Nghiệp Xanh & Giá Thể", icon: "sprout", count: 1 }
  ],

  products: [
    {
      id: "SP-01",
      name: "Dừa Xiêm Lửa Song Phú Gọt Kim Cương",
      category: "fresh",
      price: 32000,
      originalPrice: 38000,
      unit: "Trái (hút chân không kèm ống hút cỏ)",
      rating: 4.9,
      reviewsCount: 142,
      isFeatured: true,
      badge: "OCOP 4 SAO",
      badgeColor: "bg-amber-600",
      image: "/products/diamond-coconut.jpg",
      tagline: "Nước ngọt thanh dịu, độ Brix đạt 8.5° - 9.2° tự nhiên",
      shortDesc: "Được tuyển chọn kỹ lưỡng từ các rặng dừa xiêm giống thuần chủng tại ấp Phú Điền, gọt vỏ tạo hình kim cương sang trọng, bảo quản màng bọc sinh học kháng khuẩn.",
      features: [
        "100% nước dừa tươi nguyên chất, không chất bảo quản",
        "Vỏ gọt tinh tế, phù hợp làm quà biếu, sự kiện, nhà hàng cao cấp",
        "Kèm ống hút cỏ sậy phân hủy sinh học thân thiện môi trường",
        "Bảo quản tươi ngon ở nhiệt độ 2°C - 5°C trong 45 ngày"
      ],
      traceBatch: "SP-DXL-2026-01",
      farmerName: "Chú Bảy Nghĩa (Ấp Phú Trường Yên)"
    },
    {
      id: "SP-02",
      name: "Dầu Dừa Nguyên Chất Ép Lạnh Ly Tâm Song Phú",
      category: "oils",
      price: 185000,
      originalPrice: 220000,
      unit: "Chai thủy tinh 250ml",
      rating: 5.0,
      reviewsCount: 268,
      isFeatured: true,
      badge: "BÁN CHẠY NHẤT",
      badgeColor: "bg-emerald-600",
      image: "/products/virgin-coconut-oil.jpg",
      tagline: "Chiết xuất ly tâm không gia nhiệt, giữ 100% axit lauric",
      shortDesc: "Sản phẩm đổi mới sáng tạo ứng dụng công nghệ ly tâm 3 pha từ cơm dừa già tươi hái trong ngày. Dầu trong vắt như nước suối, thoang thoảng hương thơm dừa non, không gắt dầu.",
      features: [
        "Hàm lượng Axit Lauric tự nhiên đạt trên 51.8%",
        "Dùng được cho cả trẻ sơ sinh, bà bầu và dưỡng ẩm da, dưỡng tóc",
        "Có thể uống trực tiếp 1-2 thìa mỗi sáng để hỗ trợ tiêu hóa & đề kháng",
        "Đạt chứng nhận kiểm nghiệm vi sinh Pasteur và ISO 22000"
      ],
      traceBatch: "SP-DDL-2026-03",
      farmerName: "Tổ hợp tác Ép Dầu Song Phú"
    },
    {
      id: "SP-03",
      name: "Mật Hoa Dừa Cô Đặc Song Phú Lên Men Sinh Học",
      category: "food",
      price: 145000,
      originalPrice: 170000,
      unit: "Hũ thủy tinh 330g",
      rating: 4.8,
      reviewsCount: 95,
      isFeatured: true,
      badge: "THỰC DƯỠNG XANH",
      badgeColor: "bg-orange-600",
      image: "/products/coconut-nectar.jpg",
      tagline: "Chỉ số đường huyết GI thấp, dồi dào khoáng chất Kali & Magie",
      shortDesc: "Được thu hái thủ công từ những búp hoa dừa khỏe mạnh theo bí quyết mát-xa búp hoa truyền thống của nghệ nhân Tam Bình. Cô đặc chậm ở nhiệt độ thấp để giữ trọn khoáng chất và axit amin.",
      features: [
        "Chỉ số đường huyết thấp (GI ~ 35-40), an toàn cho người ăn kiêng, tiền tiểu đường",
        "Vị ngọt thanh dịu kèm chút chua mặn tự nhiên của khoáng chất đất phù sa",
        "Dùng pha trà, cà phê, ướp món kho hoặc phết ăn bánh mì ngũ cốc",
        "100% không pha mật mía, không chất tạo màu tạo ngọt"
      ],
      traceBatch: "SP-MHD-2026-02",
      farmerName: "Cô Tư Mai (Ấp Song Thạnh)"
    },
    {
      id: "SP-04",
      name: "Dừa Sáp Cấy Phôi Song Phú - Đặc Sản Thượng Hạng",
      category: "fresh",
      price: 160000,
      originalPrice: 190000,
      unit: "Trái (khoảng 1.1kg - 1.4kg)",
      rating: 4.9,
      reviewsCount: 112,
      isFeatured: true,
      badge: "ĐẶC SẢN QUÝ",
      badgeColor: "bg-purple-600",
      image: "/products/wax-coconut.jpg",
      tagline: "Cơm dày mềm dẻo như kem, nước dừa kẹo sền sệt béo bùi",
      shortDesc: "Giống dừa sáp đặc sản được viện cây ăn quả Miền Nam chuyển giao công nghệ cấy phôi, trồng trên vùng đất phù sa ngập mặn nhẹ màu mỡ của xã Song Phú cho tỷ lệ sáp đạt trên 85%.",
      features: [
        "Cơm dừa mềm mịn, xốp dẻo, hàm lượng dinh dưỡng béo thực vật cao",
        "Chuyên dùng làm sinh tố dừa sáp dầm sữa đá kem cốt dừa",
        "Bao ăn 1 đổi 1 tận nhà nếu trái không đạt độ sáp tiêu chuẩn",
        "Đóng thùng xốp sang trọng kèm hướng dẫn pha chế tuyệt đỉnh"
      ],
      traceBatch: "SP-DSP-2026-05",
      farmerName: "Anh Ba Thông (Ấp Phú Điền)"
    },
    {
      id: "SP-05",
      name: "Than Hoạt Tính Gáo Dừa Cao Cấp Lọc Nước & Khử Mùi",
      category: "eco",
      price: 65000,
      originalPrice: 80000,
      unit: "Gói 1kg (hoặc hộp than hút ẩm ô tô)",
      rating: 4.7,
      reviewsCount: 88,
      isFeatured: false,
      badge: "SẢN PHẨM XANH",
      badgeColor: "bg-slate-700",
      image: "/products/coco-husk-chips.jpg",
      tagline: "Chỉ số hấp phụ Iodine > 950 mg/g, diện tích bề mặt cực lớn",
      shortDesc: "Được sản xuất từ gáo dừa già thu hồi sau khi lấy cơm. Nung hoạt hóa ở nhiệt độ 900°C bằng hơi nước áp suất cao, tạo mạng lưới vi mao quản dày đặc giúp lọc sạch kim loại nặng và độc tố.",
      features: [
        "Chuyên dụng cho hệ thống lọc nước sinh hoạt, hồ cá Koi và bể thủy sinh",
        "Túi than hoạt tính hút ẩm, khử mùi ẩm mốc tủ lạnh, xe hơi, tủ quần áo",
        "100% nguồn gốc sinh học tự nhiên, hoàn toàn không hóa chất",
        "Tái sinh dễ dàng bằng cách phơi nắng sau mỗi tháng sử dụng"
      ],
      traceBatch: "SP-THD-2026-08",
      farmerName: "Xưởng Than Sinh Học HTX Song Phú"
    },
    {
      id: "SP-06",
      name: "Viên Nén Giá Thể Mụn Dừa Sinh Học Trichoderma",
      category: "eco",
      price: 45000,
      originalPrice: 55000,
      unit: "Lốc 5 viên nén nở (ngâm nở ra 25 lít)",
      rating: 4.9,
      reviewsCount: 194,
      isFeatured: false,
      badge: "NÔNG NGHIỆP ĐÔ THỊ",
      badgeColor: "bg-lime-600",
      image: "/products/coco-husk-chips.jpg",
      tagline: "Đã xử lý sạch chất chát Lignin & Tanin, ủ sẵn nấm đối kháng",
      shortDesc: "Tận dụng mụn dừa từ vỏ dừa khô Song Phú, rửa sạch qua 5 chu kỳ nước khử chát hoàn toàn, bổ sung vi sinh Trichoderma ngừa thối rễ rồi ép nén thủy lực thể tích nhỏ gọn.",
      features: [
        "Tiện lợi tối đa cho người trồng rau sạch ban công, cây cảnh, sen đá, hoa lan",
        "Chỉ cần cho vào chậu thêm nước là nở gấp 5 lần thành đất trồng tơi xốp",
        "Giữ ẩm tuyệt vời, kích thích rễ tơ phát triển khỏe mạnh",
        "Không mùi hôi, sạch mầm bệnh và cỏ dại 100%"
      ],
      traceBatch: "SP-VMD-2026-04",
      farmerName: "Xưởng Xơ Dừa Xã Viên Song Phú"
    },
    {
      id: "SP-07",
      name: "Bộ Bát & Thìa Gáo Dừa Thủ Công Khắc Họa Tiết Nam Bộ",
      category: "craft",
      price: 85000,
      originalPrice: 110000,
      unit: "Bộ 1 bát gáo dừa + 1 muỗng gỗ dừa mài mịn",
      rating: 5.0,
      reviewsCount: 176,
      isFeatured: true,
      badge: "XUẤT KHẨU",
      badgeColor: "bg-teal-700",
      image: "/products/coconut-bowl.jpg",
      tagline: "Nghệ nhân gọt đẽo thủ công, lau bóng bằng chính dầu dừa tự nhiên",
      shortDesc: "Mỗi chiếc bát là một tác phẩm độc nhất vô nhị từ gáo dừa khô dày dặn của vùng Song Phú. Sản phẩm được chà nhám 7 cấp độ bóng mịn, không dùng sơn PU độc hại, thân thiện với thực phẩm.",
      features: [
        "Hoàn hảo đựng sinh tố, salad, ngũ cốc granola phong cách Organic sống chậm",
        "Có thể rửa bằng nước rửa chén sinh học và tái sử dụng hàng năm",
        "Góp phần tạo việc làm cho các nữ nghệ nhân địa phương lúc nông nhàn",
        "Đã xuất khẩu sang thị trường Nhật Bản, Hàn Quốc và Đức"
      ],
      traceBatch: "SP-MNG-2026-06",
      farmerName: "Tổ Mỹ Nghệ Nữ Công Tam Bình"
    },
    {
      id: "SP-08",
      name: "Xà Phòng Sinh Học Dầu Dừa & Cám Gạo Sông Măng",
      category: "oils",
      price: 55000,
      originalPrice: 65000,
      unit: "Bánh 100g",
      rating: 4.9,
      reviewsCount: 220,
      isFeatured: false,
      badge: "MỸ PHẨM XANH",
      badgeColor: "bg-rose-600",
      image: "https://images.unsplash.com/photo-1607006483702-3b8c31273934?auto=format&fit=crop&w=800&q=80",
      tagline: "Dưỡng ẩm tự nhiên, tạo bọt xốp mịn từ phản ứng xà phòng hóa lạnh",
      shortDesc: "Bánh xà phòng thủ công nấu từ 70% dầu dừa nguyên chất Song Phú kết hợp tinh chất cám gạo hữu cơ và tinh dầu sả chanh. Làm sạch da dịu nhẹ mà không gây cảm giác căng rát.",
      features: [
        "Bọt nhiều và mịn như kem nhờ chuỗi axit béo ngắn của dầu dừa",
        "Kháng khuẩn mụn lưng, se khít lỗ chân lông và làm sáng da tự nhiên",
        "Nước thải tắm gội phân hủy sinh học 100%, bảo vệ nguồn nước ngầm",
        "Không sulfate, không paraben, không chất bảo quản công nghiệp"
      ],
      traceBatch: "SP-XPD-2026-07",
      farmerName: "Xưởng Mỹ Phẩm Xanh Song Phú"
    }
  ],

  // Mô hình kinh tế tuần hoàn cây dừa (Zero Waste Circular Economy)
  circularEconomyParts: [
    {
      part: "Cơm Dừa (Thịt Dừa)",
      icon: "circle",
      percentage: "28%",
      products: ["Dầu dừa ép lạnh ly tâm", "Cơm dừa sấy giòn OCOP", "Sữa dừa nguyên chất", "Bột cốt dừa"],
      valueAdded: "Tăng giá trị gấp 4.5 lần so với bán dừa trái thô",
      process: "Thu hoạch dừa già -> Tách cơm tươi trong 4 giờ -> Ly tâm lạnh không sinh nhiệt -> Tách dầu và bã làm thức ăn giàu đạm cho gia súc."
    },
    {
      part: "Nước Dừa Tươi",
      icon: "droplet",
      percentage: "25%",
      products: ["Dừa xiêm gọt kim cương", "Thạch dừa sinh học Bionano", "Nước dừa đóng lon tiệt trùng UHT"],
      valueAdded: "Giữ trọn vi khoáng bù điện giải tự nhiên",
      process: "Nước dừa tươi lên men vi sinh Acetobacter xylinum tạo màng cellulose sinh học (mặt nạ dưỡng da và thạch dừa)."
    },
    {
      part: "Gáo Dừa (Sọ Dừa)",
      icon: "shield",
      percentage: "15%",
      products: ["Than hoạt tính gáo dừa lọc nước", "Bát thìa mỹ nghệ gáo dừa", "Nhang muỗi sinh học gáo dừa"],
      valueAdded: "Biến phụ phẩm đốt bỏ thành sản phẩm xuất khẩu giá cao",
      process: "Gáo dừa già chọn lọc được mài bóng làm đồ thủ công; phần vụn nung lò yếm khí thành than gáo dừa hoạt tính hóa hơi nước."
    },
    {
      part: "Vỏ & Xơ Dừa",
      icon: "layers",
      percentage: "30%",
      products: ["Chỉ xơ dừa bện thảm chống xói mòn", "Viên nén mụn dừa nở", "Đệm xơ dừa sinh thái"],
      valueAdded: "Ứng dụng hàng đầu trong nông nghiệp công nghệ cao và cải tạo đất",
      process: "Máy bóc tách vỏ dừa thành chỉ dài xuất khẩu và mụn dừa; mụn dừa được xử lý khử chát EC < 0.5 mS/cm để làm giá thể."
    },
    {
      part: "Búp Hoa Dừa",
      icon: "flower",
      percentage: "2%",
      products: ["Mật hoa dừa cô đặc", "Đường hoa dừa tự nhiên", "Giấm hoa dừa lên men"],
      valueAdded: "Mô hình khai thác mật hoa dừa mang lại thu nhập đều đặn gấp 3-5 lần thu hoạch trái",
      process: "Nghệ nhân dùng kỹ thuật gõ mát-xa búp hoa dừa mỗi sáng sớm, thu từng giọt mật hoa ngọt lành giàu khoáng chất."
    }
  ],

  // Dữ liệu truy xuất nguồn gốc số (Traceability Batches)
  traceabilityBatches: {
    "SP-DXL-2026-01": {
      batchCode: "SP-DXL-2026-01",
      productName: "Dừa Xiêm Lửa Song Phú Gọt Kim Cương",
      farmOwner: "Xã viên Nguyễn Văn Nghĩa (Chú Bảy Nghĩa)",
      location: "Thửa đất số 142, Ấp Phú Trường Yên, Xã Song Phú, Tỉnh Vĩnh Long",
      farmArea: "2.8 Héc-ta (khoảng 650 gốc dừa 9 năm tuổi)",
      soilType: "Đất phù sa cổ ven kinh Thầy Cai, giàu mùn và kali",
      pollinationDate: "15/01/2026",
      harvestDate: "20/10/2026",
      harvestMethod: "Hái thủ công bằng thang dây chuyên dụng, không để rơi dập",
      processDate: "21/10/2026 (Gọt tạo hình kim cương & hút chân không tại xưởng HTX)",
      certifications: ["VietGAP: TT-2024-VG-0899", "OCOP 4 Sao: QĐ 418/QĐ-UBND"],
      labTest: "Dư lượng thuốc BVTV: 0.00 ppm; Độ ngọt Brix: 8.8°; Coliforms: Không phát hiện",
      auditor: "Trung tâm Giám định Chất lượng Nông sản Miền Tây",
      blockchainTx: "0x8fa1b98c37d4...e901a4b (Mã xác thực số bảo an)",
      image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80"
    },
    "SP-DDL-2026-03": {
      batchCode: "SP-DDL-2026-03",
      productName: "Dầu Dừa Nguyên Chất Ép Lạnh Ly Tâm Song Phú",
      farmOwner: "Tổ Hợp Tác Chế Biến Sâu HTX Dừa Song Phú",
      location: "Xưởng chế biến đạt chuẩn ISO 22000, Ấp Phú Trường Yên, Xã Song Phú, Tỉnh Vĩnh Long",
      farmArea: "Vùng thu hoạch liên kết 45 hộ xã viên xã Song Phú",
      soilType: "Phù sa bồi sông Măng Thít",
      pollinationDate: "Tháng 11/2025",
      harvestDate: "18/10/2026",
      harvestMethod: "Dừa khô rụng cây tự nhiên đạt chuẩn dầu cao nhất",
      processDate: "19/10/2026 (Ly tâm 3 pha ở 22°C - Không gia nhiệt)",
      certifications: ["ISO 22000:2018", "HACCP Certified", "OCOP 4 Sao"],
      labTest: "Hàm lượng Acid Lauric: 52.4%; Chỉ số Acid peroxide: 0.12 meq/kg; Độ ẩm: 0.04%",
      auditor: "Viện Pasteur TP. Hồ Chí Minh kiểm nghiệm",
      blockchainTx: "0x7bc2d04a621f...f772e1c (Mã xác thực số bảo an)",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
    },
    "SP-MHD-2026-02": {
      batchCode: "SP-MHD-2026-02",
      productName: "Mật Hoa Dừa Cô Đặc Song Phú Lên Men Sinh Học",
      farmOwner: "Nông hộ Trần Thị Mai (Cô Tư Mai)",
      location: "Ấp Song Thạnh, Xã Song Phú, Huyện Tam Bình",
      farmArea: "1.9 Héc-ta vườn dừa lấy mật chuyên canh",
      soilType: "Phù sa ven rạch rợp bóng dừa mát quanh năm",
      pollinationDate: "Đầu mùa mưa 2026",
      harvestDate: "Hàng ngày 05:00 sáng & 17:00 chiều",
      harvestMethod: "Mát-xa búp hoa dừa thu mật tươi giọt ngọt",
      processDate: "Cô đặc chậm chân không ở 55°C trong 8 tiếng",
      certifications: ["HACCP", "OCOP 4 Sao tỉnh Vĩnh Long"],
      labTest: "Chỉ số GI: 38; Kali: 245mg/100g; Magie: 42mg/100g; Không phẩm màu",
      auditor: "Sở Khoa học & Công nghệ tỉnh Vĩnh Long",
      blockchainTx: "0x3af9e41b99a8...a120c8f (Mã xác thực số bảo an)",
      image: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?auto=format&fit=crop&w=600&q=80"
    }
  },

  // Các bài viết tin tức & cẩm nang
  news: [
    {
      id: 1,
      title: "Hợp tác xã Dừa Song Phú đưa sản phẩm OCOP vươn ra thị trường quốc tế",
      date: "28 Tháng 10, 2026",
      category: "Câu Chuyện OCOP",
      author: "Ban Truyền Thông HTX",
      excerpt: "Nhờ kiên trì mô hình kinh tế tuần hoàn và canh tác hữu cơ, lô hàng 15 tấn dầu dừa ly tâm và than gáo dừa Song Phú đã chính thức cập cảng Rotterdam (Hà Lan).",
      image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80",
      readTime: "4 phút đọc"
    },
    {
      id: 2,
      title: "Bí quyết tận dụng tối đa công dụng của dầu dừa ép lạnh trong đời sống hàng ngày",
      date: "22 Tháng 10, 2026",
      category: "Cẩm Nang Sức Khỏe",
      author: "Dược sĩ Thanh Thảo",
      excerpt: "Không chỉ giúp dưỡng ẩm da mùa khô và phục hồi tóc hư tổn, dầu dừa nguyên chất còn chứa lượng lớn axit lauric hỗ trợ hệ tiêu hóa và tăng cường miễn dịch tự nhiên.",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      readTime: "5 phút đọc"
    },
    {
      id: 3,
      title: "Mô hình kinh tế tuần hoàn cây dừa tại xã Song Phú: Khi không có gì là rác thải",
      date: "15 Tháng 10, 2026",
      category: "Nông Nghiệp Xanh",
      author: "KS. Nguyễn Văn Hùng",
      excerpt: "Từ gáo dừa nung thành than hoạt tính, xơ dừa làm giá thể xuất khẩu, nước dừa lên men màng sinh học, HTX Song Phú đang giải quyết bài toán môi trường và nâng cao thu nhập cho xã viên.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
      readTime: "6 phút đọc"
    }
  ],

  // Cơ sở tri thức cho AI Assistant CoCo
  aiKnowledge: [
    {
      keywords: ["chào", "hello", "hi", "bạn là ai", "htx dừa song phú", "giới thiệu"],
      answer: "Dạ em chào quý anh/chị! Em là **Bé CoCo** 🌴 - Trợ lý Ảo Nông Nghiệp của **Hợp Tác Xã Dừa Song Phú** (Tam Bình, Vĩnh Long). Em có thể giúp anh/chị tìm hiểu sản phẩm dừa OCOP, tra cứu nguồn gốc nông sản, tư vấn cách dùng dầu dừa/mật hoa dừa hoặc hỗ trợ đặt hàng sỉ lẻ ạ!"
    },
    {
      keywords: ["giá", "mua", "đặt hàng", "ship", "vận chuyển", "giao hàng"],
      answer: "Dạ HTX Song Phú có chính sách giao hàng toàn quốc:\n- **Nội tỉnh Vĩnh Long & lân cận**: Giao nhanh trong 24h, miễn phí đơn từ 250k.\n- **Toàn quốc**: Giao từ 2-3 ngày, đóng gói cẩn thận chống va đập.\n- **Đơn dừa tươi gọt kim cương**: Ship hỏa tốc giữ lạnh để đảm bảo độ ngọt tươi ngon nhất.\nAnh/chị chỉ cần bấm 'Thêm vào giỏ' hoặc để lại số điện thoại, bên em sẽ liên hệ ngay ạ!"
    },
    {
      keywords: ["dầu dừa", "ép lạnh", "ly tâm", "dưỡng da", "dưỡng tóc", "uống"],
      answer: "Dạ Dầu dừa Song Phú được chiết xuất bằng **công nghệ ly tâm 3 pha không qua xử lý nhiệt**, nên giữ nguyên được hơn **51.8% Axit Lauric** quý giá! 🥥\n- **Dưỡng da**: Thoa một lớp mỏng buổi tối giúp cấp ẩm sâu và chống oxy hóa.\n- **Ủ tóc**: Ủ chân tóc 15-20 phút trước khi gội giúp giảm gãy rụng rõ rệt.\n- **Uống bảo vệ sức khỏe**: Uống 1 thìa cà phê mỗi sáng ấm giúp kháng khuẩn đường ruột."
    },
    {
      keywords: ["mật hoa dừa", "tiểu đường", "ăn kiêng", "ngọt"],
      answer: "Dạ **Mật hoa dừa cô đặc Song Phú** là chất tạo ngọt thực dưỡng tự nhiên có chỉ số đường huyết thấp (**GI chỉ ~35 - 40** so với đường mía là 65-70). Rất dồi dào khoáng chất Kali, Natri, Magie và các axit amin, cực kỳ an toàn và thích hợp cho người tiểu đường nhẹ, người tập gym, ăn kiêng và trẻ nhỏ!"
    },
    {
      keywords: ["truy xuất", "nguồn gốc", "vietgap", "ocop", "mã qr"],
      answer: "Dạ 100% sản phẩm của HTX Dừa Song Phú đều có tem truy xuất số Blockchain. Anh/chị có thể nhập mã lô hàng như `SP-DXL-2026-01` hoặc `SP-DDL-2026-03` tại mục **Truy Xuất Nguồn Gốc** trên website để xem tên hộ xã viên, nhật ký thu hoạch và chứng chỉ kiểm nghiệm ạ!"
    },
    {
      keywords: ["sỉ", "b2b", "xuất khẩu", "đại lý", "hợp tác"],
      answer: "Dạ HTX Song Phú luôn sẵn sàng hợp tác cung ứng số lượng lớn dừa tươi, dầu dừa ly tâm, than gáo dừa và giá thể xơ dừa cho các doanh nghiệp, chuỗi siêu thị và đối tác xuất khẩu. Vui lòng bấm vào mục **Báo Giá B2B** trên menu hoặc gọi Hotline Giám đốc: **0918 268 379** để nhận bảng giá chiết khấu ưu đãi nhất ạ!"
    }
  ]
};
