import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Homescreen from './screens/Homescreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
	return (
		<Router>
			<Header></Header>
			<main className='py-3'>
				<Container>
					<Route path='/' component={Homescreen} exact></Route>
					<Route path='/product/:id' component={ProductScreen}></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	)
}

export default App
