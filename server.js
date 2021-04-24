import express from 'express'
import tasks from './modules/tasks.js'

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

app.set('PORT', process.env.PORT || 8080)
const server = app.listen(app.get('PORT'), () => {
  console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))