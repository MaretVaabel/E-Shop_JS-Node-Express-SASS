import { displayFavoritesView } from "./views/favoritesView.js";
import { dispalyProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayAllProductsView(param || "all"), // Kasuta vaikeväärtust "all" kategooriana
    productDetail: () => dispalyProductDetailView(param), // üks toode
    cart: () => displayCartView(), // Näita ostukorvi vaadet
    favorites: () => displayFavoritesView(),
  };

  if (views[view]) {
    views[view]();
  }
};
