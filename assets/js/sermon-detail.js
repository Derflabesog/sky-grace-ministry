// assets/js/sermon-detail.js

(function () {
  const data = window.SERMONS || [];
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const sermon = data.find((s) => s.id === id) || data[0];

  // Elements
  const titleEl = document.getElementById("sermonTitle");
  const metaEl = document.getElementById("sermonMeta");
  const thumbEl = document.getElementById("sermonThumb");
  const ytBtn = document.getElementById("watchYouTubeBtn");
  const ytLink = document.getElementById("watchYouTubeLink");
  const pdfBtn = document.getElementById("downloadPdfBtn");
  const summaryEl = document.getElementById("sermonSummary");
  const scripturesEl = document.getElementById("scripturesList");
  const learningEl = document.getElementById("learningList");

  function fmtDate(iso) {
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
    } catch {
      return iso;
    }
  }

  function thumb(yt) {
    return `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg`;
  }

  function setIf(el, value) {
    if (!el) return;
    el.textContent = value || "";
  }

  // Populate
  document.title = `${sermon.title} — Sermon`;
  setIf(titleEl, sermon.title);

  if (metaEl) {
    metaEl.innerHTML = `
      <span class="font-black text-slate-900"><i class="fa-solid fa-user mr-2 text-slate-500"></i>${sermon.speaker}</span>
      <span class="hidden md:inline text-slate-300">•</span>
      <span class="text-slate-600"><i class="fa-regular fa-calendar mr-2 text-slate-500"></i>${fmtDate(sermon.dateISO)}</span>
      <span class="hidden md:inline text-slate-300">•</span>
      <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-widest">${sermon.category}</span>
    `;
  }

  if (thumbEl) {
    thumbEl.src = thumb(sermon.youtubeId);
    thumbEl.onerror = function () {
      this.src = `https://i.ytimg.com/vi/${sermon.youtubeId}/hqdefault.jpg`;
    };
    thumbEl.alt = `${sermon.title} thumbnail`;
  }

  const ytUrl = `https://www.youtube.com/watch?v=${sermon.youtubeId}`;
  if (ytBtn) ytBtn.href = ytUrl;
  if (ytLink) ytLink.href = ytUrl;

  if (pdfBtn) {
    if (sermon.pdf) {
      pdfBtn.href = `../${sermon.pdf}`;
      pdfBtn.classList.remove("opacity-60", "pointer-events-none");
      pdfBtn.innerHTML = `<i class="fa-solid fa-file-pdf mr-2"></i> Download Notes`;
    } else {
      pdfBtn.href = "#";
      pdfBtn.classList.add("opacity-60", "pointer-events-none");
      pdfBtn.innerHTML = `<i class="fa-solid fa-file-pdf mr-2"></i> Notes Coming Soon`;
    }
  }

  setIf(summaryEl, sermon.summary);

  if (scripturesEl) {
    scripturesEl.innerHTML = (sermon.scriptures || [])
      .map((s) => `<li><span class="font-black text-slate-900">${s.ref}</span> — <span class="text-slate-600">${s.text}</span></li>`)
      .join("");
  }

  if (learningEl) {
    learningEl.innerHTML = (sermon.learningAid || [])
      .map((x) => `<li class="text-slate-600">${x}</li>`)
      .join("");
  }
})();
