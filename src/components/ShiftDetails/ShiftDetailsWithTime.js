import { TimeFormatter } from '../../utils/dateUtils';
import styles from './ShiftDetails.module.scss';
import React from 'react';
import '../customStyles.scss';

function ShiftDetailsWithTime(props) {
  return (
    <>
      <div className={`${styles.shiftDetails} ms-2 mt-2`}>
        <div className={`${styles.event} d-flex flex-column`}>
          <span className={styles.shiftTitle}>
            <span
              className={`${styles.shiftColor} me-2`}
              style={props.shiftColor ? { backgroundColor: props.shiftColor } : {}}
            ></span>
            {props.shiftTitle}
          </span>
          <span className={styles.positionName}>
            <span
              className={`${styles.positionColor} me-2`}
              style={props.positionColor ? { backgroundColor: props.positionColor } : {}}
            ></span>
            <span className='align-text-bottom'>{props.positionName}</span>
          </span>
          <span className={styles.time}>
            {props.date} {TimeFormatter(props.startTime)} to {TimeFormatter(props.endTime)}
            <span className={styles.shiftDuration}> ({props.duration})</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ShiftDetailsWithTime;
