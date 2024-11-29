import { Product } from "./constructors/Product.js";

import { displayAllProductsView } from "./views/allProductsView.js";
import { dispalyProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { navigate } from "./router.js";

// Aktiivse vaate kuvamine
window.navigateTo = (view) => {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(`${view}-view`).classList.add("active");
};

const products = [
  new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
  new Product(2, "Telefon", 599.99, "Elektroonika"),
  new Product(3, "Tahvelarvuti", 299.99, "Elektroonika"),
];

const favorites = [];

const initApp = async () => {
  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  displayAllProductsView(products);
  //   dispalyProductDetailView(products[0]);
  //   displayCartView(cart);
  //   displayFavoritesView(favorites);
};

document.addEventListener("DOMContentLoaded", initApp);
