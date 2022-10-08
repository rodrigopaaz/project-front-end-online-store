import React from 'react';
import { getCart } from '../services/api';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.setState({ cart: this.getUniqueItems() });
  }

  getUniqueItems = () => {
    let cart2 = getCart();
    const lista = {};
    cart2 = cart2 === null ? [] : cart2;
    cart2.forEach((element) => {
      if (lista[element.title] !== undefined) {
        lista[element.title] = {
          ...element,
          unit: lista[element.title].unit + 1 };
      } else {
        lista[element.title] = { ...element, unit: 1 };
      }
    });
    return Object.values(lista);
  };

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
              <span data-testid="shopping-cart-product-quantity">
                { `Un: ${product.unit}` }
              </span>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
