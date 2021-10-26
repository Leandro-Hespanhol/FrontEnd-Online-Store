import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        {
          items.map((item) => (
            <div
              key={ item.id }
              data-testid="shopping-cart-product-name"
            >
              <h4>{ item.title }</h4>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{`Preço: R$${item.price}`}</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {`Quantidade: ${
                  cartList.filter(({ id }) => id === item.id).length
                }`}
              </p>
            </div>
          ))
        }
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
