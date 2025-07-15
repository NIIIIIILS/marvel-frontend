import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Nombre max de pages visibles

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajuster si on est près du début
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null; // Ne pas afficher la pagination s'il n'y a qu'une page
  }

  return (
    <div className="pagination">
      {/* Bouton Première page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-btn first-page"
      >
        ≪
      </button>

      {/* Bouton Page précédente */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn prev-page"
      >
        ‹
      </button>

      {/* Numéros de pages */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`pagination-btn page-number ${
            currentPage === pageNumber ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Bouton Page suivante */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn next-page"
      >
        ›
      </button>

      {/* Bouton Dernière page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-btn last-page"
      >
        ≫
      </button>
    </div>
  );
};

export default Pagination;
