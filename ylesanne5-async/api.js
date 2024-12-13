import { Product } from "./constructors/Product.js";

const BASE_URL = "https://fakestoreapi.com";

// tegime funktsiooni, et fetch'ida andmed json failist
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

//Need kes tahavad ka kuvada Kõik tooted
export const getProductsDataByCategoy = async (category = "All products") => {
  try {
    const byCategory =
      category !== "All products" ? `/category/${category}` : "";
    const data = await fetch(`${BASE_URL}/products${byCategory}`);

    const productsData = await data.json();
    const dataOject = productsData.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
    return dataOject;
  } catch (error) {
    console.error(error);
  }
};

// see lahendus on siis, kui sa soovid näidata tooteid ainult kategoorite järgi
export const getProductsByCategory = async (category) => {
  try {
    const data = await fetch(`${BASE_URL}/products/category/${category}`);
    const productsData = await data.json();

    const dataOject = productsData.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
    return dataOject;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategory = async () => {
  try {
    const data = await fetch(`${BASE_URL}/products/categories`);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const data = await fetch(`${BASE_URL}/products/${productId}`);

    const productData = await data.json();
    const dataOject = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.category,
      productData.description,
      productData.image
    );

    return dataOject;
  } catch (error) {
    console.error(error);
  }
};
