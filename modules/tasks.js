import { product as productModel } from '../models/products.js'
import productValidation from '../validations/products.js'

const receiveAndProcessProduct = product => {
  let validation = productValidation.validate(product)

  if (validation.result) {
    const newProduct = new productModel(product)

    newProduct.save(err => {
      if (err) throw new Error(`Error en escritura de producto: ${err}`)

      console.log('Producto ingresado')
    })

    return product
  }

  else {
    return validation.error
  }
}

export default {
  receiveAndProcessProduct
}