import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchHome extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    };
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  redirect = () => {
    const { history } = this.props;
    console.log(history);
    history.push('/shoppingcart');
  };

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            type="text"
            name="searchValue"
            id="search"
            velue={ searchValue }
            onChange={ this.handleInput }
          />
        </label>
        {searchValue.length <= 0
        && (
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.

          </h4>)}
        <button
          data-testid="shopping-cart-button"
          onClick={ this.redirect }
          type="button"
        >
          Carrinho
        </button>
      </div>
    );
  }
}

SearchHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchHome;
