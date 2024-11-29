// Ühe toote detailvaate genereerimine
export const dispalyProductDetailView = (product) => {
  const container = document.getElementById("product-detail");
  container.innerHTML = `
      <h2>${product.name}</h2>
      <p>Kategooria: ${product.category}</p>
      <p>Hind: $${product.price}</p>
      <p>ID: ${product.id}</p>
    `;
};
