import React from "react";
import './style.scss'
import {useDispatch} from "react-redux";

import {setCurrentPage} from "../../../actions/pagination";
import {createPages, paginationWithDots} from "../../../utils/common";



function Pagination({totalCount, pageSize, currentPage, paginationDeiplayed }){
    const dispatch = useDispatch()
    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];

    pages = paginationWithDots(currentPage, pagesCount)
    let pagesList = pages.map((p, i) => {
        return <li key={i} className={currentPage === p ? 'active' : ''}><a onClick={()=>dispatch(setCurrentPage(p))} href="#">{p}</a></li>
    })

    return <div>

        <ul className='pagination'>
            {pagesList}
        </ul>
    </div>
}

export default Pagination;