const chai = require('chai');
const { expect } = chai;
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  before(() => {
    return db.sync({ force: true });
  });

  let peanut;
  beforeEach(() => {
    return Product.create({
      name: 'peanut',
      description: 'this is a peanut',
      price: 5.0,
      inventory: 20
    })
      .then(created => {
        peanut = created;
      })
      .catch(console.error);
  });

  it('creates a product successfully', () => {
    expect(peanut).to.be.an('object');
  });

  it('has a name', () => {
    expect(peanut.name).to.be.a('string');
    expect(peanut.name).to.equal('peanut');
  });

  it('throws an error if price is not a number', () => {
    Product.build({
      name: 'cashew',
      description: 'blah blah',
      price: 'HA!',
      inventory: 1
    })
      .validate()
      .then(
        () => {
          throw new Error('price must be a number.');
        },
        result => {
          expect(result).to.be.an.instanceOf(Error);
        }
      );
  });
});
