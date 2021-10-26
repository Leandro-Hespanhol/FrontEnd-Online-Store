import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Cart.css';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    const { location: { state: { cartList } } } = this.props;

    this.state = {
      cartList,
      items: [...new Set(cartList)],
    };
  }

  render() {
    const { items, cartList } = this.state;
    return (
      <div className="body-cart-container">
        <header><h1>Seu Carrinho</h1></header>
        <div className="cart-item-list">
          { (cartList.length === 0)
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              items.map((item) => (
                <div
                  key={ item.id }
                  data-testid="shopping-cart-product-name"
                  className="cart-item"
                >
                  <h4>{ item.title }</h4>
                  <img
                    src={ item.thumbnail }
                    alt={ item.title }
                    className="img-item-cart"
                  />
                  <p>{`Preço: R$${item.price}`}</p>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${
                      cartList.filter(({ id }) => id === item.id).length
                    }`}
                  </p>
                </div>
              )))}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
