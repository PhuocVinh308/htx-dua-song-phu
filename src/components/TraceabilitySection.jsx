import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, QrCode, CheckCircle2 } from 'lucide-react';

export default function TraceabilitySection({ batches = {}, initialCode = 'SP-DXL-2026-01' }) {
  const safeBatches = batches && typeof batches === 'object' ? batches : {};
  const batchKeys = Object.keys(safeBatches);
  const [selectedKey, setSelectedKey] = useState(initialCode);
  const [inputCode, setInputCode] = useState(initialCode);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (initialCode) {
      setSelectedKey(initialCode);
      setInputCode(initialCode);
    }
  }, [initialCode]);

  const activeBatch = safeBatches[selectedKey] || safeBatches['SP-DXL-2026-01'] || (batchKeys.length > 0 ? safeBatches[batchKeys[0]] : null);

  const handleSearch = () => {
    const code = inputCode.trim().toUpperCase();
    if (safeBatches[code]) {
      setSelectedKey(code);
      setSearchError(null);
    } else {
      const msg = `Không tìm thấy mã lô "${code}". Vui lòng thử các mã mẫu: SP-DXL-2026-01, SP-DDL-2026-03 hoặc SP-MHD-2026-02`;
      setSearchError(msg);
      if (typeof window !== 'undefined' && typeof window.alert === 'function') {
        try {
          window.alert(msg);
        } catch {
          // Ignore alert in headless mode
        }
      }
    }
  };

  if (!activeBatch) {
    return (
      <section className="py-16 md:py-24 bg-emerald-950 text-white relative overflow-hidden" id="traceability">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center py-12">
          <div className="w-16 h-16 rounded-full bg-emerald-900/60 text-amber-400 flex items-center justify-center mx-auto text-2xl mb-4 border border-emerald-700">
            🔍
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">Không Có Dữ Liệu Lô Hàng</h3>
          <p className="text-gray-300 text-sm max-w-md mx-auto">
            Hiện chưa có thông tin lô hàng truy xuất trong hệ thống. Quý khách vui lòng thử lại sau.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-emerald-950 text-white relative overflow-hidden" id="traceability">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            SỐ HÓA CHUỖI CUNG ỨNG NÔNG SẢN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white mb-3">
            Tra Cứu Nguồn Gốc Lô Hàng
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Mỗi sản phẩm xuất xưởng từ HTX Dừa Song Phú đều mang mã định danh duy nhất. Quý khách có thể kiểm tra tường minh lý lịch nông hộ, thời gian thu hoạch và chứng nhận kiểm nghiệm độc lập.
          </p>
        </div>

        {/* Input & Quick pills */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="bg-emerald-900/80 p-2 rounded-2xl border border-emerald-700/80 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (searchError) setSearchError(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Nhập mã lô (Ví dụ: SP-DXL-2026-01)"
              className="w-full bg-emerald-950/80 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-emerald-800 text-sm focus:outline-none focus:border-amber-400 font-mono"
            />
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Tra Cứu</span>
            </button>
          </div>

          {searchError && (
            <div className="mt-2.5 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs text-center font-medium">
              {searchError}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs">
            <span className="text-gray-400">Gợi ý mã xem thử:</span>
            {batchKeys.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedKey(key);
                  setInputCode(key);
                }}
                className={`font-mono px-2.5 py-1 rounded transition border ${
                  selectedKey === key
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border-emerald-700/50'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        <div className="bg-emerald-900/70 border border-emerald-700/70 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image & QR */}
            <div className="lg:col-span-4 space-y-4 text-center">
              <div className="rounded-2xl overflow-hidden aspect-video sm:aspect-square border-2 border-emerald-700/60 shadow-lg">
                <img src={activeBatch.image} alt={activeBatch.productName} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 rounded-2xl bg-white text-emerald-950 flex flex-col items-center justify-center shadow-md">
                <div className="w-24 h-24 bg-gray-900 p-2 rounded-lg flex items-center justify-center text-white mb-2">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <span className="text-xs font-mono font-bold text-gray-800">{activeBatch.batchCode}</span>
                <span className="text-[10px] text-gray-500">Mã QR truy xuất bảo mật</span>
              </div>
            </div>

            {/* Farm Diary & Certs */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-b border-emerald-800 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold font-mono">
                    {activeBatch.batchCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-xs font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Đã xác thực số
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  {activeBatch.productName}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
                  <span className="text-gray-400 block text-xs mb-1">Nông Hộ Xã Viên Phụ Trách:</span>
                  <strong className="text-amber-300 text-sm font-semibold">{activeBatch.farmOwner}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
                  <span className="text-gray-400 block text-xs mb-1">Vị Trí Vùng Trồng:</span>
                  <strong className="text-white text-xs">{activeBatch.location}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
                  <span className="text-gray-400 block text-xs mb-1">Quy Mô & Đất Trồng:</span>
                  <strong className="text-white text-xs">{activeBatch.farmArea} • {activeBatch.soilType}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
                  <span className="text-gray-400 block text-xs mb-1">Ngày Thu Hoạch & Chế Biến:</span>
                  <strong className="text-white text-xs">{activeBatch.harvestDate} (Đạt chuẩn)</strong>
                </div>
              </div>

              {/* Lab Test */}
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Kết Quả Xét Nghiệm Chất Lượng (LAB TEST)
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed font-mono">
                  {activeBatch.labTest}
                </p>
                <div className="mt-2 text-[11px] text-gray-400 flex items-center justify-between border-t border-emerald-800/80 pt-2">
                  <span>Đơn vị kiểm nghiệm: <b>{activeBatch.auditor}</b></span>
                  <span className="text-amber-400 font-mono">{activeBatch.blockchainTx}</span>
                </div>
              </div>

              {/* Certs */}
              <div>
                <span className="text-xs text-gray-400 block mb-2">Chứng nhận chất lượng áp dụng cho lô hàng này:</span>
                <div className="flex flex-wrap gap-2">
                  {activeBatch.certifications.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-lg bg-emerald-800 text-emerald-100 text-xs font-semibold border border-emerald-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
