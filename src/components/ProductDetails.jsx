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
    };
  }

  render() {
    const { location: { state: { title, price, thumbnail } } } = this.props;
    const { product, cartList } = this.state;
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
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetails;
