import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4'
import _ from "lodash";

const CustomCell = ({ value, style, row, ...restProps }) => {
    const { active_project } = row;

   // let tooltip = typeof value === 'string'?value:'';
    let val= value;
    let title =value;
    if(_.isObject(value) && value?.link){
        val = value.link;
        title = value.title
    }
    return(
        <Table.Cell
            {...restProps}
            style={{
                verticalAlign: 'middle',
                textAlign: 'start',
                ...style,
            },
                active_project ? { opacity: '1' } : { opacity: '0.5' }
            }
        >
    <span
        title={title}
        style={{
            overflow: 'hidden',
            textOverflow: 'fade',
            whiteSpace: 'nowrap',
        }}
    >
      {val}
    </span>
        </Table.Cell>

    )
}



export default CustomCell;
