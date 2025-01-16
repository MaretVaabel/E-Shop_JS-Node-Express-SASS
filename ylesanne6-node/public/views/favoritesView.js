import { customerConstructor } from "../constructors/Customer.js";

// Lemmikute vaate genereerimine
export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.product.name}</h3>
        <p>Hind: $${item.product.price}</p>
      `;

    // Eemaldamisnupp
    const removeButton = document.createElement("button");
    removeButton.textContent = "Eemalda lemmikutest";
    removeButton.onclick = () => {
      customerConstructor.toggleFavorites(item.product);
      displayFavoritesView();
    };
    favoriteItemElement.append(removeButton);
    container.appendChild(favoriteItemElement);
  });
};
