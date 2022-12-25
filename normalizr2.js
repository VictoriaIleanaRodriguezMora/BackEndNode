const { normalize, schema, denormalize } = require('normalizr')

const originalData = {
  id: '999',
  posts: [
    {
      id: '123',
      author: {
        id: '1',
        nombre: 'Pablo',
        apellido: 'Perez',
        DNI: '20442654',
        direccion: 'CABA 123',
        telefono: '1567876547',
      },
      title: 'My awesome blog post',
      comments: [
        {
          message: 'Hola!',
          id: '324',
          commenter: {
            id: '2',
            nombre: 'Nicole',
            apellido: 'Gonzalez',
            DNI: '20442638',
            direccion: 'CABA 456',
            telefono: '1567811543',
          },
        },
        {
          id: '325',
          commenter: {
            id: '3',
            nombre: 'Pedro',
            apellido: 'Mei',
            DNI: '20446938',
            direccion: 'CABA 789',
            telefono: '1567291542',
          },
        },
      ],
    },
    {
      id: '1123',
      author: {
        id: '2',
        nombre: 'Nicole',
        apellido: 'Gonzalez',
        DNI: '20442638',
        direccion: 'CABA 456',
        telefono: '1567811543',
      },
      title: 'My awesome blog post',
      comments: [
        {
          message: 'Hola!',
          id: '1324',
          commenter: {
            id: '1',
            nombre: 'Pablo',
            apellido: 'Perez',
            DNI: '20442654',
            direccion: 'CABA 123',
            telefono: '1567876547',
          },
        },
        {
          id: '1325',
          commenter: {
            id: '3',
            nombre: 'Pedro',
            apellido: 'Mei',
            DNI: '20446938',
            direccion: 'CABA 789',
            telefono: '1567291542',
          },
        },
      ],
    },
    {
      id: '2123',
      author: {
        id: '3',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20446938',
        direccion: 'CABA 789',
        telefono: '1567291542',
      },
      title: 'My awesome blog post',
      comments: [
        {
          message: 'Hola!',
          id: '2324',
          commenter: {
            id: '2',
            nombre: 'Nicole',
            apellido: 'Gonzalez',
            DNI: '20442638',
            direccion: 'CABA 456',
            telefono: '1567811543',
          },
        },
        {
          id: '2325',
          commenter: {
            id: '1',
            nombre: 'Pablo',
            apellido: 'Perez',
            DNI: '20442654',
            direccion: 'CABA 123',
            telefono: '1567876547',
          },
        },
      ],
    },
  ],
}

const user = new schema.Entity('users')

const comment = new schema.Entity('comments', {
  commenter: user,
})

const article = new schema.Entity('articles', {
  author: user,
  comments: [comment],
})

const posts = new schema.Entity('posts', {
  posts: [article],
})

const postNormalize = normalize(originalData, posts)
const JSONpostNormalize = JSON.stringify(postNormalize, null, 2)
// console.log(JSONpostNormalize);

// DESNORMALIZAR
const POSTdesnormalizado = denormalize(
  postNormalize.result,
  posts,
  postNormalize.entities,
)
const JSONdesnormalizado = JSON.stringify(POSTdesnormalizado, null, 2)

// console.log(JSONdesnormalizado)

const lengthDataDesnormalize = JSONdesnormalizado.length
const lengthDataNormalize = JSONpostNormalize.length

console.log(lengthDataDesnormalize, lengthDataNormalize)
