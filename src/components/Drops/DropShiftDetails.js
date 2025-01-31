import { Col, Container, Row } from 'react-bootstrap';
import InfoBar from '../InfoBar';
import ShiftTradeActivity from '../ShiftTradeActivity';
import styles from '../components.module.scss';
import ProfilePictures from '../ProfilePictures';
import Button from '../../components/Button';
import ShiftDetails from '../ShiftDetails/ShiftDetails';
import { TimeFormatter } from '../../utils/dateUtils';
import SearchInput from '../SearchBar';
import FilterDropdown from '../DropDown';
import availabilitySort from '../../Constants/constants';
import EmployeeRequestDetails from '../EmployeeRequestDetails/EmployeeRequestDetails';

const activityData = [
  { period: 'Last 30 days', add: 3, drop: 3, swap: 6, create: 6 },
  { period: 'Last 90 days', add: 3, drop: 3, swap: 6, create: 6 },
  { period: 'Last Year', add: 3, drop: 3, swap: 6, create: 6 },
];

const shiftDetails = {
  shiftId: 'RPYQUlLrIIcVUD9GONWyXQ%3d%3d',
  deptId: 'aPOv5y%2bLEsA%3d',
  status: false,
  shiftTemplateId: 'BG672Gx%2bpXo%3d',
  positionColor: '#e0e0e0',
  shiftTitle: "'Name of Event' - Event Support",
  positionName: 'Message Test 2',
  shiftColor: '#e0e0e0',
  date: '03/04/2025',
  startTime: '2025-03-04T11:00:00',
  endTime: '2025-03-04T15:00:00',
  duration: '4 hours',
  requestedCount: 3
};

const shift = {
  employeeKey: 'cKHjoxrTPJ0%3d',
  employeeFullName: 'ak user',
  employeeEmail: 'ak@gmail.com',
  encryptedEmployeeEmail: 'HFAhE3Kq9mAn79gex/pdJQ==',
  conflictType: 'rto conflict',
  startTime: '2025-04-02T11:00:00',
  endTime: '2025-04-02T15:00:00',
  deptKey: 'aPOv5y%2bLEsA%3d',
  deptName: 'Message Test 2',
  companyName: 'SubItUp',
  requestedOn: '2024-12-10T15:01:34.567',
  requestedTimeDuration: '16 days 1 hour',
  dailyHours: 0,
  calculatedDailyHours: 0,
  weeklyHours: 0,
  calculatedWeeklyHours: 0,
  shiftCount: 0,
  isViewAccessOnCalculatedWage: true,
  hourlyWage: 0,
  calculatedWage: 0,
  priorityRank: 0,
  availabilityStatus: 'No Preference'
}
const sortOptions = Object.entries(availabilitySort).map(([key, value]) => ({
  key: key,
  text: value.text,
}));
const DropShiftDetails = ({ type, onClick }) => {
  if (type === 'drop') {
    return (
      <div className="d-flex flex-column" style={{ height: '100%' }}>
        <div className="flex-grow-1 overflow-auto">
          <InfoBar icon="bell">Ted would like to drop this shift</InfoBar>
          <ShiftTradeActivity activityData={activityData} />
          <Container className={`p-3 ${styles.offcanvasShiftDetails} mt-3`}>
            <Row>
              <Col className="CircularPro">
                <Row>
                  <Col xs={3}> {/* Use xs for better mobile responsiveness */}
                    <ProfilePictures
                      imageUrls={['./logo']}
                      dimensions={70}
                    />
                  </Col>
                  <Col>
                    <h5 className="CircularProBold mb-0">Ted Smith</h5>
                    <div>Bookshelf</div>
                    <div>Morning Manager</div>
                  </Col>
                </Row>
              </Col>
              <Col className="text-end CircularPro">
                <div>01/19/2024 8:00 AM</div>
                <div>01/19/2024 12:00 PM</div>
                <div>4 hours</div> {/* Added a div for consistent spacing */}
              </Col>
            </Row>
          </Container>
          <Container className="mt-3">
            <p className="CircularPro mb-0">Reason</p>
            <h5 className="CircularProBold">Family Emergency</h5>
          </Container>
          <Container className="CircularPro mt-3">
            <p className="CircularProBold mb-0">Employee Note</p>
            <p>
              Lorem ipsum dolor sit amet. Et maxime dolor ut perspiciatis
              laboriosam id itaque enim non perferendis ullam non quod maiores. Ut
              praesentium voluptatem qui voluptates consequatur et voluptas
              fugiat et soluta dolorum sed asperiores itaque aut magnam officia.
            </p>
          </Container>
        </div>

        <Container className="d-flex align-items-center p-3 mt-auto">
          <Button type="close">Close</Button>
          <div className="ms-auto d-flex gap-2">
            <Button type="decline">Deny</Button>
            <Button type="approve">Approve</Button>
            <Button type="primary" onClick={onClick}>Reassign</Button>
          </div>
        </Container>
      </div>
    );
  } else if (type === 'reassign') {
    return (
      <div className="d-flex flex-column h-100">
          <div className="flex-grow-1">
              <InfoBar type="info" icon="bell">
                  Reassign this shift to another employee
              </InfoBar>
              <Container className={`p-2 ${styles.offcanvasShiftDetails} mt-3`}>
                  <Row>
                      <Col>
                          <div>
                              <ShiftDetails {...shiftDetails} />
                          </div>
                      </Col>
                      <Col className="text-end CircularPro">
                          <div>
                              {shiftDetails.date} {TimeFormatter(shiftDetails.startTime)}
                          </div>
                          <div>
                              {shiftDetails.date} {TimeFormatter(shiftDetails.endTime)}
                          </div>
                          <div>{shiftDetails.duration}</div>
                      </Col>
                  </Row>
              </Container>
              <Container className="CircularPro mt-3">
                  <p>
                      Shift Pickup Requests <br />
                      The following employees have requested to pick up this shift. Choose one.
                  </p>
              </Container>
              <Container className={`${styles.addEmployeeSearch} p-2 d-flex flex-row`}>
                  <SearchInput />
                  <FilterDropdown options={sortOptions.map(option => option.text)} type="select" />
              </Container>
              <div className="mt-3">
                  <EmployeeRequestDetails
                      type="drop"
                      handleApprove={(e) => console.log('approved')}
                      handleDecline={(e) => console.log('decline')}
                      details={shift}
                  />
              </div>
          </div>
          <Container className="d-flex justify-content-between align-items-center p-3 mt-auto">
              <Button type="close">Close</Button>
              <Button type="approve">Reassign</Button>
          </Container>
      </div>
  );
  
  }
};

export default DropShiftDetails;