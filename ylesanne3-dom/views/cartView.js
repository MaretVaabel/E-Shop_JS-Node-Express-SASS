//Ostukorvi vaate genereerimine
export const displayCartView = (cart) => {
  const container = document.getElementById("cart-view");
  container.innerHTML = "<h2>Ostukorv</h2>";

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
