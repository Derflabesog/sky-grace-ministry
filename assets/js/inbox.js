document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("contactMessagesList");
  const status = document.getElementById("inboxStatus");

  if (!list || !status) return;

  status.textContent = "Loading messages...";

  const { data, error } = await supabaseClient
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    status.textContent = "Failed to load messages: " + error.message;
    status.className = "text-sm font-bold text-red-600 mb-4";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    status.textContent = "No contact messages yet.";
    status.className = "text-sm font-bold text-slate-500 mb-4";
    return;
  }

  status.textContent = "";

  list.innerHTML = data.map((msg) => `
    <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow">
      <h3 class="text-xl font-black">${msg.name || "No name"}</h3>
      <p class="mt-1 text-sm text-slate-500">
        ${msg.email || "No email"} ${msg.phone ? " | " + msg.phone : ""}
      </p>
      <p class="mt-4 text-slate-700 whitespace-pre-line">${msg.message || ""}</p>
      <p class="mt-4 text-xs text-slate-400">
        ${msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}
      </p>
    </div>
  `).join("");
});