import { product as productModel } from '../models/products.js'
import productValidation from '../validations/products.js'
import email from '../controllers/email.js'
import fs from 'fs'

let addedProducts = 0
const quantity = 1

const emailFile = process.cwd() + '/correo.dat'

const getEmail = async () => await fs.promises.readFile(emailFile, 'utf-8')

const receiveAndProcessProduct = async (product, host) => {
  let validation = productValidation.validate(product)

  if (validation.result) {
    const newProduct = new productModel(product)

    newProduct.save(err => {
      if (err) throw new Error(`Error en escritura de producto: ${err}`)

      console.log('Producto ingresado')
    })

    if (++addedProducts == quantity) {
      const requestorNoty = await email.sendMail2Requestor(await getEmail(), await getProducts(), host)
      addedProducts = 0
    }

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

const deleteProduct = async id => await productModel.deleteOne({_id: id})

const setEmail = async email => await fs.promises.writeFile(emailFile, email)

export default {
  receiveAndProcessProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  setEmail
}