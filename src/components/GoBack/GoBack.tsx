import React from 'react';
import { Link } from 'react-router-dom';

import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import './GoBack.scss';

export const GoBack: React.FC = () => {
  return (
    <div className="go-back">
      <ChevronLeft />
      <Link to=".." className="go-back__link">
        Go back
      </Link>
    </div>
  );
};
