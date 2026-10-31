// Component Sáng Tạo Vượt Trội: AICoCoAssistant (Trợ Lý Ảo Nông Nghiệp Dừa Xanh)
export function createAICoCoAssistant(knowledgeBase, onProductSuggestion) {
  const container = document.createElement("div");
  container.className = "fixed bottom-6 right-6 z-50 select-none";
  container.id = "ai-coco-assistant";

  container.innerHTML = `
    <!-- Floating Action Button (FAB) -->
    <button id="coco-fab-btn" class="coco-fab relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 border-2 border-amber-300">
      <span class="text-2xl animate-pulse">🥥</span>
      <span class="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow border border-white">
        AI
      </span>
      <!-- Tooltip mời chào -->
      <span class="absolute right-20 whitespace-nowrap bg-emerald-950/90 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-emerald-700/60 hidden sm:block animate-bounce">
        Hỏi Bé CoCo tư vấn dừa nhé! ✨
      </span>
    </button>

    <!-- Chatbox Popup -->
    <div id="coco-chatbox" class="coco-chatbox fixed bottom-24 right-4 sm:right-6 bg-white hidden flex-col overflow-hidden border border-emerald-100 transition-all duration-300">
      <!-- Chatbox Header -->
      <div class="top-bar-gradient p-4 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl border border-amber-300">
            🥥
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900"></span>
          </div>
          <div>
            <h4 class="font-bold text-sm font-heading leading-tight flex items-center gap-1.5">
              Bé CoCo - HTX Song Phú
              <span class="bg-amber-400/90 text-emerald-950 text-[9px] px-1.5 py-0.2 rounded font-black">AI</span>
            </h4>
            <span class="text-[11px] text-emerald-200 block">Trợ lý Nông nghiệp & Dừa Xanh</span>
          </div>
        </div>
        <button id="close-coco-chat" class="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Quick Suggestion Pills -->
      <div class="p-2.5 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
        <button class="quick-prompt-btn shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium" data-query="Dầu dừa ép lạnh ly tâm có ưu điểm gì?">
          Dầu dừa ly tâm?
        </button>
        <button class="quick-prompt-btn shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium" data-query="Mật hoa dừa người tiểu đường có dùng được không?">
          Mật hoa dừa?
        </button>
        <button class="quick-prompt-btn shrink-0 px-2.5 py-1 rounded-full bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-800 hover:text-white transition font-medium" data-query="Chính sách giao hàng và giá sỉ của HTX ra sao?">
          Mua sỉ & Ship?
        </button>
      </div>

      <!-- Chat Messages Body -->
      <div id="coco-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-gray-50/50">
        <!-- Tin nhắn chào đầu tiên -->
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs">
            🥥
          </div>
          <div class="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 leading-relaxed max-w-[85%]">
            <p>Dạ em chào quý anh/chị! Em là <b>Bé CoCo 🌴</b> - Trợ lý Ảo Nông Nghiệp của <b>HTX Dừa Song Phú</b>.</p>
            <p class="mt-1.5 text-gray-600">Anh/chị cần em hỗ trợ giải đáp về:</p>
            <ul class="list-disc list-inside mt-1 space-y-0.5 text-emerald-800 font-medium text-xs">
              <li>Công dụng dầu dừa ly tâm & mật hoa dừa OCOP</li>
              <li>Cách tra cứu nguồn gốc số lô hàng VietGAP</li>
              <li>Tư vấn chọn quà biếu hay đặt hàng sỉ xuất khẩu</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Chat Input Field -->
      <div class="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        <input type="text" 
               id="coco-user-input" 
               placeholder="Hỏi Bé CoCo bất cứ điều gì về dừa..." 
               class="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600">
        <button id="btn-coco-send" class="w-10 h-10 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center shrink-0 transition shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  `;

  const fab = container.querySelector("#coco-fab-btn");
  const chatbox = container.querySelector("#coco-chatbox");
  const closeBtn = container.querySelector("#close-coco-chat");
  const messagesDiv = container.querySelector("#coco-messages");
  const userInput = container.querySelector("#coco-user-input");
  const sendBtn = container.querySelector("#btn-coco-send");
  const quickBtns = container.querySelectorAll(".quick-prompt-btn");

  let isOpen = false;

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      chatbox.classList.remove("hidden");
      chatbox.classList.add("flex");
      userInput.focus();
    } else {
      chatbox.classList.add("hidden");
      chatbox.classList.remove("flex");
    }
  }

  fab.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  function appendMessage(sender, text, isAi = false) {
    const msgEl = document.createElement("div");
    if (!isAi) {
      msgEl.className = "flex items-start justify-end gap-2";
      msgEl.innerHTML = `
        <div class="bg-emerald-800 text-white p-3 rounded-2xl rounded-tr-none shadow-sm leading-relaxed max-w-[85%] text-xs sm:text-sm">
          ${text}
        </div>
      `;
    } else {
      msgEl.className = "flex items-start gap-2.5 animate-fadeIn";
      // Format markdown nhẹ
      const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br/>');

      msgEl.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs mt-1">
          🥥
        </div>
        <div class="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 leading-relaxed max-w-[85%] text-xs sm:text-sm">
          ${formattedText}
        </div>
      `;
    }

    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function handleSend(userText) {
    const text = userText || userInput.value.trim();
    if (!text) return;

    appendMessage("user", text, false);
    if (!userText) userInput.value = "";

    // Giả lập trạng thái typing
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "flex items-center gap-2 text-xs text-gray-400 italic p-2";
    typingIndicator.id = "typing-temp";
    typingIndicator.innerHTML = `<span>Bé CoCo đang suy nghĩ...</span>`;
    messagesDiv.appendChild(typingIndicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    setTimeout(() => {
      const temp = document.getElementById("typing-temp");
      if (temp) temp.remove();

      // Tìm câu trả lời phù hợp trong Knowledge Base
      const lower = text.toLowerCase();
      let matchedAnswer = null;

      for (const item of knowledgeBase) {
        if (item.keywords.some(kw => lower.includes(kw))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = "Dạ câu hỏi này hay quá! HTX Dừa Song Phú chúng em cam kết toàn bộ sản phẩm đều canh tác sinh thái hữu cơ trên đất phù sa bãi bồi Tam Bình, đạt chuẩn OCOP 4 sao và VietGAP. Anh/chị có thể để lại số điện thoại hoặc liên hệ Hotline/Zalo **0918 268 379** để kỹ sư nông nghiệp hỗ trợ chu đáo nhất ạ! 🥥";
      }

      appendMessage("ai", matchedAnswer, true);
    }, 600);
  }

  sendBtn.addEventListener("click", () => handleSend());
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });

  quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      handleSend(btn.dataset.query);
    });
  });

  return container;
}
