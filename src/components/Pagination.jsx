import React from "react";

const Pagination = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagList">
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                disabled={number === currentPage}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
