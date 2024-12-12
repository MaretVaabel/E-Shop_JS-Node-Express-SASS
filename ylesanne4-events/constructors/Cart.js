import { displayCartView } from "../views/cartView.js";

// Cart.js
export class Cart {
  constructor() {
    this.items = [];
    this.VAT = 1.22;
  }

  //Võta kõik ostukorvi tooted
  getAllProducts() {
    return this.items;
  }

  // Lisa toode ostukorvi või suurenda kogust
  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.displayTotalItems();
  }

  // Uuenda toote kogust
  updateProductQuantity(productId, delta) {
    const item = this.items.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = delta > 0 ? delta : 1; // Vähemalt 1 toode
    }

    if (delta <= 0) {
      this.removeProduct(productId);
    }

    this.displayTotalItems();
    displayCartView();
  }

  // Eemalda toode ostukorvist ID järgi

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayTotalItems();
  }

  // Kogu ostukorvi hind
  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  calculateTotalWithoutVAT() {
    return this.calculateTotal() / this.VAT;
  }

  calculateTotalVAT() {
    return this.calculateTotal() - this.calculateTotalWithoutVAT();
  }

  // Toodete koguarv
  displayTotalItems() {
    const cartCout = document.getElementById("cart-count");

    cartCout.innerHTML = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Ostukorvi tühjendamine
  clear() {
    this.items = [];
    this.displayTotalItems();
    displayCartView();
  }
}

export const cartConstructor = new Cart();
