import { Product } from '../../types/Product';
import './TechSpecs.scss';

type Props = {
    good: Product | null;
}

export const TechSpecs: React.FC<Props> = ({ good }) => {

  if (!good) return null;

  const { screen, resolution, processor, ram, camera, zoom, cell } = good;

  const specs: { [key: string]: string } = {
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  return (
    <div className='specs'>
      <h1 className='specs__title line'>Tech specs</h1>
      <div className='specs__description'>
        {Object.entries(specs).map(([key, value]) => (
          <div className='specs__container' key={key}>
            <p className='specs_subtitle'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            <p className='specs_text'>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
