const request = require('supertest')('http://localhost:5050');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const { generateURL } = require("../SERVICIO/FAKER/utilitiesFAKER")
const obj = [{
    title: "a",
    description: "e",
    thumbnail:"i"
}]

describe('Testing obj', () => {
    describe('Ehhhhhhhhhhh', () => {
        it('campos', async () => {
            const res = await obj
            // expect(res.status).to.eql(200);
            expect(res).to.be.a('array');
            expect(res[0]).to.include.keys('title', 'description', 'thumbnail');
        });
    });
});

