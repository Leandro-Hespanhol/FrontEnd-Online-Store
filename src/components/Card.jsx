import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { thumbnail, title, price, id, addToCart, product, cartList } = this.props;
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

        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/ProductDetails/${id}`,
            state: { title, thumbnail, price, product, cartList },
          } }
        >
          Especificações Tecnicas
        </Link>
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
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};
