import { cartConstructor } from "../constructors/Cart.js";

// Ühe toote detailvaate genereerimine
export const dispalyProductDetailView = (product) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const productCard = document.createElement("div");
  productCard.classList.add("product");

  productCard.innerHTML = `
      <h2>${product.name}</h2>
      <p>Kategooria: ${product.category}</p>
      <p>Hind: $${product.price}</p>
      <p>ID: ${product.id}</p>
    `;

  const cartButton = document.createElement("button");
  cartButton.textContent = "Lisa ostukorvi";
  cartButton.onclick = (e) => {
    e.stopPropagation(); // see ei lase parent'i tegevusi teha, ehk ei liigu detail vaatesse
    cartConstructor.addProduct(product);
  };

  //ostukorvi nupu lisamine productCardile
  productCard.appendChild(cartButton);

  container.append(productCard);
};
