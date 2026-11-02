import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';

export default function LiveOrderToast() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [visible, setVisible] = useState(false);

  const sampleOrders = [
    { name: 'Chị Mai Lan (Quận 1, TP.HCM)', item: '1 thùng Dừa xiêm gọt kim cương OCOP', time: '3 phút trước', avatar: '🥥' },
    { name: 'Anh Hoàng Nam (Đống Đa, Hà Nội)', item: '2 chai Dầu dừa ép lạnh ly tâm 500ml', time: '7 phút trước', avatar: '✨' },
    { name: 'Cô Thanh Trúc (Ninh Kiều, Cần Thơ)', item: '3 hũ Mật hoa dừa tự nhiên OCOP', time: '12 phút trước', avatar: '🍯' },
    { name: 'Anh Minh Tuấn (Hải Châu, Đà Nẵng)', item: '5 gói Cơm dừa sấy giòn OCOP', time: '18 phút trước', avatar: '🥥' },
    { name: 'Chị Bích Ngọc (TP. Thủ Đức)', item: '2 quả Dừa sáp Tam Bình cấy phôi đặc sản', time: '24 phút trước', avatar: '🌴' },
  ];

  useEffect(() => {
    // Show first toast after 4s
    const firstTimeout = setTimeout(() => {
      setCurrentOrder(sampleOrders[0]);
      setVisible(true);
    }, 4000);

    // Rotate every 18 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const randomOrder = sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
        setCurrentOrder(randomOrder);
        setVisible(true);
      }, 1000);
    }, 18000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible || !currentOrder) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-emerald-100 flex items-center gap-3 animate-fadeIn text-xs font-sans">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg shrink-0 border border-emerald-200">
        {currentOrder.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-gray-800 font-bold truncate">
          <span>{currentOrder.name}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        </div>
        <p className="text-[11px] text-gray-500 truncate">vừa đặt mua: <span className="font-semibold text-emerald-900">{currentOrder.item}</span></p>
        <span className="text-[10px] text-gray-400 block">{currentOrder.time}</span>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="p-1 text-gray-300 hover:text-gray-500 rounded-md transition"
        title="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
