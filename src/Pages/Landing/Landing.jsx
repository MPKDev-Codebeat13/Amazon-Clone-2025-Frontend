import React from 'react'
import CarouselEffect from '../../Components/Carousel/Carousel'
import Category from '../../Components/Catagory/Category'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'

function Landing() {
  return (
    <LayOut>
         <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Landing
