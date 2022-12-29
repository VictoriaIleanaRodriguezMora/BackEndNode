const { normalize, schema, denormalize } = require("normalizr");

const originalData = {
  id: "999",
  posts: [
    {
      id: "123",
      author: {
        id: "A1",
        nombre: "P",
        DNI: "20442654",
      },
      title: "B1",
      comments: [
        {
          id: "324",
          commenter: {
            id: "XF2",
            nombre: "N",
            message: "Hola 1",
            DNI: "182677",
          },
        },
        {
          id: "325",
          commenter: {
            id: "FX3",
            nombre: "S",
            message: "Coment 2",
            DNI: "20446938",
          },
        },
      ],
    },
    {
      id: 4321,
      author: {
        id: "A2",
        nombre: "F",
        DNI: "26473140",
      },
      title: "VERDE",
      comments: [
        {
          id: "496",
          commenter: {
            id: "XF2",
            nombre: "N",
            message: "Chau",
            DNI: "182677",
          },
        },
        {
          id: 694,
          commenter: {
            id: "FF3",
            nombre: "J",
            message: "bYE",
            DNI: "X97F",
          },
        },
      ],
    },
  ],
};

const user = new schema.Entity("users"); // no entiendo este que és
const comment = new schema.Entity("comments", {
  commenter: user,
});
// console.log(comment)

const article = new schema.Entity("articles", {
  author: user,
  comments: [comment],
});
// console.log(article)

const posts = new schema.Entity("posts", {
  posts: [article],
});

const postNormalize = normalize(originalData, posts);
// console.log(postNormalize)
const JSONpostNormalize = JSON.stringify(postNormalize, null, 3);
console.log(JSONpostNormalize);

// DESNORMALIZAR
const POSTdesnormalizado = denormalize(
  postNormalize.result,
  posts,
  postNormalize.entities
);
const JSONdesnormalizado = JSON.stringify(POSTdesnormalizado, null, 2);

// console.log(JSONdesnormalizado)

const lengthDataDesnormalize = JSONdesnormalizado.length;
const lengthDataNormalize = JSONpostNormalize.length;

// console.log(lengthDataDesnormalize, lengthDataNormalize)
