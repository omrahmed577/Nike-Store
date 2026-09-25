// ==========================================================================
// WISHLIST
// ==========================================================================

const wishlistBadge = document.querySelector("#wishlist-badge");

const wishlistButton = document.querySelector("#open-wishlist-btn");

const wishlistDrawer = document.querySelector("#wishlist-drawer");

const closeWishlistButton = document.querySelector(".close-wishlist");

const wishlistItemsContainer = document.querySelector(".wishlist-items");

const productFavoriteButtons = document.querySelectorAll(".favorite-btn");

let favorites = JSON.parse(localStorage.getItem("nike_favorites")) || [];

// ==========================================================================
// UPDATE BADGE
// ==========================================================================

function updateWishlistBadge() {
  if (!wishlistBadge) return;

  wishlistBadge.textContent = favorites.length;

  wishlistBadge.style.display = favorites.length > 0 ? "flex" : "none";
}

// ==========================================================================
// SYNC HEART ICONS
// ==========================================================================

function syncFavoriteIcons() {
  productFavoriteButtons.forEach((button) => {
    const card = button.closest(".card");

    if (!card) return;

    const productId = card.dataset.id;

    if (!productId) return;

    const icon = button.querySelector("i");

    if (!icon) return;

    const isFavorite = favorites.includes(productId);

    if (isFavorite) {
      icon.classList.remove("fa-regular");

      icon.classList.add("fa-solid");

      icon.classList.add("active");

      button.setAttribute("aria-pressed", "true");
    } else {
      icon.classList.remove("fa-solid");

      icon.classList.add("fa-regular");

      icon.classList.remove("active");

      button.setAttribute("aria-pressed", "false");
    }
  });

  updateWishlistBadge();
}

// ==========================================================================
// WISHLIST DRAWER
// ==========================================================================

function openWishlist() {
  if (!wishlistDrawer) return;

  wishlistDrawer.hidden = false;

  wishlistDrawer.classList.add("active");

  wishlistDrawer.setAttribute("aria-hidden", "false");

  if (wishlistButton) {
    wishlistButton.setAttribute("aria-expanded", "true");
  }

  renderWishlist();
}

function closeWishlist() {
  if (!wishlistDrawer) return;

  wishlistDrawer.classList.remove("active");

  wishlistDrawer.hidden = true;

  wishlistDrawer.setAttribute("aria-hidden", "true");

  if (wishlistButton) {
    wishlistButton.setAttribute("aria-expanded", "false");
  }
}

// ==========================================================================
// RENDER WISHLIST
// ==========================================================================

function renderWishlist() {
  if (!wishlistItemsContainer) return;

  wishlistItemsContainer.innerHTML = "";

  if (favorites.length === 0) {
    wishlistItemsContainer.innerHTML = `
            <p class="empty-wishlist-message">
                Your wishlist is empty.
            </p>
        `;

    return;
  }

  favorites.forEach((productId) => {
    const card = document.querySelector(`.card[data-id="${productId}"]`);

    if (!card) return;

    const name =
      card.dataset.name ||
      card.querySelector(".products_text h2")?.textContent.trim() ||
      "Product";

    const price = card.dataset.price || "0";

    const image = card.querySelector(".image img")?.src || "";

    const item = document.createElement("div");

    item.classList.add("wishlist-item");

    item.innerHTML = `
            <img
                src="${image}"
                alt="${name}"
            >

            <div class="wishlist-item-info">
                <h4>${name}</h4>
                <p>$${Number(price).toFixed(2)}</p>
            </div>

            <button
                type="button"
                class="wishlist-remove"
                data-id="${productId}"
                aria-label="Remove ${name}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

    wishlistItemsContainer.appendChild(item);
  });

  document.querySelectorAll(".wishlist-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;

      favorites = favorites.filter((id) => id !== productId);

      localStorage.setItem("nike_favorites", JSON.stringify(favorites));

      syncFavoriteIcons();

      renderWishlist();
    });
  });
}

// ==========================================================================
// FAVORITE CLICK
// ==========================================================================

productFavoriteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const card = button.closest(".card");

    if (!card) return;

    const productId = card.dataset.id;

    if (!productId) return;

    const index = favorites.indexOf(productId);

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }

    localStorage.setItem("nike_favorites", JSON.stringify(favorites));

    syncFavoriteIcons();
  });
});

// ==========================================================================
// WISHLIST BUTTON
// ==========================================================================

if (wishlistButton) {
  wishlistButton.addEventListener("click", () => {
    if (wishlistDrawer?.classList.contains("active")) {
      closeWishlist();
    } else {
      openWishlist();
    }
  });
}

// ==========================================================================
// CLOSE
// ==========================================================================

if (closeWishlistButton) {
  closeWishlistButton.addEventListener("click", closeWishlist);
}

// ==========================================================================
// INITIAL
// ==========================================================================

syncFavoriteIcons();
