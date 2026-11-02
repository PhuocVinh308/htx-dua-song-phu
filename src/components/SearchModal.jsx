import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, ShieldCheck, QrCode, FileText, ShoppingBag, ExternalLink } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  collections = [],
  certifications = [],
  traceabilityBatches = [],
  onSelectProduct,
  onSelectArticle,
  onSelectBatch,
}) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'products', 'articles', 'certs', 'trace'
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setFilterType('all');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // will be triggered by parent
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Filter products
  const matchedProducts = normalizedQuery
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(normalizedQuery) ||
          p.tagline?.toLowerCase().includes(normalizedQuery) ||
          p.features?.some?.((f) => f.toLowerCase().includes(normalizedQuery)) ||
          p.category?.toLowerCase().includes(normalizedQuery)
      )
    : products.slice(0, 4);

  // Filter articles
  const matchedArticles = normalizedQuery
    ? collections.filter(
        (a) =>
          a.title?.toLowerCase().includes(normalizedQuery) ||
          a.desc?.toLowerCase().includes(normalizedQuery) ||
          a.category?.toLowerCase().includes(normalizedQuery)
      )
    : collections.slice(0, 3);

  // Filter certifications
  const matchedCerts = normalizedQuery
    ? certifications.filter(
        (c) =>
          c.title?.toLowerCase().includes(normalizedQuery) ||
          c.code?.toLowerCase().includes(normalizedQuery) ||
          c.desc?.toLowerCase().includes(normalizedQuery)
      )
    : certifications.slice(0, 3);

  // Filter traceability batches (safe against both Array and Object dictionary)
  const safeBatches = Array.isArray(traceabilityBatches)
    ? traceabilityBatches
    : (traceabilityBatches && typeof traceabilityBatches === 'object'
      ? Object.values(traceabilityBatches)
      : []);

  const matchedBatches = normalizedQuery
    ? safeBatches.filter(
        (b) =>
          b?.batchCode?.toLowerCase().includes(normalizedQuery) ||
          b?.farmer?.toLowerCase().includes(normalizedQuery) ||
          b?.farmOwner?.toLowerCase().includes(normalizedQuery) ||
          b?.location?.toLowerCase().includes(normalizedQuery) ||
          b?.productName?.toLowerCase().includes(normalizedQuery)
      )
    : safeBatches.slice(0, 2);

  const totalResults =
    (filterType === 'all' || filterType === 'products' ? matchedProducts.length : 0) +
    (filterType === 'all' || filterType === 'articles' ? matchedArticles.length : 0) +
    (filterType === 'all' || filterType === 'certs' ? matchedCerts.length : 0) +
    (filterType === 'all' || filterType === 'trace' ? matchedBatches.length : 0);

  const popularKeywords = [
    'Dừa xiêm kim cương',
    'Dầu dừa ép lạnh',
    'Mật hoa dừa',
    'Dừa sáp',
    'Mã vùng trồng',
    'ISO 22000',
    'SP-2026-01'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 px-4 animate-fadeIn font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 bg-gray-50/50">
          <Search className="w-5 h-5 text-[#3b8224] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, bài viết, chứng nhận, mã lô... (Nhấn ESC để đóng)"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-gray-500 bg-gray-200/80 rounded border border-gray-300">
            ESC
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-white overflow-x-auto text-xs font-semibold">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'products', label: `Sản phẩm (${matchedProducts.length})` },
            { id: 'articles', label: `Bài viết (${matchedArticles.length})` },
            { id: 'certs', label: `Chứng nhận (${matchedCerts.length})` },
            { id: 'trace', label: `Truy xuất (${matchedBatches.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#0f4c3a] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Suggestions when empty query */}
        {!query && (
          <div className="px-4 py-3 bg-emerald-50/50 border-b border-emerald-100/60 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-gray-500 font-medium shrink-0">Tìm nhanh:</span>
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => setQuery(kw)}
                className="px-2.5 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shrink-0"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 divide-y divide-gray-100">
          {totalResults === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400 text-sm mb-1">Không tìm thấy kết quả phù hợp với "{query}".</p>
              <p className="text-xs text-gray-400">Hãy thử tìm theo tên khác như "dừa xiêm", "mật hoa", hoặc "ép lạnh".</p>
            </div>
          )}

          {/* 1. SẢN PHẨM */}
          {(filterType === 'all' || filterType === 'products') && matchedProducts.length > 0 && (
            <div className="pt-2 first:pt-0">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#3b8224]" />
                <span>Sản Phẩm ({matchedProducts.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct?.(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 transition cursor-pointer group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-gray-800 truncate group-hover:text-[#2e6b27]">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">{p.tagline || p.category}</p>
                      <p className="text-xs font-bold text-emerald-800">
                        {p.price?.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. BÀI VIẾT / BỘ SƯU TẬP */}
          {(filterType === 'all' || filterType === 'articles') && matchedArticles.length > 0 && (
            <div className="pt-4 first:pt-0">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Bộ Sưu Tập & Tin Tức ({matchedArticles.length})</span>
              </h4>
              <div className="space-y-2">
                {matchedArticles.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onSelectArticle?.(a);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/60 border border-transparent hover:border-blue-200 transition cursor-pointer group"
                  >
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-gray-800 truncate group-hover:text-blue-700">
                        {a.title}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{a.desc}</p>
                      <span className="text-[10px] text-gray-400">{a.date}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CHỨNG NHẬN */}
          {(filterType === 'all' || filterType === 'certs') && matchedCerts.length > 0 && (
            <div className="pt-4 first:pt-0">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Tiêu Chuẩn & Chứng Nhận ({matchedCerts.length})</span>
              </h4>
              <div className="space-y-2">
                {matchedCerts.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      onSelectArticle?.(c);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 border border-transparent hover:border-amber-200 transition cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-800 group-hover:text-amber-800 truncate">
                          {c.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                          {c.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TRUY XUẤT NGUỒN GỐC */}
          {(filterType === 'all' || filterType === 'trace') && matchedBatches.length > 0 && (
            <div className="pt-4 first:pt-0">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mã Lô Nông Trại ({matchedBatches.length})</span>
              </h4>
              <div className="space-y-2">
                {matchedBatches.map((b) => (
                  <div
                    key={b.batchCode}
                    onClick={() => {
                      onSelectBatch?.(b.batchCode);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 border border-transparent hover:border-indigo-200 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                        <QrCode className="w-5 h-5 text-indigo-700" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono font-bold text-xs text-indigo-900 block truncate">
                          Lô #{b.batchCode}
                        </span>
                        <p className="text-[11px] text-gray-500 truncate">
                          Nông hộ: {b.farmer} • {b.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-indigo-600 font-bold group-hover:underline shrink-0 pl-2">
                      Xem nhật ký →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500">
          <span>Tìm kiếm thông minh toàn hệ thống HTX Dừa Song Phú</span>
          <div className="flex items-center gap-3">
            <span>Bấm vào để mở trực tiếp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
