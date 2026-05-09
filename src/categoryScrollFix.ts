const CATEGORY_ACTION_TEXT = [
  "Gündem",
  "Ekonomi",
  "Teknoloji",
  "Spor",
  "Yaşam",
  "Bilim",
  "Dünya",
  "Timeline",
  "Economy",
  "Technology",
  "Sports",
  "Lifestyle",
  "Science",
  "World",
  "Tümünü Gör",
  "See All",
];

const normalizedActions = CATEGORY_ACTION_TEXT.map((text) => normalizeLabel(text));

function normalizeLabel(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/\s+/g, " ")
    .trim();
}

function isCategoryAction(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  const control = target.closest("button, li");
  if (!control) return false;

  const label = normalizeLabel(control.textContent || "");
  return normalizedActions.some(
    (action) => label === action || label.startsWith(`${action} `),
  );
}

function restoreTopAfterCategoryChange() {
  const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  window.requestAnimationFrame(scrollTop);
  window.setTimeout(scrollTop, 80);
  window.setTimeout(scrollTop, 220);
}

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
  document.addEventListener(
    "click",
    (event) => {
      if (isCategoryAction(event.target)) restoreTopAfterCategoryChange();
    },
    true,
  );
}
