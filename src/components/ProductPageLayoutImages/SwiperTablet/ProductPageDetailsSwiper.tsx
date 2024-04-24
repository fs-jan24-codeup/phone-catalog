import { Swiper, SwiperSlide } from 'swiper/react';
import React, { Fragment, useState } from 'react';

import 'swiper/css';

import { Navigation, Thumbs } from 'swiper/modules';

type Props = {
  images: string[];
};

export const ProductPageDetailsSwiper: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
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
          <SwiperSlide>
            <img className="images__sidebar-image" src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
