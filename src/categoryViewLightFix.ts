function installCategoryViewLightFix() {
  if (document.getElementById("sonarat-category-light-fix")) return;

  const style = document.createElement("style");
  style.id = "sonarat-category-light-fix";
  style.textContent = `
    html.dark .sonarat-category-view,
    .sonarat-category-view {
      background: #f4f1eb !important;
      color: #0f172a !important;
    }

    html.dark .sonarat-hero-card,
    html.dark .sonarat-side-card,
    html.dark .sonarat-news-card {
      background: rgba(255, 255, 255, 0.94) !important;
      border-color: rgba(226, 232, 240, 0.95) !important;
      color: #0f172a !important;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08) !important;
    }

    html.dark .sonarat-category-subtitle,
    html.dark .sonarat-category-empty {
      color: #64748b !important;
    }

    html.dark .sonarat-hero-overlay {
      color: #fff !important;
    }

    html.dark .sonarat-card-link,
    html.dark .sonarat-hero-link {
      background: #fff !important;
      color: #0f172a !important;
    }

    html.dark .sonarat-side-title,
    html.dark .sonarat-news-title {
      color: #0f172a !important;
    }
  `;
  document.head.appendChild(style);
}

if (typeof window !== "undefined") {
  installCategoryViewLightFix();

  const observer = new MutationObserver(() => installCategoryViewLightFix());
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
