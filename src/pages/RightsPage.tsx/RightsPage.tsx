import React, { useEffect } from 'react';
import './Rights.scss';
import '../../components/FadeOut/FadeOut.scss'

import { EarthCanvas } from './Earth';
import { useTranslation } from 'react-i18next';

export const RightsPage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="rights__block fadeOut animate">
      <div className="rights__earth">
        <EarthCanvas />
      </div>
      <div className="rights__text">
        <p>{t('rightsText')}</p>
        <p className="rights__year">© 2024</p>
      </div>
    </div>
  );
};
