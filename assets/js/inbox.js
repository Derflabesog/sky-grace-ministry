document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("contactMessagesList");
  const status = document.getElementById("inboxStatus");

  if (!list) return;

  status.textContent = "Loading messages...";

  const { data, error } = await supabaseClient
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    status.textContent = "Failed to load messages.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    status.textContent = "No contact messages yet.";
    return;
  }

  status.textContent = "";

  list.innerHTML = data.map((msg) => `
    <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h3 class="text-xl font-black">${msg.name || "No name"}</h3>
          <p class="mt-1 text-sm text-slate-500">${msg.email || "No email"} ${msg.phone ? " | " + msg.phone : ""}</p>
        </div>
        <p class="text-xs font-bold text-slate-400">
          ${new Date(msg.created_at).toLocaleString()}
        </p>
      </div>

      <p class="mt-5 text-slate-700 leading-relaxed whitespace-pre-line">
        ${msg.message || ""}
      </p>
    </div>
  `).join("");
});