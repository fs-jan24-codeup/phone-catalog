import React, { useState } from 'react';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import './ImagesSwiper.scss';

type Props = {
  images: string[];
};

export const ImagesSwiper: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="images">
      <Swiper
        className="images__swiper--main"
        slidesPerView={1}
        modules={[Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images.map(image => (
          <SwiperSlide key={image + ' swiper--main'}>
            <img className="images__main-image" src={image} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={swiper => {
          setThumbsSwiper(swiper);
        }}
        className="images__swiper--sidebar"
        slidesPerView={5}
        modules={[Navigation, Thumbs]}
        breakpoints={{
          640: {
            direction: 'vertical',
          },
        }}
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <img className="images__sidebar-image" src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
