// components/Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const numPagesToShow = 1; // Number of pages to show in the pagination bar
  
  // Calculate the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
  let endPage = startPage + numPagesToShow - 1;

  // Ensure endPage doesn't exceed totalPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - numPagesToShow + 1);
  }

  // Generate page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      </li>

      {startPage > 1 && (
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(1)}>
            1
          </button>
        </li>
      )}

      {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}

      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}

      {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}

      {endPage < totalPages && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      )}

      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
