import { Product } from "./constructors/Product.js";

const BASE_URL = "https://fakestoreapi.com";

// tegime funktsiooni, et fetch'ida andmed json failist
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    const jsonData = data.json();
    const constructedData = jsonData.map(
      (product) =>
        new Product(product.id, product.name, product.price, product.category)
    );
    return constructedData;
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
    const dataObject = productsData.map(
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
    return dataObject;
  } catch (error) {
    console.error(error);
  }
};

// see lahendus on siis, kui sa soovid näidata tooteid ainult kategoorite järgi
export const getProductsByCategory = async (category) => {
  try {
    const data = await fetch(`${BASE_URL}/products/category/${category}`);
    const productsData = await data.json();

    const dataObject = productsData.map(
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
    return dataObject;
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
  console.log("id", productId);
  try {
    const data = await fetch(`${BASE_URL}/products/${productId}`);

    const productData = await data.json();

    console.log(productData);

    const dataObject = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.category,
      productData.description,
      productData.image
    );

    return dataObject;
  } catch (error) {
    console.error(error);
  }
};
