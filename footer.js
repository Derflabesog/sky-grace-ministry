document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const year = new Date().getFullYear();

  footer.innerHTML = `
  <footer class="bg-slate-900 text-white mt-16">
    <!-- TOP -->
    <div class="container mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
      
      <!-- BRAND -->
      <div>
        <a href="index.html" class="flex items-center gap-3 mb-4">
          <img src="assets/images/logo.png" alt="Sky Grace Ministry" class="h-10 w-auto" onerror="this.style.display='none'">
          <div class="leading-tight">
            <p class="font-black tracking-wide">SKY GRACE</p>
            <p class="text-xs text-blue-400 tracking-widest">JESUS MINISTRY</p>
          </div>
        </a>
        <p class="text-slate-300 text-sm leading-relaxed">
          A Christ-centered ministry committed to worship, prayer, discipleship, and community impact.
        </p>

        <div class="flex gap-3 mt-5">
          <a href="https://www.youtube.com/" target="_blank" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition" aria-label="YouTube">
            <i class="fa-brands fa-youtube text-lg"></i>
          </a>
          <a href="https://facebook.com/" target="_blank" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition" aria-label="Facebook">
            <i class="fa-brands fa-facebook-f text-lg"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition" aria-label="Instagram">
            <i class="fa-brands fa-instagram text-lg"></i>
          </a>
        </div>
      </div>

      <!-- QUICK LINKS -->
      <div>
        <h3 class="font-black uppercase tracking-widest text-xs text-slate-300 mb-4">Quick Links</h3>
        <ul class="space-y-3 text-sm text-slate-200">
          <li><a class="hover:text-amber-400 transition" href="index.html">Home</a></li>
          <li><a class="hover:text-amber-400 transition" href="welcome-packet.html">Welcome Packet</a></li>
          <li><a class="hover:text-amber-400 transition" href="sermons.html">Sermons</a></li>
          <li><a class="hover:text-amber-400 transition" href="theology-school.html">Theology School</a></li>
          <li><a class="hover:text-amber-400 transition" href="contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- MINISTRY -->
      <div>
        <h3 class="font-black uppercase tracking-widest text-xs text-slate-300 mb-4">Ministry</h3>
        <ul class="space-y-3 text-sm text-slate-200">
          <li><a class="hover:text-amber-400 transition" href="give.html">Give</a></li>
          <li><a class="hover:text-amber-400 transition" href="calendar.html">Events</a></li>
          <li><a class="hover:text-amber-400 transition" href="prayer-wall.html">Prayer Wall</a></li>
          <li><a class="hover:text-amber-400 transition" href="testimonies.html">Testimonies</a></li>
          <li><a class="hover:text-amber-400 transition" href="volunteer-portal.html">Volunteer</a></li>
        </ul>
      </div>

      <!-- CONTACT -->
      <div>
        <h3 class="font-black uppercase tracking-widest text-xs text-slate-300 mb-4">Contact</h3>
        <div class="space-y-3 text-sm text-slate-200">
          <p class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><i class="fa-solid fa-location-dot"></i></span>
            <span>Namibia (Update address on Contact page)</span>
          </p>

          <p class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><i class="fa-solid fa-envelope"></i></span>
            <a href="mailto:skygraceministry777@gmail.com" class="hover:text-amber-400 transition">skygraceministry777@gmail.com</a>
          </p>

          <p class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><i class="fa-solid fa-phone"></i></span>
            <a href="tel:+264816466144" class="hover:text-amber-400 transition">+264 81 646 6144</a>
          </p>

          <a href="contact.html"
             class="inline-flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-2xl bg-amber-500 text-slate-900 font-black uppercase text-[11px] tracking-widest hover:bg-amber-400 transition shadow-lg">
            <i class="fa-solid fa-hand-holding-heart"></i> Request Prayer
          </a>
        </div>
      </div>

    </div>

    <!-- BOTTOM -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-slate-300">
        <p>© ${year} Sky Grace Jesus Ministry. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="privacy-policy.html" class="hover:text-white transition">Privacy Policy</a>
          <a href="terms-of-service.html" class="hover:text-white transition">Terms</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- BACK TO TOP -->
  <button id="backToTop"
    class="fixed bottom-6 right-6 hidden w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
  `;

  // Back to top
  const btn = document.getElementById("backToTop");
  const toggle = () => {
    if (window.scrollY > 500) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
