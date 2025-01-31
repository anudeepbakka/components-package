import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToastNotication({ id, show, type, title, message, toggleShowToast }) {
    const [showToast, setShowToast] = useState(show);

    useEffect(() => {
        setShowToast(show);
    }, [show, id]);

    let delay = 3000;
    if (type === 'error') {
        delay = 60000;
    }
    function closeToast() {
        setShowToast(false);
        // todo: everywhere the toast being rendered should get toast close event from parent itself
        // setting true from parent, making false inside the toast is not recommendable,
        // popups can't open multiple times even if needed in the same parent
        if (toggleShowToast) toggleShowToast(false);
    }
    return (
        <>
            {title !== ''
                && (
                    <ToastContainer className="p-3 position-fixed" position="top-end">
                        <Toast onClose={closeToast} show={showToast} delay={delay} autohide animation="true">
                            <Toast.Header>
                                <strong className="me-auto">{title}</strong>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                            </Toast.Header>
                            <Toast.Body>{message}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )}
        </>
    );
}
