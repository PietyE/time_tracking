import React from 'react';
import { TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4'

const CustomHeaderCell = (props) => {
  const { style, ...restProps } = props;

  return <TableHeaderRow.Cell
      {...restProps}
      style={{
        flex: 1,
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        ...style,
      }}
    />
}

export default CustomHeaderCell;
