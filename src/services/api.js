export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = result.json();
  return data;
}
