(function () {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", "Back to top");
  btn.className =
    "fixed bottom-6 right-6 z-50 hidden items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition";
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

  document.body.appendChild(btn);

  const toggle = () => {
    if (window.scrollY > 500) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  };

  window.addEventListener("scroll", toggle);
  toggle();

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
