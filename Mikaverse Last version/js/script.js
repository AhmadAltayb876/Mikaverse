document.addEventListener("DOMContentLoaded", () => {
  /* Printing page — photo switcher */
  const switcher = document.querySelector("[data-photo-switcher]");
  if (switcher) {
    const photos = Array.from(switcher.querySelectorAll(".switcher-photo"));
    const prevBtn = switcher.querySelector(".switcher-prev");
    const nextBtn = switcher.querySelector(".switcher-next");
    const indicatorsEl = switcher.querySelector(".switcher-indicators");
    const currentEl = switcher.querySelector(".switcher-current");
    const totalEl = switcher.querySelector(".switcher-total");
    let current = 0;

    if (totalEl) totalEl.textContent = String(photos.length);

    photos.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "indicator" + (i === 0 ? " active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `صورة ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      indicatorsEl.appendChild(dot);
    });

    const dots = Array.from(indicatorsEl.querySelectorAll(".indicator"));

    function goTo(idx) {
      current = (idx + photos.length) % photos.length;
      photos.forEach((img, i) => img.classList.toggle("active", i === current));
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
        dot.setAttribute("aria-selected", i === current ? "true" : "false");
      });
      if (currentEl) currentEl.textContent = String(current + 1);
    }

    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));

    switcher.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goTo(current - 1);
      if (e.key === "ArrowLeft") goTo(current + 1);
    });

    let touchStartX = 0;
    switcher.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );
    switcher.addEventListener(
      "touchend",
      (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) < 40) return;
        if (diff > 0) goTo(current - 1);
        else goTo(current + 1);
      },
      { passive: true },
    );
  }

  /* Printing service — auto counters from category pages */
  const countersWrap = document.getElementById("printing-counters");
  const altCards = document.querySelectorAll(".alt-card[data-category]");
  if (countersWrap && altCards.length) {
    altCards.forEach((card) => {
      const categoryUrl = card.getAttribute("data-category");
      const title =
        card.querySelector(".alt-card-body h3")?.textContent?.trim() || "قسم";
      const cardCountEl = card.querySelector(".alt-card-count");

      const item = document.createElement("a");
      item.href = categoryUrl;
      item.className = "printing-counter-item";
      item.innerHTML = `<span class="counter-num">…</span><span class="counter-label">${title}</span>`;
      countersWrap.appendChild(item);

      const numEl = item.querySelector(".counter-num");
      fetch(categoryUrl)
        .then((res) => (res.ok ? res.text() : ""))
        .then((html) => {
          const count = html
            ? (html.match(/class=["'][^"']*\bmini-card\b[^"']*["']/g) || [])
                .length
            : 0;
          numEl.textContent = String(count);
          if (cardCountEl) cardCountEl.textContent = `${count} عنصر`;
        })
        .catch(() => {
          numEl.textContent = "0";
          if (cardCountEl) cardCountEl.textContent = "0 عنصر";
        });
    });
  }
  /* 1. Scroll Reveal Animations (انسيابية الظهور عند النزول) */
  const revealElements = document.querySelectorAll(
    ".reveal, .fade-left, .fade-right",
  );
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور للحفاظ على الأداء
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // إظهار القسم الأول فوراً
  setTimeout(() => {
    document
      .querySelectorAll("#home .reveal")
      .forEach((el) => el.classList.add("active"));
  }, 100);

  /* 2. 3D Tilt Effect & Dynamic Mouse Glow (فيزياء الماوس المتقدمة) */
  const interactiveCards = document.querySelectorAll(".interactive-card");

  // تفعيل التأثير فقط على الأجهزة التي تستخدم ماوس (شاشات الكمبيوتر)
  if (window.matchMedia("(pointer: fine)").matches) {
    interactiveCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // تتبع الإضاءة الداخلية (Glow)
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // حساب درجات الانحناء ثلاثي الأبعاد
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8; // درجة الميل
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        // إرجاع البطاقة لوضعها الطبيعي بمرونة
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  /* 3. Sticky Glass Header (تفاعل الهيدر مع السكرول) */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* 4. Smooth Scroll & Active Link Update */
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href") || "";
      const anchor = href.split("#")[1];
      if (anchor && anchor === current) {
        link.classList.add("active");
      } else if (
        href.includes("store.html") &&
        window.location.pathname.endsWith("store.html")
      ) {
        link.classList.add("active");
      }
    });
  });
});

function initNavInteractions() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.getElementById("navbar");
  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon?.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon?.classList.replace("fa-xmark", "fa-bars");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileToggle.querySelector("i")?.classList.replace("fa-xmark", "fa-bars");
    });
  });

  document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = toggle.nextElementSibling;
      const expanded = toggle.getAttribute("aria-expanded") === "true";

      // Close all other dropdowns first
      document
        .querySelectorAll(".nav-dropdown-menu.active")
        .forEach((openMenu) => {
          if (openMenu !== menu) {
            openMenu.classList.remove("active");
            const openToggle = openMenu.previousElementSibling;
            if (openToggle?.classList.contains("nav-dropdown-toggle")) {
              openToggle.setAttribute("aria-expanded", "false");
            }
          }
        });

      // Toggle current dropdown
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("active");
    });
  });

  document.addEventListener("click", (event) => {
    // Only close if click is outside any nav-item-dropdown
    if (!event.target.closest(".nav-item-dropdown")) {
      document.querySelectorAll(".nav-dropdown-menu.active").forEach((menu) => {
        menu.classList.remove("active");
        const toggle = menu.previousElementSibling;
        if (toggle?.classList.contains("nav-dropdown-toggle")) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}

function initStoreFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-card[data-category]");
  if (!buttons.length || !products.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      products.forEach((card) => {
        const categories = card.dataset.category
          .split(" ")
          .map((item) => item.trim());
        const isVisible = filter === "all" || categories.includes(filter);
        card.style.display = isVisible ? "" : "none";
      });
    });
  });
}

//for navbar linking
fetch("../components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;
    initNavInteractions();
    initStoreFilters();
  });
