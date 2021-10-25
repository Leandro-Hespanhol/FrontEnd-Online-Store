import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            placeholder="Busca..."
          />
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </p>
        </label>
        <Link to="/cart" data-testid="shopping-cart-button"> Carrinho </Link>
      </div>
    );
  }
}
