import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery,
  setCart, getCart } from '../services/api';

class SearchHome extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      listItems: [],
      listProducts: [],
      listCart: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryList();
    const listLocalStorage = getCart();
    this.setState({
      listCart: ((listLocalStorage !== null && listLocalStorage.length > 0)
        ? listLocalStorage : []),
    });
  }

  fetchCategoryList = async () => {
    const categoryList = await getCategories();
    this.setState({ listItems: categoryList });
  };

  handleSearchBtn = async () => {
    const { searchValue } = this.state;
    const getProducts = await
    getProductsFromCategoryAndQuery('', searchValue);
    this.setState({
      listProducts: getProducts.results,
    });
  };

  // Requisito 6
  handleBtnCategoryClick = async (e) => {
    const { target } = e;
    const { results } = await getProductsFromCategoryAndQuery(target.id, '');
    this.setState({ listProducts: results });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  redirect = () => {
    const { history } = this.props;
    // const { listCart } = this.state;
    // setCart(listCart);
    history.push('/shoppingcart');
  };

  redirectDetails = (e) => {
    const { history } = this.props;
    const { target: { name } } = e;
    history.push(`/details/${name} `);
  };

  // Requisito 8 - Adiciona o produto ao state (listCart) pelo id (do produto) vindo do botão. Este
  // state poderá ser passado para o componente do carrinho com a finalidade de montar a ser exibida
  // dentro do componente (ShoppingCart).
  addToCart = (e) => {
    const { target: { name } } = e;
    const { title, price, thumbnail } = this.mountCartProduct(name);
    const setLocalStorage = () => {
      const { listCart } = this.state;
      setCart(listCart);
    };
    this.setState((prev) => ({
      listCart: [...prev.listCart, { name, title, price, thumbnail }],
    }), setLocalStorage);
  };

  // Requisito 8 - Monta o objeto a ser inserido no estado, evitando nova requisição da api no carrinho.
  // Dessa forma, tem-se os dados do produto que precisam ser exibidos no carrinho dentro de um único
  // objeto a ser passado via props para o componente do carrinho. Faltando apenas computar a quantida
  // de do produto.
  mountCartProduct = (productId) => {
    const { listProducts } = this.state;
    return listProducts.filter((product) => product.id === productId)[0];
  };

  render() {
    const {
      searchValue,
      listItems,
      listProducts,
    } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            type="text"
            name="searchValue"
            id="search"
            value={ searchValue }
            onChange={ this.handleInput }
            data-testid="query-input"
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleSearchBtn }
        >
          Pesquisar
        </button>
        <div>
          {listItems.map((list, index) => (
            <button
              key={ index }
              id={ list.id }
              type="button"
              data-testid="category"
              onClick={ this.handleBtnCategoryClick }
            >
              {list.name}
            </button>
          ))}
        </div>
        <div>
          {listProducts.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : (
              <div>
                {listProducts.map((product, index) => (
                  <div
                    data-testid="product"
                    key={ index }
                  >
                    <span>{product.title}</span>
                    <img src={ product.thumbnail } alt="foto produto" />
                    <span>{ `R$ ${product.price}` }</span>
                    <button
                      type="button"
                      name={ product.id }
                      onClick={ this.redirectDetails }
                      data-testid="product-detail-link"
                    >
                      Detalhes...
                    </button>
                    <button
                      type="button"
                      name={ product.id }
                      onClick={ this.addToCart }
                      data-testid="product-add-to-cart"
                    >
                      Adicionar ao carrinho!
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
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
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchHome;
