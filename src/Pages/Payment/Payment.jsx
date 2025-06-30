import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import Classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import axiosInstance from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
  const context = useContext(DataContext);
  const user = context?.user;
  const basket = context?.basket || [];
  const dispatch = context?.dispatch;
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError('');
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1.
      // backend || functions --> contact to the client secret
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${total * 100}`
      });

      // console.log(response.data)
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      // console.log(paymentIntent);

      // 3.
      // after confirmation --> order firesotre databse save, clear basket
      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate('/orders', { state: { msg: 'You Have Placed A New Order' } });
    } catch (error) {
      console.log(error);
      setCardError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={Classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* Payment Method */}
      <section className={Classes.payment}>
        {/* Address */}
        <div className={Classes.flex}>
          <h3>delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={Classes.flex}>
          <h3>Review Items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card Form */}
        <div className={Classes.flex}>
          <h3>Payment Methods</h3>
          <div className={Classes.payment_card_contianer}>
            <div className={Classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: 'red' }} className={Classes.error}>
                    {cardError}
                  </small>
                )}
                {/* Card Element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={Classes.price_container}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p>Total Order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type='submit'>
                    {processing ? (
                      <div className={Classes.processing}>
                        <ClipLoader color='gray' size={12} />
                        <p>Processing. Please Wait .....</p>
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
