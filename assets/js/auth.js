document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const loginStatus = document.getElementById("loginStatus");

  if (!loginForm) return;

  // If a verified administrator is already signed in, return them directly
  // to the admin dashboard instead of asking for the password again.
  (async () => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const session = sessionData?.session;
    if (!session?.user?.email) return;

    const { data: existingAdmin } = await supabaseClient
      .from("admin_users")
      .select("email")
      .eq("email", session.user.email)
      .maybeSingle();

    if (existingAdmin) {
      loginStatus.textContent = "Admin session found. Opening dashboard...";
      loginStatus.className = "mt-4 text-sm font-bold text-green-600";
      window.location.href = "admin-dashboard.html";
    }
  })();

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    loginStatus.textContent = "Signing in...";
    loginStatus.className = "mt-4 text-sm font-bold text-blue-600";

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loginStatus.textContent = "Login failed. Check your email and password.";
      loginStatus.className = "mt-4 text-sm font-bold text-red-600";
      return;
    }

    const { data: admin, error: adminError } = await supabaseClient
      .from("admin_users")
      .select("*")
      .eq("email", data.user.email)
      .single();

    if (adminError || !admin) {
      await supabaseClient.auth.signOut();
      loginStatus.textContent = "Access denied. This account is not an admin.";
      loginStatus.className = "mt-4 text-sm font-bold text-red-600";
      return;
    }

    loginStatus.textContent = "Login successful. Redirecting...";
    loginStatus.className = "mt-4 text-sm font-bold text-green-600";

    window.location.href = "admin-dashboard.html";
  });
});