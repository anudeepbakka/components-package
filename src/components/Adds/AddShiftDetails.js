import { Col, Container, Row } from 'react-bootstrap'
import Button from '../../components/Button';
import EmployeeRequestDetails from '../EmployeeRequestDetails/EmployeeRequestDetails'
import SearchInput from '../SearchBar'
import ShiftDetails from '../ShiftDetails/ShiftDetails'
import InfoBar from '../InfoBar'
import styles from '../components.module.scss';
import { useSelector } from 'react-redux'
import { TimeFormatter } from '../../utils/dateUtils'
import FilterDropdown from '../DropDown'
import { useSortedShiftAvailability } from '../../customHooks/addRequestAvailabiltyHook'
import { useSearch } from '../../customHooks/searchCHook'
import { approveShiftAdd, declineShiftAdd } from '../../store/actions/shiftAddActions'
import availabilitySort from '../../Constants/constants'
// import { useState } from 'react'
//import SuccessToast from '../utils/toasts'

const sortOptions = Object.entries(availabilitySort).map(([key, value]) => ({
  key: key,
  text: value.text,
}));


function AddShiftDetails({ shiftDetailsProps, setModalLoaderShow, onClose }) {
  const shiftDetails = {
    positionColor: shiftDetailsProps.positionColor,
    shiftTitle: shiftDetailsProps.shiftTitle,
    positionName: shiftDetailsProps.positionName,
    shiftColor: shiftDetailsProps.shiftColor,
  };
  // const [showToast, setShowToast] = useState({
  //   show: false, type: 'success', title: '', message: '',
  // });
  const shiftAvailabilty = useSelector((state) => state.shiftAdds.shiftAddDetails);

  const message = shiftDetailsProps.requestedCount === 1
    ? `${shiftDetailsProps.requestedCount} employee is trying to add this shift`
    : `${shiftDetailsProps.requestedCount} employees are trying to add this shift`;

  const { searchText, setSearchText, filteredData } = useSearch(
    shiftAvailabilty, ['employeeFullName', 'employeeEmail', 'conflictType', 'deptName'], 300);
  const { sortedShiftAvailability, sortOption, setSortOption } = useSortedShiftAvailability(filteredData);
  console.log('shift: ', sortedShiftAvailability[0])


  const handleApprove = async (employeeDetails) => {
    try {
      setModalLoaderShow(true);
      const payload = {
        EmployeeId: employeeDetails.employeeKey,
        ShiftId: shiftDetailsProps.shiftId,
        EmployeeFullName: employeeDetails.employeeFullName,
        IsTask: shiftDetailsProps.status,
        StartTime: shiftDetailsProps.startTime,
        EndTime: shiftDetailsProps.endTime,
        DeptId: employeeDetails.deptKey
      }
      await approveShiftAdd(payload);
    } catch (error) {
      console.error('Failed to approve shift:', error);
    } finally {
      setTimeout(() => {
        setModalLoaderShow(false);
      }, 2000);
      // setShowToast({
      //   show: true, type: 'sucess', title: 'Shift Approved', message,
      // });
    }
  }

  const handleDecline = async (employeeDetails) => {
    try {
      setModalLoaderShow(true);
      const payload = {
        EmployeeId: employeeDetails.employeeKey,
        ShiftId: shiftDetailsProps.shiftId,
        EmployeeFullName: employeeDetails.employeeFullName,
        IsTask: shiftDetailsProps.status,
        StartTime: shiftDetailsProps.startTime,
        EndTime: shiftDetailsProps.endTime,
        DeptId: employeeDetails.deptKey
      }
      await declineShiftAdd(payload);
    } catch (error) {
      console.error('Failed to decline shift:', error);
    } finally {
      setTimeout(() => {
        setModalLoaderShow(false)
      }, 2000);
      // setShowToast({
      //   show: true, type: 'success', title: 'Shift Declined successfully', message,
      // });
    }
  }
  return (
    <>
      {/* {showToast.show && <SuccessToast show={showToast.show} type={showToast.type} title={showToast.title} message={showToast.message} setShowToast={setShowToast} />} */}
      <div className="d-flex flex-column h-100">
        <div className="flex-grow-1">
          <InfoBar type="info" icon="bell">
            {message}
          </InfoBar>
          <Container className={`p-2 ${styles.offcanvasShiftDetails} mt-3`}>
            <Row>
              <Col>
                <div>
                  <ShiftDetails {...shiftDetails} />
                </div>
              </Col>
              <Col className={`text-end CircularPro ${styles.shiftTime}`}>
                <div>
                  {shiftDetailsProps.date} {TimeFormatter(shiftDetailsProps.startTime)}
                </div>
                <div>
                  {shiftDetailsProps.date} {TimeFormatter(shiftDetailsProps.endTime)}
                </div>
                <div>{shiftDetailsProps.duration}</div>
              </Col>
            </Row>
          </Container>
          <Container className="CircularPro mt-3 lh-1">
            <p>
              <span className={styles.shiftTitle}>Shift Pickup Requests</span> <br />
              <span className={styles.shiftDescription}>
                The following employees have requested to pick up this shift. Choose one.
              </span>
            </p>
          </Container>
          <Container
            className={`${styles.addEmployeeSearch} p-2 d-flex flex-row`}>
            <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <FilterDropdown
              options={sortOptions.map(option => option.text)}
              onChange={(selectedOption) => setSortOption(sortOptions.find(option => option.text === selectedOption).key)}
              value={sortOption}
              type="select"
            />

          </Container>
          <div>
            {
              sortedShiftAvailability.map((shift, index) => (
                <div key={shift.id || index} className="mt-3">
                  <EmployeeRequestDetails
                    type='add'
                    handleApprove={handleApprove}
                    handleDecline={handleDecline}
                    details={shift}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <Container className="d-flex justify-content-between align-items-center p-3 ps-0 mt-auto">
          <Button size='md' onClick={onClose} type="close">Close</Button>
        </Container>
      </div>
    </>
  );
}

export default AddShiftDetails
