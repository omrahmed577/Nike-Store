const productSearch = document.querySelector("#product-search");
const productsContainer = document.querySelector("#products-container");
const noProductsMessage = document.querySelector("#no-products-message");
const productSort = document.querySelector("#product-sort");

/* =========================================================
   SETUP
========================================================= */

function setupProductSearch() {
  if (!productSearch || !productsContainer) {
    console.warn("Search elements were not found.");
    return;
  }

  productSearch.addEventListener("input", handleProductSearch);

  if (productSort) {
    productSort.addEventListener("change", handleProductSearch);
  }
}

/* =========================================================
   SEARCH + SORT
========================================================= */

function handleProductSearch() {
  const searchValue = productSearch.value.trim().toLowerCase();

  const productCards = [...productsContainer.querySelectorAll(".card")];

  /* =====================================================
       SEARCH
    ===================================================== */

  productCards.forEach((card) => {
    const productName = (
      card.dataset.name ||
      card.querySelector("h2, h3, h4")?.textContent ||
      ""
    )
      .trim()
      .toLowerCase();

    const isMatch = productName.includes(searchValue);

    card.style.display = isMatch ? "" : "none";
  });

  /* =====================================================
       SORT
    ===================================================== */

  const sortValue = productSort?.value || "default";

  productCards.sort((a, b) => {
    const nameA = getProductName(a);
    const nameB = getProductName(b);

    const priceA = getProductPrice(a);
    const priceB = getProductPrice(b);

    switch (sortValue) {
      case "price-low":
        return priceA - priceB;

      case "price-high":
        return priceB - priceA;

      case "name":
        return nameA.localeCompare(nameB);

      default:
        return 0;
    }
  });

  /* =====================================================
       REORDER
    ===================================================== */

  productCards.forEach((card) => {
    productsContainer.appendChild(card);
  });

  /* =====================================================
       NO PRODUCTS
    ===================================================== */

  const visibleProducts = productCards.filter(
    (card) => card.style.display !== "none",
  ).length;

  if (noProductsMessage) {
    noProductsMessage.hidden = visibleProducts > 0;
  }
}

/* =========================================================
   GET PRODUCT NAME
========================================================= */

function getProductName(card) {
  return (
    card.dataset.name ||
    card.querySelector("h2, h3, h4")?.textContent ||
    ""
  )
    .trim()
    .toLowerCase();
}

/* =========================================================
   GET PRODUCT PRICE
========================================================= */

function getProductPrice(card) {
  const priceElement = card.querySelector(".price");

  if (!priceElement) {
    return 0;
  }

  const priceText = priceElement.textContent;

  const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

  return Number.isNaN(price) ? 0 : price;
}

/* =========================================================
   INITIALIZE
========================================================= */

setupProductSearch();
