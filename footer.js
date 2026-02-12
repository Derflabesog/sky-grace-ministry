document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
  <footer class="bg-white border-t border-slate-200 mt-20">
    <div class="container mx-auto px-6 py-12">

      <div class="grid md:grid-cols-3 gap-10">

        <!-- MINISTRY INFO -->
        <div>
          <h3 class="font-black text-slate-900 text-lg mb-4">
            SKY GRACE JESUS MINISTRY
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            Raising a generation to walk in the undiluted Glory of Christ
            through the Word of Life.
          </p>
        </div>

        <!-- QUICK LINKS -->
        <div>
          <h4 class="font-bold uppercase text-sm tracking-widest text-slate-500 mb-4">
            Quick Links
          </h4>
          <ul class="space-y-3 text-sm font-semibold">
            <li><a href="sermons.html" class="hover:text-amber-500 transition">Sermons</a></li>
            <li><a href="theology-school.html" class="hover:text-amber-500 transition">Theology School</a></li>
            <li><a href="calendar.html" class="hover:text-amber-500 transition">Calendar</a></li>
            <li><a href="contact.html" class="hover:text-amber-500 transition">Contact</a></li>
          </ul>
        </div>

        <!-- SOCIAL MEDIA -->
        <div>
          <h4 class="font-bold uppercase text-sm tracking-widest text-slate-500 mb-4">
            Connect With Us
          </h4>

          <div class="flex items-center gap-4">

            <!-- YouTube -->
            <a href="https://www.youtube.com/@skygraceministryTV"
               target="_blank"
               class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-500 transition">
              <i class="fab fa-youtube"></i>
            </a>

            <!-- Facebook -->
            <a href="https://www.facebook.com/SkyGraceGlobal"
               target="_blank"
               class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition">
              <i class="fab fa-facebook-f"></i>
            </a>

          </div>
        </div>

      </div>

      <!-- COPYRIGHT -->
      <div class="border-t border-slate-200 mt-12 pt-6 text-center text-xs text-slate-500">
        © ${new Date().getFullYear()} Sky Grace Jesus Ministry. All rights reserved.
      </div>

    </div>
  </footer>
  `;
});
