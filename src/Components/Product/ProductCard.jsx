import React, { useContext } from 'react';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { DataContext } from '../DataProvider/DataProvider';
import classes from './Product.module.css';

function ProductCard({ product, flex, renderDesc, renderAdd }) {
    const { image, title, id, rating, price, description } = product || {};
    const { dispatch } = useContext(DataContext);

    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: { image, title, id, rating, price, description }
        });
    };

    if (!product) return null;
 return (
    <div
      className={`${classes.cardContainer} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <div className={classes.imageWrapper}>
        <Link to={`/products/${id}`} className={classes.productImage}>
          <img src={image} alt={title} />
        </Link>
      </div>

      <div className={classes.cardDetails}>
        <h3 className={classes.productTitle}>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count} ratings</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;