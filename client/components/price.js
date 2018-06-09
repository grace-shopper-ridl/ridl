import React from 'react';

const Price = props => {
  return <p>${props.product.price / 100}</p>;
};

export default Price;
