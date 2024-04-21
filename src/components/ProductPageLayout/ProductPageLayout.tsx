import React from 'react';
import './ProductPageLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';
import { TEST } from './ProductPageImages/ProductPageImages';

export const ProductPageLayout: React.FC = () => {
  const { tempCard } = useAppContext();

  return (
    <>
      {tempCard && (
      <div className="product__grid">
        <div className="product__path">Path</div>
        <div className="product__back">Button Back</div>
        <div className="product__title">{tempCard.name}</div>
        <div className="product__images">
          <TEST images={tempCard.images}/>
        </div>
        <div className="product__price">Price, info</div>
          <div className="product__about">
            About
            <br/>
            <br/>
            {tempCard.description[0].title}
            <br/>
            {tempCard.description[0].text}
            <br/>
            <br/>
            {tempCard.description[1].title}
            <br/>
            {tempCard.description[1].text}
            <br/>
            <br/>
            {tempCard.description[2].title}
            <br/>
            {tempCard.description[2].text}
          </div>
        <div className="product__specs">
            Tech specs
            <br/>
            <br />
            Screen - {tempCard.screen}
            <br />
            Resolution - {tempCard.resolution}
            <br />
            Processor - {tempCard.processor}
            <br />
            RAM - {tempCard.ram}
            <br />
            Built in memory - {tempCard.capacity}
            <br />
            Camera - {tempCard.camera}
            <br />
            Zoom - {tempCard.zoom}
            <br />
            Cell - {tempCard.cell.join(', ')}
        </div>
        <div className="product__also-like">You may also like</div>
      </div>
      
    )}
    </>
  );
};
