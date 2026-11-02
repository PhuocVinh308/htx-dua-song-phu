// Cơ sở dữ liệu phong phú Hợp tác xã Dừa Song Phú - Chuẩn hóa theo phong cách HTX Thanh Bình
export const coopData = {
  coopInfo: {
    name: "HỢP TÁC XÃ DỪA SONG PHÚ",
    englishName: "SONG PHU COCONUT COOPERATIVE (SOCOOP)",
    shortName: "SOCOOP TAM BÌNH",
    slogan: "Tinh hoa dừa đất bãi phù sa - Nông nghiệp tuần hoàn vì tương lai xanh",
    address: "Tổ 19, Ấp Phú Trường Yên, Xã Song Phú, Tỉnh Vĩnh Long, Việt Nam",
    hotline: "+84 918 268 379",
    phoneDisplay: "0918 268 379",
    email: "htxduasongphu@gmail.com",
    website: "https://htxduasongphu.vn",
    workingHours: "Mon - Fri | 8:00 - 17:00 / Sat | 8:00 - 12:00",
    taxCode: "1501098866",
    establishedYear: 2018,
    businessLicense: "Số 15/GP-UBND Huyện Tam Bình cấp ngày 12/03/2018",
    socials: {
      facebook: "https://facebook.com/htxduasongphu",
      youtube: "https://youtube.com/@htxduasongphu",
      tiktok: "https://tiktok.com/@duasongphu"
    },
    stats: [
      { id: "members", count: "165+", label: "Hộ Xã Viên Liên Kết" },
      { id: "area", count: "350+", label: "Héc-ta Vùng Trồng VietGAP" },
      { id: "products", count: "32+", label: "Sản Phẩm Đổi Mới OCOP" },
      { id: "output", count: "6.500+", label: "Tấn Sản Lượng / Năm" },
      { id: "waste", count: "0%", label: "Tỷ Lệ Phát Thải (Tuần Hoàn)" }
    ]
  },

  heroBanner: {
    subtitle: "Welcome to Song Phu farm",
    title: "BEST PRODUCT FOR YOU",
    desc: "Chúng tôi đảm bảo cho khách hàng của chúng tôi luôn có được sản phẩm tốt nhất và an toàn nhất từ vùng đất phù sa trù phú ven sông Măng Thít.",
    bgImage: "./products/farm-coconut-grove.jpg",
    btnText: "Xem thêm"
  },

  whyChooseUsPillars: [
    {
      num: "01",
      title: "100% Tự nhiên",
      desc: "Trồng trọt hoàn toàn bằng phương pháp hữu cơ vi sinh, không chất kích thích tăng trưởng.",
      image: "./products/green-coconut.jpg"
    },
    {
      num: "02",
      title: "Nuôi trồng hiện đại",
      desc: "Ứng dụng hệ thống tưới nước nhỏ giọt tự động và kiểm soát sâu bọ bằng thiên địch tự nhiên.",
      image: "./products/diamond-coconut.jpg"
    },
    {
      num: "03",
      title: "Chế biến sạch sẽ",
      desc: "Nhà xưởng đạt chuẩn ISO 22000 & HACCP, kiểm soát vô trùng nghiêm ngặt từ khâu nguyên liệu.",
      image: "./products/virgin-coconut-oil.jpg"
    },
    {
      num: "04",
      title: "Tốt cho sức khỏe",
      desc: "Giàu vi khoáng tự nhiên, axit béo chuỗi trung bình MCT và chất chống oxy hóa lành tính.",
      image: "./products/coconut-nectar.jpg"
    }
  ],

  // 16 sản phẩm đa dạng từ dừa và nông sản bản địa
  products: [
    {
      id: "P01",
      name: "Sợi xơ dừa tinh chế",
      category: "vat-lieu",
      price: 25000,
      originalPrice: 30000,
      image: "./products/coir-fiber.jpg",
      badge: "XUẤT KHẨU",
      badgeColor: "bg-blue-600",
      tagline: "Xơ dừa sinh thái xử lý khử chát tiêu chuẩn xuất khẩu",
      desc: "Sợi xơ dừa tự nhiên đã qua xử lý khử chát, chuyên dùng làm nệm sinh thái và vật liệu bọc cách nhiệt.",
      shortDesc: "Xơ dừa tự nhiên bóc tách từ vỏ dừa già Song Phú, đã qua ngâm xả và sấy nhiệt đạt độ ẩm dưới 15%.",
      unit: "cuộn 10kg",
      features: [
        "100% sợi dừa tự nhiên không hóa chất",
        "Đã xử lý khử chát & nấm mốc triệt để",
        "Độ đàn hồi cao, thoáng khí, cách nhiệt",
        "Đạt chuẩn xuất khẩu Châu Âu & Nhật Bản"
      ],
      farmerName: "Xã viên Trần Văn Đực (Ấp Song Phú 2)",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 38
    },
    {
      id: "P02",
      name: "Bột dừa nguyên chất",
      category: "thuc-pham",
      price: 45000,
      originalPrice: 55000,
      image: "./products/coconut-flour.jpg",
      badge: "OCOP 4 SAO",
      badgeColor: "bg-emerald-600",
      tagline: "Cơm dừa sấy mịn tiệt trùng - Giàu chất xơ hòa tan",
      desc: "Xay mịn từ cơm dừa già sấy khô tiệt trùng, béo bùi tự nhiên, dùng làm bánh và pha chế đồ uống thực dưỡng.",
      shortDesc: "Nghiền siêu mịn từ cơm dừa bánh tẻ thu hái trong ngày, giữ nguyên hương thơm ngọt béo tự nhiên.",
      unit: "gói 500g",
      features: [
        "Không đường tinh luyện, không chất bảo quản",
        "Giàu chất xơ hòa tan và khoáng chất tự nhiên",
        "Hương vị béo bùi thanh nhẹ đặc trưng Tam Bình",
        "Đạt chứng nhận OCOP 4 sao tỉnh Vĩnh Long"
      ],
      farmerName: "Xã viên Lê Thị Hồng (Ấp Phú Điền)",
      traceBatch: "SP-DDL-2026-03",
      rating: 5.0,
      reviewsCount: 64
    },
    {
      id: "P03",
      name: "Bột cơm dừa béo vàng",
      category: "thuc-pham",
      price: 55000,
      originalPrice: 65000,
      image: "./products/golden-coconut-flour.jpg",
      badge: "BÁN CHẠY",
      badgeColor: "bg-amber-600",
      tagline: "Hương vị đậm đà thơm béo - Nguồn năng lượng lành mạnh",
      desc: "Hương vị thơm béo đậm đà, cung cấp năng lượng lành mạnh và chất xơ hòa tan tự nhiên.",
      shortDesc: "Bột cơm dừa tuyển chọn từ dừa già nhiều dầu, nướng thơm nhẹ vàng giòn cho món tráng miệng.",
      unit: "hũ 400g",
      features: [
        "Hàm lượng lipid lành mạnh tự nhiên > 45%",
        "Thích hợp làm bánh, pha cà phê dừa béo ngậy",
        "Mùi thơm nức đặc trưng dừa bãi bồi Vĩnh Long",
        "Đóng hũ màng nhôm bảo quản kín khí"
      ],
      farmerName: "Tổ hợp tác xã viên Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.8,
      reviewsCount: 52
    },
    {
      id: "P04",
      name: "Bột dừa non ăn kiêng",
      category: "thuc-pham",
      price: 65000,
      originalPrice: 78000,
      image: "./products/diet-coconut-powder.jpg",
      badge: "KETO / DIET",
      badgeColor: "bg-purple-600",
      tagline: "Chỉ số đường huyết thấp - Giải pháp vàng cho người ăn kiêng",
      desc: "Chỉ số đường huyết thấp, hỗ trợ chế độ ăn keto và người cần kiểm soát đường huyết.",
      shortDesc: "Chế biến từ cơm dừa non vừa chín tới, tinh lọc tinh bột nhanh, giàu MCT hỗ trợ chuyển hóa.",
      unit: "hũ 350g",
      features: [
        "Chỉ số đường huyết (GI) cực thấp, an toàn người tiểu đường",
        "Bổ sung hoàn hảo cho thực đơn Keto và Eat Clean",
        "Giàu chất béo chuỗi trung bình MCT dễ hấp thu",
        "100% tự nhiên không pha trộn chất độn"
      ],
      farmerName: "Nông hộ Nguyễn Văn Nghĩa",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 41
    },
    {
      id: "P05",
      name: "Vỏ dừa sấy nguyên liệu",
      category: "vat-lieu",
      price: 18000,
      originalPrice: 22000,
      image: "./products/coco-husk-chips.jpg",
      badge: "NGUYÊN LIỆU",
      badgeColor: "bg-stone-600",
      tagline: "Giá thể hữu cơ trồng lan và cải tạo đất nông nghiệp",
      desc: "Vỏ dừa già phơi khô ráo, làm giá thể trồng hoa lan hoặc nung than sinh học.",
      shortDesc: "Mảnh vỏ dừa cắt khúc đều 2-3cm, sấy diệt mầm nấm, xốp nhẹ giữ ẩm tối ưu cho rễ hoa lan.",
      unit: "bao 5kg",
      features: [
        "Giữ ẩm rễ và tạo độ thông thoáng tuyệt vời",
        "Đã xử lý nhiệt diệt sạch mầm bệnh và ốc sên",
        "Không lẫn tạp chất kim loại, an toàn cây trồng",
        "Thích hợp làm giá thể phong lan, kiểng lá, bonsai"
      ],
      farmerName: "Tổ sản xuất phụ phẩm Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.7,
      reviewsCount: 29
    },
    {
      id: "P06",
      name: "Dừa xiêm xanh Song Phú",
      category: "trai-cay-tuoi",
      price: 22000,
      originalPrice: 26000,
      image: "./products/green-coconut.jpg",
      badge: "OCOP 4 SAO",
      badgeColor: "bg-emerald-600",
      tagline: "Nước ngọt thanh mát lành - Độ ngọt tự nhiên > 8.5° Brix",
      desc: "Trái dừa tươi ngọt thanh, nước trong vắt, độ ngọt brix tự nhiên trên 8.5°.",
      shortDesc: "Thu hoạch đúng lứa dừa nạo, cơm dừa mỏng mềm, nước nhiều khoáng chất bù điện giải tuyệt vời.",
      unit: "trái",
      features: [
        "Vị ngọt thanh tự nhiên, hương thơm mát lành",
        "Giàu Kali, Natri, Magie bù điện giải tự nhiên",
        "Canh tác sinh thái hữu cơ trên đất bãi bồi Tam Bình",
        "Đạt chuẩn chứng nhận OCOP 4 sao và VietGAP"
      ],
      farmerName: "Xã viên Huỳnh Văn Sang (Ấp Phú Trường Yên)",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 120
    },
    {
      id: "P07",
      name: "Dừa xiêm lửa gọt kim cương",
      category: "trai-cay-tuoi",
      price: 32000,
      originalPrice: 38000,
      image: "./products/diamond-coconut.jpg",
      gallery: [
        "./products/diamond-coconut.jpg",
        "./products/diamond-coconut-open.jpg",
        "./products/factory-processing.jpg",
        "./products/green-coconut.jpg"
      ],
      badge: "CAO CẤP",
      badgeColor: "bg-amber-600",
      tagline: "Tạo hình kim cương sang trọng - Tặng kèm ống hút cỏ bàng",
      desc: "Gọt tạo hình kim cương sang trọng, bọc màng sinh học kháng khuẩn, dán tem OCOP SOCOOP, kèm ống hút cỏ bàng sinh thái.",
      shortDesc: "Dừa xiêm lửa vỏ hồng cam quý hiếm, nước ngọt đượm hương lá dứa, gọt tỉ mỉ phục vụ hội nghị và nhà hàng.",
      unit: "trái gọt sẵn",
      features: [
        "Tạo hình kim cương vát góc sang trọng, thẩm mỹ cao",
        "Màng bọc sinh học kháng khuẩn tiêu chuẩn xuất khẩu",
        "Kèm ống hút cỏ bàng tự nhiên thân thiện môi trường",
        "Bảo quản ngăn mát tủ lạnh giữ trọn độ tươi 30 ngày"
      ],
      farmerName: "Xã viên Nguyễn Văn Nghĩa (Chú Bảy Nghĩa)",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 89
    },
    {
      id: "P08",
      name: "Cơm dừa cắt hạt lựu",
      category: "thuc-pham",
      price: 40000,
      originalPrice: 48000,
      image: "./products/coconut-cubes.jpg",
      badge: "TIỆN LỢI",
      badgeColor: "bg-teal-600",
      tagline: "Cơm dừa bánh tẻ cấp đông IQF - Giòn ngọt thơm ngon",
      desc: "Cơm dừa bánh tẻ cắt sẵn cấp đông IQF, giữ trọn vị giòn ngọt cho món chè và trà sữa.",
      shortDesc: "Nguyên liệu tiện ích cho bếp gia đình và quán trà sữa, rã đông dùng ngay giữ trọn độ giòn sần sật.",
      unit: "túi 500g",
      features: [
        "Cấp đông siêu tốc IQF -40°C giữ trọn cấu trúc giòn",
        "Cắt hạt lựu đồng đều, không vụn nát",
        "Tuyệt đối không sử dụng hóa chất tẩy trắng",
        "Rất tiện lợi nấu chè, làm thạch dừa, trà sữa dừa"
      ],
      farmerName: "Tổ hợp tác xã viên Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.8,
      reviewsCount: 46
    },
    {
      id: "P09",
      name: "Cơm dừa sấy giòn OCOP",
      category: "trai-cay-say",
      price: 38000,
      originalPrice: 45000,
      image: "./products/coconut-chips.jpg",
      badge: "ĂN VẶT HEALTHY",
      badgeColor: "bg-orange-600",
      tagline: "Sấy nhiệt lạnh giòn rụm - Thơm nức vị dừa Tam Bình",
      desc: "Sấy giòn rụm không dầu mỡ, thơm nức mùi dừa quê, món snack lành mạnh cho mọi lứa tuổi.",
      shortDesc: "Từng miếng dừa mỏng sấy giòn tan, vị ngọt thanh tự nhiên, ít đường, không phẩm màu hóa học.",
      unit: "túi zip 150g",
      features: [
        "Công nghệ sấy nhiệt sạch bảo toàn khoáng chất",
        "Không chiên qua dầu, không cholesterol độc hại",
        "Hàm lượng đường thấp < 5%, thơm bùi tự nhiên",
        "Bao bì túi zip tráng nhôm tiện bảo quản"
      ],
      farmerName: "Xã viên Đặng Thị Bé (Ấp Song Thạnh)",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.9,
      reviewsCount: 95
    },
    {
      id: "P10",
      name: "Mít sấy giòn Tam Bình",
      category: "trai-cay-say",
      price: 52000,
      originalPrice: 62000,
      image: "./products/jackfruit-chips.jpg",
      badge: "ĐẶC SẢN",
      badgeColor: "bg-amber-600",
      tagline: "Mít nghệ chín cây bãi bồi - Sấy chân không giòn rụm",
      desc: "Mít nghệ chín cây của vùng đất bãi bồi Vĩnh Long, sấy chân không giòn ngọt tự nhiên.",
      shortDesc: "Múi mít nghệ vàng ươm, thơm lừng hương vị phù sa, sấy chân không bảo toàn hương vị trọn vẹn.",
      unit: "gói 200g",
      features: [
        "Thu hoạch từ vườn mít nghệ chín cây bãi bồi",
        "Sấy chân không nhiệt thấp giữ nguyên màu vàng óng",
        "Vị ngọt mật đậm đà không gắt cổ",
        "Chuỗi liên kết nông sản an toàn xã viên Song Phú"
      ],
      farmerName: "Xã viên Phan Văn Hùng (Ấp Phú Điền)",
      traceBatch: "SP-MHD-2026-02",
      rating: 4.8,
      reviewsCount: 58
    },
    {
      id: "P11",
      name: "Chuối sấy dẻo Song Phú",
      category: "trai-cay-say",
      price: 35000,
      originalPrice: 42000,
      image: "./products/dried-banana.jpg",
      badge: "TRUYỀN THỐNG",
      badgeColor: "bg-yellow-600",
      tagline: "Chuối xiêm chín bói phơi sấy dẻo ngọt mật tự nhiên",
      desc: "Chuối xiêm chín bói phơi sấy dẻo thơm, ngọt mật tự nhiên không tẩm ướp đường.",
      shortDesc: "Đặc sản miệt vườn Tam Bình dẻo quánh tự nhiên, giàu kali và năng lượng tích cực cho ngày dài.",
      unit: "hộp 300g",
      features: [
        "100% chuối xiêm chín bói vườn nhà xã viên",
        "Không tẩm ướp đường hoặc chất tạo màu",
        "Dẻo thơm quánh mật tự nhiên, giàu kali",
        "Đóng hộp vệ sinh an toàn thực phẩm"
      ],
      farmerName: "Nông hộ Nguyễn Thị Lan (Ấp Song Phú 2)",
      traceBatch: "SP-MHD-2026-02",
      rating: 4.7,
      reviewsCount: 36
    },
    {
      id: "P12",
      name: "Dừa sáp đặc sản cấy phôi",
      category: "trai-cay-tuoi",
      price: 160000,
      originalPrice: 190000,
      image: "./products/wax-coconut.jpg",
      badge: "THƯỢNG HẠNG",
      badgeColor: "bg-red-600",
      tagline: "Cơm dừa sáp dẻo quánh như kem - Bao ăn 1 đổi 1",
      desc: "Cơm dừa dày mềm dẻo như kem, nước dừa kẹo sền sệt béo bùi, bao ăn 1 đổi 1.",
      shortDesc: "Giống dừa quý cấy phôi công nghệ cao đạt tỷ lệ sáp trên 90%, ăn béo ngậy khó quên.",
      unit: "trái loại 1",
      features: [
        "Cơm dừa dày mềm dẻo quánh như kem tươi",
        "Nước dừa kẹo sệt thơm béo ngậy độc nhất",
        "Chính sách bảo hành bao ăn 1 đổi 1 uy tín",
        "Mỗi trái dán tem QR Blockchain truy xuất tận gốc"
      ],
      farmerName: "Kỹ sư Huỳnh Văn Sang & HTX Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 112
    },
    {
      id: "P13",
      name: "Dầu dừa ép lạnh ly tâm 250ml",
      category: "my-pham",
      price: 185000,
      originalPrice: 220000,
      image: "./products/virgin-coconut-oil.jpg",
      badge: "ISO 22000",
      badgeColor: "bg-emerald-700",
      tagline: "Ly tâm 3 pha không sinh nhiệt - Axit Lauric > 51.8%",
      desc: "Chiết xuất ly tâm 3 pha không gia nhiệt, giữ hơn 51.8% Axit Lauric quý dưỡng da tóc.",
      shortDesc: "Dầu dừa tinh khiết trong vắt như nước khoáng, mùi thơm dừa tươi thoang thoảng dịu nhẹ.",
      unit: "chai thủy tinh 250ml",
      features: [
        "Công nghệ ly tâm 3 pha tiên tiến ở 22°C",
        "Hàm lượng Axit Lauric quý giá vượt 51.8%",
        "Thẩm thấu nhanh, dưỡng ẩm sâu, không bết dính",
        "Đạt chứng nhận an toàn ISO 22000:2018 và HACCP"
      ],
      farmerName: "Xưởng chế biến sâu HTX Dừa Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 5.0,
      reviewsCount: 145
    },
    {
      id: "P14",
      name: "Mật hoa dừa cô đặc 330g",
      category: "thuc-pham",
      price: 145000,
      originalPrice: 175000,
      image: "./products/coconut-nectar.jpg",
      badge: "GI THẤP",
      badgeColor: "bg-amber-600",
      tagline: "Đường tự nhiên chỉ số GI thấp - Tốt cho người tiểu đường",
      desc: "Thu từ hoa dừa tự nhiên, giàu khoáng chất Kali & Magie, tạo ngọt an toàn cho người ăn kiêng.",
      shortDesc: "Từng giọt mật hoa dừa tươi được mát-xa thu mỗi sớm mai, cô đặc chậm chân không 55°C.",
      unit: "hũ thủy tinh 330g",
      features: [
        "Chỉ số đường huyết GI = 39 (thuộc nhóm rất thấp)",
        "Dồi dào khoáng vi lượng Kali, Natri, Phốt pho, Magie",
        "100% tự nhiên thuần thực vật, không chất bảo quản",
        "Thay thế lành mạnh đường tinh luyện cho cả gia đình"
      ],
      farmerName: "Nông hộ Trần Thị Mai (Cô Tư Mai)",
      traceBatch: "SP-MHD-2026-02",
      rating: 4.9,
      reviewsCount: 84
    },
    {
      id: "P15",
      name: "Bát gáo dừa thủ công mỹ nghệ",
      category: "thu-cong",
      price: 45000,
      originalPrice: 55000,
      image: "./products/coconut-bowl.jpg",
      badge: "XUẤT KHẨU",
      badgeColor: "bg-stone-700",
      tagline: "Mỹ nghệ gáo dừa lau bóng dầu dừa - Xuất khẩu Nhật Bản",
      desc: "Gọt đẽo từ gáo dừa già, lau bóng dầu dừa tự nhiên, xuất khẩu sang Nhật và Châu Âu.",
      shortDesc: "Sản phẩm sống xanh zero-waste từ phụ phẩm gáo dừa, đánh bóng bằng dầu dừa tự nhiên không hóa chất.",
      unit: "bát thủ công",
      features: [
        "Chế tác thủ công từ gáo dừa già dày vân tự nhiên",
        "Lau bóng bằng dầu dừa nguyên chất không hóa chất bóng",
        "An toàn đựng sinh tố, ngũ cốc, salad, đồ khô",
        "Mô hình kinh tế tuần hoàn Net-Zero không rác thải"
      ],
      farmerName: "Tổ thủ công mỹ nghệ xã viên Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 67
    },
    {
      id: "P16",
      name: "Giỏ quai bèo thủ công mỹ nghệ",
      category: "thu-cong",
      price: 120000,
      originalPrice: 145000,
      image: "./products/woven-bag.jpg",
      badge: "LÀNG NGHỀ",
      badgeColor: "bg-amber-800",
      tagline: "Đan lát lục bình kết hợp bẹ dừa - Phong cách sống xanh Vintage",
      desc: "Đan lát thủ công từ lục bình và bẹ dừa nước Song Phú, phong cách sống xanh vintage.",
      shortDesc: "Nghệ nhân địa phương tỉ mỉ đan tay từng đường nét, tạo dáng thanh lịch cho phụ nữ hiện đại.",
      unit: "chiếc",
      features: [
        "Đan tay thủ công từ lục bình phơi khô và bẹ dừa dẻo dai",
        "Sấy khô và xử lý thảo mộc chống mốc tự nhiên",
        "Độ bền cao, chịu tải trọng tới 5kg",
        "Tạo sinh kế bền vững cho phụ nữ nông thôn Tam Bình"
      ],
      farmerName: "Làng nghề đan đát truyền thống Tam Bình",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.8,
      reviewsCount: 53
    },
    {
      id: "P17",
      name: "Nước dừa xiêm đóng lon Song Phú 330ml",
      category: "trai-cay-tuoi",
      price: 25000,
      originalPrice: 30000,
      image: "./products/canned-coconut-water.jpg",
      badge: "TIỆN ÍCH",
      badgeColor: "bg-emerald-600",
      tagline: "Nước dừa tươi tiệt trùng UHT - Giữ trọn vị ngọt thanh",
      desc: "Nước dừa xiêm xanh Song Phú đóng lon nhôm tiệt trùng UHT, không đường hóa học, giàu chất điện giải tự nhiên.",
      shortDesc: "Đóng lon nắp giật tiện lợi từ 100% nước dừa xiêm tươi, bổ sung khoáng bù nước tức thì sau khi vận động.",
      unit: "lon 330ml",
      features: [
        "100% nước dừa tươi nguyên chất đóng lon tiệt trùng",
        "Bảo toàn khoáng chất bù điện giải Kali & Magie",
        "Không thêm đường tinh luyện, vị ngọt thanh tự nhiên",
        "Tiện lợi mang theo khi du lịch, tập gym và làm việc"
      ],
      farmerName: "Xưởng chế biến sâu HTX Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 78
    },
    {
      id: "P18",
      name: "Thạch dừa tươi Bionano lên men sinh học",
      category: "thuc-pham",
      price: 32000,
      originalPrice: 40000,
      image: "./products/nata-de-coco.jpg",
      badge: "MỚI",
      badgeColor: "bg-teal-600",
      tagline: "Cellulose sinh học tự nhiên - Giòn sần sật thanh mát",
      desc: "Lên men vi sinh tự nhiên từ nước dừa già Song Phú, tạo cấu trúc thạch dẻo giòn thanh mát cho món tráng miệng.",
      shortDesc: "Thạch dừa trong suốt như pha lê, ngậm nước thanh mát, giàu chất xơ sinh học hỗ trợ hệ tiêu hóa khỏe mạnh.",
      unit: "hũ 500g",
      features: [
        "Lên men tự nhiên bằng chủng vi sinh Acetobacter xylinum",
        "Không ngâm hóa chất tẩy trắng, trong suốt tự nhiên",
        "Hàm lượng calo thấp, giàu chất xơ cellulose sinh học",
        "Món tráng miệng tuyệt vời khi ăn cùng sữa chua và trái cây"
      ],
      farmerName: "Tổ chế biến phụ phẩm sinh học Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.9,
      reviewsCount: 43
    },
    {
      id: "P19",
      name: "Than gáo dừa nén BBQ không khói",
      category: "vat-lieu",
      price: 35000,
      originalPrice: 45000,
      image: "./products/coconut-charcoal.jpg",
      badge: "XUẤT KHẨU",
      badgeColor: "bg-stone-700",
      tagline: "Nhiệt lượng cao cháy bền 3-4 giờ - Không khói, không mùi",
      desc: "Nung yếm khí từ gáo dừa già khô, ép lục giác rỗng tâm, chuyên dùng nướng BBQ nhà hàng và xông ấm gia đình.",
      shortDesc: "Sản phẩm năng lượng xanh tái sinh từ phụ phẩm gáo dừa, giữ nhiệt độ trên 650°C kéo dài không sinh tro độc.",
      unit: "hộp 2kg",
      features: [
        "100% gáo dừa tự nhiên, hoàn toàn không pha than đá",
        "Không sinh khói, không bốc mùi cay mắt khi nướng",
        "Thời gian cháy ổn định 3 - 4 giờ liên tục",
        "Lượng tro thải cực thấp dưới 3%, an toàn thực phẩm"
      ],
      farmerName: "Xưởng than sinh học HTX Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 62
    },
    {
      id: "P20",
      name: "Xà phòng sinh học dầu dừa & cám gạo",
      category: "my-pham",
      price: 48000,
      originalPrice: 58000,
      image: "./products/coconut-soap.jpg",
      badge: "ORGANIC",
      badgeColor: "bg-emerald-700",
      tagline: "Xà phòng hóa lạnh thủ công - Dưỡng ẩm mềm mịn da",
      desc: "Chế tác thủ công từ dầu dừa ép ly tâm Song Phú và cám gạo phù sa, làm sạch dịu nhẹ không khô ráp da.",
      shortDesc: "Bánh xà phòng thiên nhiên tạo bọt mịn tơi, bổ sung vitamin E và axit lauric bảo vệ lớp màng ẩm tự nhiên của da.",
      unit: "bánh 100g",
      features: [
        "Phương pháp xà phòng hóa lạnh (cold-process) bảo toàn dưỡng chất",
        "Giàu Glycerin thực vật tự nhiên dưỡng ẩm sâu",
        "Không chứa hóa chất tạo bọt SLS/SLES hay hương liệu nhân tạo",
        "Thích hợp cho cả làn da nhạy cảm và em bé"
      ],
      farmerName: "Tổ mỹ nghệ nữ công Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 5.0,
      reviewsCount: 89
    },
    {
      id: "P21",
      name: "Mứt dừa non hoa dừa truyền thống",
      category: "thuc-pham",
      price: 68000,
      originalPrice: 80000,
      image: "./products/coconut-jam.jpg",
      badge: "ĐẶC SẢN TẾT",
      badgeColor: "bg-amber-600",
      tagline: "Cơm dừa dẻo mềm ướp mật hoa dừa - Ngọt thanh tao nhã",
      desc: "Sợi dừa non bánh tẻ dẻo mềm sên chậm cùng mật hoa dừa tự nhiên, vị ngọt thanh không gắt, thơm ngát mùi dừa quê.",
      shortDesc: "Món quà quê Nam Bộ thơm thảo cho ngày sum vầy, chế biến hoàn toàn không đường hóa học hay chất tẩy trắng.",
      unit: "hộp 250g",
      features: [
        "Tuyển chọn 100% cơm dừa non vừa tới độ dẻo mềm",
        "Vị ngọt thanh đượm hương hổ phách từ mật hoa dừa tự nhiên",
        "Không dùng phẩm màu, không chất bảo quản công nghiệp",
        "Bao bì hộp giấy mộc sang trọng làm quà biếu ý nghĩa"
      ],
      farmerName: "Nông hộ Cô Tư Mai (Ấp Song Thạnh)",
      traceBatch: "SP-MHD-2026-02",
      rating: 4.9,
      reviewsCount: 104
    },
    {
      id: "P22",
      name: "Nến thơm sáp dừa tự nhiên gáo dừa",
      category: "thu-cong",
      price: 95000,
      originalPrice: 120000,
      image: "./products/coconut-candle.jpg",
      badge: "LIFESTYLE",
      badgeColor: "bg-amber-800",
      tagline: "Sáp dừa thuần khiết bấc gỗ - Tinh dầu sả chanh thư giãn",
      desc: "Đổ trong vỏ gáo dừa mộc mạc, bấc gỗ tạo tiếng nổ lách tách ấm cúng, khuếch tán tinh dầu sả chanh thư giãn tinh thần.",
      shortDesc: "Sản phẩm sống chậm eco-chic, sáp dừa tự nhiên đốt sạch không sinh muội đen, thanh lọc không gian sống.",
      unit: "hũ gáo dừa",
      features: [
        "100% sáp dừa tự nhiên kết hợp tinh dầu thực vật nguyên chất",
        "Bấc gỗ tự nhiên phát tiếng reo tí tách ấm cúng",
        "Thời gian cháy liên tục tới 35 - 40 giờ",
        "Vỏ gáo dừa tái sử dụng làm chậu sen đá sau khi thắp hết"
      ],
      farmerName: "Tổ thủ công mỹ nghệ Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 56
    },
    {
      id: "P23",
      name: "Sữa dừa tươi nguyên chất Song Phú 300ml",
      category: "thuc-pham",
      price: 28000,
      originalPrice: 35000,
      image: "./products/coconut-milk.jpg",
      badge: "THUẦN CHAY",
      badgeColor: "bg-emerald-600",
      tagline: "Sữa hạt dừa tươi thanh trùng - Béo thanh không đường lactose",
      desc: "Ép từ cơm dừa tươi bánh tẻ thu hoạch trong ngày, tiệt trùng UHT vô trùng, giải pháp thay thế hoàn hảo cho sữa bò.",
      shortDesc: "Sữa hạt thuần thực vật béo ngậy tự nhiên, giàu axit béo MCT dễ hấp thu, thích hợp cho người dị ứng lactose.",
      unit: "chai 300ml",
      features: [
        "100% chiết xuất từ cơm dừa tươi bãi bồi Song Phú",
        "Hoàn toàn không chứa sữa bò, lactose và gluten",
        "Giàu chất béo chuỗi trung bình MCT tăng cường năng lượng",
        "Bao bì chai thủy tinh thân thiện môi trường, tái sử dụng"
      ],
      farmerName: "Xưởng chế biến sâu HTX Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 5.0,
      reviewsCount: 92
    },
    {
      id: "P24",
      name: "Cà phê sữa dừa Song Phú hòa tan",
      category: "thuc-pham",
      price: 65000,
      originalPrice: 78000,
      image: "./products/coconut-coffee.jpg",
      badge: "BÁN CHẠY",
      badgeColor: "bg-amber-600",
      tagline: "Robusta Tây Nguyên quyện cốt dừa Tam Bình - Bọt kem sánh mịn",
      desc: "Sự kết hợp hoàn hảo giữa cà phê Robusta rang mộc đậm đà và bột sữa dừa béo bùi, hương vị thơm nức khó quên.",
      shortDesc: "Từng gói cà phê hòa tan tiện lợi đánh thức ngày mới với lớp bọt kem dừa bồng bềnh và hậu vị ngọt sâu.",
      unit: "hộp 10 gói x 18g",
      features: [
        "Cà phê nguyên chất rang mộc kết hợp bột sữa dừa sấy phun",
        "Không dùng chất tạo béo nhân tạo hay dầu cọ hydro hóa",
        "Vị ngọt thanh từ mật hoa dừa tự nhiên, chỉ số GI thấp",
        "Tiện lợi pha nóng hoặc thêm đá cho ly cà phê sữa dừa mát lạnh"
      ],
      farmerName: "Tổ hợp tác chế biến HTX Song Phú",
      traceBatch: "SP-MHD-2026-02",
      rating: 4.9,
      reviewsCount: 115
    },
    {
      id: "P25",
      name: "Kẹo dừa sáp sầu riêng truyền thống",
      category: "thuc-pham",
      price: 45000,
      originalPrice: 55000,
      image: "./products/coconut-candy.jpg",
      badge: "ĐẶC SẢN",
      badgeColor: "bg-orange-600",
      tagline: "Cơm dừa sáp dẻo quánh hòa quyện sầu riêng Ri6 - Không dính răng",
      desc: "Nấu theo bí quyết gia truyền từ cơm dừa sáp cấy phôi béo ngậy và thịt sầu riêng Ri6 chín cây, dẻo mềm tan ngay đầu lưỡi.",
      shortDesc: "Món quà đặc sản Nam Bộ trứ danh, viên kẹo bọc giấy kiếng bóng bẩy, vị ngọt bùi hòa quyện nồng nàn.",
      unit: "hộp 300g",
      features: [
        "Nguyên liệu dừa sáp cấy phôi loại 1 và sầu riêng Ri6 Tam Bình",
        "Công nghệ cô đặc chậm giúp kẹo mềm dẻo không bị cứng hay dính răng",
        "Không hương liệu công nghiệp, vị thơm nức tự nhiên 100%",
        "Đóng gói giấy kiếng vệ sinh thực phẩm từng viên riêng biệt"
      ],
      farmerName: "Nghệ nhân bánh kẹo xã viên Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 148
    },
    {
      id: "P26",
      name: "Bột Matcha cốt dừa thực dưỡng",
      category: "thuc-pham",
      price: 85000,
      originalPrice: 105000,
      image: "./products/coconut-matcha.jpg",
      badge: "HEALTHY",
      badgeColor: "bg-emerald-700",
      tagline: "Trà xanh thượng hạng hòa quyện cốt dừa - Thanh lọc cơ thể",
      desc: "Trà xanh matcha vụ xuân giàu EGCG kết hợp cùng cốt dừa sấy lạnh béo thơm, tạo nên thức uống detox bổ dưỡng mỗi sáng.",
      shortDesc: "Màu xanh ngọc bích thanh tao, vị chát nhẹ tinh tế nhường chỗ cho vị ngọt béo ngậy của dòng phù sa dừa Song Phú.",
      unit: "hũ 250g",
      features: [
        "Matcha vụ xuân dồi dào chất chống oxy hóa EGCG và L-Theanine",
        "Cốt dừa sấy lạnh giữ trọn vitamin và khoáng chất vi lượng",
        "Không đường hóa học, hương vị ngọt hậu tự nhiên",
        "Dễ dàng pha matcha latte nóng hoặc pha sinh tố đá xay"
      ],
      farmerName: "Xưởng chế biến sâu HTX Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.8,
      reviewsCount: 67
    },
    {
      id: "P27",
      name: "Sữa chua dừa lên men thuần thực vật",
      category: "thuc-pham",
      price: 36000,
      originalPrice: 45000,
      image: "./products/coconut-yogurt.jpg",
      badge: "PROBIOTIC",
      badgeColor: "bg-teal-600",
      tagline: "Lên men men sống Bifidus - Hỗ trợ hệ vi sinh đường ruột",
      desc: "Sữa chua thuần chay từ nước cốt dừa tươi lên men men sống probiotic, bổ sung vi khuẩn có lợi cho hệ tiêu hóa.",
      shortDesc: "Chất kem sánh mịn màng, vị chua thanh thanh thơm mát, ăn kèm dừa nướng giòn rụm và mật hoa dừa ngọt dịu.",
      unit: "hũ thủy tinh 180g",
      features: [
        "100% nguồn gốc thực vật từ sữa dừa tươi Song Phú",
        "Chứa hàng tỷ lợi khuẩn sống Lactobacillus & Bifidobacterium",
        "Không sữa bò, không cholesterol, không chất làm đặc nhân tạo",
        "Món tráng miệng ăn sáng lành mạnh cho cả gia đình"
      ],
      farmerName: "Tổ chế biến sinh học HTX Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.9,
      reviewsCount: 81
    },
    {
      id: "P28",
      name: "Bơ dừa tươi nguyên chất organic",
      category: "thuc-pham",
      price: 72000,
      originalPrice: 88000,
      image: "./products/coconut-butter.jpg",
      badge: "KETO FOOD",
      badgeColor: "bg-amber-700",
      tagline: "Xay mịn toàn phần cơm dừa già - Bơ thực vật siêu dinh dưỡng",
      desc: "Nghiền mịn nguyên hạt từ cơm dừa khô tuyển chọn, giữ nguyên chất béo thực vật lành mạnh và chất xơ tự nhiên.",
      shortDesc: "Bơ phết dừa mịn màng, thay thế bơ động vật phết bánh mì nướng, làm bánh quy thực dưỡng hoặc pha cà phê keto.",
      unit: "hũ thủy tinh 200g",
      features: [
        "100% cơm dừa nguyên chất, không tách béo hay thêm dầu thực vật",
        "Nguồn chất béo thực vật lành mạnh và chất xơ dồi dào",
        "Mùi thơm nức tự nhiên từ dừa bãi bồi Tam Bình",
        "Hỗ trợ chế độ ăn Eat Clean, Keto và thuần chay Vegan"
      ],
      farmerName: "Tổ hợp tác chế biến Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 54
    },
    {
      id: "P29",
      name: "Son dưỡng môi sinh học dầu dừa & sáp ong",
      category: "my-pham",
      price: 35000,
      originalPrice: 45000,
      image: "./products/coconut-lip-balm.jpg",
      badge: "ECO BEAUTY",
      badgeColor: "bg-rose-600",
      tagline: "Dầu dừa ly tâm phối sáp ong rừng - Dưỡng môi hồng mềm mại",
      desc: "Công thức dưỡng ẩm môi từ dầu dừa tinh khiết và sáp ong tự nhiên, chống nứt nẻ, mang lại đôi môi căng mọng.",
      shortDesc: "Thỏi son dưỡng mộc mạc vỏ giấy kraft thân thiện môi trường, an toàn tuyệt đối ngay cả khi nuốt phải.",
      unit: "thỏi 5g",
      features: [
        "100% thành phần ăn được: Dầu dừa ly tâm, sáp ong, dầu gấc tự nhiên",
        "Cấp ẩm sâu, trị thâm môi và nứt nẻ do thời tiết hanh khô",
        "Không chì, không chất bảo quản paraben, không hương liệu hóa học",
        "Bao bì thỏi giấy kraft phân hủy sinh học bảo vệ môi trường"
      ],
      farmerName: "Tổ mỹ nghệ nữ công Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 5.0,
      reviewsCount: 130
    },
    {
      id: "P30",
      name: "Kem ủ tóc phục hồi tinh chất dầu dừa & vỏ bưởi",
      category: "my-pham",
      price: 135000,
      originalPrice: 165000,
      image: "./products/coconut-hair-mask.jpg",
      badge: "PHỤC HỒI",
      badgeColor: "bg-emerald-700",
      tagline: "Thấm sâu từng sợi tóc - Giảm gãy rụng và kích thích mọc tóc",
      desc: "Kết hợp tinh chất dầu dừa ép lạnh giàu axit lauric và tinh dầu vỏ bưởi Tam Bình, phục hồi tóc xơ rối chẻ ngọn.",
      shortDesc: "Chất kem ủ tóc mềm mịn đưa dưỡng chất nuôi dưỡng nang tóc từ gốc đến ngọn, lưu hương hoa bưởi dừa dịu nhẹ.",
      unit: "hũ 250g",
      features: [
        "Tinh chất dầu dừa ly tâm thẩm thấu sâu vào lõi tóc",
        "Tinh dầu vỏ bưởi Tam Bình kích thích mọc tóc con dày mượt",
        "Không chứa silicon gây bít tắc chân tóc, không paraben",
        "Cảm nhận mái tóc bồng bềnh óng ả ngay sau 3 lần ủ"
      ],
      farmerName: "Xưởng chế biến sâu HTX Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.9,
      reviewsCount: 112
    },
    {
      id: "P31",
      name: "Tẩy tế bào chết đường hoa dừa & cơm dừa",
      category: "my-pham",
      price: 115000,
      originalPrice: 140000,
      image: "./products/coconut-body-scrub.jpg",
      badge: "SPA ORGANIC",
      badgeColor: "bg-amber-700",
      tagline: "Hạt đường hoa dừa mát-xa dịu êm - Da sáng mịn màng",
      desc: "Tẩy da chết sinh học từ tinh thể đường hoa dừa không sinh nhiệt và cơm dừa già nghiền nhỏ, lưu giữ làn da sáng mướt.",
      shortDesc: "Từng hạt scrub nâu vàng ấm áp nhẹ nhàng lấy đi lớp sừng già cỗi, đồng thời bù ẩm tức thì bằng tinh chất dầu dừa.",
      unit: "hũ 280g",
      features: [
        "Tinh thể đường hoa dừa tự nhiên giàu khoáng vi lượng",
        "Cơm dừa xay mịn cung cấp axit béo dưỡng ẩm tức thì",
        "Hương thơm mật hoa dừa ngọt ngào thư giãn như ở spa",
        "Hoàn toàn phân hủy sinh học, không vi hạt nhựa microplastic"
      ],
      farmerName: "Nông hộ Trần Thị Mai (Cô Tư Mai)",
      traceBatch: "SP-MHD-2026-02",
      rating: 5.0,
      reviewsCount: 88
    },
    {
      id: "P32",
      name: "Serum tinh chất dưỡng ẩm nước dừa tươi",
      category: "my-pham",
      price: 165000,
      originalPrice: 195000,
      image: "./products/coconut-serum.jpg",
      badge: "CAO CẤP",
      badgeColor: "bg-sky-600",
      tagline: "Nước dừa tươi lên men sinh học Bionano - Cấp nước tức thì",
      desc: "Chiết xuất phân tử nano từ nước dừa tươi Song Phú, bổ sung khoáng chất và axit hyaluronic tự nhiên cho làn da căng bóng.",
      shortDesc: "Giọt serum trong veo như sương mai thẩm thấu siêu tốc, kiểm soát dầu nhờn và củng cố hàng rào bảo vệ da.",
      unit: "chai 50ml",
      features: [
        "Hơn 85% thành phần là dịch chiết nước dừa tươi lên men",
        "Cung cấp khoáng vi lượng Kali, Natri, Kẽm cân bằng pH da",
        "Kết cấu lỏng nhẹ như nước, thấm nhanh không bóng nhờn",
        "Đạt chuẩn kiểm nghiệm an toàn da liễu cho mọi loại da"
      ],
      farmerName: "Xưởng chế biến sâu HTX Song Phú",
      traceBatch: "SP-DDL-2026-03",
      rating: 4.9,
      reviewsCount: 96
    },
    {
      id: "P33",
      name: "Bộ dao muỗng nĩa đũa gỗ dừa già",
      category: "thu-cong",
      price: 85000,
      originalPrice: 110000,
      image: "./products/coconut-cutlery.jpg",
      badge: "ECO LIVING",
      badgeColor: "bg-amber-800",
      tagline: "Gỗ dừa lão trên 30 năm tuổi - Chống mốc, vân sọc tự nhiên",
      desc: "Gọt đẽo từ thân gỗ dừa già đanh chắc, lau dầu dừa bóng tự nhiên, thay thế hoàn toàn đồ dùng một lần nhựa độc hại.",
      shortDesc: "Bộ dụng cụ ăn uống sống xanh vintage, từng đường vân gỗ sọc nâu đen tự nhiên độc bản sang trọng.",
      unit: "bộ 4 món",
      features: [
        "Chế tác từ thân cây dừa già trên 30 năm tuổi siêu cứng cáp",
        "Đánh bóng bằng dầu dừa nguyên chất, không ngâm hóa chất chống mốc",
        "Có thể rửa sạch và tái sử dụng hàng nghìn lần bền bỉ",
        "Tặng kèm túi vải canvas đựng đồ tiện mang đi làm hoặc dã ngoại"
      ],
      farmerName: "Làng nghề mộc dừa Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 73
    },
    {
      id: "P34",
      name: "Thảm xơ dừa sinh thái chùi chân đan tay",
      category: "vat-lieu",
      price: 75000,
      originalPrice: 95000,
      image: "./products/coconut-mat.jpg",
      badge: "XUẤT KHẨU",
      badgeColor: "bg-stone-700",
      tagline: "Sợi chỉ xơ dừa bện xoắn tự nhiên - Gạt sạch bụi bẩn chống trượt",
      desc: "Đan thủ công từ sợi chỉ xơ dừa Song Phú dày dặn, độ bền vượt trội chịu mưa nắng, chống trượt an toàn cho lối vào nhà.",
      shortDesc: "Thảm xơ dừa tự nhiên mang nét mộc mạc cho hiên nhà, giữ sạch nền nhà và phân hủy sinh học 100% sau tuổi thọ sử dụng.",
      unit: "tấm 40x60cm",
      features: [
        "100% sợi xơ dừa tự nhiên bện xoắn dây thừng chịu lực cao",
        "Gạt sạch bùn đất, bụi bẩn đế giày dép hiệu quả vượt trội",
        "Khô ráo nhanh chóng dưới nắng, không giữ nước ẩm mốc",
        "Tạo sinh kế bền vững cho hàng chục hộ đan thảm địa phương"
      ],
      farmerName: "Tổ xơ dừa xuất khẩu Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.8,
      reviewsCount: 59
    },
    {
      id: "P35",
      name: "Chậu ươm sinh học tự phân hủy từ xơ dừa",
      category: "vat-lieu",
      price: 25000,
      originalPrice: 32000,
      image: "./products/coconut-planter.jpg",
      badge: "NÔNG NGHIỆP XANH",
      badgeColor: "bg-lime-600",
      tagline: "Trồng thẳng xuống đất không cần bóc chậu - Bảo vệ rễ tơ",
      desc: "Ép từ mụn dừa và xơ dừa tiệt trùng mầm bệnh, rễ cây đâm xuyên qua thành chậu dễ dàng, tự phân hủy thành mùn hữu cơ.",
      shortDesc: "Giải pháp ươm cây xanh đột phá cho nhà vườn hoa kiểng, không rách rễ chấn động khi sang bầu đất trồng.",
      unit: "lốc 10 chậu",
      features: [
        "Nguyên liệu mụn dừa và chỉ xơ dừa xử lý sạch chất chát Tanin",
        "Rễ cây con đâm xuyên thành chậu tự nhiên, tỷ lệ sống 99%",
        "Trồng thẳng cả chậu xuống đất, tự phân hủy thành mùn bón cây",
        "Thay thế hoàn toàn bầu ươm túi nilon đen gây ô nhiễm đất"
      ],
      farmerName: "Xưởng phụ phẩm sinh học Song Phú",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.9,
      reviewsCount: 84
    },
    {
      id: "P36",
      name: "Bình nước & ca nước gáo dừa chạm hoa sen",
      category: "thu-cong",
      price: 155000,
      originalPrice: 190000,
      image: "./products/coconut-water-dispenser.jpg",
      badge: "MỸ NGHỆ",
      badgeColor: "bg-teal-700",
      tagline: "Gáo dừa chọn lọc chạm khắc hoa sen Nam Bộ - Nghệ thuật mộc",
      desc: "Nghệ nhân Nam Bộ chạm trổ tỉ mỉ hoa sen trên gáo dừa già bóng, có vòi rót và quai cầm bằng cành dừa thanh thoát.",
      shortDesc: "Vật phẩm trang trí bàn trà và phòng khách đậm đà bản sắc sông nước miền Tây, tinh tế và ấm cúng.",
      unit: "bộ 1 bình + 1 ca",
      features: [
        "Tuyển chọn gáo dừa già cân đối, dày vỏ và không tì vết",
        "Chạm khắc thủ công hoa sen tinh xảo bởi nghệ nhân lão thành",
        "Bên trong tráng sáp ong tự nhiên chống thấm nước an toàn",
        "Món quà lưu niệm văn hóa độc đáo cho bạn bè quốc tế"
      ],
      farmerName: "Tổ mỹ nghệ điêu khắc gáo dừa Tam Bình",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 47
    },
    {
      id: "P37",
      name: "Dép xơ dừa thoáng khí phong cách spa",
      category: "thu-cong",
      price: 68000,
      originalPrice: 85000,
      image: "./products/coconut-slippers.jpg",
      badge: "ECO CHIC",
      badgeColor: "bg-amber-800",
      tagline: "Chiếu xơ dừa mát-xa huyệt bàn chân - Mát dịu êm ái",
      desc: "Mặt dép đan từ chiếu xơ dừa kích thích tuần hoàn máu lòng bàn chân, quai vải lanh mộc mạc, nhẹ êm khi đi trong nhà.",
      shortDesc: "Đôi dép sinh thái mang lại cảm giác thư thái tựa spa miệt vườn, hút ẩm tốt giúp chân luôn khô thoáng dễ chịu.",
      unit: "đôi",
      features: [
        "Lòng dép đan từ sợi xơ dừa tạo độ ma sát nhẹ mát-xa huyệt đạo",
        "Quai vải lanh tự nhiên mềm mại không gây cọ xát da chân",
        "Đế cao su tái chế chống trơn trượt hiệu quả",
        "Rất được ưa chuộng tại các khu nghỉ dưỡng sinh thái và spa"
      ],
      farmerName: "Làng nghề đan đát truyền thống Tam Bình",
      traceBatch: "SP-DXL-2026-01",
      rating: 4.8,
      reviewsCount: 63
    },
    {
      id: "P38",
      name: "Bộ ấm chén trà gỗ dừa già nguyên khối",
      category: "thu-cong",
      price: 290000,
      originalPrice: 350000,
      image: "./products/coconut-teaset.jpg",
      badge: "THƯỢNG PHẨM",
      badgeColor: "bg-amber-900",
      tagline: "Gỗ dừa hóa thạch trên 50 năm tuổi - Tinh hoa trà đạo Nam Bộ",
      desc: "Chế tác thủ công từ gốc gỗ dừa già trên nửa thế kỷ, thớ gỗ sọc đen bóng loáng như đá hoa cương, giữ nhiệt trà thơm ngát.",
      shortDesc: "Bộ ấm chén đỉnh cao nghệ thuật mộc dừa gồm 1 ấm trà, 1 khay gỗ dừa và 4 chén trà chạm khắc sắc nét.",
      unit: "bộ 6 món",
      features: [
        "Tiện từ thân cây dừa già trên 50 năm tuổi vân gỗ sắc nét tuyệt mỹ",
        "Chà nhám thủ công 9 cấp độ đạt độ bóng gương tự nhiên",
        "Giữ nhiệt độ nước trà ấm lâu, tăng vị đượm của lá trà ngon",
        "Đóng hộp quà gấm sang trọng phục vụ quà tặng đối tác ngoại giao"
      ],
      farmerName: "Nghệ nhân gỗ dừa di sản Tam Bình",
      traceBatch: "SP-DXL-2026-01",
      rating: 5.0,
      reviewsCount: 76
    }
  ],

  // 8 ảnh sản xuất thực tế xếp 2 hàng x 4 cột như Ảnh 1
    productionImages: [
    { title: "Vựa thu mua dừa tươi xã viên", image: "./products/farm-coconut-grove.jpg" },
    { title: "Khu vực phân loại dừa theo tiêu chuẩn OCOP", image: "./products/factory-processing.jpg" },
    { title: "Xe container lạnh đóng dừa xuất khẩu", image: "./products/diamond-coconut.jpg" },
    { title: "Khu giàn phơi xơ dừa sinh thái", image: "./products/farm-coir-drying.jpg" },
    { title: "Xưởng đóng gói bảo quản mát", image: "./products/factory-processing.jpg" },
    { title: "Kiểm tra chất lượng cơm dừa trước ép ly tâm", image: "./products/factory-cold-press.jpg" },
    { title: "Bao buồng dừa xiêm hữu cơ trên cây", image: "./products/farm-harvest-farmer.jpg" },
    { title: "Vườn dừa mẫu VietGAP xã Song Phú", image: "./products/farm-flower-nectar.jpg" }
  ],

  // 9 bài viết Bộ Sưu Tập như Ảnh 4
    collections: [
    {
      id: 1,
      date: "August 7, 2026",
      category: "Bộ Sưu Tập",
      title: "VIỆT NAM LÀ THỊ TRƯỜNG CUNG CẤP CÁC SẢN PHẨM DỪA XẾP THỨ HÀNG ĐẦU CHO HOA KỲ",
      desc: "Các sản phẩm dừa chế biến sâu của Đồng bằng sông Cửu Long đang được người tiêu dùng quốc tế đặc biệt ưa chuộng nhờ hương vị tự nhiên và giá trị dinh dưỡng cao.",
      image: "./products/diamond-coconut.jpg"
    },
    {
      id: 2,
      date: "August 7, 2026",
      category: "Bộ Sưu Tập",
      title: "DẦU DỪA ÉP LẠNH LY TÂM ĐƯỢC NGƯỜI TIÊU DÙNG ANH ĐÓN NHẬN TÍCH CỰC",
      desc: "Lô hàng dầu dừa nguyên chất không gia nhiệt của HTX Dừa Song Phú được đánh giá cao tại các hội chợ nông sản hữu cơ London nhờ giữ trọn axit lauric tự nhiên.",
      image: "./products/factory-cold-press.jpg"
    },
    {
      id: 3,
      date: "August 7, 2026",
      category: "Bộ Sưu Tập",
      title: "MẬT HOA DỪA CÓ CÔNG DỤNG GÌ? NHỮNG LỢI ÍCH TUYỆT VỜI CHO SỨC KHỎE",
      desc: "Mật hoa dừa là chất tạo ngọt thực dưỡng tự nhiên có chỉ số đường huyết thấp, giàu khoáng chất Kali và Magie, bảo vệ tim mạch và nâng cao sức đề kháng.",
      image: "./products/farm-flower-nectar.jpg"
    },
    {
      id: 4,
      date: "August 7, 2026",
      category: "Bộ Sưu Tập",
      title: "DỪA SÁP CẤY PHÔI TAM BÌNH: ĐẶC SẢN THƯỢNG HẠNG VƯƠN XA",
      desc: "Kỹ thuật cấy phôi tiên tiến giúp tỷ lệ sáp đạt trên 85%, mở ra cơ hội làm giàu mới cho các hộ nông dân trồng dừa trên vùng đất phù sa bãi bồi Song Phú.",
      image: "./products/wax-coconut.jpg"
    },
    {
      id: 5,
      date: "August 7, 2026",
      category: "Bộ Sưu Tập",
      title: "BẢO QUẢN VÀ CHẾ BIẾN DỪA XIÊM SAU THU HOẠCH",
      desc: "Công nghệ gọt kim cương và bọc màng sinh học giúp bảo quản dừa tươi giữ nguyên độ ngọt mát trong 45 ngày mà không dùng bất kỳ hóa chất tẩy trắng nào.",
      image: "./products/factory-processing.jpg"
    },
    {
      id: 6,
      date: "August 2, 2026",
      category: "Bộ Sưu Tập",
      title: "THAM QUAN NÔNG TRẠI DỪA CỦA HTX DỪA SONG PHÚ",
      desc: "Đoàn đại biểu các tỉnh bạn ghé thăm mô hình kinh tế tuần hoàn và chuỗi giá trị dừa sạch không rác thải tại xã Song Phú, huyện Tam Bình.",
      image: "./products/farm-coconut-grove.jpg"
    },
    {
      id: 7,
      date: "August 2, 2026",
      category: "Bộ Sưu Tập",
      title: "TRẢI NGHIỆM VƯỜN DỪA HỮU CƠ VEN KINH THẦY CAI",
      desc: "Du khách trong và ngoài nước thích thú trải nghiệm chèo xuồng ba lá, tự tay hái dừa xiêm ngọt lịm và thưởng thức các món ăn dân dã miệt vườn Nam Bộ.",
      image: "./products/farm-harvest-farmer.jpg"
    },
    {
      id: 8,
      date: "August 2, 2026",
      category: "Bộ Sưu Tập",
      title: "NÔNG TRẠI DỪA SINH THÁI KHÔNG THUỐC DIỆT CỎ",
      desc: "Bà con nông dân nuôi thả ốc bươu và cá trong mương dừa để hạn chế sâu bọ, đồng thời cắt cỏ phủ gốc giữ ẩm giúp đất phù sa luôn tơi xốp màu mỡ.",
      image: "./products/green-coconut.jpg"
    },
    {
      id: 9,
      date: "August 2, 2026",
      category: "Bộ Sưu Tập",
      title: "QUY TRÌNH XỬ LÝ DỪA THƯƠNG PHẨM XUẤT KHẨU",
      desc: "Từng trái dừa sau khi thu hái được cân đo độ ngọt brix, rửa sạch bằng nước ozon, dán tem QR truy xuất nguồn gốc số trước khi đóng thùng xốp.",
      image: "./products/factory-cold-press.jpg"
    }
  ],

  // 8 chứng nhận như Ảnh 5
    certifications: [
    {
      code: "VN-DNCB-0087",
      title: "MÃ VÙNG TRỒNG",
      desc: "Chứng nhận cấp mã số vùng trồng dừa xiêm và dừa sáp xuất khẩu chính ngạch: VN-DNCB-0087 do Cục Bảo vệ thực vật cấp.",
      image: "./products/cert-ocop-diploma.jpg"
    },
    {
      code: "AFI-2024",
      title: "AFI STANDARD",
      desc: "Tiêu chuẩn quốc tế AFI Standard cho các sản phẩm cơm dừa sấy khô và phụ phẩm dừa xuất khẩu sang thị trường Bắc Mỹ.",
      image: "./products/cert-iso-haccp.jpg"
    },
    {
      code: "VINACONTROL-01",
      title: "CHỨNG NHẬN VINACONTROL",
      desc: "Phiếu kết quả thử nghiệm vi sinh và dư lượng kim loại nặng 0.00% từ tổ chức giám định độc lập Vinacontrol.",
      image: "./products/cert-iso-haccp.jpg"
    },
    {
      code: "ATTP-VL-2024",
      title: "CƠ SỞ AN TOÀN THỰC PHẨM",
      desc: "Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm trong sơ chế, chế biến và đóng gói nông sản do Chi cục QLCL Vĩnh Long cấp.",
      image: "./products/cert-ocop-diploma.jpg"
    },
    {
      code: "ISO-22000-2018",
      title: "TIÊU CHUẨN ISO 22000:2018",
      desc: "Hệ thống quản lý an toàn thực phẩm quốc tế cho phạm vi: Chế biến các loại nước dừa tươi, dầu dừa ly tâm và cơm dừa sấy.",
      image: "./products/cert-iso-haccp.jpg"
    },
    {
      code: "HACCP-CERT",
      title: "TIÊU CHUẨN HACCP",
      desc: "Hệ thống phân tích mối nguy và điểm kiểm soát tới hạn theo tiêu chuẩn TCVN 5603:2008 cho toàn bộ dây chuyền sản xuất dừa.",
      image: "./products/cert-iso-haccp.jpg"
    },
    {
      code: "GS1-89385",
      title: "MÃ SỐ MÃ VẠCH GS1",
      desc: "Giấy chứng nhận quyền sử dụng mã số mã vạch quốc gia GS1 Việt Nam cho 100% dòng sản phẩm mang thương hiệu SOCOOP.",
      image: "./products/cert-ocop-diploma.jpg"
    },
    {
      code: "NOIP-VN-2024",
      title: "SỞ HỮU TRÍ TUỆ SOCOOP",
      desc: "Giấy chứng nhận đăng ký nhãn hiệu độc quyền HỢP TÁC XÃ DỪA SONG PHÚ do Cục Sở Hữu Trí Tuệ cấp bảo hộ toàn quốc.",
      image: "./products/cert-ocop-diploma.jpg"
    }
  ],

  // Sơ đồ kinh tế tuần hoàn cây dừa (Zero Waste)
  circularEconomyParts: [
    {
      part: "Cơm Dừa (Thịt Dừa)",
      percentage: "28%",
      products: ["Dầu dừa ép lạnh ly tâm", "Cơm dừa sấy giòn OCOP", "Sữa dừa nguyên chất", "Bột cốt dừa"],
      valueAdded: "Tăng giá trị gấp 4.5 lần so với bán dừa trái thô",
      process: "Thu hoạch dừa già -> Tách cơm tươi trong 4 giờ -> Ly tâm lạnh không sinh nhiệt -> Tách dầu và bã làm thức ăn giàu đạm cho gia súc."
    },
    {
      part: "Nước Dừa Tươi",
      percentage: "25%",
      products: ["Dừa xiêm gọt kim cương", "Thạch dừa sinh học Bionano", "Nước dừa đóng lon tiệt trùng UHT"],
      valueAdded: "Giữ trọn vi khoáng bù điện giải tự nhiên",
      process: "Nước dừa tươi lên men vi sinh Acetobacter xylinum tạo màng cellulose sinh học (mặt nạ dưỡng da và thạch dừa)."
    },
    {
      part: "Gáo Dừa (Sọ Dừa)",
      percentage: "15%",
      products: ["Than hoạt tính gáo dừa lọc nước", "Bát thìa mỹ nghệ gáo dừa", "Nhang muỗi sinh học gáo dừa"],
      valueAdded: "Biến phụ phẩm đốt bỏ thành sản phẩm xuất khẩu giá cao",
      process: "Gáo dừa già chọn lọc được mài bóng làm đồ thủ công; phần vụn nung lò yếm khí thành than gáo dừa hoạt tính hóa hơi nước."
    },
    {
      part: "Vỏ & Xơ Dừa",
      percentage: "30%",
      products: ["Chỉ xơ dừa bện thảm chống xói mòn", "Viên nén mụn dừa nở", "Đệm xơ dừa sinh thái"],
      valueAdded: "Ứng dụng hàng đầu trong nông nghiệp công nghệ cao và cải tạo đất",
      process: "Máy bóc tách vỏ dừa thành chỉ dài xuất khẩu và mụn dừa; mụn dừa được xử lý khử chát EC < 0.5 mS/cm để làm giá thể."
    },
    {
      part: "Búp Hoa Dừa",
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
      image: "./products/diamond-coconut.jpg"
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
      image: "./products/virgin-coconut-oil.jpg"
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
      image: "./products/coconut-nectar.jpg"
    },
    // Batch code aliases supporting standard and shorthand lookup schemes
    "SP-2026-01": {
      batchCode: "SP-2026-01",
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
      image: "./products/diamond-coconut.jpg"
    },
    "SP-2026-03": {
      batchCode: "SP-2026-03",
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
      image: "./products/virgin-coconut-oil.jpg"
    },
    "SP-2026-08": {
      batchCode: "SP-2026-08",
      productName: "Dừa Xiêm Lửa Song Phú Gọt Kim Cương (Lô Tuyển Chọn)",
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
      image: "./products/diamond-coconut.jpg"
    },
    "SP-2026-02": {
      batchCode: "SP-2026-02",
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
      image: "./products/coconut-nectar.jpg"
    }
  },

  // Cơ sở tri thức cho AI Assistant CoCo
  aiKnowledge: [
    {
      keywords: ["chào", "hello", "hi", "bạn là ai", "htx dừa song phú", "giới thiệu"],
      answer: "Dạ em chào quý anh/chị! Em là **Bé CoCo** 🌴 - Trợ lý Ảo Nông Nghiệp của **Hợp Tác Xã Dừa Song Phú** (Tam Bình, Vĩnh Long). Em có thể giúp anh/chị tìm hiểu sản phẩm dừa OCOP, tra cứu nguồn gốc nông sản, tư vấn cách dùng dầu dừa/mật hoa dừa hoặc hỗ trợ đặt hàng sỉ lẻ ạ!",
      recommendedProductIds: ["P07", "P13"]
    },
    {
      keywords: ["giá", "mua", "đặt hàng", "ship", "vận chuyển", "giao hàng"],
      answer: "Dạ HTX Song Phú có chính sách giao hàng toàn quốc:\n- **Nội tỉnh Vĩnh Long & lân cận**: Giao nhanh trong 24h, miễn phí đơn từ 250k.\n- **Toàn quốc**: Giao từ 2-3 ngày, đóng gói cẩn thận chống va đập.\n- **Đơn dừa tươi gọt kim cương**: Ship hỏa tốc giữ lạnh để đảm bảo độ ngọt tươi ngon nhất.\nAnh/chị chỉ cần bấm 'Thêm vào giỏ' hoặc để lại số điện thoại, bên em sẽ liên hệ ngay ạ!",
      recommendedProductIds: ["P07", "P13", "P14"]
    },
    {
      keywords: ["dầu dừa", "ép lạnh", "ly tâm", "dưỡng da", "dưỡng tóc", "uống"],
      answer: "Dạ Dầu dừa Song Phú được chiết xuất bằng **công nghệ ly tâm 3 pha không qua xử lý nhiệt**, nên giữ nguyên được hơn **51.8% Axit Lauric** quý giá! 🥥\n- **Dưỡng da**: Thoa một lớp mỏng buổi tối giúp cấp ẩm sâu và chống oxy hóa.\n- **Ủ tóc**: Ủ chân tóc 15-20 phút trước khi gội giúp giảm gãy rụng rõ rệt.\n- **Uống bảo vệ sức khỏe**: Uống 1 thìa cà phê mỗi sáng ấm giúp kháng khuẩn đường ruột.",
      recommendedProductIds: ["P13"]
    },
    {
      keywords: ["mật hoa", "mật hoa dừa", "tiểu đường", "ăn kiêng", "ngọt"],
      answer: "Dạ **Mật hoa dừa cô đặc Song Phú** là chất tạo ngọt thực dưỡng tự nhiên có chỉ số đường huyết thấp (**GI chỉ ~35 - 40** so với đường mía là 65-70). Rất dồi dào khoáng chất Kali, Natri, Magie và các axit amin, cực kỳ an toàn và thích hợp cho người tiểu đường nhẹ, người tập gym, ăn kiêng và trẻ nhỏ!",
      recommendedProductIds: ["P14", "P04"]
    },
    {
      keywords: ["dừa xiêm", "kim cương", "dừa gọt", "dừa xiêm lửa", "xiêm lửa", "đặc biệt"],
      answer: "Dạ **Dừa xiêm lửa Song Phú gọt kim cương** là sản phẩm OCOP tiêu biểu được tuyển chọn từ những cây dừa 15-20 năm tuổi trồng ven sông Mang Thít bãi bồi Tam Bình! 💎🥥\n- **Hương vị**: Nước ngọt thanh đậm đà, độ đường tự nhiên Brix từ 8.0 - 8.8°, cơm dừa dẻo bùi vừa miệng.\n- **Gọt đa giác kim cương**: Vỏ gọt tạo hình đa giác tinh tế, tiệt trùng bằng ozon và bọc màng co thực phẩm hút chân không, bảo quản ngăn mát tủ lạnh lên tới 45 ngày mà vẫn tươi nguyên như mới hái.\n- **Tiện lợi**: Đã tạo sẵn mắt cắm ống hút, chỉ cần 1 thao tác nhấn nhẹ là thưởng thức ngay nguồn khoáng chất điện giải tự nhiên tuyệt vời!",
      recommendedProductIds: ["P07", "P06"]
    },
    {
      keywords: ["truy xuất", "nguồn gốc", "vietgap", "ocop", "mã qr"],
      answer: "Dạ 100% sản phẩm của HTX Dừa Song Phú đều có tem truy xuất số Blockchain. Anh/chị có thể nhập mã lô hàng như `SP-DXL-2026-01` hoặc `SP-DDL-2026-03` tại mục **Truy Xuất Nguồn Gốc** trên website để xem tên hộ xã viên, nhật ký thu hoạch và chứng chỉ kiểm nghiệm ạ!",
      recommendedProductIds: ["P07", "P13"]
    },
    {
      keywords: ["sỉ", "b2b", "xuất khẩu", "đại lý", "hợp tác"],
      answer: "Dạ HTX Song Phú luôn sẵn sàng hợp tác cung ứng số lượng lớn dừa tươi, dầu dừa ly tâm, than gáo dừa và giá thể xơ dừa cho các doanh nghiệp, chuỗi siêu thị và đối tác xuất khẩu. Vui lòng bấm vào mục **Báo Giá B2B** trên menu hoặc gọi Hotline Giám đốc: **0918 268 379** để nhận bảng giá chiết khấu ưu đãi nhất ạ!",
      recommendedProductIds: ["P01", "P15"]
    }
  ]
};
