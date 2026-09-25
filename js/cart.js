// ==========================================================================
// CART
// ==========================================================================

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

const cartButton = document.querySelector("#cart-btn");

const cartDrawer = document.querySelector("#cart-drawer");

const closeCartButton = document.querySelector(".close-cart");

const cartItemsContainer = document.querySelector(".cart-items");

const cartTotalDisplay = document.querySelector("#cart-total");

const cartBadge = document.querySelector("#cart-badge");

const cartOverlay = document.querySelector("#cart-overlay");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================================================
// OPEN CART
// ==========================================================================

function openCart() {
  if (!cartDrawer) return;

  cartDrawer.hidden = false;

  cartDrawer.classList.add("active");

  cartDrawer.setAttribute("aria-hidden", "false");

  if (cartButton) {
    cartButton.setAttribute("aria-expanded", "true");
  }

  if (cartOverlay) {
    cartOverlay.hidden = false;

    cartOverlay.classList.add("active");
  }
}

// ==========================================================================
// CLOSE CART
// ==========================================================================

function closeCart() {
  if (!cartDrawer) return;

  cartDrawer.classList.remove("active");

  cartDrawer.hidden = true;

  cartDrawer.setAttribute("aria-hidden", "true");

  if (cartButton) {
    cartButton.setAttribute("aria-expanded", "false");
  }

  if (cartOverlay) {
    cartOverlay.classList.remove("active");

    cartOverlay.hidden = true;
  }
}

// ==========================================================================
// ADD TO CART
// ==========================================================================

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const card = button.closest(".card");

    if (!card) return;

    const id = card.dataset.id;

    const name =
      card.dataset.name ||
      card.querySelector(".products_text h2")?.textContent.trim() ||
      "Nike";

    const price = Number(card.dataset.price) || 0;

    const imageSrc = card.querySelector(".image img")?.src || "";

    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        imageSrc,
        quantity: 1,
      });
    }

    updateCartUI();

    openCart();
  });
});

// ==========================================================================
// UPDATE CART UI
// ==========================================================================

function updateCartUI() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <p class="empty-cart-message">
                Your cart is empty.
            </p>
        `;
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      count += item.quantity;

      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
                    <div class="cart-item-info">

                        <img
                            src="${item.imageSrc}"
                            alt="${item.name}"
                            class="cart-item-image"
                        >

                        <div class="cart-item-details">

                            <h4>
                                ${item.name}
                            </h4>

                            <p>
                                $${item.price.toFixed(2)}
                            </p>

                            <div class="cart-quantity">

                                <button
                                    type="button"
                                    class="quantity-btn dec-btn"
                                    data-index="${index}"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    class="quantity-btn inc-btn"
                                    data-index="${index}"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  if (cartTotalDisplay) {
    cartTotalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  if (cartBadge) {
    cartBadge.textContent = count;

    cartBadge.style.display = count > 0 ? "flex" : "none";
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  attachCartEvents();
}

// ==========================================================================
// CART EVENTS
// ==========================================================================

function attachCartEvents() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCartUI();
    });
  });

  document.querySelectorAll(".inc-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      if (!cart[index]) return;

      cart[index].quantity++;

      updateCartUI();
    });
  });

  document.querySelectorAll(".dec-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      if (!cart[index]) return;

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      updateCartUI();
    });
  });
}

// ==========================================================================
// CART BUTTON
// ==========================================================================

if (cartButton) {
  cartButton.addEventListener("click", openCart);
}

// ==========================================================================
// CLOSE
// ==========================================================================

if (closeCartButton) {
  closeCartButton.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}

// ==========================================================================
// INITIAL
// ==========================================================================

updateCartUI();
