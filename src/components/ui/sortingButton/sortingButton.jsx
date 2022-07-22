import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ASCEND, DESCEND } from 'constants/order-constant'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import styles from "./sortingButton.module.scss"

export const SortingButton = ({ onClick, title, sortingType }) => {
  return (
    <div className={styles.sorting}>
      <button className={styles.button} onClick={onClick}>
        {title}
      </button>
      <div className={styles.arrows}>
        <div className={`${styles.arrow} ${sortingType !== ASCEND && styles.disable}`}>
          <FontAwesomeIcon
            icon={faCaretUp}
            color="#414141"
            className="icon pencil_icon"
          />
        </div>
        <div className={`${styles.arrow} ${sortingType !== DESCEND && styles.disable}`}>
          <FontAwesomeIcon
            icon={faCaretDown}
            color="#414141"
            className="icon pencil_icon"
          />
        </div>
      </div>
    </div>
  )
}
SortingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  sortingType: PropTypes.string,
}