import { Schema, model } from 'mongoose'

const UsuarioSchema = new Schema(
  {
    title: { type: String, required: true, max: 500 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
  },
  { versionKey: false },
)

export const Usuarios = model('usuarios', UsuarioSchema)
