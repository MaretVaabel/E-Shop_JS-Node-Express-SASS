// Customer.js
import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
    order.printOrder();
  }

  printOrderHistory() {
    console.log(`${this.name} tellimuste ajalugu:`);
    this.orderHistory.forEach((order, index) => {
      console.log(
        `Tellimus ${
          index + 1
        } - Kuupäev: ${order.orderDate.toDateString()}, Kogusumma: $${order.cart.calculateTotal()}`
      );
    });
  }
  toggleFavorites(product) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.favorites = this.favorites.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      this.favorites.push({ product });
    }
  }

  isFavorite(productId) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === productId
    );
    return !!existingItem;
  }

  getAllFavorites() {
    return this.favorites;
  }
}

export const customerConstructor = new Customer("Maret");
