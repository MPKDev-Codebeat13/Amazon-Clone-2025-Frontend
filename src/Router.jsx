import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './Pages/Auth/Auth'; // Capitalize if your file is Auth.jsx
import Cart from './Pages/Cart/Cart';
import Landing from './Pages/Landing/Landing';
import Orders from './Pages/Orders/Orders';
import Payment from './Pages/Payment/Payment';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Results from './Pages/Results/Results';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe(
  'pk_test_51RXi4ZGdtH43elAQQ8rPiR3DbLgaHk8ETzFlD9OrtEK2fmzvXnIcTW0qrIQ3chUE7PNH6Pi40Lf03z1dJdWSZB0500doda0E8c'
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<SignIn />} />
        <Route
          path='/payments'
          element={
            <ProtectedRoute msg='YOU MUST LOGIN TO PAY' redirect='/payments'>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
