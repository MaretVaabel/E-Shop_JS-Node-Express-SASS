import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";

//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  const cart = cartConstructor.getAllProducts();
  container.innerHTML = "";

  const cartContainer = document.createElement("div");
  cartContainer.id = "cart";
  cartContainer.className = "cart-container";
  cartContainer.innerHTML = "<h2>Ostukorv</h2>";

  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.className = "cart-items-container";

  if (!cart.length) {
    const cartItemElement = document.createElement("p");
    cartItemElement.innerText = "Ostukorv on tühi";
    cartItemsContainer.append(cartItemElement);
  } else {
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
      <h3>${item.product.name}</h3>
      <p>Hind: $${item.product.price}</p>
      <p>Kogus: ${item.quantity}</p>
    `;

      // Koguse sisestusväli ja nupud
      const quantityContainer = document.createElement("div");
      quantityContainer.className = "quantity-container";

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.onclick = () =>
        cartConstructor.updateProductQuantity(
          item.product.id,
          item.quantity - 1
        );

      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = item.quantity;
      quantityInput.min = 1;
      quantityInput.onchange = (e) =>
        cartConstructor.updateProductQuantity(
          item.product.id,
          parseInt(e.target.value)
        );

      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.onclick = () =>
        cartConstructor.updateProductQuantity(
          item.product.id,
          item.quantity + 1
        );

      quantityContainer.append(decreaseButton);
      quantityContainer.append(quantityInput);
      quantityContainer.append(increaseButton);

      cartItemElement.append(quantityContainer);

      // Eemaldamisnupp
      const removeButton = document.createElement("button");
      removeButton.textContent = "Eemalda";
      removeButton.onclick = () => {
        cartConstructor.removeProduct(item.product.id);
        displayCartView();
      };

      cartItemElement.append(removeButton);

      cartItemsContainer.append(cartItemElement);
    });
  }

  cartContainer.append(cartItemsContainer);

  //Lisa summade kokkuvõte
  const cartSummeryContainer = document.createElement("div");
  cartSummeryContainer.className = "cart-summery";

  cartSummeryContainer.innerHTML = `
   <h2>Kokkuvõte</h2>
   <div class="summery">
   <p>Toodete hind kokku</p>
   <p>${cartConstructor.calculateTotal().toFixed(2)}</p>
   <p>Kokku ilma km</p>
   <p>${cartConstructor.calculateTotalWithoutVAT().toFixed(2)}</p>
   <p>Käibemaks</p>
   <p>${cartConstructor.calculateTotalVAT().toFixed(2)}</p>
   <p>Kokku</p>
   <p>${cartConstructor.calculateTotal().toFixed(2)}</p>
   </div> 
   `;

  const submitButton = document.createElement("button");
  submitButton.textContent = "Osta";
  submitButton.onclick = (e) => {
    e.stopPropagation(); // see ei lase parent'i tegevusi teha, ehk ei liigu detail vaatesse
    customerConstructor.placeOrder(cartConstructor);
  };

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Tühista ostukorv";
  cancelButton.onclick = () => {
    cartConstructor.clear();
  };
  cartSummeryContainer.append(submitButton, cancelButton);
  container.append(cartContainer, cartSummeryContainer);
};
