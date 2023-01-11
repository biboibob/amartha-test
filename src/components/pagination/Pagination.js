import PaginationRB from "react-bootstrap/Pagination";

const Pagination = ({ totalPage, currentPage, onUpdate }) => {
  return (
    <div className={'flex'}>
      <PaginationRB size="sm">
        {/* Handling First And Before Button */}
        <PaginationRB.Prev
          onClick={() => currentPage - 1 >= 1 && onUpdate(currentPage - 1)}
        />

        {currentPage !== 1 && (
          <PaginationRB.Item onClick={() => onUpdate(1)}>{1}</PaginationRB.Item>
        )}

        {currentPage > 3 && <PaginationRB.Ellipsis />}

        {/* Handling current, after, and before page */}
        {currentPage - 1 > 1 && (
          <PaginationRB.Item onClick={() => onUpdate(currentPage - 1)}>
            {currentPage - 1}
          </PaginationRB.Item>
        )}

        <PaginationRB.Item active>{currentPage}</PaginationRB.Item>

        {currentPage + 2 < totalPage && (
          <PaginationRB.Item onClick={() => onUpdate(currentPage + 1)}>
            {currentPage + 1}
          </PaginationRB.Item>
        )}

         {/* Handling Last And Next Button */}
        {currentPage < totalPage - 3 && <PaginationRB.Ellipsis />}
        {currentPage !== totalPage - 1 && (
          <PaginationRB.Item onClick={() => onUpdate(totalPage - 1)}>
            {totalPage - 1}
          </PaginationRB.Item>
        )}

        <PaginationRB.Next
          onClick={() =>
            currentPage + 1 <= totalPage - 1 && onUpdate(currentPage + 1)
          }
        />
      </PaginationRB>
    </div>
  );
};

export default Pagination;
