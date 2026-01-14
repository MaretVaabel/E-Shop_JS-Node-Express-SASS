import { Product } from "./constructors/Product.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { dispalyProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { cartConstructor } from "./constructors/Cart.js";
import { displayFavoritesView } from "./views/favoritesView.js";

const products = [
  new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
  new Product(2, "Telefon", 599.99, "Elektroonika"),
  new Product(3, "Tahvelarvuti", 299.99, "Elektroonika"),
];

cartConstructor.addProduct(products[0], 2);
cartConstructor.addProduct(products[2], 1);

const initApp = async () => {
  // displayAllProductsView(products);
  //dispalyProductDetailView(products[1]);
  // displayCartView();
  displayFavoritesView();
};

document.addEventListener("DOMContentLoaded", initApp);
