import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default class Card extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div data-testid="product" className="product-container">
        <h3>{ title }</h3>
        <img src={ thumbnail } alt={ title } className="img-card" />
        <p>{`Preço: R$${price}`}</p>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
