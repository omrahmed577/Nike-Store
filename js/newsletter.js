// ==========================================================================
// NEWSLETTER
// ==========================================================================

const newsletterForm = document.querySelector("#newsletter-form");

const newsletterInput = document.querySelector("#newsletter-email");

// ==========================================================================
// SUBMIT
// ==========================================================================

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterInput?.value.trim() || "";

    if (!email) {
      alert("Please enter a valid email address.");

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    alert("Thank you for subscribing to our newsletter!");

    newsletterForm.reset();
  });
}
