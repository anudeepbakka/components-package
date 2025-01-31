import styles from './ShiftDetails.module.scss';
import React from 'react';
import '../customStyles.scss';
function ShiftDetails(props) {
  return (
    <>
      <div className={`${styles.shiftDetails} ms-2 mt-2`}>
        <div className={`${styles.event} d-flex flex-column`}>
          <span className={styles.shiftTitle}>
            <span
              className={`${styles.shiftColor} me-2`}
              style={props.shiftColor ? { backgroundColor: props.shiftColor } : {}}
            ></span>
            <span className='align-text-bottom'>{props.shiftTitle}</span>
          </span>
          <span className={styles.positionName}>
            <span
              className={`${styles.positionColor} me-2`}
              style={props.positionColor ? { backgroundColor: props.positionColor } : {}}
            ></span>
            {props.positionName}
          </span>
        </div>
      </div>
    </>
  )
}

export default ShiftDetails
