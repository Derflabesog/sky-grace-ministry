document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending message...";
    status.className = "mt-4 text-sm font-bold text-blue-600";

    const formData = {
      name: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      message: document.getElementById("contactMessage").value.trim(),
    };

    const { error } = await supabaseClient
      .from("contact_messages")
      .insert([formData]);

    if (error) {
      status.textContent = "Message failed. Please try again.";
      status.className = "mt-4 text-sm font-bold text-red-600";
      console.error(error);
      return;
    }

    status.textContent = "Message sent successfully. We will contact you soon.";
    status.className = "mt-4 text-sm font-bold text-green-600";
    form.reset();
  });
});