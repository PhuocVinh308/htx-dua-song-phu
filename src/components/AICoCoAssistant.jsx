import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Plus, ShoppingBag, Check } from 'lucide-react';
import { coopData } from '../data/coopData.js';

// Fold Vietnamese diacritics for resilient keyword matching
export const removeVietnameseDiacritics = (str) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

// Escape HTML entities to prevent stored/DOM XSS before formatting markdown
export const formatAiMessage = (rawText) => {
  if (!rawText) return '';
  const escaped = String(rawText)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return escaped.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>');
};

// Escape special characters for RegExp
export const escapeRegex = (str) => {
  if (!str) return '';
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Enforce word boundaries using delimiters (whitespace, punctuation) to avoid substring collisions
export const matchWordBoundary = (text, keyword) => {
  if (!text || !keyword) return false;
  const escaped = escapeRegex(keyword);
  const regex = new RegExp(`(?:^|[\\s,;.?!:;'"()[\\]{}«»/\\-])${escaped}(?:$|[\\s,;.?!:;'"()[\\]{}«»/\\-])`, 'i');
  return regex.test(text);
};

// Knowledge base search with word-boundary matching and phrase length scoring
export const findMatchingKnowledge = (query, knowledgeBase = coopData?.aiKnowledge || []) => {
  if (!query || typeof query !== 'string' || !Array.isArray(knowledgeBase) || knowledgeBase.length === 0) {
    return null;
  }

  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return null;
  const foldedQuery = removeVietnameseDiacritics(cleanQuery);

  let bestItem = null;
  let bestScore = 0;
  let bestMatchedIndex = -1;

  for (let i = 0; i < knowledgeBase.length; i++) {
    const item = knowledgeBase[i];
    if (!item || !Array.isArray(item.keywords)) continue;

    let itemScore = 0;
    let maxKwLength = 0;
    let matchedKeywordsCount = 0;

    for (const kw of item.keywords) {
      if (!kw || typeof kw !== 'string') continue;
      const lowerKw = kw.toLowerCase().trim();
      const foldedKw = removeVietnameseDiacritics(lowerKw);

      // Check word-boundary match in accented and unaccented query
      const isMatched = matchWordBoundary(cleanQuery, lowerKw) || matchWordBoundary(foldedQuery, foldedKw);

      if (isMatched) {
        matchedKeywordsCount++;
        const kwLength = foldedKw.length;
        // Multi-word phrase bonus
        const wordCount = foldedKw.split(/\s+/).filter(Boolean).length;
        const phraseBonus = wordCount > 1 ? wordCount * 8 : 0;
        itemScore += kwLength + phraseBonus;
        if (kwLength > maxKwLength) {
          maxKwLength = kwLength;
        }
      }
    }

    if (matchedKeywordsCount > 0) {
      // Prioritize longest matched phrase and total keyword coverage
      const totalScore = itemScore + maxKwLength * 4;
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestItem = item;
        bestMatchedIndex = i;
      }
    }
  }

  if (!bestItem) return null;

  return {
    ...bestItem,
    matchedItem: bestItem,
    matchedIndex: bestMatchedIndex,
    score: bestScore,
  };
};

export default function AICoCoAssistant({ knowledgeBase, products = [], onAddToCart, onQuickView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize messages once products are available
  useEffect(() => {
    if (messages.length === 0) {
      const initialRecs = products.filter((p) => p.id === 'P07' || p.id === 'P13');
      setMessages([
        {
          sender: 'ai',
          text: 'Dạ em chào quý anh/chị! Em là **Bé CoCo 🌴** - Trợ lý Ảo Nông Nghiệp của **HTX Dừa Song Phú**.\nAnh/chị cần em tư vấn về dầu dừa ly tâm, mật hoa dừa OCOP, dừa xiêm gọt kim cương hay tra cứu nguồn gốc nông sản ạ?',
          recommendations: initialRecs.length > 0 ? initialRecs : products.slice(0, 2),
        },
      ]);
    }
  }, [products]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal.trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const lower = query.toLowerCase();
      const foldedQuery = removeVietnameseDiacritics(lower);
      const matchResult = findMatchingKnowledge(query, knowledgeBase || coopData?.aiKnowledge || []);
      const matchedItem = matchResult ? matchResult.matchedItem : null;
      let matched = matchResult ? matchResult.answer : null;

      // Dynamic product recommendation heuristics using diacritic-folded query
      let recs = [];
      if (matchedItem && matchedItem.recommendedProductIds) {
        recs = products.filter((p) => matchedItem.recommendedProductIds.includes(p.id));
      } else {
        if (foldedQuery.includes('dau dua') || foldedQuery.includes('ly tam') || foldedQuery.includes('duong da')) {
          recs = products.filter((p) => p.id === 'P13');
        } else if (foldedQuery.includes('mat hoa') || foldedQuery.includes('tieu duong') || foldedQuery.includes('an kieng')) {
          recs = products.filter((p) => p.id === 'P14' || p.id === 'P04');
        } else if (foldedQuery.includes('dua xiem') || foldedQuery.includes('kim cuong') || foldedQuery.includes('dua tuoi')) {
          recs = products.filter((p) => p.id === 'P07' || p.id === 'P06');
        } else if (foldedQuery.includes('dua sap')) {
          recs = products.filter((p) => p.id === 'P12');
        } else if (foldedQuery.includes('bat') || foldedQuery.includes('thu cong') || foldedQuery.includes('gao dua')) {
          recs = products.filter((p) => p.id === 'P15' || p.id === 'P16');
        } else if (foldedQuery.includes('say') || foldedQuery.includes('snack') || foldedQuery.includes('mit')) {
          recs = products.filter((p) => p.id === 'P09' || p.id === 'P10');
        } else if (foldedQuery.includes('si') || foldedQuery.includes('b2b') || foldedQuery.includes('xo dua')) {
          recs = products.filter((p) => p.id === 'P01' || p.id === 'P15');
        } else {
          recs = products.filter((p) => p.id === 'P07' || p.id === 'P13');
        }
      }

      if (!matched) {
        matched =
          'Dạ câu hỏi này hay quá! Toàn bộ sản phẩm của HTX Dừa Song Phú chúng em đều canh tác hữu cơ sinh thái trên đất phù sa bãi bồi Tam Bình, đạt chuẩn OCOP 4 sao và VietGAP. Anh/chị có thể tham khảo các sản phẩm gợi ý bên dưới hoặc liên hệ Hotline/Zalo **0918 268 379** để kỹ sư nông nghiệp hỗ trợ chu đáo nhất ạ! 🥥';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: matched,
          recommendations: recs,
        },
      ]);
    }, 600);
  };

  const handleAddToCartClick = (product) => {
    if (onAddToCart) {
      onAddToCart(product, 1);
    }
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="coco-fab relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 border-2 border-amber-300"
      >
        <span className="text-2xl animate-pulse">🥥</span>
        <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow border border-white">
          AI
        </span>
        <span className="absolute right-20 whitespace-nowrap bg-emerald-950/90 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-emerald-700/60 hidden sm:block animate-bounce">
          Hỏi Bé CoCo tư vấn dừa nhé! ✨
        </span>
      </button>

      {/* Chatbox Popup */}
      {isOpen && (
        <div className="coco-chatbox fixed bottom-24 right-4 sm:right-6 bg-white flex flex-col overflow-hidden border border-emerald-100 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl border border-amber-300">
                🥥
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading leading-tight flex items-center gap-1.5">
                  Bé CoCo - HTX Song Phú
                  <span className="bg-amber-400/90 text-emerald-950 text-[9px] px-1.5 py-0.2 rounded font-black">AI</span>
                </h4>
                <span className="text-[11px] text-emerald-200 block">Trợ lý Nông nghiệp & Dừa Xanh</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => handleSend('Dầu dừa ép lạnh ly tâm có ưu điểm gì?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium shadow-sm"
            >
              Dầu dừa ly tâm?
            </button>
            <button
              onClick={() => handleSend('Mật hoa dừa người tiểu đường có dùng được không?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium shadow-sm"
            >
              Mật hoa dừa?
            </button>
            <button
              onClick={() => handleSend('Dừa xiêm lửa gọt kim cương có gì đặc biệt?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium shadow-sm"
            >
              Dừa kim cương?
            </button>
            <button
              onClick={() => handleSend('Chính sách giao hàng và giá sỉ của HTX ra sao?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium shadow-sm"
            >
              Mua sỉ & Ship?
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-gray-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : ''}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs mt-1">
                    🥥
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl shadow-sm text-xs sm:text-sm leading-relaxed max-w-[90%] ${
                    m.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {m.sender === 'user' ? (
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatAiMessage(m.text),
                      }}
                    />
                  )}

                  {/* Interactive Product Recommendation Cards */}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-100 space-y-2">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        🥥 Gợi ý sản phẩm phù hợp:
                      </span>
                      <div className="space-y-2">
                        {m.recommendations.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5 flex items-center gap-2.5 hover:bg-emerald-100/60 transition shadow-sm"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-emerald-200 bg-white"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs text-emerald-950 truncate">{prod.name}</h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-bold text-xs text-emerald-700 font-heading">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}
                                </span>
                                {prod.unit && <span className="text-[10px] text-gray-500">/{prod.unit}</span>}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                onClick={() => handleAddToCartClick(prod)}
                                className={`px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition ${
                                  addedId === prod.id ? 'bg-amber-600' : 'bg-emerald-800 hover:bg-emerald-900'
                                }`}
                                title="Thêm vào giỏ hàng"
                              >
                                {addedId === prod.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-white" />
                                    <span>Đã thêm</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3 text-white" />
                                    <span>Thêm</span>
                                  </>
                                )}
                              </button>
                              {onQuickView && (
                                <button
                                  onClick={() => onQuickView(prod)}
                                  className="text-[10px] text-emerald-800 hover:underline font-medium text-center"
                                >
                                  Chi tiết
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-gray-400 italic p-2">
                <span>Bé CoCo đang suy nghĩ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi Bé CoCo bất cứ điều gì về dừa..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center shrink-0 transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
