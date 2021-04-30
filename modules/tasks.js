import { product as productModel } from '../models/products.js'
import productValidation from '../validations/products.js'
import email from '../controllers/email.js'

const quantityToSendEmail = 10

const receiveAndProcessProduct = async product => {
  let validation = productValidation.validate(product)

  if (validation.result) {
    const newProduct = new productModel(product)

    await newProduct.save(async err => {
      if (err) throw new Error(`Error en escritura de producto: ${err}`)

      console.log('Producto ingresado')
      
      let dbProducts = await getProducts()
      if (dbProducts.length % quantityToSendEmail == 0) {
        const requestorNoty = await email.sendMail2Requestor(dbProducts)
      }
    })
  }

  else {
    return validation.error
  }
}

const getProducts = async id => {
  let query = id ? {_id: id} : {}

  let result = await productModel.find(query).lean().then(
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

const deleteProduct = async id => await productModel.deleteOne({_id: id})

export default {
  receiveAndProcessProduct,
  getProducts,
  updateProduct,
  deleteProduct
}