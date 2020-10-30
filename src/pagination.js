import React from 'react';

const pagination = ({perPage, total, paginate, currPage}) => {
   
    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(total / perPage); i++){
        pageNumbers.push(i)
    }
    
    return (
        <nav>
        <ul className='pagination justify-content-center'>
             <li className='page-item'>
                <a onClick={() => paginate(currPage - 1)} className="page-link" href="#top" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                 </a>
             </li>
             {pageNumbers.map((page, i) => (
                 <li key={page} className='page-item'>
                      <a  onClick={() => paginate(page)} href='#top' className={`${currPage === page ? 'page-link bg-primary text-white' : 'page-link'}`}>
                          {page}
                      </a> 
                 </li>
             ))}
             <li className="page-item">
                <a onClick={() => paginate(currPage + 1)} className="page-link" href="#top" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    )
}

export default pagination;