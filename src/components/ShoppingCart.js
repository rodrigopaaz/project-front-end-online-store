import React from 'react';
import { getCart } from '../services/api';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  async componentDidMount() {
    const cart = await getCart();
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        { (cart.length > 0)
          ? cart.map((product, index) => (
            <div
              data-testid="product"
              key={ index }
            >
              <span data-testid="shopping-cart-product-name">{product.title}</span>
              <img src={ product.thumbnail } alt="foto produto" />
              <span>{ `R$ ${product.price}` }</span>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
