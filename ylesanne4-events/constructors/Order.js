import { cartConstructor } from "./Cart.js";

// Order.js
export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    const cartContainer = document.getElementById("cart");
    const orderContainer = document.createElement("div");
    orderContainer.className = "order-container";
    orderContainer.innerHTML = `<h2>Tellimuse kuupäev: ${this.orderDate.toDateString()}</h2>`;

    this.cart.items.forEach((item) => {
      const cartElement = document.createElement("p");
      cartElement.innerHTML = `${item.product.name} - $${item.product.price} x ${item.quantity}`;
      orderContainer.append(cartElement);
    });
    const sumElement = document.createElement("h4");
    sumElement.innerHTML = `Kogusumma: $${this.cart.calculateTotal()}`;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Sulge tellimuse vaade";
    closeButton.onclick = () => {
      orderContainer.className = "order-container-close";
      cartConstructor.clear();
    };
    orderContainer.append(sumElement, closeButton);
    cartContainer.append(orderContainer);
  }
}
