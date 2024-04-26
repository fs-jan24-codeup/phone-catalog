import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import accessories from '../../assets/images/accessories.png';
import tablets from '../../assets/images/tablets.png';
import phones from '../../assets/images/phones.png';
import './CategoriesSection.scss';
import { fetchModelsCount } from '../../utils/fetchModelsCount';

export const CategoriesSection: React.FC = () => {
  const [modelCounts, setModelCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const counts = await fetchModelsCount();
      setModelCounts(counts);
    }

    fetchData();
  }, []);

  return (
    <div className="categories">
      <h2 className="categories__title"> {t('shopByCategory')}</h2>
      <div className="categories__content">
        <div className="categories__content__section">
          <NavLink to="/phones" className="categories__content__link">
            <img
              src={phones}
              alt="phones"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item"> {t('mobilePhones')}</p>
          <p className="categories__content__quantity">
            {modelCounts.phones} {t('models')}
          </p>
        </div>

        <div className="categories__content__section">
          <NavLink to="/tablets" className="categories__content__link">
            <img
              src={tablets}
              alt="tablets"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item">{t('tablets')}</p>
          <p className="categories__content__quantity">
            {modelCounts.tablets} {t('models')}
          </p>
        </div>

        <div className="categories__content__section">
          <NavLink to="/accessories" className="categories__content__link">
            <img
              src={accessories}
              alt="accessories"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item">{t('accessories')}</p>
          <p className="categories__content__quantity">
            {modelCounts.accessories} {t('models')}
          </p>
        </div>
      </div>
    </div>
  );
};
