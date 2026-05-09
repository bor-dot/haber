function upperTR(value = "") {
  return value.toLocaleUpperCase("tr-TR");
}

function setText(element: HTMLElement, value: string) {
  if (element.textContent !== value) element.textContent = value;
}

function polishCategoryText() {
  document.documentElement.lang = "tr";

  document
    .querySelectorAll<HTMLElement>(".sonarat-source-row")
    .forEach((row) => {
      if (row.style.textTransform !== "none") row.style.textTransform = "none";
    });

  document
    .querySelectorAll<HTMLElement>(".sonarat-source-row span:first-child")
    .forEach((source) => {
      const text = source.textContent?.trim();
      if (text) setText(source, upperTR(text));
    });

  document
    .querySelectorAll<HTMLElement>(".sonarat-card-link, .sonarat-hero-link")
    .forEach((link) => {
      if (link.style.textTransform !== "none") link.style.textTransform = "none";
      setText(link, "HABERİ OKU →");
    });

  document.querySelectorAll<HTMLElement>(".sonarat-category-count").forEach((count) => {
    if (count.style.textTransform !== "none") count.style.textTransform = "none";
    setText(count, upperTR(count.textContent || ""));
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
