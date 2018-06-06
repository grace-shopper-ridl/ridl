const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a product successfully', () => {
    Product.create({
      name: 'peanut',
      description: 'this is a peanut',
      price: 5.00,
      inventory: 20
    })
    .then(peanut => {
      expect(peanut).should.be.an('object');
    })
    .catch(console.error);
  })
});
