import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../api/endPoints.jsx';
import Classes from './ProductDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Use null for single product
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]); // Add productId as dependency

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      ) : (
        <div className={Classes.error}>Product not found.</div>
      )}
    </LayOut>
  );
}

export default ProductDetail;
