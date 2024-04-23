import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { Product } from '../../types/Product';
import { CardLayout } from '../CardLayout';
import './ProductSlider.scss';
import arrowLeft from '../../assets/icons/chevron-left.svg';
import arrowRight from '../../assets/icons/chevron-right.svg';

SwiperCore.use([Navigation]);

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  return (
    <div className="product-slider-container">
      <h2>{title}</h2>
      <div className="product-slider-container__wrapper-title-btn">
        <h2>{title}</h2>
        <div className="product-slider-container__btn--wrapper">
          <button
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            className="custom-prev-button"
          >
            <img
              src={arrowLeft}
              alt="Prev"
              className="product-slider-container__arrow-left"
            />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            className="custom-next-button"
          >
            <img
              src={arrowRight}
              alt="Next"
              className="product-slider-container__arrow-right"
            />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        navigation={{
          prevEl: '.custom-prev-button',
          nextEl: '.custom-next-button',
        }}
        ref={swiperRef}
        className="products-swiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <CardLayout key={product.id} good={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
