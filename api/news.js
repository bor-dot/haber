const FEEDS = [
  // Mevcut Ana Akım Kaynaklar
  { source: "NTV", category: "Gündem", url: "https://www.ntv.com.tr/son-dakika.rss" },
  { source: "NTV Ekonomi", category: "Ekonomi", url: "https://www.ntv.com.tr/ekonomi.rss" },
  { source: "NTV Spor", category: "Spor", url: "https://www.ntv.com.tr/spor.rss" },
  { source: "NTV Teknoloji", category: "Teknoloji", url: "https://www.ntv.com.tr/teknoloji.rss" },
  { source: "BBC Türkçe", category: "Dünya", url: "https://feeds.bbci.co.uk/turkce/rss.xml" },
  { source: "Anadolu Ajansı", category: "Gündem", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel" },
  { source: "AA Spor", category: "Spor", url: "https://www.aa.com.tr/tr/rss/default?cat=spor" },
  { source: "AA Ekonomi", category: "Ekonomi", url: "https://www.aa.com.tr/tr/rss/default?cat=ekonomi" },
  { source: "Sözcü", category: "Gündem", url: "https://www.sozcu.com.tr/rss/anasayfa.xml" },
  { source: "Haber Türk", category: "Gündem", url: "https://www.haberturk.com/rss" },
  { source: "TRT Haber", category: "Gündem", url: "https://www.trthaber.com/sondakika.rss" },
  { source: "AA Bilim", category: "Bilim", url: "https://www.aa.com.tr/tr/rss/default?cat=bilim-teknoloji" },
  { source: "Diken", category: "Gündem", url: "https://r.jina.ai/http://https://www.diken.com.tr/feed/", type: "jina" },
  { source: "bianet", category: "Gündem", url: "https://bianet.org/bianet.rss" },
  { source: "DW Türkçe", category: "Dünya", url: "https://rss.dw.com/xml/rss-tur-all" },
  { source: "T24", category: "Gündem", url: "https://t24.com.tr", type: "html" },
  { source: "Gazete Oksijen", category: "Gündem", url: "https://www.gazeteoksijen.com", type: "html" },

  // --- YENİ EKLENEN TEKNOLOJİ VE BİLİM KAYNAKLARI ---
  { source: "Webtekno", category: "Teknoloji", url: "https://www.webtekno.com/rss.xml" },
  { source: "DonanımHaber", category: "Teknoloji", url: "https://www.donanimhaber.com/rss/tum/" },
  { source: "ShiftDelete", category: "Teknoloji", url: "https://shiftdelete.net/feed" },
  { source: "Chip Online", category: "Teknoloji", url: "https://www.chip.com.tr/rss" },
  { source: "TÜBİTAK Bilim Genç", category: "Bilim", url: "https://bilimgenc.tubitak.gov.tr/rss.xml" }
];

const REQUEST_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; SonaratBot/1.0)",
};

const CATEGORY_ALIASES = [
  { value: "Ekonomi", terms: ["ekonomi", "finans", "gram altin", "gram altın", "ceyrek altin", "çeyrek altın", "altin fiyat", "altın fiyat", "borsa", "para", "emekli", "sgk"] },
  // Teknoloji kategorisi için yeni kaynakları kusursuz ayıklayacak anahtar kelimeler eklendi
  { value: "Teknoloji", terms: ["teknoloji", "bilisim", "bilişim", "yapay-zeka", "yapay zeka", "siber", "donanım", "yazılım", "mobil", "internet", "akıllı telefon"] },
  { value: "Spor", terms: ["spor", "futbol", "basketbol", "galatasaray", "fenerbahce", "fenerbahçe", "besiktas", "beşiktaş", "trabzonspor", "super-lig", "süper lig", "okçu", "okçuluk"] },
  { value: "Yaşam", terms: ["yasam", "yaşam", "saglik", "sağlık", "kultur", "kültür", "kultur-sanat", "kültür-sanat", "magazin", "seyahat", "gastronomi", "sinema", "ekran", "ajanda", "anne"] },
  // Bilim kategorisi TÜBİTAK haberlerini kapsayacak şekilde genişletildi
  { value: "Bilim", terms: ["bilim", "bilim-teknoloji", "bilim-ve-teknoloji", "uzay", "savunma", "arastirma", "araştırma", "tübitak", "fizik", "kimya", "biyoloji"] },
  { value: "Dünya", terms: ["dunya", "dünya", "world", "avrupa", "abd", "iran", "israil", "gazze", "rusya", "ukrayna", "lubnan", "lübnan", "new-york-times", "financial-times", "the-economist", "the-athletic"] },
  { value: "Gündem", terms: ["gundem", "gündem", "turkiye", "türkiye", "son-dakika", "son dakika", "politika"] },
];

const REQUEST_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; SonaratBot/1.0)",
};

const CATEGORY_ALIASES = [
  { value: "Ekonomi", terms: ["ekonomi", "finans", "gram altin", "gram altın", "ceyrek altin", "çeyrek altın", "altin fiyat", "altın fiyat", "borsa", "para", "emekli", "sgk"] },
  { value: "Teknoloji", terms: ["teknoloji", "bilisim", "bilişim", "yapay-zeka", "yapay zeka", "siber"] },
  { value: "Spor", terms: ["spor", "futbol", "basketbol", "galatasaray", "fenerbahce", "fenerbahçe", "besiktas", "beşiktaş", "trabzonspor", "super-lig", "süper lig", "okçu", "okçuluk"] },
  { value: "Yaşam", terms: ["yasam", "yaşam", "saglik", "sağlık", "kultur", "kültür", "kultur-sanat", "kültür-sanat", "magazin", "seyahat", "gastronomi", "sinema", "ekran", "ajanda", "anne"] },
  { value: "Bilim", terms: ["bilim", "bilim-teknoloji", "bilim-ve-teknoloji", "uzay", "savunma", "arastirma", "araştırma"] },
  { value: "Dünya", terms: ["dunya", "dünya", "world", "avrupa", "abd", "iran", "israil", "gazze", "rusya", "ukrayna", "lubnan", "lübnan", "new-york-times", "financial-times", "the-economist", "the-athletic"] },
  { value: "Gündem", terms: ["gundem", "gündem", "turkiye", "türkiye", "son-dakika", "son dakika", "politika"] },
];

const HTML_FEED_RULES = {
  Diken: {
    host: "diken.com.tr",
    include: ["/"],
    exclude: ["/kategori/", "/author/", "/tag/", "/wp-content/", "/feed/"],
    singleSegment: true,
    maxItems: 24,
  },
  T24: {
    host: "t24.com.tr",
    include: ["/haber/"],
    maxItems: 24,
  },
  "Gazete Oksijen": {
    host: "gazeteoksijen.com",
    include: [
      "/turkiye/",
      "/dunya/",
      "/ekonomi/",
      "/spor/",
      "/bilim-ve-teknoloji/",
      "/gastronomi/",
      "/seyahat/",
      "/ajanda/",
      "/ekran/",
      "/sinema/",
      "/new-york-times/",
      "/financial-times/",
      "/the-economist/",
      "/the-athletic/",
    ],
    maxItems: 24,
  },
};

const HTML_TITLE_BLOCKLIST = [
  "anasayfa",
  "vitrin",
  "diken",
  "diken yaramazlara biraz batar",
  "gundem",
  "gündem",
  "politika",
  "ekonomi",
  "spor",
  "dunya",
  "dünya",
  "yazarlar",
  "galeriler",
  "video",
  "listeler",
  "ucretsiz uye ol",
  "ücretsiz üye ol",
  "gunun bulteni",
  "günün bülteni",
];

function decodeNumericEntity(match, value, radix) {
  const codePoint = Number.parseInt(value, radix);
  if (!Number.isFinite(codePoint)) return match;

  try {
    return String.fromCodePoint(codePoint);
  } catch {
    return match;
  }
}

function decodeText(value = "") {
  let text = String(value).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");

  for (let i = 0; i < 2; i += 1) {
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&#x([0-9a-f]+);/gi, (match, hex) => decodeNumericEntity(match, hex, 16))
      .replace(/&#(\d+);/g, (match, decimal) => decodeNumericEntity(match, decimal, 10))
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  return text.trim();
}

function stripTags(value = "") {
  return decodeText(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeText(match[1]) : "";
}

function getAttr(block, tag, attr) {
  const match = block.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, "i"));
  return match ? decodeText(match[1]) : "";
}

function getHtmlAttr(attrs, attr) {
  const match = attrs.match(new RegExp(`\\s${attr}=["']([^"']+)["']`, "i"));
  return match ? decodeText(match[1]) : "";
}

function normalizeUrl(url, baseUrl = "") {
  const clean = decodeText(url).trim();
  if (!clean || /^(?:javascript|mailto|tel):/i.test(clean)) return null;
  if (clean.startsWith("//")) return `https:${clean}`;
  if (/^https?:\/\//i.test(clean)) return clean;

  try {
    return new URL(clean, baseUrl || undefined).toString();
  } catch {
    return null;
  }
}

function stripTrackingParams(url) {
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (key.startsWith("utm_")) parsed.searchParams.delete(key);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function normalizeForMatch(value = "") {
  return decodeText(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function inferCategory(rawCategory, link, title, fallback) {
  const haystack = normalizeForMatch(`${rawCategory} ${link} ${title}`);

  for (const category of CATEGORY_ALIASES) {
    if (category.terms.some((term) => haystack.includes(normalizeForMatch(term)))) {
      return category.value;
    }
  }

  return fallback;
}

function isLikelyImageUrl(url) {
  return Boolean(url) && !/logo|favicon|sprite/i.test(url);
}

function firstImageUrl(block, baseUrl = "") {
  const candidates = [
    getAttr(block, "media:content", "url"),
    getAttr(block, "media:thumbnail", "url"),
    getAttr(block, "enclosure", "url"),
    getTag(block, "imageUrl"),
    getTag(block, "image"),
    getTag(block, "url"),
    getAttr(block, "img", "src"),
    getAttr(block, "source", "url"),
  ];

  for (const candidate of candidates) {
    const image = normalizeUrl(candidate, baseUrl);
    if (isLikelyImageUrl(image)) return image;
  }

  return null;
}

function getItemLink(block) {
  const directLink = getTag(block, "link");
  if (directLink) return directLink;

  return getAttr(block, "link", "href") || getTag(block, "id") || getTag(block, "guid");
}

function getItemCategory(block) {
  return getTag(block, "category") || getAttr(block, "category", "term");
}

function parseDate(block) {
  const rawDate = getTag(block, "pubDate") || getTag(block, "published") || getTag(block, "updated") || getTag(block, "dc:date");
  const date = rawDate ? new Date(rawDate) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatDisplayDate(date) {
  const now = new Date();
  const diffMin = Math.max(0, Math.floor((now - date) / 60000));
  const diffHour = Math.floor(diffMin / 60);

  if (diffMin < 5) return "AZ ÖNCE";
  if (diffMin < 60) return `${diffMin} DAKİKA ÖNCE`;
  if (diffHour < 24) return `${diffHour} SAAT ÖNCE`;
  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function parseBlocks(xml, tagName) {
  const blocks = [];
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  let match;

  while ((match = regex.exec(xml)) !== null) {
    blocks.push(match[1]);
  }

  return blocks;
}

function isAllowedHtmlUrl(url, feed) {
  const rule = HTML_FEED_RULES[feed.source];
  if (!rule || !url) return false;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname;

    if (host !== rule.host && !host.endsWith(`.${rule.host}`)) return false;
    if (rule.include?.length && !rule.include.some((prefix) => path.startsWith(prefix))) return false;
    if (rule.exclude?.some((prefix) => path.startsWith(prefix))) return false;
    if (rule.singleSegment) {
      const segments = path.split("/").filter(Boolean);
      if (segments.length !== 1 || segments[0].length < 18) return false;
    }
    if (/\.(?:jpg|jpeg|png|gif|webp|svg|pdf)$/i.test(path)) return false;

    return true;
  } catch {
    return false;
  }
}

function cleanHtmlTitle(value = "") {
  let title = stripTags(value)
    .replace(/^\d{1,2}:\d{2}\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (title.length > 40) {
    const words = title.split(" ");
    if (words.length % 2 === 0) {
      const midpoint = words.length / 2;
      const firstHalf = words.slice(0, midpoint).join(" ");
      const secondHalf = words.slice(midpoint).join(" ");
      if (normalizeForMatch(firstHalf) === normalizeForMatch(secondHalf)) {
        title = firstHalf;
      }
    }
  }

  return title;
}

function titleFromAnchor(markup, attrs) {
  const imgAlt = getAttr(markup, "img", "alt");
  const heading = markup.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1] || "";
  const candidates = [getHtmlAttr(attrs, "title"), imgAlt, heading, markup];

  for (const candidate of candidates) {
    const title = cleanHtmlTitle(candidate);
    if (isUsefulHtmlTitle(title)) return title;
  }

  return "";
}

function isUsefulHtmlTitle(title) {
  const normalized = normalizeForMatch(title);
  if (title.length < 22) return false;
  if (title.split(/\s+/).length < 3) return false;
  if (HTML_TITLE_BLOCKLIST.includes(normalized)) return false;
  if (/^(?:son dakika|t24|gazete oksijen)$/i.test(title)) return false;
  return true;
}

function parseHtmlDate(markup, fallbackOffset) {
  const text = stripTags(markup);
  const timeMatch = text.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);

  if (timeMatch) {
    const date = new Date();
    date.setHours(Number(timeMatch[1]), Number(timeMatch[2]), 0, 0);
    if (date.getTime() - Date.now() > 30 * 60000) date.setDate(date.getDate() - 1);
    return date;
  }

  return new Date(Date.now() - fallbackOffset * 60000);
}

function parseHTML(html, feed) {
  const rule = HTML_FEED_RULES[feed.source];
  const maxItems = rule?.maxItems || 20;
  const items = [];
  const seenUrls = new Set();
  const seenTitles = new Set();
  const anchorRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  let id = 0;

  while ((match = anchorRegex.exec(html)) !== null && items.length < maxItems) {
    const attrs = match[1];
    const markup = match[0];
    const link = normalizeUrl(getHtmlAttr(attrs, "href"), feed.url);

    if (!isAllowedHtmlUrl(link, feed)) continue;
    if (seenUrls.has(link)) continue;

    const title = titleFromAnchor(markup, attrs);
    const titleKey = normalizeForMatch(title);

    if (!title || seenTitles.has(titleKey)) continue;

    const date = parseHtmlDate(markup, items.length);
    const category = inferCategory("", link, title, feed.category);
    const image = firstImageUrl(markup, link || feed.url);

    seenUrls.add(link);
    seenTitles.add(titleKey);

    items.push({
      id: `${feed.source}-${id++}`,
      title: title.substring(0, 120),
      summary: title.substring(0, 300),
      category,
      date: formatDisplayDate(date),
      pubDate: date.getTime(),
      image,
      source: feed.source,
      url: link,
      isNew: Date.now() - date.getTime() < 30 * 60000,
    });
  }

  return items;
}

function parseJinaDate(segment, fallbackOffset) {
  const rawDate = segment.match(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+\d{1,2}\s+[A-Z][a-z]{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+[+-]\d{4}\b/)?.[0];
  const fallback = new Date(Date.now() - fallbackOffset * 60000);
  if (!rawDate) return fallback;

  const date = new Date(rawDate);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function parseJinaMarkdown(markdown, feed) {
  const maxItems = HTML_FEED_RULES[feed.source]?.maxItems || 20;
  const headingRegex = /^#{2,4}\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+)[^)]*\)/gm;
  const matches = [...markdown.matchAll(headingRegex)];
  const items = [];
  const seenUrls = new Set();
  const seenTitles = new Set();
  let id = 0;

  for (let index = 0; index < matches.length && items.length < maxItems; index += 1) {
    const rawTitle = matches[index][1];
    const rawLink = matches[index][2];
    const link = stripTrackingParams(normalizeUrl(rawLink, feed.url) || "");

    if (!isAllowedHtmlUrl(link, feed)) continue;
    if (seenUrls.has(link)) continue;

    const title = cleanHtmlTitle(rawTitle);
    const titleKey = normalizeForMatch(title);
    if (!title || seenTitles.has(titleKey) || !isUsefulHtmlTitle(title)) continue;

    const nextIndex = matches[index + 1]?.index ?? markdown.length;
    const segment = markdown.slice(matches[index].index, nextIndex);
    const date = parseJinaDate(segment, items.length);
    const category = inferCategory("", link, title, feed.category);

    seenUrls.add(link);
    seenTitles.add(titleKey);

    items.push({
      id: `${feed.source}-${id++}`,
      title: title.substring(0, 120),
      summary: title.substring(0, 300),
      category,
      date: formatDisplayDate(date),
      pubDate: date.getTime(),
      image: null,
      source: feed.source,
      url: link,
      isNew: Date.now() - date.getTime() < 30 * 60000,
    });
  }

  return items;
}

async function fetchArticleImage(url) {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const html = await response.text();
    const candidates = [
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1],
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1],
      html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i)?.[1],
      html.match(/<img[^>]+class=["'][^"']*(?:primary|main|article|news)[^"']*["'][^>]+src=["']([^"']+)["']/i)?.[1],
    ];

    for (const candidate of candidates) {
      const image = normalizeUrl(candidate, url);
      if (isLikelyImageUrl(image)) return image;
    }
  } catch {
    return null;
  }

  return null;
}

function parseXML(xml, feed) {
  const blocks = [...parseBlocks(xml, "item"), ...parseBlocks(xml, "entry")];
  const items = [];
  let id = 0;

  for (const block of blocks) {
    const link = normalizeUrl(getItemLink(block), feed.url) || "";
    const title = stripTags(getTag(block, "title"));
    const description = stripTags(getTag(block, "description") || getTag(block, "summary") || getTag(block, "content"));
    const date = parseDate(block);
    const image = firstImageUrl(block, link || feed.url);
    const category = inferCategory(getItemCategory(block), link, title, feed.category);

    if (!title || !link) continue;

    items.push({
      id: `${feed.source}-${id++}`,
      title: title.substring(0, 120),
      summary: description.substring(0, 300),
      category,
      date: formatDisplayDate(date),
      pubDate: date.getTime(),
      image,
      source: feed.source,
      url: link,
      isNew: Date.now() - date.getTime() < 30 * 60000,
    });
  }

  return items;
}

async function enrichMissingImages(items) {
  const missing = items.filter((item) => !item.image).slice(0, 12);
  if (missing.length === 0) return;

  const images = await Promise.allSettled(
    missing.map((item) => fetchArticleImage(item.url))
  );

  images.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      missing[index].image = result.value;
    }
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        const response = await fetch(feed.url, {
          headers: REQUEST_HEADERS,
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const raw = await response.text();
        if (feed.type === "html") return parseHTML(raw, feed);
        if (feed.type === "jina") return parseJinaMarkdown(raw, feed);
        return parseXML(raw, feed);
      })
    );

    const allNews = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") allNews.push(...result.value);
    });

    allNews.sort((a, b) => b.pubDate - a.pubDate);
    await enrichMissingImages(allNews);

    const numbered = allNews.map((item, idx) => ({ ...item, id: idx + 1 }));
    const categoryCounts = numbered.reduce((counts, item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
      return counts;
    }, {});

    res.status(200).json({
      news: numbered,
      count: numbered.length,
      categoryCounts,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
