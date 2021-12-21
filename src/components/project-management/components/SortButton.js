import React, { useCallback, useMemo, useState } from 'react'
import { ASCEND, DESCEND } from '../../../constants/order-constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'

const SortButton = ({ name, current, onSortPress }) => {
    const [isAscending, setAscending] = useState(false);

    const handleClick = useCallback(() => {
      setAscending(!isAscending);
      onSortPress({
        key: name,
        order: isAscending ? ASCEND : DESCEND,
      });
  }, [isAscending, name, onSortPress]);

    const buttonIcon = isAscending ? faSortAmountDown : faSortAmountDownAlt;
    const isChoose = useMemo(() => name === current, [name, current]);

    return (
      <span
        className="sort_button"
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={buttonIcon}
          size="xs"
          color={isChoose ? 'darkGray' : 'white'}
        />
      </span>
    )
}

export default SortButton