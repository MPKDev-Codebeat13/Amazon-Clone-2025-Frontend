import React, { useContext } from 'react';
import { BiCart } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import Classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { auth } from '../../Utility/firebase';
function Header() {
  const { user, basket } = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  console.log(basket.length);
  return (
    <section className={Classes.fixed}>
      <section>
        <div className={Classes.header_container}>
          {/* Logo */}
          <div className={Classes.logo_container}>
            <Link to='/'>
              <img
                src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
                alt='Amazon Logo'
              />
            </Link>

            {/* Delivery */}
            <div className={Classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className={Classes.search}>
            <select name='' id=''>
              <option value=''>all</option>
            </select>
            <input type='text' name='' id='' placeholder='Search Product' />
            <BsSearch size={37} />
          </div>
          {/* Right Side Link */}
          <div className={Classes.order_container}>
            <Link to='' className={Classes.language}>
              <img
                src='https://image.shutterstock.com/image-vector/american-flag-usa-design-united-260nw-2477519645.jpg'
                alt=''
              />
              <select name='' id=''>
                <option value=''>EN</option>
              </select>
            </Link>

            {/* Three Components */}
            <Link to={!user && '/auth'}>
              <div>
                {user ? (
                    <>
                  <p>Hello {user?.email?.split('@')[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                    <>
                  <p>Hello ,Sign in</p>
                  <span>Account & lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* Orders */}
            <Link to='/orders'>
              <p>Returns</p>
              <span> & Orders</span>
            </Link>
            {/* Cart */}
            <Link to='/cart' className={Classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
