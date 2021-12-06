import React, { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


function MonthData (props) {

  const {
    title
  } = props

  const data = {
    datasets: [
      {
        data: [125192, 959, 14707, 8651, 31],
        backgroundColor: [
          '#1F7BED',
          '#C416C8',
          '#6AC035',
          '#F5330D',
          '#F8E642',
        ],
        cutout: 80
      },
    ],
  };

  return(
   <>
    <div className="header">
        {title}
    </div>
    <div className="row" />
    <div className="info_container">
        <div className="schedule">
            <Doughnut data={data} />
            <div className="total_value_container">
                <span className="total_header">Total</span>
                <span className="total_sum">$148,941</span>
            </div>
        </div>
        <div className="vertical_row" />
        <div></div>
    </div>
   </>
  )
}

export default MonthData