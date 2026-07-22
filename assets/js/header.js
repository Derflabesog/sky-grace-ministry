﻿﻿document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  if (!header) return;

  header.innerHTML = `
  <!-- TOP INFO BAR -->
  <div class="bg-blue-600 text-white text-xs font-semibold">
    <div class="container mx-auto px-6 py-2 flex flex-wrap gap-4 justify-between">
      <span>2026 Vision Conference registrations opening soon</span>
      <span>New sermon summary PDF available for download</span>
    </div>
  </div>

  <!-- MAIN NAV (LIGHT MODE) -->
  <header class="bg-white text-slate-900 shadow-sm border-b border-slate-200">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      
      <!-- LOGO -->
      <a href="index.html" class="flex items-center gap-3">
        <img src="assets/images/logo.png" alt="Sky Grace Ministry" class="h-10 w-auto" onerror="this.style.display='none'">
        <div class="leading-tight">
          <p class="font-black tracking-wide text-slate-900">SKY GRACE</p>
          <p class="text-xs text-blue-600 tracking-widest">JESUS MINISTRY</p>
        </div>
      </a>

      <!-- DESKTOP NAV -->
      <nav class="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
        <a href="index.html" class="hover:text-amber-500 transition">Home</a>
        <a href="welcome-packet.html" class="hover:text-amber-500 transition">Welcome Packet</a>
        <a href="sermons.html" class="hover:text-amber-500 transition">Sermons</a>
        <a href="media.html" class="hover:text-amber-500 transition">Media</a>
        <a href="theology-school.html" class="hover:text-amber-500 transition">Theology School</a>
        <a href="contact.html" class="hover:text-amber-500 transition">Contact</a>
      </nav>

      <!-- DESKTOP ACTION BUTTONS -->
      <div class="hidden lg:flex items-center gap-3">
        <a href="login.html"
           class="inline-flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 rounded-full text-xs font-black tracking-widest text-slate-900 shadow-sm transition">
          <i class="fas fa-user-lock"></i> LOGIN
        </a>
        <a href="live.html"
           class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-full text-xs font-black tracking-widest text-white shadow-sm transition">
          <i class="fas fa-circle-play"></i> LIVE NOW
        </a>
      </div>

      <!-- MOBILE TOGGLE -->
      <button id="mobileMenuBtn" class="lg:hidden text-2xl text-slate-900">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- MOBILE MENU (LIGHT) -->
    <div id="mobileMenu" class="hidden lg:hidden bg-white border-t border-slate-200">
      <nav class="flex flex-col px-6 py-4 gap-4 text-sm font-bold uppercase tracking-widest text-slate-900">
        <a href="index.html">Home</a>
        <a href="welcome-packet.html">Welcome Packet</a>
        <a href="sermons.html">Sermons</a>
        <a href="media.html">Media</a>
        <a href="theology-school.html">Theology School</a>
        <a href="contact.html">Contact</a>
        <a href="login.html" class="text-blue-600"><i class="fas fa-user-lock mr-2"></i>Admin Login</a>
        <a href="live.html" class="text-red-600">Live Now</a>
      </nav>
    </div>
  </header>
  `;

  // Mobile toggle
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});