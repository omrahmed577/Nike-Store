const productSearch = document.querySelector("#product-search");
const productsContainer = document.querySelector("#products-container");
const noProductsMessage = document.querySelector("#no-products-message");

function setupProductSearch() {
  if (!productSearch || !productsContainer) {
    console.warn("Search elements were not found.");
    return;
  }

  productSearch.addEventListener("input", handleProductSearch);
}

function handleProductSearch() {
  const searchValue = productSearch.value.trim().toLowerCase();

  const productCards = productsContainer.querySelectorAll(".card");

  let visibleProducts = 0;

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

    if (isMatch) {
      visibleProducts++;
    }
  });

  if (noProductsMessage) {
    noProductsMessage.hidden = visibleProducts > 0;
  }
}

setupProductSearch();
