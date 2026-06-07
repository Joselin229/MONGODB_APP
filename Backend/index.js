import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { PORT, mongoDBURL } from './config.js'
import vehiclesRoute from './routes/vehiclesRoute.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDistPath = path.join(__dirname, 'frontend', 'dist')

const app = express()

app.use(express.json())
app.use(cors())

//  Routes for creating, reading, updating, and deleting vehiicles
app.use('/vehicles', vehiclesRoute)

// Serve the built React frontend from the same Express app and port
app.use(express.static(frontendDistPath))

// Send all non-API routes back to React so refreshes still load the app
app.get(/.*/, (request, response) => {
  response.sendFile(path.join(frontendDistPath, 'index.html'))
})


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
