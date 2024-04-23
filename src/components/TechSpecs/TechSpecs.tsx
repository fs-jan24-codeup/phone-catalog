import { Product } from '../../types/Product';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduct } from '../../utils/fetchData';
import './TechSpecs.scss';

export const TechSpecs = () => {
  const [good, setGood] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      getProduct('./api/phones.json', productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, [productId]);

  return (
    <div className='specs'>
      <h1 className='specs__title line'>Tech specs</h1>
      <div className='specs__description'>
        {good && (
          <>
            {Object.entries(good).map(([key, value]) => (
              ['screen', 'resolution', 'processor', 'ram', 'camera', 'zoom'].includes(key) && (
                <div className='specs__container' key={key}>
                  <p className='specs_subtitle'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className='specs_text'>{value}</p>
                </div>
              )
            ))}

            {Object.entries(good).map(([key, value]) => (
              ['cell'].includes(key) && (
                <div className='specs__container' key={key}>
                  <p className='specs_subtitle'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <div className='specs_text cell'>
                    {(value as string[]).join(', ')}
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>
    </div>
  );
};
