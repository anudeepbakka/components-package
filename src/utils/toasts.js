import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function SuccessToast(props) {
    const [showToast, setShowToast] = useState(props.show);

    useEffect(() => {
        setShowToast(props.show);
    }, [props.show, props.id]);

    let delay = 3000;
    if (props.type === 'error') {
        delay = 60000;
    }
    function closeToast() {
        setShowToast(false);
        if (props.setShowToast) props.setShowToast(false);
    }
    return (
        <>
            {props.title !== ''
                && (
<ToastContainer className="p-3 position-fixed" position="top-end">
                    <Toast onClose={closeToast} show={showToast} delay={delay} autohide animation="true">
                        <Toast.Header>
                            <strong className="me-auto">{props.title}</strong>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                        </Toast.Header>
                        <Toast.Body>{props.message}</Toast.Body>
                    </Toast>
</ToastContainer>
)}
        </>
    );
}
