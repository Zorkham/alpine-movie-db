import express, { Request, Response } from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import tmdbRoutes from './routes/tmdb'

// Load environment variables
dotenv.config()

const app = express()
const API_PORT = process.env.VITE_API_PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', tmdbRoutes)

// Default route
app.get('/', (_, res) => {
  res.send('TMDB API Proxy is running')
})

// Start the server
app.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`)
})
