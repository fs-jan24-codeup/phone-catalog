import { Product } from '../../types/Product';
import './TechSpecs.scss';

type Props = {
    good: Product | null;
}

export const TechSpecs: React.FC<Props> = ({ good }) => {
  const keys: string[] = ['screen', 'resolution', 'processor', 'ram', 'camera', 'zoom'];
  const cellKey: string = 'cell';

  return (
    <div className='specs'>
      <h1 className='specs__title line'>Tech specs</h1>
      <div className='specs__description'>
        {good && (
          <>
            {Object.entries(good).map(([key, value]) => (
              keys.includes(key) && (
                <div className='specs__container' key={key}>
                  <p className='specs_subtitle'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className='specs_text'>{value}</p>
                </div>
              )
            ))}

            {Object.entries(good).map(([key, value]) => (
              key === cellKey && (
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
