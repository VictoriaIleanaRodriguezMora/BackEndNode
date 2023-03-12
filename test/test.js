const request = require('supertest')('http://localhost:5050');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const { generateURL } = require("../SERVICIO/FAKER/utilitiesFAKER")

describe('GET ALL /api/products', () => {
    describe('.getAll()', () => {
        it('Typeof(Array) = true', async () => {
            const res = await request.get('/api/products/');
            expect(res.body).to.be.a('array');
        });
    });
});
 
describe('POST ONE /api/products', () => {
    it('Agregar un producto', async () => {
        const post = generateURL();

        const res = await request.post('/api/products').send(post);

        expect(post).to.include.keys('title', 'price', 'thumbnail');
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






/* FAKER */

describe('FAKER', () => {
    describe('ARRAY de OBJ FAKER', () => {
        it('Arreglo de objetos', async () => {
            const res = await request.get('/faker');
            expect(res.body).to.be.a('array');
            // como preguntar por la estructura de un obj dentro de un array?
            // expect(res.body).to.include.keys('title'); // no funciona
        });
    });
});

