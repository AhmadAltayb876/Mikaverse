/**
 * Shared generator for project listing sections (companies, amateurs, blogs, etc.)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");

function getPaths(sectionKey) {
  return {
    dataPath: path.join(ROOT, "data", sectionKey, "content.json"),
    outDir: path.join(ROOT, "html", sectionKey),
    listingPath: path.join(ROOT, "html", `${sectionKey}.html`),
  };
}

function assetPath(image, depth) {
  const clean = String(image || "img/CNCIcon.png").replace(/^\.\.\//, "");
  const prefix = depth === 2 ? "../../" : "../";
  return prefix + clean;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function placeholderText(subtitle) {
  return `محتوى مؤقت لقسم «${subtitle}» — استبدله في content.json ثم أعد تشغيل المولّد.`;
}

function buildSections(card, sectionTemplate) {
  const data = card.detail?.sections || {};
  return sectionTemplate
    .map(({ id, subtitle }) => {
      const content = data[id] || placeholderText(subtitle);
      return `
                    <section class="project-detail-section reveal" id="${id}">
                        <h2 class="project-detail-subtitle">${escapeHtml(subtitle)}</h2>
                        <div class="project-detail-body">
                            <p>${escapeHtml(content)}</p>
                        </div>
                    </section>`;
    })
    .join("\n");
}

function buildSidebarNav(sectionTemplate) {
  return sectionTemplate
    .map(
      ({ id, subtitle }) =>
        `                            <li><a href="#${id}" class="project-sidebar-link"><span class="project-sidebar-link-text">${escapeHtml(subtitle)}</span></a></li>`,
    )
    .join("\n");
}

function buildDetailPage(card, sectionTemplate, sectionKey, page) {
  const title = escapeHtml(card.title);
  const meta = escapeHtml(
    card.detail?.metaDescription || `${card.title} | Mikaverse`,
  );
  const lead = escapeHtml(card.detail?.lead || card.title);
  const tag = escapeHtml(card.tag || "Project");
  const image = assetPath(card.image, 2);
  const sectionId = page.sectionId || "printing-projects";
  const backLabel = escapeHtml(page.backLinkLabel || "العودة للقائمة");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Mikaverse</title>
    <link rel="icon" type="image/png" href="../../img/My-logo-final-deletedBack.png">
    <meta name="description" content="${meta}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../css/styles.css">
</head>
<body class="company-project-detail-page">
    <div class="site-bg" aria-hidden="true">
        <video autoplay muted loop playsinline preload="auto" class="bg-video">
            <source src="../../assets/videos/background.mp4" type="video/mp4">
        </video>
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="noise-overlay"></div>
    </div>
    <header class="glass-header" id="header">
        <div class="container header-container">
            <a class="logo-section" href="../index.html#home" aria-label="Mikaverse Home">
                <img src="../../img/My-logo-final-deletedBack.png" alt="Mikaverse Logo" class="logo-img" onerror="this.style.display='none';">
                <h1 class="logo-text">MIKAVERSE</h1>
            </a>
            <div id="nav-placeholder"></div>
            <a class="primary-btn glow-btn desktop-only" href="https://wa.me/963939327169" target="_blank">تواصل معنا</a>
            <button class="mobile-toggle" aria-label="القائمة"><i class="fa-solid fa-bars"></i></button>
        </div>
    </header>
    <main class="project-detail-main" data-project-detail>
        <aside class="project-detail-sidebar" aria-label="قائمة أقسام الصفحة">
            <nav class="project-sidebar-nav">
                <p class="project-sidebar-heading"><i class="fa-solid fa-bars-staggered" aria-hidden="true"></i> المحتويات</p>
                <ul class="project-sidebar-list">
${buildSidebarNav(sectionTemplate)}
                </ul>
            </nav>
        </aside>
        <div class="project-detail-page-column">
            <div class="project-detail-container">
                <a href="../${sectionKey}.html#${sectionId}" class="back-link reveal"><i class="fa-solid fa-arrow-right"></i> ${backLabel}</a>
                <header class="project-detail-hero glass-panel reveal">
                    <img class="project-detail-hero-img" src="${image}" alt="">
                    <div class="project-detail-hero-content">
                        <span class="project-detail-tag">${tag}</span>
                        <h1>${title}</h1>
                        <p>${lead}</p>
                    </div>
                </header>
                <div class="project-detail-content">
${buildSections(card, sectionTemplate)}
                </div>
            </div>
        </div>
    </main>
    <footer class="glass-footer">
        <div class="container footer-content">
            <div class="footer-info"><h2 class="logo-text">MIKAVERSE</h2></div>
            <div class="social-links">
                <a href="https://www.instagram.com/mikaversetech/" class="glass-icon" aria-label="انستغرام"><i class="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61573310069270&sk=directory_intro" class="glass-icon" aria-label="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                <a href="https://youtube.com/@mikaversetech" class="glass-icon" aria-label="يوتيوب"><i class="fab fa-youtube"></i></a>
            </div>
            <div class="copyright"><p>&copy; 2026 Mikaverse. جميع الحقوق محفوظة.</p></div>
        </div>
    </footer>
    <script src="../../js/script.js"></script>
</body>
</html>
`;
}

function buildFilterButtons(filters) {
  return filters
    .map(
      (f, i) =>
        `                        <button type="button" class="filter-btn${i === 0 ? " active" : ""}" data-filter="${f.id}" aria-pressed="${i === 0 ? "true" : "false"}">${escapeHtml(f.label)}</button>`,
    )
    .join("\n");
}

function buildListingCards(cards, defaultFilterId, sectionKey) {
  return cards
    .map((card) => {
      const hidden =
        card.filter !== defaultFilterId ? ' style="display: none;"' : "";
      return `                    <a href="${sectionKey}/${card.slug}.html" class="company-project-card reveal" data-filter="${card.filter}"${hidden}>
                        <article class="company-project-card-inner glass-panel interactive-card">
                            <div class="card-glow"></div>
                            <img src="${assetPath(card.image, 1)}" alt="" class="company-project-card-img">
                            <div class="company-project-card-body">
                                <span class="company-project-card-tag">${escapeHtml(card.tag || "")}</span>
                                <h3>${escapeHtml(card.title)}</h3>
                                <span class="company-project-card-cta">عرض التفاصيل <i class="fa-solid fa-arrow-left"></i></span>
                            </div>
                        </article>
                    </a>`;
    })
    .join("\n");
}

function patchListing(html, data, sectionKey) {
  const defaultFilterId = data.filters[0]?.id;
  const filtersBlock = buildFilterButtons(data.filters);
  const cardsBlock = buildListingCards(data.cards, defaultFilterId, sectionKey);

  let out = html.replace(
    /<!-- GENERATED-FILTERS-START -->[\s\S]*?<!-- GENERATED-FILTERS-END -->/,
    `<!-- GENERATED-FILTERS-START -->\n${filtersBlock}\n                        <!-- GENERATED-FILTERS-END -->`,
  );
  out = out.replace(
    /<!-- GENERATED-CARDS-START -->[\s\S]*?<!-- GENERATED-CARDS-END -->/,
    `<!-- GENERATED-CARDS-START -->\n${cardsBlock}\n                    <!-- GENERATED-CARDS-END -->`,
  );
  return out;
}

function removeOrphanHtmlFiles(outDir, activeSlugs, sectionKey) {
  if (!fs.existsSync(outDir)) return;
  const active = new Set(activeSlugs.map((s) => `${s}.html`));
  const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".html"));
  existing.forEach((file) => {
    if (!active.has(file)) {
      fs.unlinkSync(path.join(outDir, file));
      console.log("Removed orphan", path.join("html", sectionKey, file));
    }
  });
}

function generateSection(sectionKey) {
  const { dataPath, outDir, listingPath } = getPaths(sectionKey);

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Missing content file: ${dataPath}`);
  }

  const raw = fs.readFileSync(dataPath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data.cards) || !data.cards.length) {
    throw new Error(`${sectionKey}: content.json must include at least one card.`);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const slugs = [];
  data.cards.forEach((card) => {
    if (!card.slug) {
      console.warn(`[${sectionKey}] Skipping card without slug:`, card.title || "(unnamed)");
      return;
    }
    slugs.push(card.slug);
    const filePath = path.join(outDir, `${card.slug}.html`);
    fs.writeFileSync(
      filePath,
      buildDetailPage(card, data.sectionTemplate, sectionKey, data.page || {}),
      "utf8",
    );
    console.log("Wrote", path.relative(ROOT, filePath));
  });

  removeOrphanHtmlFiles(outDir, slugs, sectionKey);

  if (!fs.existsSync(listingPath)) {
    throw new Error(`Missing listing page: ${listingPath}`);
  }

  let listing = fs.readFileSync(listingPath, "utf8");
  listing = patchListing(listing, data, sectionKey);
  fs.writeFileSync(listingPath, listing, "utf8");
  console.log("Updated", path.relative(ROOT, listingPath));
  console.log(`Done — ${slugs.length} page(s) in html/${sectionKey}/`);
  return slugs.length;
}

module.exports = { generateSection, getPaths };
