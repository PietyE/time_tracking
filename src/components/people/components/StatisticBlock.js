import React from "react";
import '../style.scss'

function StatisticBlock(){
    return<div className='statistic__block'>
        <div className="container">
            <div className="row justify-content-between">
                <div className="statistic__block-count">150</div>
                <div className="statistic__block-progress">+4</div>
            </div>
            <div className="row">
                <div className="statistic__block-type">
                    MEMBERS
                </div>
            </div>
        </div>
    </div>
}

export default StatisticBlock;