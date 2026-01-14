import { customerConstructor } from "../constructors/Customer.js";

// Lemmikute vaate genereerimine
export const displayFavoritesView = async () => {
  const favorites = await customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Hind: $${item.price}</p>
      `;

    // Eemaldamisnupp
    const removeButton = document.createElement("button");
    removeButton.textContent = "Eemalda lemmikutest";
    removeButton.onclick = () => {
      customerConstructor.toggleFavorites(item.id);
      displayFavoritesView();
    };
    favoriteItemElement.append(removeButton);
    container.appendChild(favoriteItemElement);
  });
};
