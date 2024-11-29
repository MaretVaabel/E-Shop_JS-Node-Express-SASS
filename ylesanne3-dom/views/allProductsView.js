// Toodete vaate genereerimine
export const displayAllProductsView = (products) => {
  const container = document.getElementById("products-view");
  container.innerHTML = "<h2>Tooted</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: $${product.price}</p>
      `;

    productElement.onclick = (e) => {
      e.stopPropagation();
      navigateTo("product-detail");
    };

    productsContainer.append(productElement);
  });
  container.append(productsContainer);
};
