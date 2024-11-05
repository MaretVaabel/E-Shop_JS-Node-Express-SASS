import { Product } from "./Product.js";
import { Cart } from "./Cart.js";

const products = [
  new Product("Sülearvuti", 999.99, "Elektroonika"),
  new Product("Telefon", 599.99, "Elektroonika"),
  new Product("Tahvelarvuti", 299.99, "Elektroonika"),
];

const cart = new Cart();
const favorites = [];

// Aktiivse vaate kuvamine
window.navigateTo = (view) => {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(`${view}-view`).classList.add("active");
};

// Toodete kuvamine
function displayProducts(category = null) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  filteredProducts.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <div onclick="showProductDetail(${index})">
        <h3>${product.name}</h3>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: $${product.price}</p>
      </div>
      <button onclick="addToCart(${index})">Lisa ostukorvi</button>
      <button onclick="addToFavorites(${index})">Lisa lemmikutesse</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Toote detailvaate kuvamine
window.showProductDetail = (index) => {
  navigateTo("product-detail");
  const product = products[index];
  document.getElementById("product-detail").innerHTML = `
    <h3>${product.name}</h3>
    <p>Hind: $${product.price}</p>
    <button onclick="addToCart(${index})">Lisa ostukorvi</button>
    <button onclick="addToFavorites(${index})">Lisa lemmikutesse</button>
  `;
};

// Ostukorvi haldamine
window.addToCart = (index) => {
  const product = products[index];
  cart.addProduct(product, 1);
  updateCartDisplay();
};

// Lemmikutesse lisamine
window.addToFavorites = (index) => {
  const product = products[index];
  if (!favorites.includes(product)) favorites.push(product);
  updateFavoritesDisplay();
};

// Ostukorvi sisu kuvamine ja kokkuvõte
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSummaryContainer = document.getElementById("cart-summary");

  cartItemsContainer.innerHTML = "";
  cart.items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
      ${item.product.name} - $${item.product.price} x 
      <button onclick="updateQuantity(${index}, -1)">-</button>
      ${item.quantity}
      <button onclick="updateQuantity(${index}, 1)">+</button>
      <button onclick="removeFromCart(${index})">Eemalda</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  const subtotal = cart.calculateTotal();
  const discount = subtotal * 0.1; // 10% allahindlus
  const tax = (subtotal - discount) * 0.2; // 20% käibemaks

  cartSummaryContainer.innerHTML = `
    <p>Kokku: $${subtotal.toFixed(2)}</p>
    <p>Allahindlus: -$${discount.toFixed(2)}</p>
    <p>Käibemaks (20%): $${tax.toFixed(2)}</p>
    <p>Lõppsummaga: $${(subtotal - discount + tax).toFixed(2)}</p>
    <button onclick="submitOrder()">Osta</button>
  `;

  document.getElementById("cart-count").innerText = cart.totalItems;
}

// Lemmikute kuvamine
function updateFavoritesDisplay() {
  const favoritesContainer = document.getElementById("favorites");
  favoritesContainer.innerHTML = "";
  favorites.forEach((product, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
      <p>${product.describe()}</p>
      <button onclick="addToCart(${index})">Lisa ostukorvi</button>
    `;
    favoritesContainer.appendChild(itemElement);
  });
}

// Toote koguse muutmine ja eemaldamine ostukorvist
window.updateQuantity = (index, delta) => {
  cart.updateProductQuantity(index, delta);
  updateCartDisplay();
};

window.removeFromCart = (index) => {
  cart.removeProduct(index);
  updateCartDisplay();
};

// Tellimuse kinnitamine
window.submitOrder = () => {
  alert("Tellimus on kinnitatud!");
  cart.clear();
  updateCartDisplay();
};

// Algvaadete kuvamine
displayProducts();
updateCartDisplay();
updateFavoritesDisplay();
