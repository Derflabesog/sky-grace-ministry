document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  const email = data.session.user.email;

  const { data: admin, error } = await supabaseClient
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !admin) {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
  }
});
