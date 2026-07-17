import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HakkimizdaPage from './pages/HakkimizdaPage';
import HizmetlerPage from './pages/HizmetlerPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import OnAnalizPage from './pages/OnAnalizPage';
import IletisimPage from './pages/IletisimPage';
import FiyatlarPage from './pages/FiyatlarPage';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hakkimizda" element={<HakkimizdaPage />} />
        <Route path="/hizmetler" element={<HizmetlerPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/on-analiz" element={<OnAnalizPage />} />
        <Route path="/iletisim" element={<IletisimPage />} />
        <Route path="/fiyatlar" element={<FiyatlarPage />} />
      </Routes>
      <ChatBot />
      <WhatsAppButton />
    </Router>
  );
}

export default App;
