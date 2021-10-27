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

  incrementProduct = ({ target: { id } }) => {
    const { cartList } = this.state;
    const addProduct = cartList.find((elem) => elem.id === id);
    this.setState({ cartList: [...cartList, addProduct] });
  }

  decrementProduct = ({ target: { id } }) => {
    const { cartList, items } = this.state;
    const removeProduct = cartList.find((elem) => elem.id === id);
    const productList = cartList.filter((elem) => elem.id === id);
    cartList.splice(cartList.indexOf(removeProduct), 1);
    if (productList.length < 2) {
      items.splice(items.indexOf(removeProduct), 1);
      this.setState({ items });
    }

    this.setState({ cartList: [...cartList] });
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
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.incrementProduct }
                    id={ item.id }
                  >
                    +
                  </button>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${
                      cartList.filter(({ id }) => id === item.id).length
                    }`}
                  </p>
                  <div>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ this.decrementProduct }
                      id={ item.id }
                    >
                      -
                    </button>
                  </div>
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
