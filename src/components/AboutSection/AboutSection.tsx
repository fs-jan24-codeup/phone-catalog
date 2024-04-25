import { Product } from '../../types/Product';
import './AboutSection.scss';

type Props = {
  good: Product | null;
};

export const AboutSection: React.FC<Props> = ({ good }) => {
  return (
    <div className="about">
      <h1 className="about__title line">About</h1>
      <div className="about__description">
        {good &&
          good.description.map(desc => (
            <div className="about__container" key={desc.title}>
              <p className="about_subtitle">{desc.title}</p>
              <p className="about_text">{desc.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
