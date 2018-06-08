import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cart } from './cart';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Cart', () => {
  let testCart;
  let cartProp = [
    { id: 1, lineItems: [{id: 1}, {id: 2}, {id: 3}] },
    { id: 2, lineItems: [{id: 4}, {id: 5}, {id: 6}] },
    { id: 3, lineItems: [{id: 7}, {id: 8}, {id: 9}] }
  ];

  beforeEach(() => {
    testCart = shallow(<Cart cart={cartProp} />);
  });
  it('has cart array as prop', () => {
    //   expect(testCart.props.cart.to.be.an('array'))
  })
});
