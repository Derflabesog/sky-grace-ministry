﻿﻿﻿(async function () {
  const mount = document.getElementById("admin-sidebar-mount");
  if (!mount) return;

  const scriptUrl = document.currentScript.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1);

  function loadScript(source) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find((script) => script.src === source);

      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }

        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = source;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function goToLogin() {
    const returnPage = location.pathname.split("/").pop() || "admin-dashboard.html";
    window.location.replace(`login.html?return=${encodeURIComponent(returnPage)}`);
  }

  if (!window.supabaseClient) {
    try {
      if (!window.supabase) {
        await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
      }

      await loadScript(baseUrl + "assets/js/supabase.js");
    } catch (error) {
      console.error("Supabase client could not be loaded.", error);
      goToLogin();
      return;
    }
  }

  if (!window.supabaseClient) {
    goToLogin();
    return;
  }

  const { data: sessionData, error: sessionError } =
    await window.supabaseClient.auth.getSession();

  const session = sessionData?.session;

  if (sessionError || !session?.user?.email) {
    goToLogin();
    return;
  }

  const { data: adminRecord, error: adminError } = await window.supabaseClient
    .from("admin_users")
    .select("email")
    .eq("email", session.user.email)
    .maybeSingle();

  if (adminError || !adminRecord) {
    await window.supabaseClient.auth.signOut();
    goToLogin();
    return;
  }

  const res = await fetch(baseUrl + "admin-sidebar.html", { cache: "no-cache" });
  if (!res.ok) {
    console.warn("Sidebar partial not found");
    return;
  }
  
  // Replace the mount point with the sidebar content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = await res.text();
  const sidebar = tempDiv.firstElementChild;
  mount.replaceWith(sidebar);

  // Highlight active link
  const current = location.pathname.split("/").pop();
  sidebar.querySelectorAll('a.nav-link').forEach((a) => {
    if (a.getAttribute("href") === current) {
      a.classList.remove("text-slate-400", "hover:bg-slate-800");
      a.classList.add("bg-blue-600", "text-white", "shadow-lg", "shadow-blue-900/50");
    }
  });
})();