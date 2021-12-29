import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4'

const CustomCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      ...style,
    }}
  >
    <span
      title={value}
      style={{
        overflow: 'hidden',
        textOverflow: 'fade',
        whiteSpace: 'nowrap',
        alignContent: 'center',
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

export default CustomCell;
