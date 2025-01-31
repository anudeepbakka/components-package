import { Row, Col } from 'react-bootstrap';
import styles from './components.module.scss';

const ShiftTradeActivity = () => {
    const activityData = [
        { period: 'Last 30 days', add: 3, drop: 3, swap: 6, create: 6 },
        { period: 'Last 90 days', add: 3, drop: 3, swap: 6, create: 6 },
        { period: 'Last Year', add: 3, drop: 3, swap: 6, create: 6 },
    ];

    return (
        <div className={`mt-2 pt-3 ${styles.shiftTradeActivityCard} border`}>
            <h6 className={`${styles.title} pt-0`}>Recent Shift Trade Activity</h6>
            <Row>
                {activityData.map((data, index) => (
                    <Col key={index} md={4} className={`${styles.column}`}>
                        <Row>
                            <p className="mb-1">{data.period}</p>
                            <Col>
                                <div className="d-flex justify-content-between">
                                    <span className={`${styles.label}`}>Add</span>
                                    <span className={`${styles.value}`}>{data.add}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className={`${styles.label}`}>Swap</span>
                                    <span className={`${styles.value}`}>{data.swap}</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-between">
                                    <span className={`${styles.label}`}>Drop</span>
                                    <span className={`${styles.value}`}>{data.drop}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className={`${styles.label}`}>Create</span>
                                    <span className={`${styles.value}`}>{data.create}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ShiftTradeActivity;
