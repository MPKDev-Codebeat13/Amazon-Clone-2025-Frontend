import React from 'react';
// CarouselEffect.jsx
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Classes from './Carousel.module.css';
import { img } from './image/data';

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        className={Classes.carouselContainer}
      >
        {img.map((imageItemLink, i) => (
          <img
            key={i}
            className={Classes.carouselImage}
            src={imageItemLink}
            alt={`Slide ${i + 1}`}
          />
        ))}
      </Carousel>
      <div className={Classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
