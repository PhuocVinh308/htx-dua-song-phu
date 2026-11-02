import React, { useState } from 'react';
import { Radio, Droplets, Thermometer, Waves, Sparkles, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

export default function FarmIoTStation() {
  const [lastUpdated, setLastUpdated] = useState('Vừa xong (16:20)');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      const now = new Date();
      setLastUpdated(`Vừa xong (${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')})`);
    }, 600);
  };

  const metrics = [
    {
      label: 'Nhiệt Độ Vườn',
      value: '29.5°C',
      status: 'Lý tưởng quang hợp',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: Thermometer,
      iconColor: 'text-amber-500',
    },
    {
      label: 'Độ Ẩm Không Khí',
      value: '78%',
      status: 'Mát mẻ ven sông',
      statusColor: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Droplets,
      iconColor: 'text-blue-500',
    },
    {
      label: 'Độ Mặn Nước Sông Măng Thít',
      value: '0.12‰',
      status: 'Nước ngọt phù sa 100%',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: Waves,
      iconColor: 'text-cyan-500',
    },
    {
      label: 'Độ pH Đất Bãi Bồi',
      value: '6.4 pH',
      status: 'Đất mỡ màu mỡ',
      statusColor: 'text-purple-700 bg-purple-50 border-purple-200',
      icon: Activity,
      iconColor: 'text-purple-500',
    },
    {
      label: 'Độ Ngọt Trung Bình Vụ Này',
      value: '8.2° Brix',
      status: 'Vị ngọt thanh chuẩn OCOP',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      icon: Sparkles,
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-[#f4f7f2] py-8 border-y border-gray-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 tracking-tight flex items-center gap-1.5 uppercase">
              <span>Trạm Quan Trắc Vi Khí Hậu & Nông Nghiệp Thông Minh IoT Song Phú</span>
            </h3>
            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              LoRaWAN 24/7
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Cập nhật: {lastUpdated}</span>
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg hover:bg-gray-200/70 text-gray-600 transition"
              title="Làm mới dữ liệu cảm biến"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#3b8224]' : ''}`} />
            </button>
          </div>
        </div>

        {/* 5 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-gray-500 truncate">{m.label}</span>
                  <Icon className={`w-4 h-4 ${m.iconColor} shrink-0 group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 mb-2 font-mono">
                  {m.value}
                </div>
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border truncate max-w-full ${m.statusColor}`}>
                  {m.status}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-400 mt-3 text-center sm:text-left italic">
          * Cảm biến tự động đo đạc tại vùng nguyên liệu 120 ha ấp Phú Trường Yên, xã Song Phú, tỉnh Vĩnh Long. Đảm bảo 100% không bị nhiễm mặn và duy trì điều kiện sinh thái hữu cơ tốt nhất.
        </p>
      </div>
    </section>
  );
}
