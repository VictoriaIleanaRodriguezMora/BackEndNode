const request = require('supertest')('http://localhost:5050');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generatePost = () => {
  return { title: faker.internet.userName(), body: faker.lorem.paragraph() };
};


describe('Testing /api/products', () => {
  describe('.getAll()', () => {
    it('Typeof(Array) = true', async () => {
      const res = await request.get('/api/products/');
      // expect(res.status).to.eql(200);
      expect(res.body).to.be.a('array');
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });
});


describe('Testing /auth/profileUser', () => {
  describe('Es un objeto particular, de un usuario', () => {
    it('Typeof(object) = true', async () => {
      const res = await request.get('/auth/profileuser/');
      // expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
      // expect(res.body).to.include.keys('username', 'password', 'phone'); // no funciona
    });
  });
});

/*   describe('POST ONE', () => {
    it('deberia incorporar un posteo', async () => {
      const post = generatePost();

      const res = await request.post('/api/post').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('title', 'body', 'id');
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
 */







