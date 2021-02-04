import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	// sample error
	// res.status(401)
	// throw new Error('Not Autorized')
	res.json(products)
})

// @desc    fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Admin/Private
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    create a product
// @route   POST /api/products
// @access  Admin/Private
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.png',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// @desc    update a product
// @route   PUT /api/products/:id
// @access  Admin/Private
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		brand,
		category,
		countInStock,
		description,
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock
		product.description = description

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
}
