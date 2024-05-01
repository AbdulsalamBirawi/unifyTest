import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { createUseStyles } from "react-jss";
import { paginationStyles } from "../../styles/pagination.styles";

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const useStyles = createUseStyles(paginationStyles);

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const classes = useStyles();
  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || [];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1] as number;
  return (
    <ul className={classes.paginationContainer}>
      <li
        className={`${classes.paginationItem} ${
          currentPage === 1 ? classes.disabled : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${classes.arrow} ${classes.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className={`${classes.paginationItem} ${classes.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${classes.paginationItem} ${
              pageNumber === currentPage ? classes.selected : ""
            }`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${classes.paginationItem} ${
          currentPage === lastPage ? classes.disabled : ""
        }`}
        onClick={onNext}
      >
        <div className={`${classes.arrow} ${classes.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
