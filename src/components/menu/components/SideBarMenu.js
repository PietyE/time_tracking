import React, {  } from 'react'

import SideMenuPanel from './SideMenuPanel';

const SideBarMenu = (props) =>{
    const { panels } = props;
    
    return(
        <div>
            {
                panels.map(panel => 
                    (<SideMenuPanel panel={panel}
                                    key={panel.panelName} />)
                )
            }
        </div>
    )
}

export default SideBarMenu;