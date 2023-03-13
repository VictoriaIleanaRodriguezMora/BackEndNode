const request = require('supertest')('http://localhost:5050');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const { generateURL } = require("../SERVICIO/FAKER/utilitiesFAKER")

/* POST PRODUCTOS */
describe('GET ALL /api/products', () => {
    describe('.getAll()', () => {
        it('Array de objetos. Se valida que tengan el formato de un producto', async () => {
            const res = await request.get('/api/products/');
            expect(res.body).to.be.a('array');
            const toExpect = (res.body).map((e) => {
                expect(e).to.be.a('object')
                expect(e).to.include.all.keys('title', 'price', 'thumbnail', '_id');
            })
            return toExpect
        });
    });
});

/* POST PRODUCTOS */
describe('POST ONE /api/products', () => {
    it('Agregar un producto', async () => {
        const post = generateURL();
        const res = await request.post('/api/products').send(post);
        expect(post).to.be.a('array');
        expect(post[0]).to.include.keys('title', 'price', 'thumbnail');
        // expect(res.body[0]).to.include.keys('title', 'price', 'thumbnail');
    });
});

/* POST CARRITOS */
describe('POST ONE /api/carritos', () => {
    it('Agregar un producto', async () => {
        const post = generateURL();
        const res = await request.post('/api/products').send(post);
        expect(post).to.be.a('array');
        expect(post[0]).to.include.keys('title', 'price', 'thumbnail');
    });
});

/* PROFILE USER */
describe('GET /auth/profileUser', () => {
    describe('Es el objeto particular, del usuario con sus datos', () => {
        it('Valida los campod del objeto de info del usuario', async () => {
            const res = await request.get('/auth/profileuser/');

            expect(res.body).to.be.a('object');
            let user
            for (const key in res.body) {
                user = expect(res.body[key]).to.include.keys('username', 'password', 'phone', 'adress', 'age', 'avatar', 'gmail');
            }
            return user
        });
    });
});

/* FAKER */
describe('FAKER', () => {
    describe('ARRAY de OBJ FAKER', () => {
        it('Arreglo de objetos', async () => {
            const res = await request.get('/faker');
            expect(res.body).to.be.a('array');
            const toExpect = (res.body).map((e) => {
                expect(e).to.be.a('object')
                expect(e).to.include.all.keys('title', 'price', 'thumbnail');
            })
            return toExpect
        });
    });
});

