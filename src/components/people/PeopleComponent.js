import React, {memo, useEffect} from "react";
import NewComersBlock from "./components/NewComersBlock";
import Card from "./components/Card";
import { useSelector, useDispatch } from 'react-redux'
import { getDevelopersSelector} from 'selectors/developers'
import {currentItemsGets} from "../../utils/common";
import {getCurrentItems, getCurrentPage, getPageSize} from "../../selectors/pagination";
import {setCurrentItems} from "../../actions/pagination";
import Pagination from "../ui/pagination/Pagination";
import StatisticBlock from "../ui/statistic";
import DeveloperFilter from "../ui/devekoper-filter";
import './style.scss'
import Search from "../ui/search/Search";



function PeopleComponent() {
    const dispatch = useDispatch()
    const users = useSelector(getDevelopersSelector)
    let totalCount = users?users?.length:0;
    let pageSize = useSelector(getPageSize);
    let currentPage = useSelector(getCurrentPage)
    let currentItems =useSelector(getCurrentItems);



    useEffect(()=>{
     let items = currentItemsGets(
            pageSize,
            currentPage,
            users
        )
       dispatch( setCurrentItems(items))
    },[pageSize, currentPage, users])


    const usersList =currentItems.length&&currentItems.map((u)=>{
        return<Card key={u.id} user={u}/>
    });



    return<div className="container ">
        <h1 className="page-title">Vilmates</h1>
        <div className="row">
            <div className="col-lg-3 text-center"> <StatisticBlock/></div>
            <div className="col-lg-3"> <StatisticBlock/></div>
            <div className="col-lg-6">
                <NewComersBlock/>

            </div>
        </div>
        <div className="row filters-block">
            <Search/>
            <DeveloperFilter/>
        </div>
        <div className="row">
            {usersList}
        </div>
        <div className="pagination-block">
            <div className="row justify-content-center">
                <Pagination
                    totalCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    paginationDeiplayed={5}
                />
            </div>
        </div>

    </div>
}

export default memo(PeopleComponent);