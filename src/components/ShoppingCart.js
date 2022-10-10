import { object } from 'prop-types';
import React from 'react';
import { getCart, setCart } from '../services/api';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.setState({ cart: this.getUniqueItems() });
  }

  componentDidUpdate() {
   // this.setState({ cart: this.getUniqueItems() });
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

  increaseProduct = ({ target }) => {
    const{ name } = target
    const lista = getCart() 
   const product = lista.find((product) => product.title === name)
  const lista2 =[...lista, { name: product.name, title: product.title, price: product.price, thumbnail: product.thumbnail }]
  setCart(lista2) 
  this.setState({ cart: this.getUniqueItems() });
  //console.log(lista)
  //console.log(lista2)
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
              <button type="button" data-testid="remove-product">X</button>
              <span data-testid="shopping-cart-product-name">{product.title}</span>
              <img src={ product.thumbnail } alt="foto produto" />
              <span>{ `R$ ${product.price}` }</span>
              <button data-testid="product-decrease-quantity">remover</button>
              <span data-testid="shopping-cart-product-quantity">
                { `Un: ${product.unit}` }
              </span>
              <button 
              name={ product.title }
              data-testid="product-increase-quantity"
              onClick={ this.increaseProduct }
              >adicionar</button>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
