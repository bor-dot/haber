const FEEDS = [
  { source: "NTV", category: "Gündem", url: "https://www.ntv.com.tr/son-dakika.rss" },
  { source: "NTV Ekonomi", category: "Ekonomi", url: "https://www.ntv.com.tr/ekonomi.rss" },
  { source: "NTV Spor", category: "Spor", url: "https://www.ntv.com.tr/spor.rss" },
  { source: "NTV Teknoloji", category: "Teknoloji", url: "https://www.ntv.com.tr/teknoloji.rss" },
  { source: "BBC Türkçe", category: "Dünya", url: "https://feeds.bbci.co.uk/turkce/rss.xml" },
  { source: "Anadolu Ajansı", category: "Gündem", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel" },
  { source: "Sözcü", category: "Gündem", url: "https://www.sozcu.com.tr/rss/anasayfa.xml" },
  { source: "Haber Türk", category: "Gündem", url: "https://www.haberturk.com/rss" },
  { source: "TRT Haber", category: "Gündem", url: "https://www.trthaber.com/sondakika.rss" },
  { source: "AA Bilim", category: "Bilim", url: "https://www.aa.com.tr/tr/rss/default?cat=bilim-teknoloji" },
];

const REQUEST_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; SonaratBot/1.0)",
};

const CATEGORY_ALIASES = [
  { value: "Ekonomi", terms: ["ekonomi", "finans", "altin", "borsa", "para", "emekli", "sgk"] },
  { value: "Teknoloji", terms: ["teknoloji", "bilisim", "yapay-zeka", "yapay zeka", "siber"] },
  { value: "Spor", terms: ["spor", "futbol", "basketbol", "galatasaray", "fenerbahce", "besiktas", "trabzonspor", "super-lig", "süper lig"] },
  { value: "Yaşam", terms: ["yasam", "yaşam", "saglik", "sağlık", "kultur", "kültür", "magazin", "seyahat", "anne"] },
  { value: "Bilim", terms: ["bilim", "bilim-teknoloji", "uzay", "savunma", "arastirma", "araştırma"] },
  { value: "Dünya", terms: ["dunya", "dünya", "world", "avrupa", "abd", "iran", "israil", "gazze", "rusya", "ukrayna", "lubnan", "lübnan"] },
  { value: "Gündem", terms: ["gundem", "gündem", "turkiye", "türkiye", "son-dakika", "son dakika", "politika"] },
];

function decodeText(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
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

function normalizeUrl(url, baseUrl = "") {
  const clean = decodeText(url).trim();
  if (!clean) return null;
  if (clean.startsWith("//")) return `https:${clean}`;
  if (/^https?:\/\//i.test(clean)) return clean;

  try {
    return new URL(clean, baseUrl || undefined).toString();
  } catch {
    return null;
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
  const rawDate = getTag(block, "pubDate") || getTag(block, "published") || getTag(block, "updated");
  const date = rawDate ? new Date(rawDate) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
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
    const now = new Date();
    const diffMin = Math.floor((now - date) / 60000);
    const diffHour = Math.floor(diffMin / 60);
    const image = firstImageUrl(block, link || feed.url);
    const category = inferCategory(getItemCategory(block), link, title, feed.category);

    if (!title || !link) continue;

    let displayDate;
    if (diffMin < 5) displayDate = "AZ ÖNCE";
    else if (diffMin < 60) displayDate = `${diffMin} DAKİKA ÖNCE`;
    else if (diffHour < 24) displayDate = `${diffHour} SAAT ÖNCE`;
    else displayDate = date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    items.push({
      id: `${feed.source}-${id++}`,
      title: title.substring(0, 120),
      summary: description.substring(0, 300),
      category,
      date: displayDate,
      pubDate: date.getTime(),
      image,
      source: feed.source,
      url: link,
      isNew: diffMin < 30,
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
  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=60");

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        const response = await fetch(feed.url, {
          headers: REQUEST_HEADERS,
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const xml = await response.text();
        return parseXML(xml, feed);
      })
    );

    const allNews = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") allNews.push(...result.value);
    });

    allNews.sort((a, b) => b.pubDate - a.pubDate);
    await enrichMissingImages(allNews);

    const numbered = allNews.map((item, idx) => ({ ...item, id: idx + 1 }));

    res.status(200).json({ news: numbered, count: numbered.length, updatedAt: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
