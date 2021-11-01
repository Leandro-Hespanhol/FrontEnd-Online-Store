export function getCart() {
  return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

export function saveCart(cartArray) {
  localStorage.setItem('shoppingCart', JSON.stringify(cartArray));
}
