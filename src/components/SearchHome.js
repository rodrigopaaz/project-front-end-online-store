import React, { Component } from 'react';

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
      </div>
    );
  }
}

export default SearchHome;
