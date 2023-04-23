const request = require("supertest")("http://localhost:5050");
const expect = require("chai").expect;

// categoria
const categorias = ["categoria", "categoria1", "categoria2"]
let numRandom = Math.floor(Math.random() * 3)



/* PRODUCTOS */
// GET ALL 
describe("GET ALL /api/products", () => {
    describe(".getAll()", async () => {
        it("Array de objetos. Se valida que tengan el formato de un producto", async () => {
            const res = await request.get("/products/stock");
            expect(res.body).to.be.a("array");
            const toExpect = await (res.body).map((e) => {
                expect(e).to.be.a("object")
                expect(e).to.include.keys("_id", "title", "price", "thumbnail", "date", "categoria");
            })

            return await toExpect
        });
    });
});

// GET ONE
/* describe("GET ONE /products/:id", () => {
    it("Obtener un producto por ID", async () => {
        const res = await request.get("/products/64189cc193cf6f533d3834c3")

        expect(res.body).to.be.a("object");
        expect(res.body).to.include.all.keys("title", "price", "thumbnail", "_id");

    });
}); */

// POST
/* describe("POST ONE /api/products", async () => {
    it("Agregar un producto", async () => {
        let toPost
        const post = await generateURL(1);
        const res = await request.post("/products").send(post)
        expect(post).to.be.a("array");
        const toExpect = await (post).map((e) => {
            expect(e).to.be.a("object")
            expect(e).to.include.all.keys("title", "price", "thumbnail");
        })
        return await post
    });
}); */

// DELETE
/* describe("DELETE ONE /api/products", () => {
    it("Agregar un producto", async () => {
        const res = await request.delete("/products/64107abf80e555659b565904")
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys("acknowledged", "deletedCount");
    });
}); */
/* PRODUCTOS */

/* CARRITOS */

// POST
/* describe("POST ONE /api/carritos", () => {
    it("Agregar un carrito", async () => {
        const cart = await generateCarts();
        const res = await request.post("/api/products").send(cart);
        expect(cart).to.be.a("object");
        expect(cart).to.include.keys("title", "products", "date");
        expect(cart["products"]).to.include.keys("price", "photo", "description", "name", "date");
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

