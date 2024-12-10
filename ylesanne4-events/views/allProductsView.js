// Toodete vaate genereerimine
import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/Cart.js";
import { cutomerConstructor } from "../constructors/Customer.js";

export const displayAllProductsView = (products) => {
  const container = document.getElementById("main-container");

  container.innerHTML = "<h2>Tooted</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: $${product.price}</p>
        <button id="favorites-${product.id}" class="favorites">Lisa lemmikutesse</button>
      `;

    //NB!! Kaks viis nuppude lisamiseks
    //1. lisan nupu innerHtml'i ja kasutan addEventListener'i, mis on all pool
    //2. Ostukorvi nupu lisamine createElement'iga, kus saab sündumse külge panna
    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";
    cartButton.onclick = (e) => {
      e.stopPropagation(); // see ei lase parent'i tegevusi teha, ehk ei liigu detail vaatesse
      cartConstructor.addProduct(product);
    };

    //ostukorvi nupu lisamine productCardile
    productCard.appendChild(cartButton);

    // kuulan productCardi vajutusi
    productCard.addEventListener("click", (event) => {
      // toote kaardile vajutades otsi favorite nuppu toggelda seda, vaadet vahetamata
      if (event.target.id === `favorites-${product.id}`) {
        //otsin lemmikute nupu id põhjal
        const favoriteButton = document.getElementById(
          `favorites-${product.id}`
        );
        //toggeldan lemmikute nupu klassi nime "inFavorites" pannes juurde ja võttes ära
        favoriteButton.classList.toggle("inFavorites");
        //vastavelt klassi nimele lisan teksi või ikooni, kes soovib
        favoriteButton.textContent = favoriteButton.classList.contains(
          "inFavorites"
        )
          ? "Eemalda lemmikutest"
          : "Lisa lemmikutesse";

        cutomerConstructor.toggleFavorites(product);
      } else {
        // toote kaardile üks kõik kuhu mujale vajutades mine toode detaisesse vaatesse
        navigate("productDetail", product);
      }
    });

    //ühe toote kaardi lisan toodete konteinerisse
    productsContainer.append(productCard);
  });

  // Tooted lisan main kontainersisse
  container.append(productsContainer);
};
