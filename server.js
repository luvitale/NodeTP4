import express from 'express'

const app = express()

app.set('PORT', process.env.PORT || 8080)
const server = app.listen(app.get('PORT'), () => {
  console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))