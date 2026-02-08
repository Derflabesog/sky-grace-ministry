﻿/* header.js — Sky Grace Jesus Ministry
   Clean navbar (single Sermons link), mobile menu, active link highlight.
*/

(function () {
  const headerRoot = document.getElementById("site-header");
  if (!headerRoot) return;

  // Figure out current page (for active link highlight)
  const path = window.location.pathname.split("/").pop() || "index.html";

  // Helper: mark link active if matches current file
  const isActive = (href) => {
    if (!href) return false;
    // handle "index.html" default
    if (path === "" && href === "index.html") return true;
    return path === href;
  };

  headerRoot.innerHTML = `
  <!-- Top notice bar -->
  <div class="w-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest">
    <div class="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 whitespace-nowrap">
        <span>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} CAT</span>
        <span class="opacity-80 hidden sm:inline">•</span>
        <span class="opacity-95 hidden sm:inline">2026 Vision Conference Registrations Opening Soon</span>
      </div>
      <div class="hidden md:flex items-center gap-3 opacity-95">
        <span>New sermon summary PDF available for download</span>
      </div>
    </div>
  </div>

  <!-- Main Nav -->
  <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="h-20 flex items-center justify-between gap-6">

        <!-- Brand -->
        <a href="index.html" class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
            <img src="assets/images/icon-192.png" alt="Sky Grace" class="w-full h-full object-cover" onerror="this.style.display='none'">
            <span class="text-white font-black text-xs" id="brandFallback">SG</span>
          </div>
          <div class="leading-tight">
            <p class="text-white font-black tracking-tight">SKY GRACE</p>
            <p class="text-blue-300 text-[11px] font-black uppercase tracking-[0.25em]">Jesus Ministry</p>
          </div>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-2 text-[12px] font-black uppercase tracking-widest">
          ${navLink("Home", "index.html")}
          ${navLink("Welcome Packet", "welcome-packet.html")}
          ${navLink("Sermons", "sermons.html")}
          ${dropdown("Ministry", [
            { label: "Prayer Wall", href: "prayer-wall.html" },
            { label: "Live", href: "live.html" },
            { label: "Kids Corner", href: "kids-corner.html" },
          ])}
          ${navLink("Theology School", "theology-school.html")}
          ${navLink("Contact", "contact.html")}
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <a href="live.html"
            class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-widest transition shadow-[0_10px_25px_rgba(220,38,38,0.35)]">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Live Now
          </a>

          <!-- Mobile Button -->
          <button id="menuBtn"
            class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="lg:hidden hidden border-t border-white/10 bg-slate-900">
      <div class="max-w-7xl mx-auto px-6 py-6 space-y-2">
        ${mobileLink("Home", "index.html")}
        ${mobileLink("Welcome Packet", "welcome-packet.html")}
        ${mobileLink("Sermons", "sermons.html")}

        <div class="pt-2">
          <p class="text-white/70 text-[10px] font-black uppercase tracking-[0.25em] mb-2">Ministry</p>
          <div class="grid gap-2">
            ${mobileLink("Prayer Wall", "prayer-wall.html")}
            ${mobileLink("Live", "live.html")}
            ${mobileLink("Kids Corner", "kids-corner.html")}
          </div>
        </div>

        ${mobileLink("Theology School", "theology-school.html")}
        ${mobileLink("Contact", "contact.html")}

        <a href="live.html"
          class="mt-4 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-widest transition">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          Live Now
        </a>
      </div>
    </div>
  </header>
  `;

  // If icon missing, show fallback text
  const icon = headerRoot.querySelector("img");
  const fallback = headerRoot.querySelector("#brandFallback");
  if (icon && fallback) {
    icon.addEventListener("error", () => (fallback.style.display = "block"));
    icon.addEventListener("load", () => (fallback.style.display = "none"));
  }

  // Mobile toggle
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.innerHTML = !isOpen
        ? `<i class="fa-solid fa-xmark"></i>`
        : `<i class="fa-solid fa-bars"></i>`;
    });
  }

  // Close mobile menu on navigation
  document.querySelectorAll("#mobileMenu a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!menu) return;
      menu.classList.add("hidden");
      btn?.setAttribute("aria-expanded", "false");
      if (btn) btn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    });
  });

  // ---------- Components ----------
  function navLink(label, href) {
    const active = isActive(href);
    return `
      <a href="${href}"
        class="px-4 py-3 rounded-xl transition
        ${active ? "bg-white/10 text-white" : "text-white/75 hover:text-white hover:bg-white/5"}">
        ${label}
      </a>
    `;
  }

  function dropdown(label, items) {
    // Mark dropdown active if any child matches
    const childActive = items.some((x) => isActive(x.href));
    return `
      <div class="relative group">
        <button type="button"
          class="px-4 py-3 rounded-xl transition inline-flex items-center gap-2
          ${childActive ? "bg-white/10 text-white" : "text-white/75 hover:text-white hover:bg-white/5"}">
          ${label}
          <i class="fa-solid fa-chevron-down text-[10px] opacity-80"></i>
        </button>

        <div class="absolute left-0 top-full mt-2 hidden group-hover:block">
          <div class="w-56 rounded-2xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden">
            ${items
              .map((it) => {
                const active = isActive(it.href);
                return `
                  <a href="${it.href}"
                    class="block px-4 py-3 text-[12px] font-black uppercase tracking-widest transition
                    ${active ? "bg-white/10 text-white" : "text-white/75 hover:text-white hover:bg-white/5"}">
                    ${it.label}
                  </a>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  function mobileLink(label, href) {
    const active = isActive(href);
    return `
      <a href="${href}"
        class="flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 transition
        ${active ? "bg-white/10 text-white" : "bg-white/5 text-white/85 hover:bg-white/10"}">
        <span class="text-[12px] font-black uppercase tracking-widest">${label}</span>
        <i class="fa-solid fa-arrow-right text-white/50"></i>
      </a>
    `;
  }
})();
