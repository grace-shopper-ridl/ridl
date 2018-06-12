const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products', () => {
    const products = [
      {
        name: 'Bordeaux',
        description: 'red wine',
        price: 500,
        inventory: 2
      },
      {
        name: 'Pinot Grigio',
        description: 'white wine',
        price: 200,
        inventory: 1
      }
    ];

    beforeEach(() => {
      Product.create(products[0]).then(Product.create(products[1]))
        .then(() => Product.findAll())
        .then(created => {
          products[1].id = created[1].id;
        });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
        });
    });

    it(`GET /api/products/2`, () => {
      return request(app)
        .get(`/api/products/2`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Pinot Grigio');
        });
    });
  });
});
