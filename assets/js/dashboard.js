document.addEventListener("DOMContentLoaded", async () => {
  const ids = {
    contacts: document.getElementById("totalContacts"),
    prayers: document.getElementById("totalPrayers"),
    students: document.getElementById("totalStudents"),
    admins: document.getElementById("totalAdmins"),
    adminEmail: document.getElementById("adminEmailDisplay"),
  };

  const { data: sessionData } = await supabaseClient.auth.getSession();

  if (ids.adminEmail && sessionData.session) {
    ids.adminEmail.textContent = sessionData.session.user.email;
  }

  async function countTable(table) {
    const { count, error } = await supabaseClient
      .from(table)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`Error loading ${table}`, error);
      return 0;
    }

    return count || 0;
  }

  if (ids.contacts) ids.contacts.textContent = await countTable("contact_messages");
  if (ids.prayers) ids.prayers.textContent = await countTable("prayer_requests");
  if (ids.students) ids.students.textContent = await countTable("theology_students");
  if (ids.admins) ids.admins.textContent = await countTable("admin_users");
});