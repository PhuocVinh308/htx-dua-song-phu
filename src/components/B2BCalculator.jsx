import React, { useState } from 'react';
import { Calculator, CheckCircle2, TrendingDown, Package, Ship, ArrowRight, Sparkles } from 'lucide-react';

export default function B2BCalculator({ onApplyToForm }) {
  const products = [
    { id: 'diamond-coconut', name: 'Dừa xiêm gọt kim cương OCOP 4 sao', basePrice: 32000, perBox: 9, weightKg: 1.1, unit: 'trái' },
    { id: 'cold-press-oil', name: 'Dầu dừa ép lạnh ly tâm 500ml', basePrice: 180000, perBox: 24, weightKg: 0.6, unit: 'chai' },
    { id: 'flower-nectar', name: 'Mật hoa dừa tự nhiên OCOP 250g', basePrice: 135000, perBox: 24, weightKg: 0.4, unit: 'hũ' },
    { id: 'coconut-chips', name: 'Cơm dừa sấy giòn OCOP 100g', basePrice: 45000, perBox: 50, weightKg: 0.12, unit: 'gói' },
    { id: 'wax-coconut', name: 'Dừa sáp Tam Bình cấy phôi đặc sản', basePrice: 220000, perBox: 6, weightKg: 1.5, unit: 'trái' },
  ];

  const [selectedProductId, setSelectedProductId] = useState('diamond-coconut');
  const [quantity, setQuantity] = useState(500);

  const selectedProd = products.find((p) => p.id === selectedProductId) || products[0];

  // Tỷ lệ chiết khấu theo sản lượng
  let discountPercent = 0;
  let tierName = 'Đơn hàng nhỏ';
  if (quantity >= 50 && quantity < 200) {
    discountPercent = 5;
    tierName = 'Đại lý Cấp 2';
  } else if (quantity >= 200 && quantity < 1000) {
    discountPercent = 12;
    tierName = 'Đại lý Cấp 1 & Chuỗi F&B';
  } else if (quantity >= 1000 && quantity < 5000) {
    discountPercent = 18;
    tierName = 'Nhà Phân Phối Vùng';
  } else if (quantity >= 5000) {
    discountPercent = 25;
    tierName = 'Đối Tác Xuất Khẩu Container (FOB/CIF)';
  }

  const baseTotal = selectedProd.basePrice * quantity;
  const unitDiscountPrice = Math.round(selectedProd.basePrice * (1 - discountPercent / 100));
  const totalAfterDiscount = unitDiscountPrice * quantity;
  const savings = baseTotal - totalAfterDiscount;

  const totalBoxes = Math.ceil(quantity / selectedProd.perBox);
  const totalWeightTon = ((quantity * selectedProd.weightKg) / 1000).toFixed(2);

  const handleApply = () => {
    if (onApplyToForm) {
      onApplyToForm({
        productName: selectedProd.name,
        quantity,
        unitPrice: unitDiscountPrice,
        total: totalAfterDiscount,
        tierName,
        note: `Ước tính sản lượng: ${quantity.toLocaleString('vi-VN')} ${selectedProd.unit} (~${totalBoxes} thùng, ${totalWeightTon} tấn). Chiết khấu: ${discountPercent}%. Giá sỉ dự kiến: ${unitDiscountPrice.toLocaleString('vi-VN')} ₫/${selectedProd.unit}.`
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 font-sans mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-emerald-950">
              Bảng Tính Chiết Khấu Giá Sỉ & Dự Toán Xuất Khẩu B2B
            </h3>
            <p className="text-xs text-gray-500">
              Công cụ tính giá sỉ tự động theo cấp sản lượng cung ứng từ HTX Dừa Song Phú
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
          Cấp bậc: {tierName} (-{discountPercent}%)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              1. Chọn dòng sản phẩm sỉ / xuất khẩu
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs sm:text-sm font-semibold bg-gray-50"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — Niêm yết: {p.basePrice.toLocaleString('vi-VN')} ₫/{p.unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase">
                2. Sản lượng dự kiến / tháng:
              </label>
              <span className="font-mono font-black text-base sm:text-lg text-emerald-800">
                {quantity.toLocaleString('vi-VN')} {selectedProd.unit}
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="20000"
              step="50"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { label: '100', val: 100 },
                { label: '500', val: 500 },
                { label: '2.000', val: 2000 },
                { label: '5.000', val: 5000 },
                { label: '1 Container (18.000)', val: 18000 },
              ].map((btn) => (
                <button
                  key={btn.val}
                  type="button"
                  onClick={() => setQuantity(btn.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    quantity === btn.val
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logistics specs */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[11px]">Đóng thùng</span>
                <strong className="text-gray-800">~{totalBoxes.toLocaleString('vi-VN')} Thùng ({selectedProd.perBox} {selectedProd.unit}/thùng)</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[11px]">Tổng trọng lượng</span>
                <strong className="text-gray-800">~{totalWeightTon} Tấn</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-time price summary card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
              <span className="text-xs text-emerald-200">Giá bán lẻ niêm yết:</span>
              <span className="line-through text-gray-400 font-mono text-sm">
                {selectedProd.basePrice.toLocaleString('vi-VN')} ₫
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-200">Đơn giá sỉ ưu đãi:</span>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {unitDiscountPrice.toLocaleString('vi-VN')} ₫
                </span>
                <span className="text-[11px] text-emerald-300 block">/{selectedProd.unit}</span>
              </div>
            </div>

            <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
              <span className="text-emerald-200">Tiết kiệm nhờ mua sỉ:</span>
              <strong className="text-amber-300 font-mono font-bold text-sm">
                -{savings.toLocaleString('vi-VN')} ₫ ({discountPercent}%)
              </strong>
            </div>

            <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between">
              <span className="text-xs text-emerald-100 font-bold uppercase">Tổng dự toán đơn hàng:</span>
              <strong className="text-2xl sm:text-3xl font-black text-white font-mono">
                {totalAfterDiscount.toLocaleString('vi-VN')} ₫
              </strong>
            </div>

            <div className="space-y-1.5 pt-2 text-[11px] text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Bao gồm chứng từ CO, Phytosanitary và Hóa đơn VAT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Kiểm nghiệm mẫu thử nghiệm miễn phí trước khi ký hợp đồng</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="mt-6 w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:scale-102"
          >
            <span>Áp Dụng Dự Toán Này Vào Mẫu Báo Giá</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
