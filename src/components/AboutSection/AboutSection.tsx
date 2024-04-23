import { Product } from '../../types/Product';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduct } from '../../utils/fetchData';
import './AboutSection.scss';

export const AboutSection = () => {
  const [good, setGood] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      getProduct('./api/phones.json', productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className='about'>
      <h1 className='about__title line'>About</h1>
      <div className='about__description'>
        {good && (
          good.description.map((desc) => (
            <div className='about__container' key={good.id}>
              <p className='about_subtitle'>{desc.title}</p>
              {desc.text.map((paragraph, idx) => (
                <p className='about_text' key={idx}>{paragraph}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
