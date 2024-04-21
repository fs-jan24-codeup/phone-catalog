import React from 'react';
import '../ProductPageImages.scss';

type Props = {
  images: string[];
  image: string;
  setImage: (value: string) => void;
};

export const ProductPageOtherImages: React.FC<Props> = ({
  image,
  setImage,
  images,
}) => {
  const a = parseInt(image.slice(33, -1));

  const handleSelect = () => {
    setImage(images[a]);
  };

  return (
    <img src={image} className='all_image' onClick={() => handleSelect()} />
  );
};
