const request = require("supertest")("http://localhost:5050");
const expect = require("chai").expect;
const faker = require('faker')
const { internet, commerce } = faker

// categoria
const categorias = ["categoria", "categoria1", "categoria2"]
let numRandom = Math.floor(Math.random() * 3)

async function generateURL(num = 1) {
    let toReturn = []

    for (let i = 0; i < num; i++) {
        let objToRes = await {
            username: "testeo",
            title: await commerce.product(),
            price: await commerce.price(),
            thumbnail: await internet.domainName(),
            categoria: categorias[numRandom],
            date: await new Date().toLocaleString("en-GB")
        }
        await toReturn.push(objToRes)
    }
    console.log(toReturn);
    return await toReturn
}

/* PRODUCTOS */
// GET ALL
describe("GET ALL /products/stock", () => {
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
describe("GET ONE /products/:id", () => {
    it("Obtener un producto por ID", async () => {
        const res = await request.get("/products/6419c9c14f84328b058cd054")

        expect(res.body).to.be.a("object");
        expect(res.body).to.include.all.keys("title", "price", "thumbnail", "_id");

    });
});

// POST
describe("POST ONE /products", async () => {
    it("Agregar un producto", async () => {
        let toPost
        const post = await generateURL(1);
        const res = await request.post("/products/add/one").send(post[0])
        expect(post).to.be.a("array");
        const toExpect = await (post).map((e) => {
            expect(e).to.be.a("object")
            expect(e).to.include.all.keys("title", "price", "thumbnail");
        })
        return await post
    });
});

// DELETE
describe("DELETE ONE /products", () => {
    it("Agregar un producto", async () => {
        const res = await request.delete("/products/6445bfee57d6c1e33762f157")
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys("acknowledged", "deletedCount");
    });
});
/* PRODUCTOS */

/* PROFILE USER */
describe("GET /auth/profileUser", () => {
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
});
/* PROFILE USER */