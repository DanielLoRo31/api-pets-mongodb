import { Schema, model } from 'mongoose'

const Pet = new Schema(
  {
    nombre: String,
    raza: String,
    edad: Number,
    color: String,
    descripcion: String,
  },
  {
    strict: true,
    collection: 'Pets',
  },
)

export default model('Pet', Pet)
