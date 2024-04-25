import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import { Navigation } from 'swiper/modules';

import { Product } from '../../types/Product';
import { CardLayout } from '../CardLayout';
import './ProductSlider.scss';
import ArrowLeft from '../../assets/icons/chevron-left.svg?react';
import ArrowRight from '../../assets/icons/chevron-right.svg?react';

type Props = {
  id: string;
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ id, title, products }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleDisable = () => {
    setIsPrevDisabled(swiper?.realIndex === 0);
    setIsNextDisabled(swiper?.progress === 1);
  };

  return (
    <div className="product-slider-container">
      <div className="product-slider-container__wrapper-title-btn">
        <h2 className="product-slider-container__title">{title}</h2>
        <div className="product-slider-container__btn--wrapper">
          <button
            onClick={() => swiper.slidePrev()}
            className={'custom-prev-button'}
            disabled={isPrevDisabled}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => swiper.slideNext()}
            className={'custom-next-button'}
            disabled={isNextDisabled}
          >
            <ArrowRight />
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
          prevEl: `.custom-prev-button-${id}`,
          nextEl: `.custom-next-button-${id}`,
        }}
        onSwiper={setSwiper}
        modules={[Navigation]}
        onSlideChange={handleDisable}
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
