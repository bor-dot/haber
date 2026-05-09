const FEEDS = [
  { source: "NTV", category: "Gündem", url: "https://www.ntv.com.tr/son-dakika.rss" },
  { source: "NTV Ekonomi", category: "Ekonomi", url: "https://www.ntv.com.tr/ekonomi.rss" },
  { source: "NTV Spor", category: "Spor", url: "https://www.ntv.com.tr/spor.rss" },
  { source: "NTV Teknoloji", category: "Teknoloji", url: "https://www.ntv.com.tr/teknoloji.rss" },
  { source: "BBC Türkçe", category: "Dünya", url: "https://feeds.bbci.co.uk/turkce/rss.xml" },
  { source: "Anadolu Ajansı", category: "Gündem", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel" },
  { source: "Sözcü", category: "Gündem", url: "https://www.sozcu.com.tr/rss/anasayfa.xml" },
  { source: "Haber Türk", category: "Gündem", url: "https://www.haberturk.com/rss" },
  { source: "TRT Haber", category: "Dünya", url: "https://www.trthaber.com/sondakika.rss" },
  { source: "AA Bilim", category: "Bilim", url: "https://www.aa.com.tr/tr/rss/default?cat=bilim-teknoloji" },
];

function extractImage(item) {
  const mediaMatch = item.match(/<media:content[^>]+url="([^"]+)"/);
  if (mediaMatch) return mediaMatch[1];
  const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/);
  if (enclosureMatch) return enclosureMatch[1];
  const imgMatch = item.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];
  return null;
}

function parseXML(xml, feed) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let id = 0;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() || "";
    const link = item.match(/<link>([^<]+)<\/link>/)?.[1]?.trim()
      || item.match(/<link\s+href="([^"]+)"/)?.[1]?.trim() || "";
    const description = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1]
      ?.replace(/<[^>]+>/g, "").trim() || "";
    const pubDate = item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1]?.trim() || "";
    const image = extractImage(item);

    if (!title || !link) continue;

    const date = pubDate ? new Date(pubDate) : new Date();
    const now = new Date();
    const diffMin = Math.floor((now - date) / 60000);
    const diffHour = Math.floor(diffMin / 60);

    let displayDate;
    if (diffMin < 5) displayDate = "AZ ÖNCE";
    else if (diffMin < 60) displayDate = `${diffMin} DAKİKA ÖNCE`;
    else if (diffHour < 24) displayDate = `${diffHour} SAAT ÖNCE`;
    else displayDate = date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    items.push({
      id: `${feed.source}-${id++}`,
      title: title.substring(0, 120),
      summary: description.substring(0, 300),
      category: feed.category,
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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=60");

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        const response = await fetch(feed.url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; SonaratBot/1.0)" },
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
    const numbered = allNews.map((item, idx) => ({ ...item, id: idx + 1 }));

    res.status(200).json({ news: numbered, count: numbered.length, updatedAt: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
