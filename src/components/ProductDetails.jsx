import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const { location: { state: { product, cartList } } } = this.props;

    this.state = {
      product,
      cartList,
      inputValue: '',
    };
  }

  inputText = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { location: { state: { title, price, thumbnail } } } = this.props;
    const { product, cartList, inputValue } = this.state;
    return (
      <>
        <h4 data-testid="product-detail-name">{title}</h4>
        <img src={ thumbnail } alt={ `foto ${title}` } />
        <p>{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.setState({ cartList: [...cartList, product] }) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          data-testid="shopping-cart-button"
          to={ {
            pathname: '/cart',
            state: { cartList },
          } }
        >
          Carrinho
        </Link>
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
