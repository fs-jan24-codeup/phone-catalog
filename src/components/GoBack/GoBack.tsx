import React from 'react';
import { Link } from 'react-router-dom';

import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import './GoBack.scss';
import { useTranslation } from 'react-i18next';

export const GoBack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="go-back">
      <ChevronLeft />
      <Link to=".." className="go-back__link">
        {t('goBack')}
      </Link>
    </div>
  );
};
