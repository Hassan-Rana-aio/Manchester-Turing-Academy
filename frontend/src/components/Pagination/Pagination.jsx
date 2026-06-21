import { useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Pagination = ({
  pageSize,
  totalRecords,
  currentPage,
  functionToCall,
  functionParams,
}) => {
  const maxPaginationButtons = 3;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const paginationButtons = [];

  // Start index for pagination buttons
  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxPaginationButtons / 2),
      totalPages - maxPaginationButtons
    ),
    0
  );

  // End index for pagination buttons
  const endPage = Math.min(startPage + maxPaginationButtons, totalPages);

  // create pagination buttons
  for (let index = startPage; index < endPage; index++) {
    paginationButtons.push(index);
  }

  // handle pagination
  const handlePagination = (newPageNumber) => {
    if (newPageNumber < 0) newPageNumber = 0;
    if (newPageNumber >= totalPages) newPageNumber = totalPages - 1;

    // call the provided function with page number
    functionParams
      ? functionToCall(newPageNumber, functionParams)
      : functionToCall(newPageNumber);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-200 w-fit py-1 px-3">
      {/* First and Previous buttons */}
      {currentPage > 0 && (
        <>
          <button
            onClick={() => handlePagination(0)}
            className="py-1 px-2 bg-slate-200 hover:bg-slate-300"
          >
            <FaAngleDoubleLeft size={20} />
          </button>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            className="py-1 px-2 bg-slate-200 hover:bg-slate-300"
          >
            <FaAngleLeft size={20} />
          </button>
        </>
      )}

      {/* Pagination buttons */}
      {paginationButtons.map((element) => (
        <button
          key={element} // Unique key for each button
          className={`py-1 px-2 ${
            element === currentPage
              ? "bg-slate-400"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
          onClick={() => handlePagination(element)}
        >
          {element + 1}
        </button>
      ))}

      {/* Next and Last buttons */}
      {currentPage < totalPages - 1 && (
        <>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            className="py-1 px-2 bg-slate-200 hover:bg-slate-300"
          >
            <FaAngleRight size={20} />
          </button>
          <button
            onClick={() => handlePagination(totalPages - 1)}
            className="py-1 px-2 bg-slate-200 hover:bg-slate-300"
          >
            <FaAngleDoubleRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
