import React from 'react';
import PropTypes from 'prop-types';
import { getCart, setCart } from '../services/api';

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

  increaseProduct = ({ target }) => {
    const { name } = target;
    const lista = getCart();
    const product = lista.find((item) => item.title === name);
    const lista2 = [...lista, { name: product.name,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail }];
    setCart(lista2);
    this.setState({ cart: this.getUniqueItems() });
  };

  finalizePurchase = () => {
    const { history } = this.props;
    return history.push('/checkout');
  };

  decreaseProduct = ({ target }) => {
    const { name } = target;
    const lista = getCart();
    /*     const diferentProduct = lista.filter((item) => item.title !== name); */
    const equalProduct = (lista.filter((item) => item.title === name));
    if (equalProduct.length > 1) {
      let check = 0;
      lista.forEach((_, index) => {
        const negative = (lista.length - 1) - index; // realiza a contagem do index do maior número para o menor.
        if (lista[negative].title === name && check < lista.length) { // quando a condição entra no if, torna o valor do check igual ao tamanho do LISTA.
          check = lista.length;
          lista.splice(negative, 1); // Ao remover um item do lista a condição não será cumprida, encerrando assim o loop.
        }
      });
      setCart(lista);
      this.setState({ cart: this.getUniqueItems() });
    }
  };

  removeProduct = ({ target }) => {
    const { name } = target;
    const lista = getCart();
    const diferentProduct = lista.filter((item) => item.title !== name);
    setCart(diferentProduct);
    this.setState({ cart: this.getUniqueItems() });
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
              <button
                type="button"
                data-testid="remove-product"
                name={ product.title }
                onClick={ this.removeProduct }
              >
                X

              </button>
              <span data-testid="shopping-cart-product-name">{product.title}</span>
              <img src={ product.thumbnail } alt="foto produto" />
              <span>{ `R$ ${product.price}` }</span>
              <button
                data-testid="product-decrease-quantity"
                name={ product.title }
                onClick={ this.decreaseProduct }
                type="button"
              >
                remover

              </button>
              <span data-testid="shopping-cart-product-quantity">
                { `Un: ${product.unit}` }
              </span>
              <button
                name={ product.title }
                data-testid="product-increase-quantity"
                onClick={ this.increaseProduct }
                type="button"
              >
                adicionar

              </button>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.finalizePurchase }
        >
          Finalizar Compra

        </button>
      </div>
    );
  }
}
ShoppingCart.propTypes = ({
  history: PropTypes.shape,
}).isRequired;

export default ShoppingCart;
