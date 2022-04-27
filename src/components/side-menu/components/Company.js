import React, { useContext, useMemo } from 'react'

import company from 'images/sideMenuIcons/companyName.svg'

import {SidebarContext} from 'context/sidebar-context'

const Company = () => {
  
  const contextType = useContext(SidebarContext);

  const name = useMemo(()=>{
    if(contextType.selected){
      return contextType.selected.label
    }
   return 'vilmate'
}, [contextType.selected])

    return(
        <>
          <img src={company} alt="company" className="side_menu_company_name" />
          <span className="side_menu_header_item_name">{name}</span>
        </>
    )
}

export default Company;