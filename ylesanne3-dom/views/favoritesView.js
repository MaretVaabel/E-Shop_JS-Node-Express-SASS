// Lemmikute vaate genereerimine
export const displayFavoritesView = (favorites) => {
  const container = document.getElementById("favorites-view");
  container.innerHTML = "<h2>Lemmikud</h2>";
  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Hind: $${item.price}</p>
      `;
    container.appendChild(favoriteItemElement);
  });
};
