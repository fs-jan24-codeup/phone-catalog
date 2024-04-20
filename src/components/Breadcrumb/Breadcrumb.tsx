import React from 'react';

import home from '../../assets/icons/home.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import './Breadcrumb.scss';
import { Link, useLocation } from 'react-router-dom';

interface Segment {
  path: string;
  displayName: string;
}

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const processedSegments = pathname
    .split('/')
    .filter(segment => segment !== '')
    .map(segment => {
      const capitalized = segment.charAt(0).toUpperCase() + segment.slice(1);
      const displayName = capitalized.replace(/-/g, ' ');
      return { path: segment, displayName };
    });

  function generatePath(index: number, segments: Segment[]) {
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
          <img src={home} className="breadcrumb__icon" />
        </Link>
      </li>
      {processedSegments.map((segment, index) => (
        <li key={segment.path} className="breadcrumb__part">
          <img src={chevronRight} className="breadcrumb__icon" />
          {index === processedSegments.length - 1 ? (
            <span className="breadcrumb__path breadcrumb__path--last">
              {segment.displayName}
            </span>
          ) : (
            <Link
              to={generatePath(index, processedSegments)}
              className="breadcrumb__path"
            >
              {segment.displayName}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
