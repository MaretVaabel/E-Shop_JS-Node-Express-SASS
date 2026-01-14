import { Product } from "./constructors/Product.js";

//Need kes tahavad ka kuvada Kõik tooted
export const getProductsDataByCategory = async (category) => {
  try {
    // MUUDATUS: Lisame query parameetri otse URL-i lõppu
    const url =
      category && category !== "all"
        ? `/api/products?category=${encodeURIComponent(category)}`
        : "/api/products";

    const data = await fetch(url);

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
    const data = await fetch("/api/categories");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const data = await fetch(`/api/products/${productId}`);

    const productData = await data.json();

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

export const getFavoritesProductByuserID = async (userID) => {
  try {
    const data = await fetch(`/api/favorites/${userID}`);

    const productsData = await data.json();

    console.log("lemmikud", productsData);

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
export const addFavoriteProductById = async (userID, productId) => {
  try {
    const data = await fetch(`/api/favorites/${userID}/${productId}`, {
      method: "POST",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavoriteProductById = async (userID, productId) => {
  try {
    const data = await fetch(`/api/favorites/${userID}/${productId}`, {
      method: "DELETE",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.error(error);
  }
};
