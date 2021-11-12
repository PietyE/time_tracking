import React, {memo, useEffect} from "react";
import StatisticBlock from "./components/StatisticBlock";
import NewComersBlock from "./components/NewComersBlock";
import Card from "./components/Card";
import { useSelector } from 'react-redux'
import { getDevelopersSelector} from 'selectors/developers'
import {currentItemsGets} from "../../utils/common";
import {getCurrentItems, getCurrentPage, getPageSize, getTotalItemCount} from "../../selectors/pagination";


function PeopleComponent() {
    const users = useSelector(getDevelopersSelector)
    console.log('users', users);
    let totalCount = useSelector(getTotalItemCount);
    let pageSize = useSelector(getPageSize);
    let curentPage = useSelector(getCurrentPage)
    let curentItems =useSelector(getCurrentItems);

    curentItems = currentItemsGets(
        pageSize,
        curentPage,
        users
    )

    // useEffect(()=>{
    //     curentItems = currentItemsGets(
    //         pageSize,
    //         curentPage,
    //         users
    //     )
    // },[pageSize, curentPage, users])

    console.log('current u', curentItems)

    const usersList =curentItems.length&&curentItems.map((u)=>{
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
        <div className="row">
            {usersList}
        </div>
    </div>
}

export default memo(PeopleComponent);