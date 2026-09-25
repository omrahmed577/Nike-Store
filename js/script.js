/* ==========================================================================

   1. DOM ELEMENT SELECTIONS

   ========================================================================== */

// --- Navbar ---

const navLinks = document.querySelectorAll("nav a");

const navIcons = document.querySelectorAll("nav .icons i");

// --- Home Section ---

const shopNowButton = document.querySelector(".main .button a");

// --- Products Section ---

const productsSection = document.querySelector(".products");

const productsBox = document.querySelector(".products .box");

const productCards = document.querySelectorAll(".products .box .card");

const productImages = document.querySelectorAll(
  ".products .box .card .image img",
);

const productNames = document.querySelectorAll(
  ".products .box .card .products_text h2",
);

const productDescriptions = document.querySelectorAll(
  ".products .box .card .products_text p",
);

const productPrices = document.querySelectorAll(
  ".products .box .card .products_text h3",
);

const productStars = document.querySelectorAll(
  ".products .box .card .products_text .products_star i",
);

const addToCartButtons = document.querySelectorAll(
  ".products .box .card .products_text .btn",
);

const productFavoriteButtons = document.querySelectorAll(
  ".products .box .card .small_card .favorite-btn i",
);

// --- About Section ---

const aboutSection = document.querySelector(".about");

const aboutSmallImages = document.querySelectorAll(
  ".about .about_main .about_image .about_small_image img",
);

const aboutMainImage = document.querySelector("#imagebox");

const aboutShopButton = document.querySelector(
  ".about .about_main .about_text .about_btn",
);

// --- Reviews Section ---

const reviewCards = document.querySelectorAll(
  ".reviews .review_box .review_card",
);

const reviewStars = document.querySelectorAll(
  ".reviews .review_box .review_card .reviews .review_icon i",
);

// --- Services Section ---

const serviceCards = document.querySelectorAll(
  ".services .services_cards .services_box",
);

// --- Login Section & Modal ---

const loginSection = document.querySelector("#login");

const loginForm = document.querySelector("#login-form");

const usernameInput = document.querySelector("#username");

const passwordInput = document.querySelector("#password");

const loginButton = document.querySelector(".login .login_form .login_btn");

const userIcon = document.querySelector("#user-btn");

const closeLoginBtn = document.querySelector(".close-login");

// --- Signup Section ---

const signupSection = document.querySelector("#signup");

const signupForm = document.querySelector("#signup-form");

const closeSignupBtn = document.querySelector(".close-signup");

const showLoginBtn = document.querySelector("#show-login");

const showSignupBtn = document.querySelector("#show-signup");

const signupUsernameInput = document.querySelector("#signup-username");

const signupPasswordInput = document.querySelector("#signup-password");

const confirmPasswordInput = document.querySelector("#confirm-password");

// --- User Menu ---

const userMenu = document.querySelector("#user-menu");

const logoutBtn = document.querySelector("#logout-btn");

const profileName = document.querySelector("#profile-name");

const profileRole = document.querySelector("#profile-role");

// --- Cart Drawer Elements ---

const cartBtn = document.querySelector("#cart-btn");

const cartDrawer = document.querySelector("#cart-drawer");

const closeCartBtn = document.querySelector(".close-cart");

const cartItemsContainer = document.querySelector(".cart-items");

const cartTotalDisplay = document.querySelector("#cart-total");

const cartBadge = document.querySelector("#cart-badge");

const cartOverlay = document.querySelector("#cart-overlay");

// --- Wishlist Elements ---

const wishlistBadge = document.querySelector("#wishlist-badge");

// --- Footer ---

const newsletterInput = document.querySelector("#newsletter-email");

const newsletterButton = document.querySelector("#newsletter-btn");

/* ==========================================================================

   2. NAVIGATION & ACTIVE SECTION

   ========================================================================== */

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  const sections = document.querySelectorAll(
    "section, .products, .about, .review, .services",
  );

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.pageYOffset >= sectionTop - 150 && section.id) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
});

// Update active navbar link when clicked

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

/* ==========================================================================

   3. WISHLIST / FAVORITES SYSTEM

   ========================================================================== */
/* ==========================================================================
   3. WISHLIST / FAVORITES SYSTEM
   ========================================================================== */

let favorites = JSON.parse(localStorage.getItem("nike_favorites")) || [];

/* ----------------------------------------------------------
   Update Wishlist Badge
   ---------------------------------------------------------- */
function updateWishlistBadge() {
  if (!wishlistBadge) return;

  wishlistBadge.textContent = favorites.length;

  wishlistBadge.style.display = favorites.length > 0 ? "flex" : "none";
}

/* ----------------------------------------------------------
   Sync Favorite Icons
   ----------------------------------------------------------
   IMPORTANT: `productFavoriteButtons` now holds the <button>
   elements (class .favorite-btn), not the inner <i>.
   ---------------------------------------------------------- */
function syncFavoriteIcons() {
  productFavoriteButtons.forEach((heartBtn) => {
    const card = heartBtn.closest(".card");
    if (!card) return;

    const productId = card.dataset.id;
    if (!productId) return;

    const icon = heartBtn.querySelector("i");
    if (!icon) return;

    const isFavorite = favorites.includes(productId);

    if (isFavorite) {
      icon.classList.add("active");
      icon.classList.add("fa-solid");
      icon.classList.remove("fa-regular");
    } else {
      icon.classList.remove("active");
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });

  updateWishlistBadge();
}

/* ----------------------------------------------------------
   Favorite Button Click
   ----------------------------------------------------------
   - Listener is on the <button>, not the <i>.
   - stopPropagation prevents the product-details modal
     from opening on card click.
   ---------------------------------------------------------- */
productFavoriteButtons.forEach((heartBtn) => {
  heartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const card = heartBtn.closest(".card");
    if (!card) return;

    const productId = card.dataset.id;
    if (!productId) return;

    const favoriteIndex = favorites.indexOf(productId);

    if (favoriteIndex > -1) {
      favorites.splice(favoriteIndex, 1);
    } else {
      favorites.push(productId);
    }

    // Persist per-user
    const storageName =
      typeof storageKey === "function"
        ? storageKey("nike_favorites")
        : "nike_favorites";

    localStorage.setItem(storageName, JSON.stringify(favorites));

    syncFavoriteIcons();

    // Optional toast feedback
    if (typeof showToast === "function") {
      showToast(
        favorites.includes(productId)
          ? "Added to wishlist"
          : "Removed from wishlist",
      );
    }
  });
});

/* ----------------------------------------------------------
   Initial Sync
   ---------------------------------------------------------- */
syncFavoriteIcons();
// =========================================================

// ADD TO CART

// =========================================================

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    // Get clicked product card

    const productCard = this.closest(".card");

    if (!productCard) return;

    // Product ID

    const productId = productCard.dataset.id;

    if (!productId) {
      alert("Product ID is missing.");

      return;
    }

    // Product Name

    const name =
      productCard.querySelector(".products_text h2")?.innerText.trim() ||
      "NIKE";

    // Product Price

    const priceText =
      productCard.querySelector(".products_text h3")?.innerText || "$0";

    const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

    // Product Image

    const imageSrc = productCard.querySelector(".image img")?.src || "";

    // Check Existing Product

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,

        name: name,

        price: price,

        imageSrc: imageSrc,

        quantity: 1,
      });
    }

    // Save and Update

    updateCartUI();

    // Open Cart

    openCart();
  });
});

// =========================================================

// UPDATE CART UI

// =========================================================

function updateCartUI() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;

  let totalCount = 0;

  // Empty Cart

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <p>Your cart is empty</p>

            </div>

        `;
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      totalCount += item.quantity;

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

                        <h4>${item.name}</h4>

                        <p>$${item.price.toFixed(2)}</p>

                        <div class="cart-quantity">

                            <button

                                type="button"

                                class="quantity-btn dec-btn"

                                data-index="${index}"

                                aria-label="Decrease quantity"

                            >

                                −

                            </button>

                            <span>${item.quantity}</span>

                            <button

                                type="button"

                                class="quantity-btn inc-btn"

                                data-index="${index}"

                                aria-label="Increase quantity"

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

                    aria-label="Remove ${item.name}"

                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  // Total Price

  if (cartTotalDisplay) {
    cartTotalDisplay.innerText = `$${total.toFixed(2)}`;
  }

  // Cart Badge

  if (cartBadge) {
    cartBadge.innerText = totalCount;

    cartBadge.style.display = totalCount > 0 ? "flex" : "none";
  }

  // Save Cart

  localStorage.setItem("cart", JSON.stringify(cart));

  // Attach Buttons Events

  attachCartItemEvents();
}

// =========================================================

// CART ITEM EVENTS

// =========================================================

function attachCartItemEvents() {
  // Remove Item

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-index"));

      cart.splice(index, 1);

      updateCartUI();
    });
  });

  // Increase Quantity

  document.querySelectorAll(".inc-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-index"));

      if (cart[index]) {
        cart[index].quantity += 1;

        updateCartUI();
      }
    });
  });

  // Decrease Quantity

  document.querySelectorAll(".dec-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-index"));

      if (!cart[index]) return;

      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }

      updateCartUI();
    });
  });
}

// =========================================================

// CART DRAWER CONTROLS

// =========================================================

function openCart() {
  if (cartDrawer) {
    cartDrawer.classList.add("active");

    cartDrawer.setAttribute("aria-hidden", "false");
  }

  if (cartOverlay) {
    cartOverlay.classList.add("active");
  }
}

function closeCart() {
  if (cartDrawer) {
    cartDrawer.classList.remove("active");

    cartDrawer.setAttribute("aria-hidden", "true");
  }

  if (cartOverlay) {
    cartOverlay.classList.remove("active");
  }
}

// Cart Button

if (cartBtn) {
  cartBtn.addEventListener("click", (event) => {
    event.preventDefault();

    openCart();
  });

  cartBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openCart();
    }
  });
}

// Close Cart

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}

/* ==========================================================================

   5. ABOUT SECTION IMAGE SWITCHER

   ========================================================================== */

aboutSmallImages.forEach((image) => {
  image.addEventListener("click", () => {
    if (aboutMainImage) {
      aboutMainImage.src = image.src;
    }

    aboutSmallImages.forEach((img) => {
      img.classList.remove("active");
    });

    image.classList.add("active");
  });
});

/* ==========================================================================

   6. LOGIN & SIGN UP SYSTEM

   ========================================================================== */

// =========================================================

// USERS STORAGE

// =========================================================

// Get All Registered Users

function getUsers() {
  return JSON.parse(localStorage.getItem("nike_users")) || [];
}

// Save Users

function saveUsers(users) {
  localStorage.setItem("nike_users", JSON.stringify(users));
}

// =========================================================

// LOGIN FUNCTIONS

// =========================================================

// Open Login

function openLogin() {
  if (signupSection) {
    signupSection.classList.remove("active");
  }

  if (loginSection) {
    loginSection.classList.add("active");
  }
}

// Close Login

function closeLogin() {
  if (!loginSection) return;

  const isLoggedIn = sessionStorage.getItem("nike_session");

  if (!isLoggedIn) {
    alert("Please login or sign up first.");

    return;
  }

  loginSection.classList.remove("active");
}

// =========================================================

// SIGNUP FUNCTIONS

// =========================================================

// Open Signup

function openSignup() {
  if (loginSection) {
    loginSection.classList.remove("active");
  }

  if (signupSection) {
    signupSection.classList.add("active");
  }
}

// Close Signup

function closeSignup() {
  if (signupSection) {
    signupSection.classList.remove("active");
  }
}

// =========================================================

// SHOW SIGNUP

// =========================================================

if (showSignupBtn) {
  showSignupBtn.addEventListener("click", openSignup);
}

// =========================================================

// SHOW LOGIN

// =========================================================

if (showLoginBtn) {
  showLoginBtn.addEventListener("click", () => {
    closeSignup();

    openLogin();
  });
}

// =========================================================

// CLOSE BUTTONS

// =========================================================

if (closeLoginBtn) {
  closeLoginBtn.addEventListener("click", closeLogin);
}

if (closeSignupBtn) {
  closeSignupBtn.addEventListener("click", closeSignup);
}

// =========================================================

// SIGNUP SUBMIT

// =========================================================

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = signupUsernameInput?.value.trim() || "";

    const password = signupPasswordInput?.value.trim() || "";

    const confirmPassword = confirmPasswordInput?.value.trim() || "";

    // Check Empty Fields

    if (!username || !password || !confirmPassword) {
      alert("Please complete all fields.");

      return;
    }

    // Check Username Length

    if (username.length < 3) {
      alert("Username must be at least 3 characters.");

      return;
    }

    // Check Password Length

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");

      return;
    }

    // Check Matching Passwords

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    const users = getUsers();

    // Check Existing Username

    const userExists = users.some((user) => {
      return user.username.toLowerCase() === username.toLowerCase();
    });

    if (userExists) {
      alert("This username already exists.");

      return;
    }

    // Create New User

    const newUser = {
      id: Date.now(),

      username: username,

      password: password,

      role: "User",
    };

    users.push(newUser);

    saveUsers(users);

    alert("Account created successfully!");

    // Reset Form

    signupForm.reset();

    // Return To Login

    closeSignup();

    openLogin();

    // Put Username Automatically In Login

    if (usernameInput) {
      usernameInput.value = username;
    }
  });
}

// =========================================================

// LOGIN SUBMIT

// =========================================================

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput?.value.trim() || "";

    const password = passwordInput?.value.trim() || "";

    // Check Empty Fields

    if (!username || !password) {
      alert("Please enter username and password.");

      return;
    }

    const users = getUsers();

    // Find Matching User

    const matchedUser = users.find((user) => {
      return (
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
      );
    });

    // Invalid Login

    if (!matchedUser) {
      alert("Incorrect username or password.");

      return;
    }

    // Successful Login

    sessionStorage.setItem("nike_session", "true");

    localStorage.setItem("nike_user", matchedUser.username);

    // Save Current User

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    alert(`Welcome back, ${matchedUser.username}!`);

    // Update User Icon

    if (userIcon) {
      userIcon.title = `Welcome, ${matchedUser.username}`;

      userIcon.style.color = "#c72092";
    }

    // Update Profile Menu

    updateUserMenu(matchedUser);

    // Close Login

    if (loginSection) {
      loginSection.classList.remove("active");
    }

    // Reset Form

    loginForm.reset();
  });
}

// =========================================================

// UPDATE USER MENU

// =========================================================

function updateUserMenu(user) {
  if (!user) return;

  if (profileName) {
    profileName.textContent = user.username || "User";
  }

  if (profileRole) {
    profileRole.textContent = user.role || "User";
  }

  if (userIcon) {
    userIcon.title = `Welcome, ${user.username}`;

    userIcon.style.color = "var(--primary-color)";
  }
}

// =========================================================

// LOAD CURRENT USER

// =========================================================

function loadCurrentUser() {
  const savedUser = localStorage.getItem("currentUser");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Invalid current user data:", error);

    localStorage.removeItem("currentUser");

    return null;
  }
}

// =========================================================

// OPEN LOGIN WHEN WEBSITE STARTS

// =========================================================

window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("nike_session");

  const savedUsername = localStorage.getItem("nike_user");

  const currentUser = loadCurrentUser();

  // Update User Data

  if (currentUser) {
    updateUserMenu(currentUser);
  } else if (savedUsername && userIcon) {
    userIcon.title = `Welcome, ${savedUsername}`;

    userIcon.style.color = "var(--primary-color)";
  }

  // Open Login If Not Logged In

  if (!isLoggedIn) {
    setTimeout(() => {
      openLogin();
    }, 300);
  }
});

/* ==========================================================================

   7. USER MENU

   ========================================================================== */

// Open / Close User Menu

if (userIcon && userMenu) {
  userIcon.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    const isLoggedIn = sessionStorage.getItem("nike_session");

    // If Not Logged In, Open Login

    if (!isLoggedIn) {
      openLogin();

      return;
    }

    // If Logged In, Toggle User Menu

    userMenu.classList.toggle("active");
  });

  // Keyboard Accessibility

  userIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      userIcon.click();
    }
  });

  // Prevent Closing When Clicking Inside Menu

  userMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close Menu When Clicking Outside

  document.addEventListener("click", () => {
    userMenu.classList.remove("active");
  });
}

/* ==========================================================================

   8. LOGOUT

   ========================================================================== */

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Remove Login Session

    sessionStorage.removeItem("nike_session");

    // Remove Saved Username

    localStorage.removeItem("nike_user");

    // Remove Current User

    localStorage.removeItem("currentUser");

    // Close User Menu

    if (userMenu) {
      userMenu.classList.remove("active");
    }

    // Reset User Icon

    if (userIcon) {
      userIcon.title = "Login";

      userIcon.style.color = "";
    }

    // Open Login Modal

    openLogin();
  });
}

/* ==========================================================================

   9. NEWSLETTER SUBSCRIPTION

   ========================================================================== */

if (newsletterButton) {
  newsletterButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = newsletterInput?.value.trim() || "";

    // Empty Email

    if (email === "") {
      alert("Please enter a valid email address.");

      return;
    }

    // Email Validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    alert("Thank you for subscribing to our newsletter!");

    if (newsletterInput) {
      newsletterInput.value = "";
    }
  });
}

/* ==========================================================================

   10. DARK MODE

   ========================================================================== */

const darkModeBtn = document.getElementById("dark-mode-btn");

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

/* ==========================================================================

   11. INITIAL CART LOADING

   ========================================================================== */

updateCartUI();
