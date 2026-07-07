document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("contactMessagesList");
  const status = document.getElementById("inboxStatus");

  status.textContent = "Inbox JavaScript loaded...";

  if (typeof supabaseClient === "undefined") {
    status.textContent = "ERROR: Supabase is not connected. Check assets/js/supabase.js";
    status.className = "text-sm font-bold text-red-600 mb-4";
    return;
  }

  status.textContent = "Supabase connected. Loading messages...";

  try {
    const { data, error } = await supabaseClient
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      status.textContent = "Supabase error: " + error.message;
      status.className = "text-sm font-bold text-red-600 mb-4";
      return;
    }

    if (!data || data.length === 0) {
      status.textContent = "No contact messages yet.";
      return;
    }

    status.textContent = "";

    list.innerHTML = data.map((msg) => `
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow">
        <h3 class="text-xl font-black">${msg.name || "No name"}</h3>
        <p class="mt-1 text-sm text-slate-500">
          ${msg.email || "No email"} ${msg.phone ? " | " + msg.phone : ""}
        </p>
        <p class="mt-4 text-slate-700">${msg.message || ""}</p>
      </div>
    `).join("");

  } catch (err) {
    status.textContent = "JavaScript error: " + err.message;
    status.className = "text-sm font-bold text-red-600 mb-4";
  }
});