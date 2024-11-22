// 1. Toodete lisamine e-poodi
// Loo Product klass, mis esindab ühte toodet. Klass peaks sisaldama järgmisi omadusi:
// title - toote nimi (nt "Sülearvuti")
// price - toote hind (nt 999.99)
// category - toote kategooria (nt "Elektroonika")

// Lisaks loo meetod describe(), mis tagastab toote nime, hinna ja kategooria kokkuvõttena.
// Loo staatiline meetod discountedPrice, mis võtab hinna ja allahindlusprotsendi ning tagastab allahinnatud hinna.

class Product {
  constructor(id, name, price, category) {
    this.id = id; // Unikaalne ID
    this.name = name;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `${this.name} - ${this.category} - $${this.price}`;
  }

  static discountedPrice(price, discount) {
    return price - (price * discount) / 100;
  }
}

const laptop = new Product(1, "Sülearvuti", 999.99, "Elektroonika");
console.log(laptop.describe());
console.log("allahindlus", Product.discountedPrice(laptop.price, 10)); // 10% allahindlus

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity) {
    this.items.push({ product, quantity });
  }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

const cart = new Cart();
cart.addProduct(laptop, 2);
console.log("Kokku hind", cart.calculateTotal()); // Kokku hind
console.log("Kokku tooteid ostukorvis", cart.totalItems); // Kokku tooteid ostukorvis

class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log(`Tellimuse kuupäev: ${this.orderDate.toDateString()}`);
    this.cart.items.forEach((item) => {
      console.log(
        `${item.product.name} - $${item.product.price} x ${item.quantity}`
      );
    });
    console.log(`Kogusumma: $${this.cart.calculateTotal()}`);
  }
}

const order = new Order(cart);
order.printOrder();

class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
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
}

const customer = new Customer("Alice");
customer.placeOrder(cart);
customer.printOrderHistory();
