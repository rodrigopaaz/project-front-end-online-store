import React from 'react';
import Proptypes from 'prop-types';
import {
  getCart,
  getProductById,
  getReviews,
  setCart,
  setReviews,
} from '../services/api';

class ProductDetails extends React.Component {
  state = {
    product: {},
    protoReview: {},
    reviews: [],
    formError: false,
  };

  async componentDidMount() {
    const result = await getProductById(await this.getProductIdFromProps());
    let reviews = await getReviews(result.id);
    if (reviews === null) {
      reviews = [];
    }
    this.setState({ product: result, reviews });
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
    if (listCart !== null) {
      listCart = [...listCart, { name: id, title, price, thumbnail }];
    } else {
      listCart = [{ name: id, title, price, thumbnail }];
    }
    setCart(listCart);
  };

  // Requisito 11
  handleFormChanges = async (e) => {
    const { target: { name, value } } = e;
    await this.setState((prev) => ({
      protoReview: { ...prev.protoReview, [name]: value },
    }));
  };

  handleReviewBtn = async () => {
    const { product: { id }, protoReview } = this.state;
    if (!this.verifyProtoReview(protoReview)) {
      this.setState({ formError: true });
      return;
    }
    this.setState({ formError: false });
    await this.setState((prev) => ({
      reviews: [...prev.reviews, protoReview],
    }));
    const { reviews } = this.state;
    setReviews(id, reviews);
  };

  verifyProtoReview = (protoReview) => {
    if (!Object.prototype.hasOwnProperty.call(protoReview, 'avaliacao')) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(protoReview, 'rating')) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(protoReview, 'email')) {
      return false;
    }
    const regexFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regexFilter.test(protoReview.email);
  };

  render() {
    const {
      product,
      formError,
      reviews,
      protoReview: {
        email,
        avaliacao,
        rating,
      } } = this.state;
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
        <form onChange={ this.handleFormChanges }>
          <label htmlFor="review-group">
            Avaliação
            <fieldset id="review-group">
              <input type="radio" id="1" value="1" name="rating" data-testid="1-rating" />
              1
              <input type="radio" id="2" value="2" name="rating" data-testid="2-rating" />
              2
              <input type="radio" id="3" value="3" name="rating" data-testid="3-rating" />
              3
              <input type="radio" id="4" value="4" name="rating" data-testid="4-rating" />
              4
              <input type="radio" id="5" value="5" name="rating" data-testid="5-rating" />
              5
            </fieldset>
          </label>
          <label htmlFor="email">
            E-mail
            <input
              data-testid="product-detail-email"
              id="email"
              type="text"
              name="email"
            />
          </label>
          <label htmlFor="avaliacao">
            Comentários
            <textarea
              data-testid="product-detail-evaluation"
              id="avaliacao"
              name="avaliacao"
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleReviewBtn }
          >
            Avaliar
          </button>
        </form>
        { formError && <p data-testid="error-msg">Campos inválidos</p>}
        { reviews.length > 0
          && reviews.map((review, index) => (
            <div
              data-testid="product"
              key={ index }
            >
              <span data-testid="review-card-email">{ review.email }</span>
              <span data-testid="review-card-rating">{ review.rating }</span>
              <span data-testid="review-card-evaluation">{ review.avaliacao }</span>
            </div>
          ))}
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
