function upperTR(value = "") {
  return value.toLocaleUpperCase("tr-TR");
}

function polishCategoryText() {
  document.documentElement.lang = "tr";

  document
    .querySelectorAll<HTMLElement>(".sonarat-source-row")
    .forEach((row) => {
      row.style.textTransform = "none";
    });

  document
    .querySelectorAll<HTMLElement>(".sonarat-source-row span:first-child")
    .forEach((source) => {
      const text = source.textContent?.trim();
      if (text) source.textContent = upperTR(text);
    });

  document
    .querySelectorAll<HTMLElement>(".sonarat-card-link, .sonarat-hero-link")
    .forEach((link) => {
      link.style.textTransform = "none";
      link.textContent = "HABERİ OKU →";
    });

  document.querySelectorAll<HTMLElement>(".sonarat-category-count").forEach((count) => {
    count.style.textTransform = "none";
    count.textContent = upperTR(count.textContent || "");
  });
}

if (typeof window !== "undefined") {
  polishCategoryText();

  const observer = new MutationObserver(() => polishCategoryText());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
