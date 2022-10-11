export async function getCategories() {
  const categories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(categories);
  return result.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query === undefined) {
    const categoryIdAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const result = await fetch(categoryIdAPI);
    return result.json();
  }
  if (query && categoryId === undefined) {
    const queryAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const result = await fetch(queryAPI);
    return result.json();
  }
  const queryAndCategoryAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(queryAndCategoryAPI);
  return result.json();
}

export async function getProductById(productId) {
  const result = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  return result.json();
}

export function getCart() {
  return JSON.parse(localStorage.getItem('cart'));
}

export function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getReviews() {
  return JSON.parse(localStorage.getItem('reviews'));
}

export function setReviews(productId, reviews) {
  localStorage.setItem(productId, JSON.stringify(reviews));
}
