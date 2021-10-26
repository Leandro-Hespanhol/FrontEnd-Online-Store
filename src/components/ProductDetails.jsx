import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  render() {
    const { location: { state: { title, price, thumbnail } } } = this.props;
    return (
      <>
        <h2 data-testid="product-detail-name">{title}</h2>
        <p>{price}</p>
        <img src={ thumbnail } alt={ `foto ${title}` } />
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetails;
