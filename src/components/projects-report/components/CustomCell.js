import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4'

const CustomCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      verticalAlign: 'middle',
      textAlign: 'start',
      ...style,
    }}
  >
    <span
      title={value}
      style={{
        overflow: 'hidden',
        textOverflow: 'fade',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

export default CustomCell;
