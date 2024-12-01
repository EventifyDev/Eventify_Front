import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center space-x-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-100 dark:bg-slate-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => 
              typeof pageNumber === 'number' ? onPageChange(pageNumber) : null
            }
            disabled={pageNumber === '...'}
            className={`px-3 py-1 rounded-md transition-colors ${
              pageNumber === currentPage
                ? 'bg-primary text-white'
                : pageNumber === '...'
                ? 'bg-transparent cursor-default'
                : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-100 dark:bg-slate-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};