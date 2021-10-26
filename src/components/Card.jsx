import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default class Card extends Component {
  render() {
    const { thumbnail, title, price, id, addToCart } = this.props;
    return (
      <div data-testid="product" className="product-container">
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } className="img-card" />
        <p>{`Preço: R$${price}`}</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          id={ id }
          onClick={ addToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};
