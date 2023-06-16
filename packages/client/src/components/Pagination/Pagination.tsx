import classNames from 'classnames';
import React, { FC } from 'react';
import { usePagination, DOTS } from './hooks';
import './Pagination.css';

type Props = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination(
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  );

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination__container">
      <li
        className={classNames('pagination__item', {
          pagination__item_disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className="pagination__arrow pagination__arrow_left" />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination__item pagination__item_dots" key={i}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={classNames('pagination__item', {
              pagination__item_selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber as number)}
            key={i}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classNames('pagination__item', {
          pagination__item_disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className="pagination__arrow pagination__arrow_right" />
      </li>
    </ul>
  );
};

export default Pagination;
