import { displayFavoritesView } from "./views/favoritesView.js";
import { dispalyProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

// See funktsioon muudab vaadet JA uuendab URL-i
export const navigate = (view, param, pushState = true) => {
  const views = {
    allProducts: () => displayAllProductsView(param || "all"),
    productDetail: () => dispalyProductDetailView(param),
    cart: () => displayCartView(),
    favorites: () => displayFavoritesView(),
  };

  if (views[view]) {
    views[view]();

    // MUUDATUS: Uuenda URL-i aadressiribal (kui me just ei tulnud 'popstate' sündmusest)
    if (pushState) {
      const url = constructUrl(view, param);
      window.history.pushState({ view, param }, "", url);
    }
  }
};

// Abifunktsioon URL-i loomiseks
const constructUrl = (view, param) => {
  switch (view) {
    case "allProducts":
      return param && param !== "all" ? `/category/${param}` : "/";
    case "productDetail":
      return `/product/${param}`;
    case "cart":
      return "/cart";
    case "favorites":
      return "/favorites";
    default:
      return "/";
  }
};

// // --- OLULINE: LISA KA SEE OSA ---

// export const handleRouting = async () => {
//   const path = await window.location.pathname;
//   console.log("path", path);

//   if (path === "/" || path === "") {
//     navigate("allProducts", "all", false);
//   } else if (path.startsWith("/category/")) {
//     const category = path.split("/")[2];
//     navigate("allProducts", category, false);
//   } else if (path.startsWith("/product/")) {
//     const id = path.split("/")[2];
//     navigate("productDetail", id, false);
//   } else if (path === "/cart") {
//     navigate("cart", null, false);
//   } else if (path === "/favorites") {
//     navigate("favorites", null, false);
//   }
// };

// Kuula brauseri Back/Forward nuppe
//window.addEventListener("popstate", () => handleRouting());

// Käivita kohe, kui leht laetakse
//window.addEventListener("DOMContentLoaded", () => handleRouting());
