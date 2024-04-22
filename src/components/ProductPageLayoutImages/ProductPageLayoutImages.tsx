import React, { useState } from 'react';
import { OtherImages } from './OtherImages/OtherImages';
import { Swiper, SwiperSlide } from 'swiper/react';

import './ProductPageLayoutImages.scss';
import 'swiper/css';

type Props = {
  images: string[];
};

export const ProductPageLayoutImages: React.FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className="images1">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={swiper => {
          setSwiper(swiper);
        }}
        onSlideChange={swiper => {
          setIndex(swiper.realIndex);
        }}
      >
        <SwiperSlide>
          <img className="images__main-image" src={images[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="images__main-image" src={images[1]} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="images__main-image" src={images[2]} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="images__main-image" src={images[3]} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="images__main-image" src={images[4]} />
        </SwiperSlide>
      </Swiper>
      <div className="images">
        <div className="images__other-images">
          {images.map(image => {
            return (
              <OtherImages
                image={image}
                key={image}
                index={index}
                setIndex={setIndex}
                swiper={swiper}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
