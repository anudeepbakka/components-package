import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons'
import styles from './components.module.scss';


const iconsMap = {
    bell:faBell,
    thumbsup:faThumbsUp
    // Add more icons here as needed
  }

function InfoBar(props) {
    const selectedIcon = iconsMap[props.icon] || faBell;
  let infoBarClass = props.type === 'success' ? styles.er_approve : ''
  return <div className={`${styles.info} ${infoBarClass} CircularProBold`}><FontAwesomeIcon  icon={selectedIcon} className="mx-2" data-testid='font-awesome-icon' /> {props.children}</div>
}

export default InfoBar
