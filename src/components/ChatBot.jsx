import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, RefreshCw } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef(null);

  // Generate a random UUID-like session ID if not exists
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
      console.error('Failed to fetch chat history', e);
    }
  };

  // Load chat session & history on mount
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
        console.error('Failed to parse cached chat messages', e);
      }
    }

    fetchHistory(savedSessionId);
  }, []);

  // Poll message history when widget is open
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
        text: 'Ben Era Dijital yapay zekâ asistanıyım. Size nasıl yardımcı olabilirim? WhatsApp, Instagram entegrasyonları, yapay zeka çözümleri veya iş akışı otomasyonları hakkında sorularınızı yanıtlayabilirim.',
        timestamp: new Date().toISOString(),
      }
    ];
    setMessages(welcomeMsgs);
    localStorage.setItem('era_chatbot_messages', JSON.stringify(welcomeMsgs));
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle sending a message
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
      console.error('Chat error:', error);
      const errorMsg = {
        id: 'msg_' + Date.now() + '_err',
        sender: 'bot',
        text: 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin veya daha sonra bizimle iletişime geçin.',
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      localStorage.setItem('era_chatbot_messages', JSON.stringify(finalMessages));
    } finally {
      setIsLoading(false);
    }
  };

  // Reset/Clear Chat History
  const handleClearHistory = () => {
    if (window.confirm('Sohbet geçmişini temizlemek istediğinize emin misiniz?')) {
      const newSessionId = generateSessionId();
      localStorage.setItem('era_chatbot_session_id', newSessionId);
      setSessionId(newSessionId);
      initializeWelcomeMessages();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 font-sans sm:bottom-6">
      <AnimatePresence>
        {/* Chat Widget Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-[90vw] sm:w-[400px] h-[550px] rounded-3xl border border-white/10 glass shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/15 rounded-2xl">
                  <Bot className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center space-x-1.5">
                    <span>Era Dijital Asistanı</span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-white/80">7/24 Yapay Zekâ Desteği</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearHistory}
                  title="Sohbeti Sıfırla"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Kapat"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/30 backdrop-blur-md scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-surface border border-white/10 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Bot className="w-3.5 h-3.5 text-secondary" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-tr from-primary to-accent text-white rounded-tr-none'
                          : 'bg-surface border border-white/5 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bot Loading/Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-7 h-7 rounded-xl bg-surface border border-white/10 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-secondary animate-pulse" />
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-none bg-surface border border-white/5 text-slate-400 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-surface/50 border-t border-white/5 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-secondary transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                  inputText.trim() && !isLoading
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20 hover:shadow-primary/45 hover:-translate-y-0.5'
                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-primary/45 transition-shadow cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
