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
    const { cart } = this.state;
    console.log(cart);
    const { name } = target;
    const lista = getCart();
    let lista2 = [];
    const product = lista.find((item) => item.title === name);
    const productLength = lista.filter((item) => item.title === name);
    if (productLength.length < product.availableQuantity) {
      lista2 = [...lista, { name: product.name,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        availableQuantity: product.availableQuantity,
      }];
    } else {
      lista2 = lista;
    }
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
    const diferentProduct = lista.filter((item) => item.title !== name);
    let equalProduct = (lista.filter((item) => item.title === name));
    if (equalProduct.length > 1) {
      equalProduct = (lista.filter((item) => item.title === name)).slice(1);
      const removeFromLocalStorage = [...equalProduct, ...diferentProduct];
      setCart(removeFromLocalStorage);
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
