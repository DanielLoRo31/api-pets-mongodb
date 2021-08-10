import express from 'express'

import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { connect } from 'mongoose'
import petsRoutes from './routes/petsRoutes'

const apiString = '/api'
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(morgan('dev'))

connect(
  // 'mongodb://localhost:27017/PetsApp'
  'mongodb+srv://nintendo:QaMzcGTlIBI4poL9@myfirstcluster.jfcnj.mongodb.net/PetsApp?retryWrites=true&w=majority'
)
  .then((db) => {
    console.log('Conectado a mongodb')
  })
  .catch((error) => {
    console.log('No se pudo conectar a mongodb: ', error)
  })

app.use(`/api/pets`, petsRoutes)
// app.get("/", (req, res) => {
//   res.send("Well done!");
// });

export default app
