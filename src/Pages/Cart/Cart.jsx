import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Link} from 'react-router-dom';
import Classes from './Cart.module.css'
import { Type } from '../../Utility/action.type';
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  const increment = (item)=>{
    dispatch({
        type: Type.ADD_TO_BASKET,
        item
    })
  }
  const decrement = (id)=>{
    dispatch({
        type: Type.REMOVE_FROM_BASKET,
        id
    })
  }

  return (
    <LayOut>
      <section className={Classes.container}>
        <div className={Classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Oops! No Item In Your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return <section className={Classes.cart_product}>

                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                    <div className={Classes.btn_container}>
                        <button className={Classes.btn} onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                        <span>{item.amount}</span>
                        <button className={Classes.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={20}/></button>
                    </div>
                </section>
              ;
            })
          )}
        </div>
        <div>
            {basket?.length !== 0&&(
                <div  className={Classes.subtotal}>
                    <div>
                        <p>Subtotal ({basket?.length} items)</p>
                        <CurrencyFormat amount={total}/>
                    </div>
                    <span>
                    <input type="checkbox"/>
                    <small>This Order Contains A gift</small>
                    </span>
                    <Link to="/payments"> Continue to Checkout</Link>
                </div>
            )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;
