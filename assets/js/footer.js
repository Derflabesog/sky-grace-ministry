document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
  <footer class="bg-[#020617] text-white border-t border-slate-800/80">
    <!-- Top glow -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_40%)]"></div>

      <div class="relative container mx-auto px-6 py-14">
        <!-- CTA strip -->
        <div class="rounded-[2rem] border border-slate-800 bg-slate-950/40 backdrop-blur px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400 mb-2">
              Stay Connected
            </p>
            <h3 class="text-2xl md:text-3xl font-black leading-tight">
              Join the next service & stay updated
            </h3>
            <p class="mt-2 text-slate-300 text-sm max-w-2xl">
              Watch live, read sermon summaries, and follow ministry updates across our platforms.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <a href="live.html"
               class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-red-600 hover:bg-red-500 transition font-black uppercase text-[11px] tracking-widest shadow-[0_18px_40px_rgba(220,38,38,0.25)]">
              <i class="fas fa-circle-play"></i> Watch Live
            </a>

            <a href="give.html"
               class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 transition text-slate-950 font-black uppercase text-[11px] tracking-widest shadow-[0_18px_40px_rgba(245,158,11,0.25)]">
              <i class="fas fa-hand-holding-heart"></i> Give / Tithes
            </a>
          </div>
        </div>

        <!-- Main footer grid -->
        <div class="mt-12 grid gap-10 lg:grid-cols-4">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <a href="index.html" class="flex items-center gap-3">
              <img src="assets/images/logo.png" alt="Sky Grace Jesus Ministry"
                   class="h-11 w-auto rounded-xl border border-slate-800 bg-slate-950/30 p-1"
                   onerror="this.style.display='none'">
              <div class="leading-tight">
                <p class="font-black tracking-wide text-lg">SKY GRACE</p>
                <p class="text-xs text-blue-400 tracking-widest font-bold">JESUS MINISTRY</p>
              </div>
            </a>

            <p class="mt-4 text-sm text-slate-300 leading-relaxed">
              Raising a generation to walk in the undiluted Glory of Christ through the Word of Life.
            </p>

            <!-- Social -->
            <div class="mt-6 flex items-center gap-3">
              <a href="https://www.youtube.com/@skygraceministryTV" target="_blank" rel="noopener"
                 class="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:-translate-y-0.5 hover:border-red-500/50 transition"
                 aria-label="YouTube">
                <i class="fab fa-youtube text-red-500 text-lg"></i>
              </a>

              <a href="https://www.facebook.com/SkyGraceGlobal" target="_blank" rel="noopener"
                 class="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:-translate-y-0.5 hover:border-blue-500/50 transition"
                 aria-label="Facebook">
                <i class="fab fa-facebook-f text-blue-400 text-lg"></i>
              </a>
            </div>

            <p class="mt-4 text-[11px] text-slate-500">
              (Instagram removed as requested)
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
              Quick Links
            </h4>
            <ul class="space-y-3 text-sm font-semibold">
              <li><a href="index.html" class="text-slate-200 hover:text-amber-400 transition">Home</a></li>
              <li><a href="welcome-packet.html" class="text-slate-200 hover:text-amber-400 transition">Welcome Packet</a></li>
              <li><a href="sermons.html" class="text-slate-200 hover:text-amber-400 transition">Sermons</a></li>
              <li><a href="calendar.html" class="text-slate-200 hover:text-amber-400 transition">Ministry Calendar</a></li>
              <li><a href="contact.html" class="text-slate-200 hover:text-amber-400 transition">Contact</a></li>
            </ul>
          </div>

          <!-- Ministries -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
              Ministries
            </h4>
            <ul class="space-y-3 text-sm font-semibold">
              <li><a href="prayer-wall.html" class="text-slate-200 hover:text-amber-400 transition">Prayer Wall</a></li>
              <li><a href="theology-school.html" class="text-slate-200 hover:text-amber-400 transition">Theology School</a></li>
              <li><a href="volunteer.html" class="text-slate-200 hover:text-amber-400 transition">Volunteer</a></li>
              <li><a href="testimonies.html" class="text-slate-200 hover:text-amber-400 transition">Testimonies</a></li>
              <li><a href="kids-corner.html" class="text-slate-200 hover:text-amber-400 transition">Kids Corner</a></li>
              <li><a href="give.html" class="text-slate-200 hover:text-amber-400 transition">Give / Tithes</a></li>
            </ul>
          </div>

          <!-- Contact / Info -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
              Ministry Info
            </h4>

            <div class="space-y-4 text-sm text-slate-300">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <i class="fas fa-location-dot text-amber-400"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-100">Location</p>
                  <p class="text-slate-400">Windhoek, Namibia</p>
                </div>
              </div>

              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <i class="fas fa-envelope text-blue-300"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-100">Contact</p>
                  <a href="contact.html" class="text-slate-400 hover:text-white transition">Send a message →</a>
                </div>
              </div>

              <div class="rounded-2xl bg-slate-950/40 border border-slate-800 p-5">
                <p class="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                  Scripture of the Week
                </p>
                <p class="mt-2 text-slate-200 font-bold leading-snug">
                  “Hear, O Israel: The LORD our God, the LORD is one.”
                </p>
                <p class="mt-1 text-amber-400 text-xs font-black uppercase tracking-widest">
                  Deuteronomy 6:4
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-500">
            © <span id="sgYear"></span> Sky Grace Jesus Ministry. All rights reserved.
          </p>

          <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <a href="privacy.html" class="text-slate-500 hover:text-slate-200 transition">Privacy</a>
            <span class="text-slate-700">•</span>
            <a href="terms.html" class="text-slate-500 hover:text-slate-200 transition">Terms</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  `;

  // Set year safely (no template-string pitfalls)
  const y = document.getElementById("sgYear");
  if (y) y.textContent = String(new Date().getFullYear());
});

