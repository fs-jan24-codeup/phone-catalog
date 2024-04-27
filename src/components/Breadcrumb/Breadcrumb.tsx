import React from 'react';

import Home from '../../assets/icons/home.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import './Breadcrumb.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import variables from '../../styles/utils/variables.module.scss';
import { useTranslation } from 'react-i18next';

interface Segment {
  path: string;
  displayName: string;
}

type Props = {
  productName?: string;
};

export const Breadcrumb: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const { pathname } = location;
  const { productId } = useParams();

  const { t } = useTranslation();

  const processedSegments = pathname
    .split('/')
    .filter(segment => segment !== '')
    .map(segment => {
      const capitalized = segment.charAt(0).toUpperCase() + segment.slice(1);
      const displayName = capitalized.replace(/-/g, ' ');
      return { path: segment, displayName };
    });

  function generatePath(index: number, segments: Segment[]) {
    console.log('segments :>> ', segments);
    return (
      '/' +
      segments
        .slice(0, index + 1)
        .map(segment => segment.path)
        .join('/')
    );
  }

  return (
    <ul className="breadcrumb">
      <li className="breadcrumb__part">
        <Link to="/" className="breadcrumb__home">
          <Home color={variables.primaryColor} />
        </Link>
      </li>
      {processedSegments.map((segment, index) => (
        <li key={segment.path} className="breadcrumb__part">
          <ChevronRight
            color={variables.iconColor}
            className="breadcrumb__icon"
          />
          {index === processedSegments.length - 1 ? (
            <span className="breadcrumb__path breadcrumb__path--last">
              {productId ? productName : t(segment.displayName)}
            </span>
          ) : (
            <Link
              to={generatePath(index, processedSegments)}
              className="breadcrumb__path"
            >
              {t(segment.displayName)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
