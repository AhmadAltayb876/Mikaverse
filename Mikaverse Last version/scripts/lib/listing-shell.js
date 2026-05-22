/**
 * Builds listing page HTML shell (same structure as companies-projects.html).
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildListingShell(page) {
  const title = escapeHtml(page.title || "Mikaverse");
  const meta = escapeHtml(page.metaDescription || "");
  const heading = escapeHtml(page.heading || "");
  const accent = escapeHtml(page.headingAccent || "");
  const lead = escapeHtml(page.lead || "");
  const sectionId = escapeHtml(page.sectionId || "printing-projects");
  const filtersLabel = escapeHtml(page.filtersLabel || "تصفية حسب المجال");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" type="image/png" href="../img/My-logo-final-deletedBack.png">
    <meta name="description" content="${meta}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&family=Orbitron:wght@500;700;900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body class="companies-projects-page">
    <div class="site-bg" aria-hidden="true">
        <video autoplay muted loop playsinline preload="auto" class="bg-video">
            <source src="../assets/videos/background.mp4" type="video/mp4">
        </video>
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="noise-overlay"></div>
    </div>
    <header class="glass-header" id="header">
        <div class="container header-container">
            <a class="logo-section" href="index.html#home" aria-label="Mikaverse Home">
                <img src="../img/My-logo-final-deletedBack.png" alt="Mikaverse Logo" class="logo-img"
                    onerror="this.style.display='none';">
                <h1 class="logo-text">MIKAVERSE</h1>
            </a>
            <div id="nav-placeholder"></div>
            <a class="primary-btn glow-btn desktop-only" href="https://wa.me/963939327169" target="_blank">تواصل
                معنا</a>
            <button class="mobile-toggle" aria-label="القائمة"><i class="fa-solid fa-bars"></i></button>
        </div>
    </header>
    <main style="flex: 1; display: flex; flex-direction: column;">
        <section id="${sectionId}" class="section-padding companies-hero">
            <div class="container">
                <div class="section-header reveal">
                    <h1 class="section-title">${heading} <span class="gradient-text">${accent}</span></h1>
                    <p class="section-lead">${lead}</p>
                </div>
            </div>
        </section>

        <section class="section-padding companies-filters-section" aria-label="تصفية المحتوى">
            <div class="container">
                <div class="companies-filters-wrap reveal">
                    <p class="companies-filters-label">${filtersLabel}</p>
                    <div class="filter-group companies-filter-group" role="group" aria-label="فلاتر المحتوى"
                        data-companies-filters>
                        <!-- GENERATED-FILTERS-START -->
                        <!-- GENERATED-FILTERS-END -->
                    </div>
                </div>
            </div>
        </section>

        <section class="section-padding companies-cards-section" aria-label="قائمة البطاقات">
            <div class="container">
                <div class="company-project-grid" data-companies-cards>
                    <!-- GENERATED-CARDS-START -->
                    <!-- GENERATED-CARDS-END -->
                </div>
            </div>
        </section>
    </main>
    <footer class="glass-footer">
        <div class="container footer-content">
            <div class="footer-info">
                <h2 class="logo-text">MIKAVERSE</h2>
            </div>
            <div class="social-links">
                <a href="https://www.instagram.com/mikaversetech/" class="glass-icon"><i
                        class="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61573310069270&sk=directory_intro"
                    class="glass-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="https://youtube.com/@mikaversetech" class="glass-icon"><i class="fab fa-youtube"></i></a>
            </div>
            <div class="copyright">
                <p>&copy; 2026 Mikaverse. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>
    <script src="../js/script.js"></script>
</body>

</html>
`;
}

module.exports = { buildListingShell };
