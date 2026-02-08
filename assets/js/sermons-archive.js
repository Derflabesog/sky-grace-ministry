// assets/js/sermons-archive.js

(function () {
  const data = window.SERMONS || [];
  const grid = document.getElementById("sermonGrid");
  const emptyState = document.getElementById("emptyState");
  const searchInput = document.getElementById("sermonSearch");
  const filterButtons = document.querySelectorAll("[data-filter]");

  let activeFilter = "all";

  function fmtDate(iso) {
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
    } catch {
      return iso;
    }
  }

  function youtubeThumb(id) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function matches(sermon, q) {
    if (!q) return true;
    const hay = normalize(
      [
        sermon.title,
        sermon.speaker,
        sermon.category,
        ...(sermon.scriptures || []).map((x) => x.ref),
        sermon.summary,
      ].join(" ")
    );
    return hay.includes(q);
  }

  function renderCard(sermon) {
    const pdfAvailable = !!sermon.pdf;

    return `
      <article class="group bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden">
        <a href="sermons/sermon.html?id=${encodeURIComponent(sermon.id)}" class="block">
          <div class="aspect-video bg-slate-950 relative">
            <img
              src="${youtubeThumb(sermon.youtubeId)}"
              alt="${sermon.title} thumbnail"
              class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div class="text-white">
                <p class="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">${fmtDate(sermon.dateISO)}</p>
                <h3 class="mt-1 text-lg md:text-xl font-black leading-snug">${sermon.title}</h3>
                <p class="mt-1 text-xs text-white/80">${sermon.speaker}</p>
              </div>
              <span class="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur">
                <i class="fa-brands fa-youtube"></i> Watch
              </span>
            </div>
          </div>
        </a>

        <div class="p-7">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">${sermon.category}</span>
            <span class="text-[10px] font-black uppercase tracking-[0.25em] text-amber-600">Learning Aid</span>
          </div>

          <p class="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">${sermon.summary || ""}</p>

          <div class="mt-6 flex gap-2">
            <a href="https://www.youtube.com/watch?v=${sermon.youtubeId}" target="_blank"
               class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 text-white font-black uppercase text-[11px] tracking-widest hover:bg-red-500 transition">
              <i class="fa-brands fa-youtube"></i> Watch
            </a>

            ${
              pdfAvailable
                ? `<a href="../${sermon.pdf}" download
                     class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest hover:bg-slate-800 transition">
                     <i class="fa-solid fa-file-pdf"></i> PDF
                   </a>`
                : `<span class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-200 text-slate-600 font-black uppercase text-[11px] tracking-widest cursor-not-allowed">
                     <i class="fa-solid fa-file-pdf"></i> Soon
                   </span>`
            }
          </div>
        </div>
      </article>
    `;
  }

  function apply() {
    const q = normalize(searchInput.value);
    const filtered = data
      .filter((s) => activeFilter === "all" || s.categoryKey === activeFilter)
      .filter((s) => matches(s, q));

    grid.innerHTML = filtered.map(renderCard).join("");

    const isEmpty = filtered.length === 0;
    emptyState.classList.toggle("hidden", !isEmpty);
  }

  // Filters
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("bg-slate-900", "text-white");
        b.classList.add("bg-slate-100", "text-slate-600");
      });

      btn.classList.remove("bg-slate-100", "text-slate-600");
      btn.classList.add("bg-slate-900", "text-white");

      activeFilter = btn.getAttribute("data-filter") || "all";
      apply();
    });
  });

  // Search
  searchInput.addEventListener("input", apply);

  // Initial
  apply();
})();
