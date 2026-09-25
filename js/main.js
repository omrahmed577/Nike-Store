// ==========================================================================
// MAIN
// ==========================================================================

import "./navigation.js";
import "./wishlist.js";
import "./cart.js";
import "./auth.js";
import "./user-menu.js";
import "./theme.js";
import "./newsletter.js";

// ==========================================================================
// ABOUT IMAGE SWITCHER
// ==========================================================================

const aboutThumbButtons = document.querySelectorAll(".about-thumb-btn");

const aboutMainImage = document.querySelector("#imagebox");

aboutThumbButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");

    if (!image || !aboutMainImage) return;

    aboutMainImage.src = image.src;

    aboutThumbButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });
});
