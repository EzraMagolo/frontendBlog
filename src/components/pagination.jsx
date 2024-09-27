import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers dynamically
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center mt-4">
      {/* Previous button */}
      <li className={`mx-1 px-3 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'}`}>
        <button 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="font-bold"
        >
          Previous
        </button>
      </li>

      {/* Page numbers */}
      {pageNumbers.map(number => (
        <li key={number} className={`mx-1 px-3 py-2 rounded-lg ${currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'}`}>
          <button onClick={() => onPageChange(number)} className="font-bold">
            {number}
          </button>
        </li>
      ))}

      {/* Next button */}
      <li className={`mx-1 px-3 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'}`}>
        <button 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="font-bold"
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;

