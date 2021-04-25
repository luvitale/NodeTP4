import express from 'express'
import tasks from './modules/tasks.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv-safe'
import methodOverride from 'method-override'

dotenv.config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

// FORM Methods
app.use(methodOverride('_method'))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/form.html')
})

app.post('/ingreso', (req, res) => {
  const product = req.body

  try {
    tasks.receiveAndProcessProduct(product)
    res.redirect('/listar?state=success')
  }

  catch(err) {
    console.log(`Error en escritura de producto: ${err}`)
    res.redirect('/listar?state=danger')
  }
})

app.get('/listar/:id?', async (req, res) => {
  let {id} = req.params
  let {state} = req.query

  await tasks.getProducts(id).then(
    products => res.render('list', { products, state })
  ).catch(
    err => {
      console.log(`Error en lectura de productos: ${err}`)
      res.render('list', { products: {} })
    }
  )
})


app.get('/editar/:id', async (req, res) => {
  let {id} = req.params

  let [product] = await tasks.getProducts(id)

  console.log("Producto ---")
  console.log(product)
  res.render('edit-form', { id, product })
})

app.put('/editar/:id', async (req, res) => {
  let {id} = req.params
  let product = req.body

  await tasks.updateProduct(id, product).then(
    res.redirect('/listar?state=modified')
  ).catch(
    err => {
      console.log(`Error al modificar producto: ${err}`)
      res.redirect('/listar')
    }
  )
})

mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.gvsdk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw new Error(`Error de conexión en la base de datos: ${err}`)

  console.log('Base de datos conectada')

  app.set('PORT', process.env.PORT || 8080)
  const server = app.listen(app.get('PORT'), () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
  })
  server.on('error', error => console.log(`Error en Servidor: ${error}`))
})