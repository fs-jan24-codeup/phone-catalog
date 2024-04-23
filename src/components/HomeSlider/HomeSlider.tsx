import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import slidePhones from '../../assets/images/slide-phones.png';
import slideTablets from '../../assets/images/slide-tablets.png';
import slideWatches from '../../assets/images/slide-watches.png';
import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HomeSlider.scss';

export const HomeSlider: React.FC = () => {
  const [swiper, setSwiper] = useState<any>(null);

  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span class="' + className + '">' + '</span>';
    },
  };

  return (
    <div className="slider">
      <button className="slider__button" onClick={() => swiper.slidePrev()}>
        <img src={chevronLeft} />
      </button>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={pagination}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={swiper => setSwiper(swiper)}
        modules={[Autoplay, Pagination, Navigation]}
        className="home-swiper"
      >
        <SwiperSlide>
          <img src={slidePhones}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideTablets}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideWatches}></img>
        </SwiperSlide>
      </Swiper>

      <button className="slider__button" onClick={() => swiper.slideNext()}>
        <img src={chevronRight} />
      </button>
    </div>
  );
};
