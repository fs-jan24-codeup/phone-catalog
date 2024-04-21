import React, { useState } from 'react';
import './ProductPageImages.scss';
import { ProductPageOtherImages } from './ProductPageOtherImages/ProductPageOtherImages';
type Props = {
  images: string[];
};

const START_INDEX = 0;

export const TEST: React.FC<Props> = ({ images }) => {
  const [image, setImage] = useState(images[START_INDEX]);

  return (
    <div className="TEST">
      <img className="TEST__main--photo" src={image} />

      <div className="all">
        {images.map(image => {
          return <ProductPageOtherImages image={image} key={image} setImage={setImage} images={images} />;
        })}
      </div>
    </div>
  );
};
