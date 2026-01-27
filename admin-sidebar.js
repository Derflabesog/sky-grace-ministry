(async function () {
  const mount = document.getElementById("admin-sidebar-mount");
  if (!mount) return;

  const scriptUrl = document.currentScript.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1);

  const res = await fetch(baseUrl + "partials/admin-sidebar.html", { cache: "no-cache" });
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
