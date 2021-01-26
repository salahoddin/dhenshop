import dotenv from 'dotenv'
import express from 'express'
import products from './data/products.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
	res.send('API is Running')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`)
)
