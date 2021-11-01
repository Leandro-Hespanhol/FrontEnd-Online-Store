import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCart, saveCart } from '../services/storage';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const { location: { state: { product } } } = this.props;
    const cartList = getCart();

    this.state = {
      product,
      cartList,
      inputValue: '',
    };
  }

  inputText = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  saveToCart = () => {
    const { cartList, product } = this.state;
    saveCart([...cartList, product]);
    this.setState({ cartList: [...cartList, product] });
  }

  render() {
    const { product, cartList, inputValue } = this.state;
    const { title, price, thumbnail, shipping: { free_shipping: free } } = product;
    return (
      <>
        <h4 data-testid="product-detail-name">{title}</h4>
        <img src={ thumbnail } alt={ `foto ${title}` } />
        <p>{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.saveToCart }
        >
          Adicionar ao Carrinho
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <span data-testid="shopping-cart-size">
          { cartList.length }
        </span>
        <p
          data-testid={ free && 'free-shipping' }
        >
          { free && 'free-shipping' }
        </p>
        <form>
          <textarea
            data-testid="product-detail-evaluation"
            value={ inputValue }
            name="inputValue"
            onChange={ this.inputText }
          />
          <button
            type="button"
          >
            Enviar
          </button>
        </form>
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetails;
