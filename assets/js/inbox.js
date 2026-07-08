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
    status.textContent = error.message;
    status.className = "text-red-600 font-bold";
    return;
  }

  if (!data || data.length === 0) {
    status.textContent = "No contact messages yet.";
    return;
  }

  status.textContent = "";

  list.innerHTML = data.map((msg) => `
    <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow mb-5">
      <div class="flex justify-between gap-4">
        <div>
          <h3 class="text-xl font-black">${msg.name || "No name"}</h3>
          <p class="text-blue-600 font-bold">${msg.email || "No email"}</p>
          <p class="text-sm text-slate-500">${msg.phone || ""}</p>
        </div>

        <p class="text-sm text-slate-500">
          ${msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}
        </p>
      </div>

      <p class="mt-5 text-slate-700 whitespace-pre-wrap">
        ${msg.message || ""}
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <a href="mailto:${msg.email || ""}"
          class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm">
          Reply
        </a>

        <button onclick="deleteMessage('${msg.id}')"
          class="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-sm">
          Delete
        </button>
      </div>
    </div>
  `).join("");
});

async function deleteMessage(id) {
  if (!confirm("Delete this message?")) return;

  const { error } = await supabaseClient
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  location.reload();
}