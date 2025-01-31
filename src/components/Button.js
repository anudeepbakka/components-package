import React from 'react';
import { Button as BootstrapButton} from 'react-bootstrap';
import styles from './components.module.scss';

function Button(props) {
  let buttonClass = '';
  const sizeClass = `btn-${props.size}`;

  switch (props.type) {
    case 'decline':
      buttonClass = `${styles.er_decline}`;
      break;
    case 'approve':
      buttonClass = `${styles.er_approve}`;
      break;
    case 'primary':
      buttonClass = `${styles.er_primary}`;
      break;
    case 'close':
      buttonClass = `btn btn-light w-25 ${styles.er_close}`;
      break;
    default:
      buttonClass = '';
  }

  return (
    <BootstrapButton
      className={`${styles.er_button} ${buttonClass} ${sizeClass} me-2`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </BootstrapButton>
  );
}

export default Button;
