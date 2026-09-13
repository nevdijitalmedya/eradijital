import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, RefreshCw } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef(null);

  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const fetchHistory = async (sessId) => {
    if (!sessId) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/webhooks/web/era-dijital/history?session_id=${sessId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          localStorage.setItem('era_chatbot_messages', JSON.stringify(data.messages));
        } else {
          initializeWelcomeMessages();
        }
      }
    } catch (e) {
      // Fallback
    }
  };

  useEffect(() => {
    let savedSessionId = localStorage.getItem('era_chatbot_session_id');
    if (!savedSessionId) {
      savedSessionId = generateSessionId();
      localStorage.setItem('era_chatbot_session_id', savedSessionId);
    }
    setSessionId(savedSessionId);

    const savedMessages = localStorage.getItem('era_chatbot_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        // Fallback
      }
    }

    fetchHistory(savedSessionId);
  }, []);

  useEffect(() => {
    if (!isOpen || !sessionId) return;
    const interval = setInterval(() => {
      fetchHistory(sessionId);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen, sessionId]);

  const initializeWelcomeMessages = () => {
    const welcomeMsgs = [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Merhaba! 👋',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'welcome-2',
        sender: 'bot',
        text: 'Ben Era Dijital yapay zekâ asistanıyım. Size nasıl yardımcı olabilirim? WhatsApp, Instagram entegrasyonları, yapay zekâ çözümleri veya iş akışı otomasyonları hakkındaki sorularınızı yanıtlayabilirim.',
        timestamp: new Date().toISOString(),
      }
    ];
    setMessages(welcomeMsgs);
    localStorage.setItem('era_chatbot_messages', JSON.stringify(welcomeMsgs));
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessageText = inputText.trim();
    setInputText('');

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    localStorage.setItem('era_chatbot_messages', JSON.stringify(updatedMessages));
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/webhooks/web/era-dijital`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          text: userMessageText,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const botMsg = {
        id: 'msg_' + Date.now() + '_reply',
        sender: 'bot',
        text: data.response || 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen tekrar deneyin.',
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);
      localStorage.setItem('era_chatbot_messages', JSON.stringify(finalMessages));
    } catch (error) {
      const errorMsg = {
        id: 'msg_' + Date.now() + '_err',
        sender: 'bot',
        text: 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin veya doğrudan WhatsApp hattımızdan bizimle iletişime geçin.',
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      localStorage.setItem('era_chatbot_messages', JSON.stringify(finalMessages));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Sohbet geçmişini temizlemek istediğinize emin misiniz?')) {
      const newSessionId = generateSessionId();
      localStorage.setItem('era_chatbot_session_id', newSessionId);
      setSessionId(newSessionId);
      initializeWelcomeMessages();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.15 }}
            className="w-[90vw] sm:w-[380px] h-[520px] rounded-lg border border-border bg-[#0a0d14] shadow-elevated flex flex-col overflow-hidden mb-3"
          >
            {/* Window Header */}
            <div className="px-4 py-3 bg-[#0d121c] border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-signal-emerald"></span>
                <div>
                  <h3 className="font-mono text-xs text-ink font-semibold tracking-wide">
                    ERA-BOT // CANLI DESTEK
                  </h3>
                  <p className="text-[10px] text-ink-faint font-mono">SLA: ~1.2s • Bilgi Tabanı Aktif</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Sohbeti Sıfırla"
                  className="p-1 rounded text-ink-faint hover:text-ink hover:bg-surface-elevated transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Kapat"
                  className="p-1 rounded text-ink-faint hover:text-ink hover:bg-surface-elevated transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0d14]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] text-primary">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3 rounded text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white font-medium'
                          : 'bg-surface border border-border text-slate-200'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-1' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-surface border border-border flex items-center justify-center font-mono text-[10px] text-primary">
                      AI
                    </div>
                    <div className="p-2.5 rounded bg-surface border border-border text-[11px] font-mono text-ink-faint flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                      <span>Yanıt üretiliyor...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-[#0d121c] border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Sorunuzu buraya yazın..."
                className="flex-1 bg-[#0a0d14] border border-border rounded px-3 py-2 text-xs text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="btn-primary py-2 px-3 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-lg bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-elevated border border-primary-active transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Canlı Destek"
        title="Canlı Yapay Zekâ Asistanı"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </div>
  );
}