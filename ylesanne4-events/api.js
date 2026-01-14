import { Product } from "./constructors/Product.js";

// tegime funktsiooni, et fetch'ida andmed json failist
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    const jsonData = await data.json();
    const constructedData = jsonData.map(
      (product) =>
        new Product(product.id, product.name, product.price, product.category)
    );
    return constructedData;
  } catch (error) {
    console.error(error);
  }
};
