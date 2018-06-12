import React from 'react';

const Price = props => {
  return <p className={props.className}>${props.product.price / 100}</p>;
};

export default Price;
