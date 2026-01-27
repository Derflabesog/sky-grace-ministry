(async function () {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  // Load partial
  const scriptUrl = document.currentScript.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1);
  const response = await fetch(baseUrl + "partials/header.html", { cache: "no-cache" });
  if (!response.ok) {
    console.warn("Header partial not found:", response.status);
    return;
  }
  mount.innerHTML = await response.text();

  // Inject marquee animation (once)
  if (!document.querySelector('style[data-marquee-style="true"]')) {
    const style = document.createElement("style");
    style.setAttribute("data-marquee-style", "true");
    style.textContent = `
      @keyframes marquee { 0% { transform: translateX(100%);} 100% { transform: translateX(-100%);} }
      .animate-marquee { animation: marquee 20s linear infinite; }
    `;
    document.head.appendChild(style);
  }

  // Mobile drawer wiring (no IDs, so no duplicate-id errors)
  const openBtn = mount.querySelector("[data-menu-open]");
  const overlay = mount.querySelector("[data-menu-overlay]");
  const drawer = mount.querySelector("[data-menu-drawer]");
  const closeBtns = mount.querySelectorAll("[data-menu-close]");

  if (openBtn && overlay && drawer) {
    const open = () => {
      overlay.classList.remove("hidden");
      requestAnimationFrame(() => drawer.classList.remove("-translate-x-full"));
    };

    const close = () => {
      drawer.classList.add("-translate-x-full");
      setTimeout(() => overlay.classList.add("hidden"), 250);
    };

    openBtn.addEventListener("click", open);
    closeBtns.forEach((b) => b.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.classList.contains("hidden")) close();
    });
  }

  // Active link highlighting (optional but nice)
  const current = location.pathname.split("/").pop() || "index.html";
  mount.querySelectorAll('a.nav-link').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === current) {
      a.classList.add("text-blue-400");
      a.classList.remove("text-slate-300");
    }
  });
})();
