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
      style={{
        overflow: 'visible',
        textOverflow: 'inherit',
        whiteSpace: 'normal',
        alignContent: 'center',
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

export default CustomCell;
