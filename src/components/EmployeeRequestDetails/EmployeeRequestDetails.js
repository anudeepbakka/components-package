import { Accordion } from 'react-bootstrap';
import '../customStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSackDollar,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock,
  faStar,
  faCircleCheck as regularFaCircleCheck,
  faCircleXmark as regularFaCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import styles from './EmployeeRequestDetails.module.scss';
import ProfilePictures from '../ProfilePictures';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import ActionButton from '../ActionButton';
import { profilePicture } from '../../utils/profilePictures';
import { useMemo, useState } from 'react';
import { convertHoursToHoursAndMinutes, formatISOToLocalDateTime } from '../../utils/dateUtils';

function EmployeeRequestDetails(props) {
  const details  = props.details;
  const [isConflict, setIsConflict] = useState(
    details.conflictType !== 'no conflicts' && 
    ['rto conflict', 'shift conflict' , 'global consecutive hours conflict'].includes(details.conflictType)
  );
  const progressValues = {
    day:{
      value: (details.calculatedDailyHours / details.dailyHours)*100,
      color: (details.calculatedDailyHours / details.dailyHours)*100 > 100 ? '#AA421D' : '#0D7DF8'
    },
    week:{
      value: (details.calculatedWeeklyHours / details.weeklyHours)*100,
      color: (details.calculatedWeeklyHours / details.weeklyHours)*100 > 100 ? '#AA421D' : '#0D7DF8'
    }
  }
  const message = useMemo(() => {
    let message = '';
    if (details.conflictType !== 'no conflicts') {
      switch (details.conflictType) {
        case 'rto conflict':
          setIsConflict(true);
          message = "Can't be scheduled because of a RTO conflict";
          break;
        case 'shift conflict':
          setIsConflict(true);
          message = "Can't be scheduled because of a shift conflict";
          break;
        case 'position buffer issue':
          message = `Buffer conflict with the position ${details.deptName}`;
          break;
        case 'shift template buffer issue':
          message = 'Shift template buffer conflict';
          break;
        case 'global consecutive hours conflict':
          message = 'Global consecutive hours conflict';
          break;
        case 'daily hours met or exceeded':
        case 'daily hours exceeded':
          message = `Scheduled for ${convertHoursToHoursAndMinutes(details.calculatedDailyHours)} and is allowed daily ${convertHoursToHoursAndMinutes(details.dailyHours)} based on availability settings.`;
          break;
        case 'doubles not allowed':
          message = 'Doubles not allowed';
          break;
        case 'weekly hours exceeded':
        case 'weekly hours met or exceeded':
          message = `Scheduled for ${convertHoursToHoursAndMinutes(details.calculatedWeeklyHours)} and is allowed weekly ${convertHoursToHoursAndMinutes(details.weeklyHours)} based on availability settings.`;
          break;
        case 'global gap conflict':
          message = 'This employee would need to larger break between shifts, based on your settings.';
          break;
        case 'global doubles not allowed':
          message = 'Global Doubles are not allowed.';
          break;
        case 'global daily hours met or exceeded':
        case 'global daily hours exceeded':
          message = `Scheduled for ${convertHoursToHoursAndMinutes(details.calculatedWeeklyHours)} and is allowed global daily ${convertHoursToHoursAndMinutes(details.weeklyHours)} based on availability settings.`;
              break;
        case 'global weekly hours met or exceeded':
        case 'global weekly hours exceeded':
          message = `Scheduled for ${convertHoursToHoursAndMinutes(details.calculatedWeeklyHours)} and is allowed global weekly  ${convertHoursToHoursAndMinutes(details.weeklyHours)} based on availability settings.`;
              break;
        default:
          message = 'Scheduling conflict detected';
      }
    }
    return message ;
  },[details]);
  const hoursMessage = (details.conflictType !== 'no conflicts') ? (
    <div className={`CircularPro p-1 fontSize12 ${styles.failureRed} `}>
      <FontAwesomeIcon icon={faThumbsDown} /> {message}.
    </div>
  ) : (
    <div className={`CircularPro p-1 fontSize12 ${styles.sucessGreen} `}>
      <FontAwesomeIcon icon={faThumbsUp} /> Looks good! John can work this
      shift.
    </div>
  );

  const [isChecked, setIsChecked] = useState(false)
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    e.stopPropagation();
  };


  return (
    <>
      {props.type === 'add' && 
        <Accordion defaultActiveKey={null}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="pt-1 ps-1">
            <div className="d-flex flex-column w-100 pb-2">
              {hoursMessage}
              <div className="d-flex flex-row mt-1 mb-2 align-items-center">
                <div className="mx-2">
                  <ProfilePictures
                    imageUrls={[profilePicture(details.encryptedEmployeeEmail)]}
                    dimensions={65}
                  />
                </div>
                <div className={`ms-1 mt-2 CircularPro ${styles.employeeFullName}`}>
                  <div className="CircularProBold">
                    <h6 className="mb-0">{details.employeeFullName}</h6>
                  </div>
                  <div className={`${styles.mailTo} text-decoration-none`}>
                    <a
                      href={`mailto:${details.employeeEmail}`}
                    >
                      {details.employeeEmail}
                    </a>
                  </div>
                  <div className='fontSize10'>
                    <small className={`${styles.lightGray}`}>Requested : </small>
                    <span>{details.requestedTimeDuration} ago</span>
                  </div>
                </div>
                <div className="flex-grow-1"></div>
                <div className="mx-2" style={{ width: '75px', height: '75px' }}>
                {!isConflict && (
                  <CircularProgressbarWithChildren
                  value={progressValues.day.value}
                  strokeWidth={5}
                  styles={buildStyles({
                    textColor: '#262626',
                    pathColor: progressValues.day.color,
                    trailColor: '#e0e0e0',
                  })}
                >
                  Day<strong>{details.calculatedDailyHours}h</strong>{details.dailyHours}h
                </CircularProgressbarWithChildren>
                )}
                </div>
                <div style={{ width: '75px', height: '75px' }}>
                {!isConflict && (
                  <CircularProgressbarWithChildren
                  value={progressValues.week.value}
                  strokeWidth={5}
                  styles={buildStyles({
                    textColor: '#262626',
                    pathColor: progressValues.week.color,
                    trailColor: '#e0e0e0',
                  })}
                >
                  Week<strong>{details.calculatedWeeklyHours}h</strong>{details.weeklyHours}h
                </CircularProgressbarWithChildren>
                )}
                </div>
                <div className="ms-3 d-flex flex-column" style={{ gap: '4px' }}>
                {!isConflict && (
                  <ActionButton
                  onClick={(e) => {
                    e.stopPropagation(); 
                    props.handleApprove(details);
                  }}
                  backgroundColor={'#28A745'}
                  icon={'check'}
                  ariaLabel={'Approve Add Request'}
                />
                )}
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation(); 
                      props.handleDecline(details);
                    }}
                    backgroundColor={'#AA421D'}
                    icon={'xmark'}
                    ariaLabel={'Decline Add Request'}
                  />
                </div>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="CircularPro">
            <div className={`row ${styles.fontSize12}`}>
              <div className="col-2"></div>
              <div className="col-8 px-0 addDetails">
                <div>
                  <FontAwesomeIcon icon={faClock} /> Requested on {formatISOToLocalDateTime(details.requestedOn)}
                </div>
                <div>
                  <FontAwesomeIcon icon={faStar} /> Priority {details.priorityRank}
                </div>
                {details.isViewAccessOnCalculatedWage ? <div>
                  <FontAwesomeIcon icon={faSackDollar} /> ${details.hourlyWage} hr / ${details.calculatedWage} shift
                </div> : ''}
                <div>
                  <FontAwesomeIcon
                    icon = {details.calculatedDailyHours < details.dailyHours ? regularFaCircleCheck : regularFaCircleXmark}
                    style={{ color: details.calculatedDailyHours < details.dailyHours ? '#28a745' : '#AA421D' }}
                  /> {details.calculatedDailyHours} of {details.dailyHours} hours scheduled for global daily max.
                </div>
                <div>
                  <FontAwesomeIcon
                    icon = {details.calculatedWeeklyHours < details.weeklyHours ? regularFaCircleCheck : regularFaCircleXmark}
                    style={{ color: details.calculatedWeeklyHours < details.weeklyHours ? '#28a745' : '#AA421D' }}
                  /> {details.calculatedWeeklyHours} of {details.weeklyHours} hours scheduled for global weekly max.
                </div>
              </div>
              <div
                className="col-2 px-0"
                style={{ textAlign: 'end', color: '#0D7DF8' }}
              > View Settings
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      }
      {props.type === 'drop' && 
        <Accordion defaultActiveKey={null}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className='row'>
              <div className='col-1' onClick={(e) => { e.stopPropagation() }} style={{
                backgroundColor: isChecked ? '#28A745' : 'transparent',
                padding: '0px',
                margin: '0px',
                width: '29px',
                marginLeft: '0.625rem',
                height: 'auto',
                borderBottomLeftRadius: '4px',
                borderTopLeftRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <input type='checkbox' class="custom-checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
              </div>
              <div className='col-11'>
                <div className="d-flex flex-column w-100">
                  {hoursMessage}
                  <div className="d-flex flex-row mt-1 mb-2 align-items-center">
                    <div className="mx-2">
                      <ProfilePictures
                        imageUrls={[profilePicture(details.encryptedEmployeeEmail)]}
                        dimensions={75}
                      />
                    </div>
                    <div className={`ms-1 mt-2 CircularPro ${styles.employeeFullName}`} style={{width:'18rem'}}>
                      <div className="CircularProBold">
                        <h6 className="mb-0">{details.employeeFullName}</h6>
                      </div>
                      <div className={`${styles.mailTo} text-decoration-none`}>
                        <a
                          href={`mailto:${details.employeeEmail}`}
                        >
                          {details.employeeEmail}
                        </a>
                      </div>
                      <div>
                        <small className={`${styles.lightGray}`}>Requested : </small>
                        <span>{details.requestedTimeDuration} ago</span>
                      </div>
                    </div>
                    <div className="d-flex flex-grow-1">
                    <div className="mx-2" style={{ width: '85px', height: '85px' }}>
                      {!isConflict && (
                        <CircularProgressbarWithChildren
                          value={progressValues.day.value}
                          strokeWidth={5}
                          styles={buildStyles({
                            textColor: '#262626',
                            pathColor: progressValues.day.color,
                            trailColor: '#e0e0e0',
                          })}
                        >
                          Day<strong>{details.calculatedDailyHours}h</strong>{details.dailyHours}h
                        </CircularProgressbarWithChildren>
                      )}
                    </div>
                    <div style={{ width: '85px', height: '85px' }}>
                      {!isConflict && (
                        <CircularProgressbarWithChildren
                          value={progressValues.week.value}
                          strokeWidth={5}
                          styles={buildStyles({
                            textColor: '#262626',
                            pathColor: progressValues.week.color,
                            trailColor: '#e0e0e0',
                          })}
                        >
                          Week<strong>{details.calculatedWeeklyHours}h</strong>{details.weeklyHours}h
                        </CircularProgressbarWithChildren>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="CircularPro">
            <div className={`row ${styles.fontSize12}`}>
              <div className="col-2"></div>
              <div className="col-8 px-0 addDetails">
                <div>
                  <FontAwesomeIcon icon={faClock} /> Requested on {formatISOToLocalDateTime(details.requestedOn)}
                </div>
                <div>
                  <FontAwesomeIcon icon={faStar} /> Priority ${details.priorityRank}
                </div>
                {details.isViewAccessOnCalculatedWage ? <div>
                  <FontAwesomeIcon icon={faSackDollar} /> ${details.hourlyWage} hr / ${details.calculatedWage} shift
                </div> : ''}
                <div>
                  <FontAwesomeIcon
                    icon={regularFaCircleCheck}
                    style={{ color: '#28a745' }}
                  /> {details.calculatedDailyHours} of {details.dailyHours} hours scheduled for global daily max.
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={regularFaCircleCheck}
                    style={{ color: '#28a745' }}
                  /> {details.calculatedWeeklyHours} of {details.weeklyHours} hours scheduled for global weekly max.
                </div>
              </div>
              <div
                className="col-2 px-0"
                style={{ textAlign: 'end', color: '#0D7DF8' }}
              > View Settings
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      }
    </>
    
    
  );
}

export default EmployeeRequestDetails;
