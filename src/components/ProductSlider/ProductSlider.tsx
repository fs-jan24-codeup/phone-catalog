import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import { Navigation, FreeMode } from 'swiper/modules';

import { Product } from '../../types/Product';
import { CardLayout } from '../CardLayout';
import './ProductSlider.scss';
import ArrowLeft from '../../assets/icons/chevron-left.svg?react';
import ArrowRight from '../../assets/icons/chevron-right.svg?react';
import { CardSkeleton } from '../CardSkeleton';

type Props = {
  id: string;
  title: string;
  products: Product[];
  isLoading: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  id,
  title,
  products,
  isLoading,
}) => {
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
        freeMode={{
          enabled: true,
          momentumVelocityRatio: 0.5,
        }}
        onSwiper={setSwiper}
        modules={[Navigation, FreeMode]}
        onSlideChange={handleDisable}
        className="products-swiper"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          : products.map(product => (
              <SwiperSlide key={product.id}>
                <CardLayout key={product.id} good={product} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
