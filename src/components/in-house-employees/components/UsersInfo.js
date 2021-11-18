import React, { useEffect, useMemo } from 'react'

import { getDevelopersSelector } from 'selectors/developers';

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';

import User from './User'

function UsersInfo () {

  const allDevelopers = useShallowEqualSelector(getDevelopersSelector);

  return (
    <div className="users_table">
      <div className="users_table_header">
        <div className="name_ordering">
          <span className="name">NAME</span>
          <div className="arrows">
            <div className="arrow">
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.69704 1.0817C3.09686 0.543088 3.90314 0.543088 4.30296 1.0817L6.21236 3.65396C6.70217 4.3138 6.23118 5.25 5.40941 5.25H1.59059C0.76882 5.25 0.29783 4.31381 0.787638 3.65396L2.69704 1.0817Z" fill="#ADADA7"/>
              </svg>
            </div>
            <div className="arrow">
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30296 4.9183C3.90314 5.45691 3.09686 5.45691 2.69704 4.9183L0.787639 2.34604C0.297831 1.6862 0.768823 0.75 1.59059 0.75L5.40941 0.75C6.23118 0.75 6.70217 1.68619 6.21236 2.34604L4.30296 4.9183Z" fill="#ADADA7"/>
              </svg>
            </div>
          </div>
        </div>
        <span className="projects">PROJECTS</span>
        <span className="salary">SALARY</span>
        <span className="overtime">OVERTIME</span>
        <div className="pay_ordering">
          <span className="name">TO PAY</span>
          <div className="arrows">
            <div className="arrow">
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.69704 1.0817C3.09686 0.543088 3.90314 0.543088 4.30296 1.0817L6.21236 3.65396C6.70217 4.3138 6.23118 5.25 5.40941 5.25H1.59059C0.76882 5.25 0.29783 4.31381 0.787638 3.65396L2.69704 1.0817Z" fill="#ADADA7"/>
              </svg>
            </div>
            <div className="arrow">
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30296 4.9183C3.90314 5.45691 3.09686 5.45691 2.69704 4.9183L0.787639 2.34604C0.297831 1.6862 0.768823 0.75 1.59059 0.75L5.40941 0.75C6.23118 0.75 6.70217 1.68619 6.21236 2.34604L4.30296 4.9183Z" fill="#ADADA7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {allDevelopers.map((user) => 
        (<User name={user.name} 
               key={user.id}
               email={user.email}
               id={user.id}/>)
      )}
    </div>
  )
}
export default UsersInfo;