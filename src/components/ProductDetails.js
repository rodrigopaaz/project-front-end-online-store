import React from 'react';
import Proptypes from 'prop-types';
import { getCart, getProductById, setCart } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const result = await getProductById(await this.getProductIdFromProps());
    this.setState({ product: result });
  }

  getProductIdFromProps = async () => {
    const {
      match: {
        params:
          { id },
      },
    } = this.props;
    return id;
  };

  redirect = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
  };

  // Requisito 9
  addToCart = () => {
    const { product: { id, title, price, thumbnail } } = this.state;
    let listCart = getCart();
    if (listCart !== null ) {
      listCart = [ ...listCart, { name: id, title, price, thumbnail }];
    } else {
      listCart = [{ name: id, title, price, thumbnail }];
    }
    setCart(listCart);
  };

  render() {
    const { product } = this.state;
    return (
      <div
        data-testid="product"
      >
        <span data-testid="product-detail-name">{ product.title }</span>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt="foto produto"
        />
        <span data-testid="product-detail-price">{ product.price }</span>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
        >
          Adicionar ao carrinho...
        </button>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.redirect }
        >
          Ver meu carrinho...
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }),
  }).isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default ProductDetails;
