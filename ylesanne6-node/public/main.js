import { Product } from "./constructors/Product.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate } from "./router.js";
import { getAllCategory } from "./api.js";
import { customerConstructor } from "./constructors/Customer.js";

const initApp = async () => {
  const USER_ID = sessionStorage.getItem("userID");

  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => navigate("category");

  //võtan kategooriad andmebaasist ja kuvan päises
  const categories = await getAllCategory();
  const categoryMenu = document.getElementById("categories");

  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    categoryElement.textContent = category;
    categoryElement.onclick = () => navigate("category", category);
    categoryMenu.appendChild(categoryElement);
  });

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.className = USER_ID ? "show" : "hidden";
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  // const logIn = async (userName) => {
  //   console.log("110", USER_ID, sessionStorage);
  //   const randomId = Math.floor(Math.random() * 100);
  //   customerConstructor.userID = randomId;
  //   customerConstructor.userName = userName;
  //   console.log(customerConstructor.userID);
  //   alert(`User ${userName} has logged in`);
  //   //Võta kõik lemmikud BE valmis
  //   await customerConstructor.getAllFavorites();
  //   // kui kõik kliendi andmed on olemas, siis kuva vaade
  //   displayAllProductsView();
  // };
  console.log("enne logimist", USER_ID);
  const logInButton = document.getElementById("login-button");
  logInButton.textContent = USER_ID ? "Logi välja" : "Logi sisse";

  logInButton.onclick = async () => {
    if (USER_ID) {
      customerConstructor.logout();
      favoritesButton.className = "hidden";
      logInButton.textContent = "Logi sisse";
    } else {
      const userName = prompt("Sisesta oma nimi");
      await customerConstructor.login(userName);
      favoritesButton.className = "show";
      logInButton.textContent = "Logi välja";
    }

    // kui kõik kliendi andmed on olemas, siis kuva vaade uuesti
    displayAllProductsView();
  };
  displayAllProductsView();
};

document.addEventListener("DOMContentLoaded", initApp);
