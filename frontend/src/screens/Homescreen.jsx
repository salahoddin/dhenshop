import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const Homescreen = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const fetch_products = async () => {
			const res = await axios.get('/api/products/')

			setProducts(res.data)
		}
		fetch_products()
	}, [])
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm='12' md='6' lg='4' xl='3'>
						<Product product={product}></Product>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Homescreen
