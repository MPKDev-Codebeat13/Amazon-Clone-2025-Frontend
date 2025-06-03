import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './Pages/Auth/Signup';
import Cart from './Pages/Cart/Cart';
import Landing from './Pages/Landing/Landing';
import Orders from './Pages/Orders/Orders';
import Payment from './Pages/Payment/Payment';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Results from './Pages/Results/Results'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<SignIn />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category/:categoryName' element={<Results/>} />
        <Route path='/products/:productId' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart />} />
        <Route />
      </Routes>
    </Router>
  );
}

export default Routing;
