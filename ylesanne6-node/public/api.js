import { Product } from "./constructors/Product.js";

const BASE_URL = "https://fakestoreapi.com";

//Need kes tahavad ka kuvada Kõik tooted
export const getProductsDataByCategory = async (category) => {
  try {
    const byCategory = category ? `/category/${category}` : "";
    const data = await fetch(`/api/products${byCategory}`);

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
    const data = await fetch("api/products/categories");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const data = await fetch(`api/products/${productId}`);

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
