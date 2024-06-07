import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const baseUrl = import.meta.env.VITE_API_URL;

const slidePhones = `${baseUrl}/assets/images/slide-phones.png`;
const slideTablets = `${baseUrl}/assets/images/slide-tablets.png`;
const slideWatches = `${baseUrl}/assets/images/slide-watches.png`;

import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HomeSlider.scss';
import { Link } from 'react-router-dom';

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
        <ChevronLeft />
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
          <Link to="/phones" className="slide-link">
            <img src={slidePhones} loading="lazy" alt="Phones"></img>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/tablets" className="slide-link">
            <img src={slideTablets} loading="lazy" alt="Tablets"></img>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/accessories" className="slide-link">
            <img src={slideWatches} loading="lazy" alt="Watches"></img>
          </Link>
        </SwiperSlide>
      </Swiper>

      <button className="slider__button" onClick={() => swiper.slideNext()}>
        <ChevronRight />
      </button>
    </div>
  );
};
