import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import SignInForm from './Auth/SignInForm'
import SignUpForm from './Auth/SignUpForm'
import Home from './Core/Home'
import NotFound from './Core/NotFound'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from './User/Profile'
import Cart from './User/Cart'
import Checkout from './Core/Checkout'
import Dashboard from './Seller/Dashboard'
import DetailedOrder from './User/DetailedOrder'
import ProductsByCategory from './Core/ProductsByCategory'

export default function Routes() {
    return (
        <Router>
            <ToastContainer />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={SignInForm} />
                <Route path="/register" exact component={SignUpForm} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/checkout" exact component={Checkout} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/orders/:orderId" exact component={DetailedOrder} />
                <Route path="/category/:categoryId" exact component={ProductsByCategory} />
                <Route path="*" component = {NotFound} />
            </Switch>
        </Router>
    )
}
