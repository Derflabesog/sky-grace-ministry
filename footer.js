(function () {
  function getBasePath() {
    // Example:
    // https://username.github.io/sky-grace-ministry/index.html
    // pathname: /sky-grace-ministry/index.html  -> base: /sky-grace-ministry/
    const path = window.location.pathname;

    // If hosted as a project site on GitHub Pages, first segment is repo name
    // If hosted at root domain (custom domain), base is '/'
    const parts = path.split("/").filter(Boolean);

    // No parts means it's root
    if (parts.length === 0) return "/";

    // If it's GitHub Pages project site, base should be '/<repo>/'
    // This works for: /repo/page.html
    return `/${parts[0]}/`;
  }

  async function injectFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    const base = getBasePath();
    const footerUrl = `${base}footer.html`;

    try {
      const res = await fetch(footerUrl, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Footer fetch failed: ${res.status} ${res.statusText} (${footerUrl})`);
      }
      const html = await res.text();
      mount.innerHTML = html;
    } catch (err) {
      console.error(err);
      // fallback minimal footer so site never looks broken
      mount.innerHTML = `
        <footer class="bg-slate-950 text-white py-10 mt-20 border-t border-white/5">
          <div class="container mx-auto px-6 text-center">
            <p class="text-xs text-slate-400">© ${new Date().getFullYear()} Sky Grace Jesus Ministry.</p>
          </div>
        </footer>
      `;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFooter);
  } else {
    injectFooter();
  }
})();
