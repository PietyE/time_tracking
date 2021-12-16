import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ASCEND, DESCEND } from '../../../constants/order-constant'

const SortButton = ({ name, onSortPress }) => {
    const [isAscending, setAscending] = useState(false);

    const handleClick = useCallback(() => {
      setAscending(!isAscending);
      onSortPress({
        key: name,
        order: isAscending ? ASCEND : DESCEND,
      })
  }, [isAscending, name]);

    const buttonIcon = isAscending ? 'oi oi-sort-descending' : 'oi oi-sort-ascending'

    return (
        <Button variant="outline-*" onClick = {handleClick}>
            <span className={buttonIcon}/>
        </Button>
    )
}

export default SortButton