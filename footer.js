(async function () {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  // Load partial
  const scriptUrl = document.currentScript.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1);
  const response = await fetch(baseUrl + "partials/footer.html", { cache: "no-cache" });
  if (!response.ok) {
    console.warn("Footer partial not found:", response.status);
    return;
  }
  mount.innerHTML = await response.text();
})();