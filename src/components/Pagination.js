// import './customStyles.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// const Pagination = ({ currentPage, totalPages, onPageChange ,totalRecords ,entriesPerPage}) => {
//     const generatePageNumbers = () => {
//     const minPages = 2; 
//     const range = [];
    
    
//     range.push(1);
    
//     let start = Math.max(2, currentPage - minPages);
//     let end = Math.min(totalPages - 1, currentPage + minPages);
    
    
//     if (currentPage - minPages > 2) {
//       range.push('...');
//     }
    
    
//     for (let i = start; i <= end; i++) {
//       range.push(i);
//     }
    
    
//     if (currentPage + minPages < totalPages - 1) {
//       range.push('...');
//     }
//         if (totalPages > 1) {
//       range.push(totalPages);
//     }
    
//     return range;
//   };
//   const startEntry = (currentPage - 1) * entriesPerPage + 1;
//   const endEntry = Math.min(currentPage * entriesPerPage, totalRecords);
//   return (
//     <div className='pagination-body d-flex justify-content-between align-items-center'>
//         <small className='mt-3'>Showing {startEntry} to {endEntry} of {totalRecords} entries</small>
//         <div className="pagination mt-3">

//       <button
//         className="pagination-button"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <FontAwesomeIcon icon={faChevronLeft} />
//       </button>

//       {generatePageNumbers().map((page, index) => (
//         page === '...' ? (
//           <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
//         ) : (
//           <button
//             key={`page-${page}`}
//             className={`pagination-number ${page === currentPage ? 'active' : ''}`}
//             onClick={() => onPageChange(page)}
//           >
//             {page}
//           </button>
//         )
//       ))}

//       <button
//         className="pagination-button"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <FontAwesomeIcon icon={faChevronRight} />
//       </button>
//     </div>
//     </div>
    
//   );
// };


// export default Pagination;




// V2

import { useState } from 'react';
import './customStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalRecords, 
  entriesPerPage 
}) => {
  
  const [jumpPage, setJumpPage] = useState('');

  const generatePageNumbers = () => {
    const minPages = 2; 
    const range = [];
    
    range.push(1);
    
    let start = Math.max(2, currentPage - minPages);
    let end = Math.min(totalPages - 1, currentPage + minPages);
    
    
    if (currentPage - minPages > 2) {
      range.push('...');
    }
    
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    
    if (currentPage + minPages < totalPages - 1) {
      range.push('...');
    }
    
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    return range;
  };

  
  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpPage);
    if (pageNum && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage(''); 
    }
  };

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalRecords);

  return (
    <div className='pagination-body d-flex justify-content-between align-items-center'>
      <small className='mt-3'>
        Showing {startEntry} to {endEntry} of {totalRecords} entries
      </small>
      
      <div className="d-flex align-items-center">
        <div className="pagination mt-3 me-3">
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {generatePageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={`page-${page}`}
                className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          ))}

          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Jump to Page Input */}
        <div className="jump-to-page d-flex align-items-center mt-3">
          <input 
            type="number" 
            className="form-control form-control-sm me-2"
            style={{ width: '80px' }}
            placeholder="Page"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            min="1"
            max={totalPages}
          />
          <button 
            className="btn btn-primary btn-sm jumpToPage"
            onClick={handleJumpToPage}
            disabled={!jumpPage || parseInt(jumpPage) < 1 || parseInt(jumpPage) > totalPages}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;