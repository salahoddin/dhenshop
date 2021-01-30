import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
	return (
		<Router>
			<Header></Header>
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen}></Route>
					<Route path='/register' component={RegisterScreen}></Route>
					<Route path='/profile' component={ProfileScreen}></Route>
					<Route path='/product/:id' component={ProductScreen}></Route>
					<Route path='/cart/:id?' component={CartScreen}></Route>

					<Route path='/' component={HomeScreen} exact></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	)
}

export default App
