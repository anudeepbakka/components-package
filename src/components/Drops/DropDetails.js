// import { useState } from 'react';
// import ActionButton from '../ActionButton';
// import styles from '../components.module.scss';
// import LabelValue from '../LabelValue';
// import ProfilePictures from '../ProfilePictures';
// import ShiftDetailsWithTime from '../ShiftDetails/ShiftDetailsWithTime';
// import DropShiftDetails from './DropShiftDetails';


// function DropDetails() {
//     const shiftDetailsProps = {
//         shiftId: 'RPYQUlLrIIcVUD9GONWyXQ%3d%3d',
//         deptId: 'aPOv5y%2bLEsA%3d',
//         status: false,
//         shiftTemplateId: 'BG672Gx%2bpXo%3d',
//         positionColor: '#e0e0e0',
//         shiftTitle: "'Name of Event' - Event Support",
//         positionName: 'Message Test 2',
//         shiftColor: '#e0e0e0',
//         date: '03/04/2025',
//         startTime: '2025-03-04T11:00:00',
//         endTime: '2025-03-04T15:00:00',
//         duration: '4 hours',
//         requestedCount: 3
//     };
//     const labelValues = [
//         {
//             label: 'Reason',
//             value: 'Injured',
//             valueColor: '#383838',
//             labelColor: '#8B8B8B',
//         },
//         {
//             label: 'Requested',
//             value: '2 days ago',
//             valueColor: '#AA421D',
//             labelColor: '#8B8B8B',
//         },
//         {
//             label: 'Shift begins in ',
//             value: '8 days',
//             valueColor: '#28A745',
//             labelColor: '#8B8B8B',
//             className: 'shiftBegins'
//         },
//         {
//             label: 'Shift Coverage',
//             value: '3 of 4 shifts are covered',
//             valueColor: '#383838',
//             labelColor: '#8B8B8B',
//         }
//     ]
//     return (

//         <>
//             <div className={`${styles.requestDetails} border d-flex flex-row m-3 my-2 p-3 align-items-center`}>
//                 <div className="d-flex align-items-start mb-4">
//                     <div>
//                         <ProfilePictures
//                             imageUrls={['./logo']}
//                             dimensions={40}
//                         />
//                     </div>
//                     <div className={`${styles.userDetails} ms-2 ${styles.shiftBegins}`}>
//                         <div className={styles.label}>
//                             Ted Smith
//                         </div>
//                         <div className={styles.value}>
//                             mssmith@gmail.com
//                         </div>
//                     </div>
//                 </div>

//                 <div className="d-flex align-items-end">
//                     <div className="ms-5" style={{ width: '22rem' }}>
//                         <ShiftDetailsWithTime {...shiftDetailsProps} />
//                     </div>
//                     <div className="d-flex flex-row mt-3">
//                         <LabelValue {...labelValues[0]} />
//                         <LabelValue {...labelValues[1]} />
//                         <LabelValue {...labelValues[2]} />
//                         <LabelValue {...labelValues[3]} />
//                     </div>
//                 </div>
//                 <div className='d-flex flex-row gap-2 ms-auto'>
//                 <ActionButton
//                   onClick={(e) => {
//                     e.stopPropagation(); 
//                   }}
//                   backgroundColor={'#AA421D'}
//                   icon={'xmark'}
//                   dimensions={2.3}
//                 />

//                 <ActionButton
//                 onClick={(e) => {
//                   e.stopPropagation(); 
//                 }}
//                 backgroundColor={'#28A745'}
//                 icon={'check'}
//                 dimensions={2.3}
//               />

//                 <ActionButton
//                     onClick={(e) => {
//                         e.stopPropagation(); 
//                     }}
//                     backgroundColor={'#30688C'}
//                     icon={'eye'}
//                     dimensions={2.3}
//                     />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default DropDetails

import { useState } from 'react';
import ActionButton from '../ActionButton';
import styles from '../components.module.scss';
import LabelValue from '../LabelValue';
import ProfilePictures from '../ProfilePictures';
import ShiftDetailsWithTime from '../ShiftDetails/ShiftDetailsWithTime';
import DropShiftDetails from './DropShiftDetails';
import OffcanvasHandler from '../../utils/OffCanvasHandler';
import OffcanvasComponent from '../OffCanvas';

function DropDetails() {
    const [offcanvasState, setOffcanvasState] = useState([]);
    
    const handleOffcanvas = (action, id, params = {}) => {
        const newState = OffcanvasHandler(action, id, offcanvasState, params);
        setOffcanvasState(newState);
    };

    const shiftDetailsProps = {
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

    const labelValues = [
        {
            label: 'Reason',
            value: 'Injured',
            valueColor: '#383838',
            labelColor: '#8B8B8B',
        },
        {
            label: 'Requested',
            value: '2 days ago',
            valueColor: '#AA421D',
            labelColor: '#8B8B8B',
        },
        {
            label: 'Shift begins in ',
            value: '8 days',
            valueColor: '#28A745',
            labelColor: '#8B8B8B',
            className: 'shiftBegins'
        },
        {
            label: 'Shift Coverage',
            value: '3 of 4 shifts are covered',
            valueColor: '#383838',
            labelColor: '#8B8B8B',
        }
    ];

    const handleViewClick = (e) => {
        e.stopPropagation();
        handleOffcanvas('show', 'dropShiftDetails');
    };

    const handleSecondOffcanvas = () => {
        handleOffcanvas('show', 'secondOffcanvas');
    };

    const handleClose = (id) => {
        handleOffcanvas('dismiss', id);
    };

    return (
        <>
            <div className={`${styles.requestDetails} border d-flex flex-row m-3 my-2 p-3 align-items-center`}>
                <div className="d-flex align-items-start mb-4">
                    <div>
                        <ProfilePictures
                            imageUrls={['./logo']}
                            dimensions={40}
                        />
                    </div>
                    <div className={`${styles.userDetails} ms-2 ${styles.shiftBegins}`}>
                        <div className={styles.label}>
                            Ted Smith
                        </div>
                        <div className={styles.value}>
                            mssmith@gmail.com
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-end">
                    <div className="ms-5" style={{ width: '22rem' }}>
                        <ShiftDetailsWithTime {...shiftDetailsProps} />
                    </div>
                    <div className="d-flex flex-row mt-3">
                        <LabelValue {...labelValues[0]} />
                        <LabelValue {...labelValues[1]} />
                        <LabelValue {...labelValues[2]} />
                        <LabelValue {...labelValues[3]} />
                    </div>
                </div>
                <div className='d-flex flex-row gap-2 ms-auto'>
                    <ActionButton
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        backgroundColor={'#AA421D'}
                        icon={'xmark'}
                        dimensions={2.3}
                        ariaLabel={'Decline Drop Request'}
                    />

                    <ActionButton
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        backgroundColor={'#28A745'}
                        icon={'check'}
                        dimensions={2.3}
                        ariaLabel={'Decline Drop Request'}
                    />

                    <ActionButton
                        onClick={handleViewClick}
                        backgroundColor={'#30688C'}
                        icon={'eye'}
                        dimensions={2.3}
                        ariaLabel={'View Drop Request'}
                    />
                </div>
            </div>

            {offcanvasState.map((canvas) => {
                if (canvas.id === 'dropShiftDetails') {
                    return (
                        <OffcanvasComponent
                            key={canvas.id}
                            isOpen={true}
                            onClose={() => handleClose(canvas.id)}
                            title="Drop Shift Details"
                            placement="end"
                            offset={canvas.offset}
                        >
                            <DropShiftDetails type={'drop'} onClick={handleSecondOffcanvas}/>
                        </OffcanvasComponent>
                    );
                }
                
                if (canvas.id === 'secondOffcanvas') {
                    return (
                        <OffcanvasComponent
                            key={canvas.id}
                            isOpen={true}
                            onClose={() => handleClose(canvas.id)}
                            title="Additional Details"
                            placement="end"
                            offset={canvas.offset}
                        >
                            <DropShiftDetails type={'reassign'} />
                        </OffcanvasComponent>
                    );
                }
                
                return null;
            })}
        </>
    );
}

export default DropDetails;