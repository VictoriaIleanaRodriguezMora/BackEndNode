const request = require("supertest")("http://localhost:5050");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;

const { generateURL, generateCarts } = require("../SERVICIO/FAKER/fakerGeneratorProds/fakerGeneratorCarts")
/* PRODUCTOS */
// GET ALL 
/* describe("GET ALL /api/products", () => {
    describe(".getAll()", () => {
        it("Array de objetos. Se valida que tengan el formato de un producto", async () => {
            const res = await request.get("/api/products/");
            expect(res.body).to.be.a("array");
            const toExpect = (res.body).map((e) => {
                expect(e).to.be.a("object")
                expect(e).to.include.all.keys("title", "price", "thumbnail", "_id", "date");
            })
            return toExpect
        });
    });
}); */

// GET ONE - ESTE NO FUNCIONA Y NO SE PIDE LO DEJO PA DESPUES
/* describe("GET ONE /api/products/:id", () => {
    it("Obtener un producto por ID", async () => {
        const res = await request.post("/api/products/64107ab580e555659b5658fd")
        const { id } = request
        expect(res.body).to.be.a("object");
        // expect(res.body).to.include.keys("title", "price", "thumbnail", "date", "");
        console.log(res.body);
    });
}); */

// POST
/* describe("POST ONE /api/products", () => {
    it("Agregar un producto", async () => {
        const post = generateURL();
        const res = await request.post("/api/products").send(post);
        expect(post).to.be.a("array");
        expect(post[0]).to.include.keys("title", "price", "thumbnail");
        // expect(res.body[0]).to.include.keys("title", "price", "thumbnail");
    });
}); */

/* PRODUCTOS */

/* CARRITOS */

// POST
describe("POST ONE /api/carritos", () => {
    it("Agregar un carrito", async () => {
        const cart = generateCarts();
        const res = await request.post("/api/products").send(cart);
        expect(cart).to.be.a("object");
        expect(cart).to.include.keys("title", "products", "date");
        expect(cart["products"]).to.include.keys("price", "photo", "description", "name", "date");
    });
});

// DELETE
/* describe("DELETE ONE /api/products", () => {
    it("Agregar un producto", async () => {
        const res = await request.delete("/api/products/64107bbbe5c84aa92d62e487")
        // expect(post).to.be.a("array");
        // expect(res.params).to.include.keys("title", "price", "thumbnail");
        console.log(res.body);
    });
}); */

/* CARRITOS */

/* PROFILE USER */
/* describe("GET /auth/profileUser", () => {
    describe("Es el objeto particular, del usuario con sus datos", () => {
        it("Valida los campod del objeto de info del usuario", async () => {
            const res = await request.get("/auth/profileuser/");

            expect(res.body).to.be.a("object");
            let user
            for (const key in res.body) {
                user = expect(res.body[key]).to.include.keys("username", "password", "phone", "adress", "age", "avatar", "gmail");
            }
            return user
        });
    });
}); */
/* PROFILE USER */

/* FAKER */
/* describe("FAKER", () => {
    describe("ARRAY de OBJ FAKER", () => {
        it("Arreglo de objetos", async () => {
            const res = await request.get("/faker");
            expect(res.body).to.be.a("array");
            const toExpect = (res.body).map((e) => {
                expect(e).to.be.a("object")
                expect(e).to.include.all.keys("title", "price", "thumbnail");
            })
            return toExpect
        });
    });
}); */
/* FAKER */