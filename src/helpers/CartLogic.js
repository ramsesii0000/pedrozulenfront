export function removeFromCart(cart, bookId) {
    const updatedCart = cart.filter((book) => book.idBook !== bookId);
    return updatedCart;
}

export function countBooksInCart(cart) {
    return cart.length;
}

