export async function getCategories() {
  const categories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(categories);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query === undefined) {
    const categoryIdAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const result = await fetch(categoryIdAPI);
    const data = await result.json();
    console.log('result', result);
    console.log('data', data);
    return data;
  }
  if (query && categoryId === undefined) {
    const queryAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const result = await fetch(queryAPI);
    const data = await result.json();
    return data;
  }
  const queryAndCategoryAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(queryAndCategoryAPI);
  const data = await result.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
