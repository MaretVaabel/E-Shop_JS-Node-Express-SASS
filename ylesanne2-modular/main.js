// main.js
import { Product } from "./Product.js";
import { Cart } from "./Cart.js";
import { Customer } from "./Customer.js";

// Loo mõned tooted
const laptop = new Product("Sülearvuti", 999.99, "Elektroonika");
const phone = new Product("Telefon", 599.99, "Elektroonika");

// Loo ostukorv ja lisa tooted
const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

// Kuvage ostukorvi summa ja toodete arv
console.log("Kogusumma:", cart.calculateTotal());
console.log("Kokku tooteid ostukorvis:", cart.totalItems);

// Loo klient ja esita tellimus
const customer = new Customer("Alice");
customer.placeOrder(cart);

// Kuvage tellimuste ajalugu
customer.printOrderHistory();
