import { useEffect, useMemo, useState } from 'react';
import { Bookmark, ExternalLink, Loader2, RefreshCw, Search } from 'lucide-react';
import { NewsItem } from './types';

const categories = ['Tümü', 'Gündem', 'Ekonomi', 'Teknoloji', 'Spor', 'Yaşam', 'Bilim', 'Dünya'];
const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200&h=675';

export default function AppFixed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedNews');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setNews(Array.isArray(data.news) ? data.news : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Haberler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const timer = window.setInterval(fetchNews, 120000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedNews', JSON.stringify(savedIds));
  }, [savedIds]);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
      const matchesQuery = !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery) ||
        item.source.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, news, query]);

  const featured = filteredNews[0];

  const toggleSaved = (id: number) => {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#f4f1eb]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <button className="text-left" onClick={() => setActiveCategory('Tümü')}>
            <span className="block text-2xl font-black italic tracking-tight">son<span className="text-orange-600">arat</span></span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Canlı haber akışı</span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search size={16} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Haberlerde ara"
              className="w-36 bg-transparent text-sm font-semibold outline-none md:w-64"
            />
          </div>

          <button
            onClick={fetchNews}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm transition hover:bg-orange-700"
            aria-label="Yenile"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 md:px-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
                activeCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-slate-500 hover:text-red-600'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {loading && news.length === 0 && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-slate-500">
            <Loader2 size={36} className="animate-spin text-red-600" />
            <p className="text-xs font-black uppercase tracking-[0.25em]">Haberler yükleniyor</p>
          </div>
        )}

        {error && news.length === 0 && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm font-black uppercase tracking-widest text-red-600">Haberler yüklenemedi</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
        )}

        {featured && (
          <article className="mb-8 grid overflow-hidden rounded-lg bg-slate-950 text-white shadow-xl md:grid-cols-[1.2fr_0.8fr]">
            <img
              src={featured.image || fallbackImage}
              alt={featured.title}
              className="h-72 w-full object-cover md:h-full"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
              <div>
                <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-red-300">
                  <span>{featured.category}</span>
                  <span>{featured.source}</span>
                </div>
                <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{featured.title}</h1>
                <p className="mt-4 text-sm leading-6 text-slate-300">{featured.summary}</p>
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:bg-red-100"
              >
                Kaynağa git <ExternalLink size={14} />
              </a>
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.slice(featured ? 1 : 0).map((item) => (
            <article key={item.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img
                src={item.image || fallbackImage}
                alt={item.title}
                className="h-44 w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="text-red-600">{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h2 className="min-h-14 text-base font-black leading-snug uppercase tracking-tight">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSaved(item.id)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                      savedIds.includes(item.id)
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-slate-200 text-slate-500 hover:text-red-600'
                    }`}
                    aria-label="Kaydet"
                  >
                    <Bookmark size={16} fill={savedIds.includes(item.id) ? 'currentColor' : 'none'} />
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 hover:text-red-600"
                  >
                    Haberi oku <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
