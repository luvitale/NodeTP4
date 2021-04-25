import mongoose from 'mongoose'
import 'mongoose-type-url'

const Schema = mongoose.Schema

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    min: 0.01,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  foto: {
    type: mongoose.SchemaTypes.Url,
    required: true
  }
})

export const product = mongoose.model('productos', productSchema)