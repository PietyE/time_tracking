import React from 'react';
import styles from './Auth.module.scss';
import cn from 'classnames';

function Separator(props) {
  const { width } = props;

  return (
    <>
      <div className={cn(styles.separatorBlock, {width: `${width}px`})}>
        <div className={styles.separatorLine}/>
        <span className={styles.separatorTitle}>or</span>
        <div className={styles.separatorLine}/>
      </div>
    </>
  );
}

export default Separator;
