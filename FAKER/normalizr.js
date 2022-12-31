const { normalize, schema } = require('normalizr')

const blogpost = {
  id: '1',
  title: 'My blog post',
  description: 'Short blogpost description',
  content: 'Hello world',
  author: {
    id: '1',
    name: 'John Doe',
  },
  comments: [
    {
      id: '1',
      author: 'Rob',
      content: 'Nice post!',
    },
    {
      id: '2',
      author: 'Jane',
      content: 'I totally agree with you!',
    },
  ],
}

// Definimos un esquema de authors
const authorSchema = new schema.Entity('authors')

// Definimos un esquema de comentadores
const commentSchema = new schema.Entity('comments')

// Definimos un esquema de artículos
const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  comments: [commentSchema],
})

const normalizedBlogpost = normalize(blogpost, postSchema)
const JSONnormalizedBlogpost = JSON.stringify(normalizedBlogpost, null, 2)
// console.log(JSONnormalizedBlogpost);

//    const denormalizedBlogpost = denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities);

var matchs = [
  {
    id: 10689,
    sport: 'Tennis',
    players: [
      {
        id: 22,
        name: 'Rafa Nadal',
        country: 'Spain',
        odds: [
          { id: 1, bookie_1: 1.6 },
          { id: 2, bookie_2: 1.61 },
          { id: 3, bookie_3: 1.62 },
        ],
      },
      //   {
      //     id: 23,
      //     name: 'Roger Federer',
      //     country: 'Spain',
      //     odds: [
      //       { id: 4, bookie_1: 2.6 },
      //       { id: 5, bookie_2: 2.61 },
      //       { id: 6, bookie_3: 2.62 },
      //     ],
      //   },
    ],
  },
  {
    id: 12389,
    sport: 'Tennis',
    players: [
      {
        id: 45,
        name: 'Fernando Verdasco',
        country: 'Spain',
        odds: [
          { id: 7, bookie_1: 2.6 },
          { id: 8, bookie_2: 2.61 },
          { id: 9, bookie_3: 2.62 },
        ],
      },
      //   {
      //     id: 65,
      //     name: 'Andy Murray',
      //     country: 'Spain',
      //     odds: [
      //       { id: 10, bookie_1: 1.6 },
      //       { id: 11, bookie_2: 1.61 },
      //       { id: 12, bookie_3: 1.62 },
      //     ],
      //   },
    ],
  },
]

const odd = new schema.Entity('odds')
// console.log(odd);
const player = new schema.Entity('players', { odds: [odd] })
// console.log(player);
const match = new schema.Entity('matchs', { players: [player] })
// console.log(match);
const chatNormalize = normalize(matchs, match)
const jsonchatNormalize = JSON.stringify(chatNormalize, null, 2)

// console.log(jsonchatNormalize);

const arrOrig = [
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
      email: "pepe1@gmail.com"
    },
    id: '',
    text: 'mensaje del usuario',
  },
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
    },
    id: '63ae0d30165cd8e796ac67b3',
    text: 'mensaje del usuario',
  },
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
    },
    id: '63aef77537872f9bbb2483d2',
    text: 'mensaje del usuario',
  },
]

// const users = new schema.Entity('users')

const authors = new schema.Entity('authors')

const manufactorData = new schema.Entity('authors', {
  // users: users,
  authors: { authors },
})

const normalizedDataa = normalize(arrOrig, [manufactorData])

// console.log('Original Data: ', arrOrig);
console.log(JSON.stringify(normalizedDataa, null, 2))
