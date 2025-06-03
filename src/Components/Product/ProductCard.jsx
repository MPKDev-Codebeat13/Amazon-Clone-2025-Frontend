
import { Rating } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { DataContext } from '../DataProvider/DataProvider';
import Classes from './Product.module.css';
function ProductCard({ product,flex,renderDesc,renderAdd }) {
    const {image, title, id, rating, price, description} = product;

    const [state,dispatch]=useContext(DataContext)


    const addToCart = ()=>{
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: {
                image, title, id, rating, price, description
            }
        })
    }
  return (
    <div className={`${Classes.cardContainer} ${flex?Classes.product_flexed : '' }`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className='.img_container' />
      </Link>
      <div className={Classes.cardDetails}>
        <h3 className={Classes.productTitle}>{title}</h3>
        {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={Classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
        <CurrencyFormat className={Classes.price} amount={price} />
        </div>
        {renderAdd && <button className={Classes.button} onClick={addToCart}>Add to Cart</button>}

      </div>
    </div>
  );
}
console.log("ProductCard classes:", Classes.cardContainer, Classes.product_flexed);

export default ProductCard;
