import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faWarning,
  faCalendarXmark,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import styles from './components.module.scss';

function PageMessageInfo({ type, label, text }) {
  // Determine the icon based on the type prop
  let icon;

  switch (type) {
    case 'nodata':
      icon = faCircleExclamation;
      break;
    case 'warning':
      icon = faWarning;
      break;
    case 'error':
      icon = faCalendarXmark;
      break;
    case 'calendar':
      icon = faCalendarDays;
      break;
    default:
      icon = faCircleExclamation; // Default icon
  }

  return (
    <div className={`${styles.pageMessageInfo} mt-5`}>
      <FontAwesomeIcon icon={icon} />
      {label && <h2>{label}</h2>}
      {text && <p>{text}</p>}
    </div>
  );
}

export default PageMessageInfo;
