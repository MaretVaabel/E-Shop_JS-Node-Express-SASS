// Cart.js
export class Cart {
  constructor() {
    this.items = [];
  }

  // addProduct(product, quantity) {
  //   this.items.push({ product, quantity });
  // }

  // removeProduct(productName) {
  //   this.items = this.items.filter((item) => item.product.name !== productName);
  // }

  // get totalItems() {
  //   return this.items.reduce((acc, item) => acc + item.quantity, 0);
  // }

  // calculateTotal() {
  //   return this.items.reduce(
  //     (acc, item) => acc + item.product.price * item.quantity,
  //     0
  //   );
  // }

  // Lisa toode ostukorvi või suurenda kogust
  addProduct(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.name === product.name
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Uuenda toote kogust
  updateProductQuantity(index, delta) {
    if (this.items[index]) {
      this.items[index].quantity += delta;
      if (this.items[index].quantity <= 0) {
        this.removeProduct(index);
      }
    }
  }

  // Eemalda toode ostukorvist
  removeProduct(index) {
    if (this.items[index]) {
      this.items.splice(index, 1);
    }
  }

  // Kogu ostukorvi hind
  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Toodete koguarv
  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Ostukorvi tühjendamine
  clear() {
    this.items = [];
  }
}
