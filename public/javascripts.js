/* ======================================================
   Navbar: Desktop Dropdowns + Mobile Sheet + Accordions
   - Supports multiple desktop dropdowns: [data-dd-toggle]
   - Dropdown stays open (no hover-close). Close on button
     click, outside click, or ESC.
   ====================================================== */
(function () {
  const fileName = (href) => (href || "").split("/").pop().toLowerCase() || "index.html";

  document.addEventListener("DOMContentLoaded", () => {
    /* ---------- Highlight current page in desktop menu ---------- */
    const here = fileName(location.pathname);
    document.querySelectorAll(".menu > li > a").forEach((a) => {
      if (fileName(a.getAttribute("href")) === here) a.setAttribute("aria-current", "page");
    });

    /* ---------- Desktop dropdowns (click-to-toggle, keep open) ---------- */
    const ddButtons = [...document.querySelectorAll("[data-dd-toggle]")];
    const closeAllDropdowns = () => {
      document.querySelectorAll(".has-dropdown.open").forEach((li) => {
        li.classList.remove("open");
        li.querySelector("[data-dd-toggle]")?.setAttribute("aria-expanded", "false");
      });
    };

    ddButtons.forEach((btn) => {
      const li = btn.closest(".has-dropdown");
      const dd = li?.querySelector(".dropdown");
      if (!li || !dd) return;

      const open = () => {
        // keep only this one open
        document.querySelectorAll(".has-dropdown.open").forEach((x) => x !== li && x.classList.remove("open"));
        li.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      };
      const close = () => {
        li.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      };

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.classList.contains("open") ? close() : open();
      });

      // Close when pressing ESC while dropdown is open
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && li.classList.contains("open")) close();
      });

      // Do NOT auto-close on mouseleave (keeps it open)
      // (hover behaviour intentionally disabled)
    });

    // Close any open dropdown if clicking outside all dropdowns
    document.addEventListener("click", (e) => {
      const inDropdown = e.target.closest(".has-dropdown");
      if (!inDropdown) closeAllDropdowns();
    });

    /* ---------- Mobile sheet ---------- */
    const toggleBtn = document.querySelector("[data-mobile-toggle]");
    const overlay = document.getElementById("mobileNav");
    const closeBtn = overlay?.querySelector("[data-mobile-close]");

    if (toggleBtn && overlay) {
      const openSheet = () => {
        overlay.hidden = false;
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        toggleBtn.setAttribute("aria-expanded", "true");
      };
      const closeSheet = () => {
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
        toggleBtn.setAttribute("aria-expanded", "false");
        setTimeout(() => { overlay.hidden = true; }, 180);
      };

      toggleBtn.addEventListener("click", () => (overlay.hidden ? openSheet() : closeSheet()));
      closeBtn && closeBtn.addEventListener("click", closeSheet);
      overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSheet(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) closeSheet(); });

      /* ---------- Accordions inside the sheet (supports many) ---------- */
      const accBtns = [...overlay.querySelectorAll("[data-acc]")];
      const panels = [...overlay.querySelectorAll(".acc-panel")];

      const closeAllPanels = () => {
        panels.forEach((p) => p.setAttribute("hidden", ""));
        accBtns.forEach((b) => { const c = b.querySelector(".acc-caret"); if (c) c.textContent = "▾"; });
      };

      accBtns.forEach((btn) => {
        const panel = btn.nextElementSibling;
        btn.addEventListener("click", () => {
          const isOpen = panel && !panel.hasAttribute("hidden");
          closeAllPanels();
          if (!isOpen && panel) {
            panel.removeAttribute("hidden");
            const c = btn.querySelector(".acc-caret");
            if (c) c.textContent = "▴";
          }
        });
      });

      // Highlight active link inside sheet and auto-open that panel
      const hereMobile = fileName(location.pathname);
      overlay.querySelectorAll("a.sheet-link, a.sheet-sublink").forEach((a) => {
        if (fileName(a.getAttribute("href")) === hereMobile) {
          a.classList.add("is-active");
          const panel = a.closest(".acc-panel");
          if (panel && panel.hasAttribute("hidden")) {
            closeAllPanels();
            panel.removeAttribute("hidden");
            const btn = panel.previousElementSibling;
            const c = btn?.querySelector(".acc-caret");
            if (c) c.textContent = "▴";
          }
        }
      });

      // Close sheet on any link click
      overlay.addEventListener("click", (e) => { if (e.target.closest("a")) closeSheet(); });
    }
  });

  /* ---------- Timeout and remove splash ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    if (splash) {
      setTimeout(() => {
        splash.classList.add("splash-fadeout");
        setTimeout(() => splash.remove(), 600);
      }, 1200);
    }
  });
})();

/* ===== Scroll progress with percentage ===== */
/* ===== Scroll progress with percentage label (left side) ===== */
(()=>{const r=document.documentElement,b=document.getElementById('scrollProgress'),l=document.getElementById('scrollLabel'),u=()=>{if(!b)return;const s=r.scrollHeight-r.clientHeight,p=Math.max(0,Math.min(1,((r.scrollTop||window.pageYOffset)/(s||1))));const pct=Math.round(p*100);r.style.setProperty('--scroll',pct);if(l) l.textContent=pct+"%";b.classList.toggle('is-hidden',s<=0||p<=0)};['scroll','resize','orientationchange','load'].forEach(e=>addEventListener(e,u,{passive:!0}));u();})();
