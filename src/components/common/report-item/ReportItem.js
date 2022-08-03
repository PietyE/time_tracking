import React from 'react'

import dotsFrame from 'images/ic-dots-frame.svg'
import './style.scss'

function ReportItem() {
  return (
    <div className="row report__item">
      <div className="col-lg-3">Оф. расходы Харьков</div>
      <div className="col-lg-2">
        4,000
        <span className="grn">грн</span>
      </div>
      <div className="col-lg-2">$735</div>
      <div className="col-lg-2">
        25,000
        <span className="grn">грн</span>
      </div>
      <div className="col-lg-3 ">
        <div className="container">
          <div className="row">
            <div className="col-6 difference">
              -2,000
              <span className="grn">грн</span>
            </div>
            <div className="col-6 actions">
              <div className="actions-dots">
                <a href="" className="dots">
                  <img src={dotsFrame} alt="" />
                </a>
              </div>
              <div className="actions-check">
                <label htmlFor="">
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportItem
