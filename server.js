import express from 'express'
import tasks from './modules/tasks.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv-safe'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/form.html')
})

app.post('/ingreso', (req, res) => {
  const product = req.body

  res.send(tasks.receiveAndProcessProduct(product))
})

dotenv.config()

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