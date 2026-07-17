import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/905536572732?text=Merhaba,%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 border border-emerald-400/20 transition-colors"
      aria-label="WhatsApp ile İletişime Geçin"
    >
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.904-6.989-1.873-1.876-4.351-2.909-6.99-2.91-5.443 0-9.87 4.417-9.873 9.864-.001 1.73.457 3.41 1.32 4.914l-.989 3.607 3.742-.982zM17.487 14.39c-.3-.15-1.774-.875-2.029-.968-.254-.093-.44-.139-.625.139-.185.277-.714.898-.875 1.084-.16.186-.32.21-.62.06-1.547-.775-2.585-1.282-3.627-3.07-.274-.472-.274-.766-.06-1.015.19-.22.3-.35.45-.525.15-.173.2-.297.3-.495.1-.2.05-.375-.025-.525-.075-.15-.625-1.507-.85-2.052-.22-.529-.44-.456-.62-.466-.16-.008-.344-.01-.529-.01-.186 0-.489.07-.745.349-.256.278-1.023 1.002-1.023 2.445 0 1.443 1.05 2.839 1.196 3.037.146.197 2.067 3.157 5.006 4.429.699.303 1.246.484 1.672.62.702.223 1.341.191 1.847.115.564-.085 1.774-.726 2.029-1.426.255-.7 0-1.29-.075-1.425-.075-.135-.27-.215-.57-.365z"/>
      </svg>
      
      {/* Ripple/Ping Effect */}
      <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10" style={{ animationDuration: '3s' }}></span>
    </motion.a>
  );
};

export default WhatsAppButton;
