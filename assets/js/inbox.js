document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("contactMessagesList");
  const status = document.getElementById("inboxStatus");

  if (!list) return;

  status.textContent = "Loading messages...";

  try {
    const { data, error } = await supabaseClient
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data.length) {
      status.textContent = "No messages found.";
      return;
    }

    status.textContent = "";

    list.innerHTML = data.map(msg => `
      <div class="bg-white rounded-2xl shadow p-6 border border-slate-200 mb-4">

        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">${msg.name}</h2>
          <span class="text-sm text-slate-500">
            ${new Date(msg.created_at).toLocaleString()}
          </span>
        </div>

        <p class="text-blue-600 font-medium mt-1">${msg.email}</p>

        <p class="text-slate-500 mb-3">
          ${msg.phone || ""}
        </p>

        <h3 class="font-bold">
          ${msg.subject || "No Subject"}
        </h3>

        <p class="mt-2 text-slate-700 whitespace-pre-wrap">
          ${msg.message}
        </p>

      </div>
    `).join("");

  } catch (err) {
    status.textContent = err.message;
    status.className = "text-red-600 font-bold";
  }
});