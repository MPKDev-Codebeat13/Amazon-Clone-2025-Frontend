import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Classes from './Product.module.css';
import Loader from '../Loader/Loader';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setIsLoading(false)
      });
  }, []);

  return (
    <>
    {
        isLoading?(<Loader />) : (<section className={Classes.productsContainer}>
      {products.map((Product) => {
         return <ProductCard renderAdd={true} key={Product.id} product={Product} />
})}
    </section>)
    }

    </>
  );
}

export default Product;
