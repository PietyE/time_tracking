import React, { useMemo } from 'react'

import SideMenuItem from './SideMenuItem'
import classnames from 'classnames'

const SideMenuPanel = (props) =>{
    const { panel } = props;

    const panelClasses = useMemo(() => {
        return (
          classnames("panel_name",
          {
            smallSize: panel.smallSize,
          })
        )
    }, [panel])
    
    return(
        <div>
            <span className={panelClasses}>{ panel.panelName }</span>
            <div className="panel_items">
            {
                panel.items.map(item => 
                    (<SideMenuItem item={item}
                                   key={item.label} />)
                )
            }
            </div>
        </div>
    )
}

export default SideMenuPanel;