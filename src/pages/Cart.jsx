import React, { Component } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { getCart, saveCart } from '../services/storage';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    const cart = getCart();
    // hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const uniques = [...new Map(cart.map((item) => [item.id, item])).values()];
    this.state = {
      cartList: cart,
      items: uniques,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.initialTotalPrice();
  }

  initialTotalPrice = () => {
    let { totalPrice } = this.state;
    const { cartList } = this.state;
    cartList.forEach((elem) => {
      (this.setState({ totalPrice: totalPrice += elem.price }));
    });
  }

  incrementProduct = ({ target: { id } }) => {
    const { cartList, totalPrice } = this.state;
    const addProduct = cartList.find((elem) => elem.id === id);
    saveCart([...cartList, addProduct]);
    this.setState({ cartList: [...cartList, addProduct] });
    this.setState({
      totalPrice: parseFloat((totalPrice + addProduct.price).toFixed(2)),
    });
  }

  decrementProduct = ({ target: { id } }) => {
    const { cartList, items, totalPrice } = this.state;
    const removeProduct = cartList.find((elem) => elem.id === id);
    const productList = cartList.filter((elem) => elem.id === id);
    cartList.splice(cartList.indexOf(removeProduct), 1);
    if (productList.length < 2) {
      items.splice(items.indexOf(removeProduct), 1);
      this.setState({ items });
    }
    saveCart([...cartList]);
    this.setState({ cartList: [...cartList] });
    this.setState({
      totalPrice: parseFloat((totalPrice - removeProduct.price).toFixed(2)),
    });
  }

  render() {
    const { items, cartList, totalPrice } = this.state;
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
        <p>
          Total: R$
          { totalPrice }
        </p>
        <p>
          {`Itens ${cartList.length}`}
        </p>
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          <button type="button">Finalizar compra</button>
        </Link>
      </div>
    );
  }
}
