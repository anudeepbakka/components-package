import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faCircleCheck,
  faCircleXmark,
  faPlay
} from '@fortawesome/free-solid-svg-icons'

import styles from './components.module.scss';

const iconsMap = {
  check: faCircleCheck,
  xmark: faCircleXmark,
  eye: faEye,
  play:faPlay
  // Add more icons here as needed
}

function ActionButton({ onClick, backgroundColor, icon , disabled , ariaLabel }) {
  const selectedIcon = iconsMap[icon];

  return (
    <span>
      <button
        type="button"
        className={`align-items-center ${styles.actionButton}`}
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: backgroundColor,
        }}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon
          icon={selectedIcon}
          size='lg'
        />
      </button>
    </span>
  );
}


export default ActionButton
