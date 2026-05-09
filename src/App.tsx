/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Search, Bell, Menu, TrendingUp, Globe, ArrowRight, Moon, Sun, Twitter, Facebook, Share2, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NEWS_DATA } from "./constants";

export default function App() {
  const [activeTab, setActiveTab] = useState("Gündem");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen font-sans transition-colors duration-300`}>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans text-[#0F172A] dark:text-slate-100 selection:bg-red-100 selection:text-red-600">
      {/* NAVBAR */}
      <nav className="bg-white dark:bg-slate-950 border-b border-[#E2E8F0] dark:border-slate-800 sticky top-0 z-50 h-[60px] flex items-center shadow-sm/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-xl font-black italic tracking-tighter uppercase cursor-pointer">
              HABER<span className="text-red-600">360</span>
            </h1>
            <div className="hidden md:flex gap-8 font-semibold text-sm">
              {["Gündem", "Ekonomi", "Teknoloji", "Spor", "Yaşam"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-[#64748B] dark:text-slate-400 hover:text-red-500"
                  } pb-1 px-1 transition-all relative group h-[60px] flex items-center`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-[#94A3B8] dark:text-slate-500">
            <div className="flex items-center gap-4 md:gap-6 border-r border-[#E2E8F0] dark:border-slate-800 pr-4 md:pr-6">
              <Search className="cursor-pointer hover:text-red-600 transition-colors" size={18} />
              <Bell className="cursor-pointer hover:text-red-600 transition-colors" size={18} />
            </div>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-400 hover:text-red-600"
              title={isDarkMode ? "Aydınlık Temaya Geç" : "Karanlık Temaya Geç"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="md:hidden text-[#0F172A] dark:text-slate-100 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-[60px] left-0 right-0 border-t border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-6 gap-4 font-semibold text-sm">
                {["Gündem", "Ekonomi", "Teknoloji", "Spor", "Yaşam"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                    className={`${
                      activeTab === tab ? "text-red-600" : "text-[#64748B] dark:text-slate-400"
                    } py-2 text-left`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SON DAKİKA BANDI (TICKER) */}
      <div className="bg-black text-white h-[34px] flex items-center overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex items-center gap-4 text-[11px] md:text-[12px] font-bold">
          <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] shrink-0 uppercase">SON DAKİKA</span>
          <div className="flex gap-12 animate-marquee whitespace-nowrap opacity-90">
            <p>Merkez Bankası faiz kararını açıkladı: Beklentilerin üzerinde artış gerçekleşti • Marmara'da fırtına uyarısı!</p>
            <p>Dolar kuru yeni güne nasıl başladı? • Süper Lig'de kritik derbi akşamı! • Yeni teknoloji yasası yürürlüğe girdi.</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-8 md:mb-12 min-h-fit lg:h-[420px]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative overflow-hidden rounded-[24px] cursor-pointer bg-black h-[400px] lg:h-full shadow-lg"
          >
            <img
              src={NEWS_DATA[0].image}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              alt="Main"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-12">
              <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-extrabold w-fit px-3 py-1 rounded-full mb-3 md:mb-4 uppercase tracking-wider">
                {NEWS_DATA[0].category}
              </span>
              <h2 className="text-white text-2xl sm:text-3xl md:text-[42px] font-extrabold mb-3 md:mb-4 leading-[1.1] tracking-tighter max-w-2xl">
                {NEWS_DATA[0].title}
              </h2>
              <p className="text-[#CBD5E1] text-sm md:text-base max-w-xl line-clamp-2">
                {NEWS_DATA[0].summary}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-[#F1F5F9] dark:border-slate-800 flex-1 shadow-sm transition-colors duration-300">
              <h3 className="flex items-center gap-2 mb-6 text-red-600 font-extrabold uppercase tracking-widest text-[12px]">
                🔥 Popüler Haberler
              </h3>
              <ul className="space-y-4">
                {NEWS_DATA.slice(1, 4).map((item, index) => (
                  <motion.li 
                    key={index} 
                    whileHover={{ x: 5 }}
                    className="flex gap-4 group cursor-pointer border-b border-[#F8FAFC] dark:border-slate-800/50 pb-3 last:border-0 last:pb-0 font-sans"
                  >
                    <span className="text-2xl font-black text-[#F1F5F9] dark:text-slate-800 group-hover:text-red-500/20 transition-colors">0{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-[13px] leading-tight group-hover:text-red-600 transition-colors uppercase tracking-tight text-slate-800 dark:text-slate-200">
                        {item.title}
                      </h4>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-6 rounded-[24px] text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1">Bültene Katıl</h4>
                <p className="text-[11px] opacity-80 mb-4">Günün özeti her sabah e-postanızda.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="E-posta"
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all placeholder:text-white/40"
                  />
                  <button className="bg-white text-[#4F46E5] px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Kayıt</button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </motion.div>
        </section>

        {/* HABER IZGARASI */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tighter">
               {activeTab} <span className="text-[#94A3B8] dark:text-slate-500 font-normal italic lowercase font-serif">haberleri</span>
            </h3>
            <button className="text-[10px] font-black text-red-600 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
              Tümünü Gör <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {NEWS_DATA.filter(item => activeTab === "Gündem" || item.category === activeTab).map((news, idx) => (
                <motion.div
                  key={news.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                  }}
                  className="bg-white dark:bg-slate-900 rounded-[16px] overflow-hidden border border-[#F1F5F9] dark:border-slate-800 hover:border-red-100 dark:hover:border-red-900 group shadow-sm transition-all duration-300"
                >
                  <div className="relative h-[160px] overflow-hidden bg-[#F1F5F9] dark:bg-slate-800">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      className="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-600 transition-colors shadow-sm"
                      title="Daha Sonra Oku"
                    >
                      <Bookmark size={14} />
                    </button>
                  </div>
                  <div className="p-5">
                    <span className="text-[9px] text-red-600 font-extrabold uppercase tracking-widest mb-2 block">
                      {news.category}
                    </span>
                    <h3 className="font-serif italic font-bold text-[15px] leading-snug mb-3 text-[#0F172A] dark:text-slate-100 group-hover:text-red-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="pt-4 border-t border-[#F8FAFC] dark:border-slate-800/50 flex items-center justify-between">
                      <button className="text-[10px] font-black text-[#94A3B8] dark:text-slate-500 group-hover:text-red-600 transition-colors uppercase tracking-widest">
                        Okumaya Devam Et →
                      </button>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="text-slate-400 hover:text-blue-500 transition-colors" title="Facebook'ta Paylaş">
                          <Facebook size={14} />
                        </button>
                        <button className="text-slate-400 hover:text-sky-400 transition-colors" title="Twitter'da Paylaş">
                          <Twitter size={14} />
                        </button>
                        <button className="text-slate-400 hover:text-emerald-500 transition-colors" title="Paylaş">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer bg-white dark:bg-slate-950 border-t border-[#E2E8F0] dark:border-slate-800 mt-16 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-[11px] text-[#94A3B8] dark:text-slate-500 uppercase font-bold tracking-widest text-center md:text-left">
          <div>&copy; 2026 HABER360 - TÜM HAKLARI SAKLIDIR.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-red-600 transition-colors">KÜNYE</a>
            <a href="#" className="hover:text-red-600 transition-colors">İLETİŞİM</a>
            <a href="#" className="hover:text-red-600 transition-colors">KVKK</a>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  </div>
);
}
