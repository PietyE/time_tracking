import React from "react";
import './style.scss'
import {useDispatch} from "react-redux";

import {setCurrentPage} from "../../../actions/pagination";



function Pagination({totalCount, pageSize, currentPage, paginationDeiplayed }){
    const dispatch = useDispatch()
    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let pagesList = pages.map((p, i) => {
        return <li key={i} className={currentPage === p ? 'active' : ''}><a onClick={()=>dispatch(setCurrentPage(p))} href="#">{p}</a></li>
    })

    return <div>
        <h4>Pagination</h4>
        <ul className='pagination'>
            {pagesList}
        </ul>
    </div>
}

export default Pagination;