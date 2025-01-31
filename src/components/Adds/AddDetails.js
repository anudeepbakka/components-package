import ProfilePictures from '../ProfilePictures';
import ShiftDetailsWithTime from '../ShiftDetails/ShiftDetailsWithTime';
import LabelValue from '../LabelValue';
import styles from '../components.module.scss';
import { useState } from 'react';
import { profilePicture } from '../../utils/profilePictures';
import AddShiftDetails from './AddShiftDetails';
import { getShiftAddDetails } from '../../store/actions/shiftAddActions';
import ModalLoader from '../ModalLoader';
import ActionButton from '../ActionButton';
import OffcanvasComponent from '../OffCanvas';
import OffcanvasHandler from '../../utils/OffCanvasHandler';

function AddDetails(props) {
  const imageUrls = props.details.profile.imageUrls;

  const shiftDetailsProps = props.details.shiftDetails;

  const shiftBeginsin = props.details.labelValues[0];

  const requested = props.details.labelValues[1];

  const employeeDetails = props.details.employeeDetails;
  const [showDetails, setShowDetails] = useState(false);
  const [modalLoaderShow  ,setModalLoaderShow] = useState(false);
  const actionButton = props.details.actionButton;
  
  const [offcanvasState, setOffcanvasState] = useState([]);
    
    const handleOffcanvas = (action, id, params = {}) => {
        const newState = OffcanvasHandler(action, id, offcanvasState, params);
        setOffcanvasState(newState);
    };

  const handleActionButtonClick = async (e) => {
    e.stopPropagation();
    setModalLoaderShow(true);
    const payLoadData = {
      ShiftId: shiftDetailsProps.shiftId,
      DeptId: shiftDetailsProps.deptId,
      StartTime: shiftDetailsProps.startTime,
      EndTime: shiftDetailsProps.endTime,
      IsConflict: shiftDetailsProps.status,
      ShiftTemplateId: shiftDetailsProps.shiftTemplateId,
      EmployeeIds: employeeDetails.map(employee => employee.employeeId)
  };
    await getShiftAddDetails(payLoadData);
    setModalLoaderShow(false);
    handleOffcanvas('show', 'addShiftDetails');
  };

const handleClose = (id) => {
    handleOffcanvas('dismiss', id);
};

 

  return (
    <>
      <div
        className={`${styles.requestDetails} border d-flex flex-row m-3 my-2 p-3 align-items-center`}
      >
        <div
          className={styles.profilePictures}
          onMouseEnter={() => {
            setShowDetails(true);
          }}
          onMouseLeave={() => setShowDetails(false)}
        >
          <ProfilePictures
            imageUrls={imageUrls}
            requestedCount={shiftDetailsProps.requestedCount}
            dimensions={props.details.profile.dimensions}
          />
          {showDetails && (
            <div className={`${styles.employeeDetailsBox} p-3 ps-2`}>
              <p className="mb-2 ps-2s">
                {shiftDetailsProps.requestedCount} employees want to pick up
                this shift
              </p>
              {employeeDetails.slice(0, 6).map((employee, index) => (
                <div key={index} className="d-flex" style={{ gap: '3px' }}>
                  <img
                    key={index}
                    src={profilePicture(employee.encryptedEmail)}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = '/profile.png';
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: '50%',
                    }}
                  />
                  <p className="pt-1 mb-2">{employee.fullName}</p>
                </div>
              ))}
              {shiftDetailsProps.requestedCount > 6 && (
                <span
                  type="button"
                  style={{ color: '#30688C' }}
                  className="float-end"
                  onClick={handleActionButtonClick}
                >
                  View All {shiftDetailsProps.requestedCount}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="d-flex">
          <div className="ms-5">
            <ShiftDetailsWithTime {...shiftDetailsProps} />
          </div>
          <div className="d-flex flex-row mt-3">
            <LabelValue {...shiftBeginsin} />
            <LabelValue {...requested} />
          </div>
        </div>
        <div className="ms-auto d-flex align-items-center">
        <ActionButton {...actionButton} onClick={handleActionButtonClick} ariaLabel = {'view add request'}/>
        </div>
      </div>

      {offcanvasState.map((canvas) => {
                if (canvas.id === 'addShiftDetails') {
                    return (
                        <OffcanvasComponent
                            key={canvas.id}
                            isOpen={true}
                            onClose={() => handleClose(canvas.id)}
                            title="Add Shift Details"
                            placement="end"
                            width={34}
                        >
                            <AddShiftDetails
                              setModalLoaderShow = {setModalLoaderShow}
                              shiftDetailsProps={shiftDetailsProps}
                              onClose={() => {handleOffcanvas('dismiss', 'addShiftDetails');}}
                            />
                        </OffcanvasComponent>
                    );
                }
                return null;
            })}
      <ModalLoader show={modalLoaderShow} />
    </>
  );
}

export default AddDetails;
