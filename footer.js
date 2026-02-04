(async function () {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  // Use the robust path detection from header.js, which works everywhere
  // including local files, custom domains, and GitHub Pages.
  const scriptUrl = document.currentScript.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1);
  const footerUrl = baseUrl + "footer.html";

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
})();
