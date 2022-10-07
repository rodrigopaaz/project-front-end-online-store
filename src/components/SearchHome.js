import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class SearchHome extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      listItems: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryList();
  }

  fetchCategoryList = async () => {
    const categoryList = await getCategories();
    this.setState({ listItems: categoryList });
  };

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
    const { searchValue, listItems } = this.state;
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
        {listItems.map((list, index) => (
          <button
            key={ index }
            type="button"
            data-testid="category"
          >
            {list.name}

          </button>
        ))}
      </div>
    );
  }
}

SearchHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchHome;
