// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  classname: string;
  images: string[];
};

export const ProductPageDetailsSwiper: React.FC<Props> = ({ classname,images }) => {
  const [isMain, setIsMain] = useState('');
  useEffect(() => {
    setIsMain(classname);
  }, []);

  const mainOrSidebar = classNames({
    'images__swiper--main': isMain === 'main',
    'images__swiper--sidebar': isMain === 'sidebar',
  });

  const mainOrSidebarEl = classNames({
    'images__main-image': isMain === 'main',
    'images__sidebar-image': isMain === 'sidebar',
  });

  const numberOfSlides = isMain === 'main' ? 1 : 5;

  // const displayWay = isMain === 'sidebar' ? 'vertical' : 'horizontal';
  const displayWay = window.innerWidth < 640 ? 'horizontal' : 'vertical';
  console.log(displayWay);

  return (
    <Swiper
      className={mainOrSidebar}
      slidesPerView={numberOfSlides}
      direction={displayWay}
    >
      <SwiperSlide>
        <img className={mainOrSidebarEl} src={images[0]} />
      </SwiperSlide>
      <SwiperSlide>
        <img className={mainOrSidebarEl} src={images[1]} />
      </SwiperSlide>
      <SwiperSlide>
        <img className={mainOrSidebarEl} src={images[2]} />
      </SwiperSlide>
      <SwiperSlide>
        <img className={mainOrSidebarEl} src={images[3]} />
      </SwiperSlide>
      <SwiperSlide>
        <img className={mainOrSidebarEl} src={images[4]} />
      </SwiperSlide>
    </Swiper>
  );
};
