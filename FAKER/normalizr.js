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
console.log(JSONnormalizedBlogpost)

//    const denormalizedBlogpost = denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities);
