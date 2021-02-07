import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    fetch all products
// @route   GET /api/products?
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
	//req query is how you can get the query string/after question mark

	const pagesize = 10
	const page = Number(req.query.pageNumber) || 1
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}
	const count = await Product.countDocuments({ ...keyword })
	const products = await Product.find({ ...keyword })
		.limit(pagesize)
		.skip(pagesize * (page - 1))
	res.json({ products, page, pages: Math.ceil(count / pagesize) })
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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment: comment,
			user: req.user._id,
		}

		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, val) => (acc = acc + val.rating), 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)
	res.json(products)
})

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
}
