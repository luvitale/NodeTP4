import Joi from 'joi'

const validate = product => {
  const productSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().min(0.01).required(),
    descripcion: Joi.string().required(),
    foto: Joi.string().uri().required()
  })

  const { error } = productSchema.validate(product)
  return error ? { result: false, error } : { result: true }
}

export default {
  validate
}