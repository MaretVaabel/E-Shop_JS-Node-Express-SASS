import { Cart } from "../constructors/Cart.js";

export const cartConstructor = new Cart();

//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartConstructor.getAllProducts();

  if (!cart.lenght) {
    const cartItemElement = document.createElement("p");
    cartItemElement.innerText = "Ostukorv on tühi";
    container.append(cartItemElement);
  } else {
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
      <h3>${item.name}</h3>
      <p>Hind: $${item.price}</p>
      <p>Kogus: ${item.quantity}</p>
    `;
      container.append(cartItemElement);
    });
  }
};
