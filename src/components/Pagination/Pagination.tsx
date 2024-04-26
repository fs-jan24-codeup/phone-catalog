import React from 'react';

import './Pagination.scss';
import classNames from 'classnames';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const VISIBLE_PAGES = 4;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }

    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  };

  let startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

  if (endPage - startPage + 1 < VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
  }

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <button
          className="pagination__button pagination__button--nav"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </button>

        <ul className="pagination__buttons">
          {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <li key={index}>
              <button
                className={classNames('pagination__button', {
                  'pagination__button--active':
                    currentPage === startPage + index,
                })}
                onClick={() => handlePageChange(startPage + index)}
              >
                {startPage + index}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="pagination__button pagination__button--nav"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
