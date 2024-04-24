import React, { useEffect, useRef, useState } from 'react';

import './ProductPageLayoutImages.scss';
import 'swiper/css';
import { ProductPageDetailsSwiper } from './SwiperTablet/ProductPageDetailsSwiper';

type Props = {
  images: string[];
};

const MAX_MOBILE_WIDTH = 640;

export const ProductPageLayoutImages: React.FC<Props> = ({ images }) => {
  const [_, setIsMobile] = useState(
    window.innerWidth <= MAX_MOBILE_WIDTH,
  );
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth;
      if (
        currWidth <= MAX_MOBILE_WIDTH &&
        prevWidth.current > MAX_MOBILE_WIDTH
      ) {
        setIsMobile(true);
      } else if (
        currWidth > MAX_MOBILE_WIDTH &&
        prevWidth.current <= MAX_MOBILE_WIDTH
      ) {
        setIsMobile(false);
      }
      prevWidth.current = currWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="images">
      <ProductPageDetailsSwiper images={images}  />
    </div>
  );
};
