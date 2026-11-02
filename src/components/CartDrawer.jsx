import React, { useState } from 'react';
import { ShoppingCart, X, ArrowRight, MessageSquare, ArrowLeft, CheckCircle2, QrCode, CreditCard, Truck, ShieldCheck, Copy, Check, Tag } from 'lucide-react';

// High-entropy unique order ID generator
export const generateOrderId = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SP-${ts}-${rand}`;
};

// Authentic Vietnamese phone validation (mobile & landline)
export const validateVietnamesePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (!trimmed) return false;
  const clean = trimmed.replace(/[\s().-]/g, '');
  return /^(?:(?:\+84|84|0)0?(?:2\d{9}|(?:3[2-9]|5[25689]|7[06-9]|8[1-9]|9\d)\d{7}))$/.test(clean);
};

// Safe VND currency formatter preventing NaN ₫
export const formatVND = (amount) => {
  const safeVal = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(safeVal);
};

// Safe cart items and totals calculation
export const calculateCartTotals = (cart) => {
  const items = cart && typeof cart === 'object' && !Array.isArray(cart) ? Object.values(cart) : [];
  const totalCount = items.reduce((sum, item) => sum + Math.max(0, item?.quantity || 0), 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = Number.isFinite(item?.product?.price) ? item.product.price : 0;
    const qty = Math.max(0, item?.quantity || 0);
    return sum + price * qty;
  }, 0);
  return { items, totalCount, totalAmount };
};

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [view, setView] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod', // 'cod' | 'bank_transfer'
  });
  const [errors, setErrors] = useState({});
  const [lastOrder, setLastOrder] = useState(null);
  const [copiedBank, setCopiedBank] = useState(false);

  // Voucher & discount state
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');

  const availableVouchers = [
    { code: 'SOCOOP10', discountType: 'percent', value: 10, label: '-10% tổng đơn' },
    { code: 'FREESHIP', discountType: 'fixed', value: 30000, label: 'Freeship 30k' },
    { code: 'OCOP2026', discountType: 'fixed', value: 20000, label: 'Giảm 20k' },
  ];

  const { items, totalCount, totalAmount } = calculateCartTotals(cart);
  const formattedTotal = formatVND(totalAmount);

  const handleApplyVoucher = (codeToApply) => {
    const code = (codeToApply || voucherCode).trim().toUpperCase();
    const found = availableVouchers.find((v) => v.code === code);
    if (!found) {
      setVoucherError('Mã ưu đãi không hợp lệ');
      return;
    }
    if (totalAmount <= 0) {
      setVoucherError('Giỏ hàng đang trống');
      return;
    }
    setVoucherError('');
    setAppliedVoucher(found);
    setVoucherCode(found.code);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    setVoucherError('');
  };

  let discountAmount = 0;
  if (appliedVoucher && totalAmount > 0) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.round((totalAmount * appliedVoucher.value) / 100);
    } else {
      discountAmount = Math.min(totalAmount, appliedVoucher.value);
    }
  }

  const finalAmount = Math.max(0, totalAmount - discountAmount);
  const formattedFinalAmount = formatVND(finalAmount);
  const formattedDiscountAmount = formatVND(discountAmount);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleClose = () => {
    if (view === 'success') {
      setView('cart');
    }
    onClose();
  };

  const validateForm = () => {
    const errs = {};
    if (items.length === 0) {
      errs.cart = 'Giỏ hàng của bạn đang trống';
    }
    if (!formData.fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else if (!validateVietnamesePhone(formData.phone)) {
      errs.phone = 'Số điện thoại không hợp lệ (vui lòng nhập số điện thoại Việt Nam hợp lệ)';
    }
    if (!formData.address.trim()) errs.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng!');
      return;
    }
    if (!validateForm()) return;

    const orderId = generateOrderId();
    const orderRecord = {
      orderId,
      customer: { ...formData },
      items: [...items],
      totalAmount: finalAmount,
      subtotalAmount: totalAmount,
      discountAmount,
      voucherCode: appliedVoucher?.code || null,
      totalCount,
      createdAt: new Date().toLocaleString('vi-VN'),
      paymentMethod: formData.paymentMethod,
    };

    setLastOrder(orderRecord);
    setView('success');

    if (onCheckout) {
      onCheckout(orderRecord);
    }
  };

  const copyAccountNumber = (accNumber) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(accNumber);
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    }
  };

  // VietQR parameters
  const bankAccount = {
    bankName: 'Agribank - Ngân hàng Nông nghiệp & PTNT Việt Nam',
    shortBank: 'Agribank',
    branch: 'Chi nhánh Tam Bình, Vĩnh Long',
    accountNumber: '7300205168379',
    accountName: 'HOP TAC XA DUA SONG PHU',
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Sliding Panel */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            {view === 'checkout' && (
              <button
                onClick={() => setView('cart')}
                className="p-1 -ml-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition mr-1"
                title="Quay lại giỏ hàng"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-heading">
              {view === 'cart' && 'Giỏ Hàng Nông Sản HTX'}
              {view === 'checkout' && 'Thông Tin Đặt Hàng'}
              {view === 'success' && 'Đặt Hàng Thành Công'}
            </h3>
            {view === 'cart' && (
              <span className="bg-amber-400 text-emerald-950 text-xs px-2 py-0.5 rounded-full font-bold">
                {totalCount}
              </span>
            )}
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* VIEW 1: Cart Items List */}
        {view === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
              {items.length === 0 ? (
                <div className="py-16 text-center text-gray-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                    🥥
                  </div>
                  <p className="font-bold text-gray-700 text-sm">Giỏ hàng của bạn đang trống</p>
                  <p className="text-xs text-gray-400">Hãy thêm những đặc sản dừa tươi OCOP mát lành vào giỏ nhé!</p>
                </div>
              ) : (
                items.map((item, idx) => {
                  const prod = item?.product || {};
                  const prodId = prod.id || `cart-item-${idx}`;
                  const prodName = prod.name || 'Sản phẩm HTX Song Phú';
                  const prodUnit = prod.unit || '';
                  const prodPriceFormatted = formatVND(prod.price);
                  const qty = Math.max(0, item?.quantity || 0);

                  return (
                    <div key={prodId} className="pt-4 first:pt-0 flex items-start gap-3">
                      <img
                        src={prod.image || './products/diamond-coconut.jpg'}
                        alt={prodName}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-emerald-950 truncate">{prodName}</h4>
                        {prodUnit && <span className="text-[11px] text-gray-500 block mb-1">{prodUnit}</span>}
                        <span className="text-xs font-bold text-emerald-800">
                          {prodPriceFormatted}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white text-xs">
                          <button
                            onClick={() => prod.id && onUpdateQuantity && onUpdateQuantity(prod.id, -1)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 font-mono font-bold text-gray-800">{qty}</span>
                          <button
                            onClick={() => prod.id && onUpdateQuantity && onUpdateQuantity(prod.id, 1)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => prod.id && onRemoveItem && onRemoveItem(prod.id)}
                          className="text-[11px] text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 space-y-3.5">
              {/* Promo code / Voucher Section */}
              <div className="bg-white p-3 rounded-2xl border border-gray-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700 shrink-0" />
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => {
                      setVoucherCode(e.target.value.toUpperCase());
                      setVoucherError('');
                    }}
                    placeholder="Mã ưu đãi (VD: SOCOOP10)..."
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono uppercase"
                  />
                  {appliedVoucher ? (
                    <button
                      type="button"
                      onClick={handleRemoveVoucher}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200"
                    >
                      Bỏ
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApplyVoucher()}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
                    >
                      Áp dụng
                    </button>
                  )}
                </div>

                {voucherError && (
                  <p className="text-[11px] text-red-500 font-medium">{voucherError}</p>
                )}

                {appliedVoucher && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <span>Đã áp dụng mã: {appliedVoucher.code}</span>
                    <span>-{formattedDiscountAmount}</span>
                  </div>
                )}

                {/* Quick Voucher Chips */}
                {!appliedVoucher && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {availableVouchers.map((v) => (
                      <button
                        key={v.code}
                        type="button"
                        onClick={() => handleApplyVoucher(v.code)}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/70 transition"
                      >
                        {v.code} ({v.label})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs bg-white p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Tạm tính ({totalCount} sản phẩm):</span>
                  <span className="font-mono font-semibold">{formattedTotal}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex items-center justify-between text-emerald-700 font-bold">
                    <span>Ưu đãi giảm giá ({appliedVoucher.code}):</span>
                    <span className="font-mono">-{formattedDiscountAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm sm:text-base pt-2 border-t border-gray-100">
                  <span className="text-gray-900 font-extrabold">Tổng thanh toán:</span>
                  <span className="text-xl font-extrabold text-emerald-900 font-heading">{formattedFinalAmount}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 italic">
                * Đã bao gồm hỗ trợ đóng gói màng xốp kháng khuẩn và bảo hiểm tươi ngon 1 đổi 1 từ HTX.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => alert('Dạ hệ thống đang kết nối đến Zalo HTX Dừa Song Phú (0918 268 379) để gửi đơn hàng của Quý khách. Xin cảm ơn!')}
                  disabled={items.length === 0}
                  className={`w-full py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm ${
                    items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Đặt Nhanh Qua Zalo</span>
                </button>

                <button
                  onClick={() => setView('checkout')}
                  disabled={items.length === 0}
                  className={`w-full py-3 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md ${
                    items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>Tiến Hành Đặt Hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* VIEW 2: Complete Checkout Form */}
        {view === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs sm:text-sm">
              {/* Order quick recap */}
              <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-gray-600 block text-xs">Tổng đơn ({totalCount} sản phẩm):</span>
                  <strong className="text-emerald-900 font-heading text-base">{formattedTotal}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setView('cart')}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  Xem chi tiết
                </button>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>1. Thông Tin Nhận Hàng</span>
                </h4>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Họ và tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Số điện thoại liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Ví dụ: 0918 268 379"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      errors.phone ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Địa chỉ giao hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Số nhà, tên đường, ấp/thôn, xã/phường, quận/huyện, tỉnh/thành"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      errors.address ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Ghi chú đơn hàng (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder="Giao giờ hành chính, gọi trước khi giao..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <span>2. Phương Thức Thanh Toán</span>
                </h4>

                <div className="space-y-2">
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      formData.paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => handleInputChange('paymentMethod', 'cod')}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <strong className="block text-xs sm:text-sm text-gray-900">
                        Thanh toán khi nhận hàng (COD)
                      </strong>
                      <span className="text-[11px] text-gray-500 leading-normal block">
                        Nhận hàng, kiểm tra dừa tươi chuẩn OCOP và thanh toán tiền mặt cho nhân viên giao vận.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      formData.paymentMethod === 'bank_transfer'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={() => handleInputChange('paymentMethod', 'bank_transfer')}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <strong className="block text-xs sm:text-sm text-gray-900 flex items-center justify-between">
                        <span>Chuyển khoản qua Ngân hàng / VietQR</span>
                        <span className="text-[10px] font-bold bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded">
                          Nhanh & Tiện lợi
                        </span>
                      </strong>
                      <span className="text-[11px] text-gray-500 leading-normal block">
                        Quét mã VietQR tự động điền số tài khoản và nội dung chuyển khoản an toàn.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Bank Details Box (If Bank Transfer selected) */}
                {formData.paymentMethod === 'bank_transfer' && (
                  <div className="mt-3 p-3.5 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-2xl space-y-3 shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-xs text-amber-300">Thông Tin Tài Khoản HTX</span>
                      </div>
                      <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                        VietQR 24/7
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-200">
                      <div>
                        <span className="text-[11px] text-gray-400 block">Ngân hàng:</span>
                        <strong className="text-white text-xs">{bankAccount.bankName}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-gray-400 block">Số tài khoản:</span>
                          <strong className="font-mono text-amber-400 text-sm tracking-wider">
                            {bankAccount.accountNumber}
                          </strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyAccountNumber(bankAccount.accountNumber)}
                          className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-[11px] text-white flex items-center gap-1 transition"
                        >
                          {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedBank ? 'Đã sao chép' : 'Sao chép'}</span>
                        </button>
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Chủ tài khoản:</span>
                        <strong className="text-white text-xs font-mono">{bankAccount.accountName}</strong>
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Nội dung chuyển khoản gợi ý:</span>
                        <span className="text-[11px] font-mono bg-emerald-900 px-2 py-1 rounded block text-amber-200 border border-emerald-800 mt-0.5">
                          HTX {formData.fullName ? formData.fullName.trim().replace(/\s+/g, ' ') : 'KHACH HANG'} {formData.phone || ''}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView('cart')}
                className="w-1/3 py-3 px-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 transition"
              >
                Quay Lại
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Xác Nhận Đặt Hàng</span>
              </button>
            </div>
          </form>
        )}

        {/* VIEW 3: Order Confirmation Screen / Summary */}
        {view === 'success' && lastOrder && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto p-5 space-y-5 animate-fadeIn">
            <div className="text-center pt-4 space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-inner">
                ✓
              </div>
              <h3 className="text-xl font-bold font-heading text-emerald-950">Đặt Hàng Thành Công!</h3>
              <p className="text-xs text-gray-500">
                Mã đơn hàng: <strong className="font-mono text-emerald-800 text-sm">{lastOrder.orderId}</strong>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                Cảm ơn Quý khách! Ban điều hành HTX Dừa Song Phú đã tiếp nhận đơn và sẽ liên hệ xác nhận trong vòng 15 phút.
              </p>
            </div>

            {/* Order details summary card */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-700">Tóm tắt đơn hàng</span>
                <span className="text-gray-500">{lastOrder.createdAt}</span>
              </div>

              <div className="space-y-1.5 divide-y divide-gray-100">
                {lastOrder.items.map((item) => (
                  <div key={item.product.id} className="pt-1.5 first:pt-0 flex items-center justify-between">
                    <span className="text-gray-800 font-medium">
                      {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="font-mono font-semibold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-2 flex items-center justify-between text-sm">
                <strong className="text-gray-900">Tổng thanh toán:</strong>
                <strong className="text-emerald-900 font-heading text-base">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lastOrder.totalAmount)}
                </strong>
              </div>

              <div className="border-t border-gray-200 pt-2 space-y-1 text-gray-600">
                <div>Người nhận: <b>{lastOrder.customer.fullName}</b> ({lastOrder.customer.phone})</div>
                <div>Địa chỉ: <b>{lastOrder.customer.address}</b></div>
                {lastOrder.customer.note && <div>Ghi chú: <i>{lastOrder.customer.note}</i></div>}
                <div>
                  Phương thức: <b>{lastOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản VietQR'}</b>
                </div>
              </div>
            </div>

            {/* VietQR Instructions if Bank Transfer */}
            {lastOrder.paymentMethod === 'bank_transfer' && (
              <div className="bg-emerald-950 text-white rounded-2xl p-4 space-y-3 shadow-md">
                <div className="flex items-center gap-2 border-b border-emerald-800 pb-2">
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-xs text-amber-300">Hướng Dẫn Chuyển Khoản VietQR</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-white rounded-xl p-1.5 shrink-0 flex items-center justify-center shadow">
                    <img
                      src={`https://api.vietqr.io/image/970405-7300205168379-qr_only.jpg?amount=${lastOrder.totalAmount}&addInfo=${encodeURIComponent(lastOrder.orderId)}`}
                      alt="VietQR Song Phu"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/products/diamond-coconut.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1 text-[11px] text-gray-200 leading-snug">
                    <p>Ngân hàng: <b>Agribank</b></p>
                    <p>Số TK: <b className="font-mono text-amber-400">{bankAccount.accountNumber}</b></p>
                    <p>Chủ TK: <b>{bankAccount.accountName}</b></p>
                    <p>Nội dung CK: <b className="font-mono text-amber-300">{lastOrder.orderId}</b></p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Complete Button */}
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Hoàn Tất & Tiếp Tục Mua Sắm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
