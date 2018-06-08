import { expect } from 'chai';
import PropTypes from 'prop-types'
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cart from './cart';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Cart', () => {
  let testCart;
  let cartProp = {
    id: 1,
    orderNumber: 44408,
    status: 'cart',
    subTotal: null,
    createdAt: '2018-06-08T21:18:29.204Z',
    updatedAt: '2018-06-08T21:18:29.204Z',
    userId: 1,
    lineItems: [
      {
        id: 1,
        qty: 3,
        price: '60',
        createdAt: '2018-06-08T21:20:02.182Z',
        updatedAt: '2018-06-08T21:20:02.182Z',
        productId: 7,
        orderId: 1,
        product: {
          id: 7,
          name: 'Carlo Rossi California Red',
          description:
            'Origin: USA, Region Not Specified. Tasting note: Pale ruby colour; mildly fruity nose displaying mild currant and berry fruit; light, crisp berry flavours. Serving suggestion: Picnic fare; grilled calamari.',
          price: '2795',
          inventory: 8451,
          image:
            'https://dx5vpyka4lqst.cloudfront.net/products/280644/images/full.jpeg',
          createdAt: '2018-06-08T21:06:44.652Z',
          updatedAt: '2018-06-08T21:06:44.652Z'
        }
      },
      {
        id: 2,
        qty: 1,
        price: '12.97',
        createdAt: '2018-06-08T21:20:02.182Z',
        updatedAt: '2018-06-08T21:20:02.182Z',
        productId: 10,
        orderId: 1,
        product: {
          id: 10,
          name: 'Jackson-Triggs Cabernet Sauvignon Bag in Box',
          description:
            'Origin: Canada, Region Not Specified. Tasting note: Light to medium ruby garnet colour; dry and medium bodied with lively crisp cassis berry character and very light tannins.. Serving suggestion: Serve with grilled meats, cheeses and savoury appetizers.',
          price: '4495',
          inventory: 5945,
          image:
            'https://dx5vpyka4lqst.cloudfront.net/products/270884/images/full.jpeg',
          createdAt: '2018-06-08T21:06:44.653Z',
          updatedAt: '2018-06-08T21:06:44.653Z'
        }
      },
      {
        id: 3,
        qty: 7,
        price: '0.99',
        createdAt: '2018-06-08T21:20:02.182Z',
        updatedAt: '2018-06-08T21:20:02.182Z',
        productId: 1,
        orderId: 1,
        product: {
          id: 1,
          name: 'Peller Estates French Cross Red Bag in Box',
          description:
            'Origin: Canada, Region Not Specified. Tasting note: Medium ruby colour; gentle berry and plum aromas; medium-bodied with berry/cherry flavours. Serving suggestion: Veal chops, veal, pasta dishes.',
          price: '3595',
          inventory: 8843,
          image:
            'https://dx5vpyka4lqst.cloudfront.net/products/589069/images/full.jpeg',
          createdAt: '2018-06-08T21:06:44.651Z',
          updatedAt: '2018-06-08T21:06:44.651Z'
        }
      }
    ]
  };

  beforeEach(() => {
    Cart.propTypes = {
      cart: PropTypes.object.isRequired
    }
    testCart = shallow(<Cart cart={cartProp} />);
  });
  it('to have 3 lineItem divs', () => {
    expect(testCart.find('div.lineItem')).to.have.length(3);
  });

});
