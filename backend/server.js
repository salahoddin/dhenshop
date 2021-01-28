import dotenv from 'dotenv'
import express from 'express'
import color from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// this will allow us accept json from request body
app.use(express.json())

app.get('/', (req, res) => {
	res.send('API is Running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold
	)
)
