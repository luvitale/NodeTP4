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

const getProducts = async id => {
  let query = id ? {_id: id} : {}

  let result = await productModel.find(query).then(
    products => {
      products.forEach(product => {
        console.log(product)
      })

      return products
    }
  ).catch(
    err => {
      throw new Error(`Error en lectura de productos: ${err}`)
    }
  )

  return result
}

const updateProduct = async (id, product) => {
  let validation = productValidation.validate(product)

  if (validation.result) {
    let rta = await productModel.updateOne({_id: id}, {$set: product})
    return rta
  }

  else {
    return validation.error
  }
}

export default {
  receiveAndProcessProduct,
  getProducts,
  updateProduct
}