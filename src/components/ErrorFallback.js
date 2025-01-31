import { useEffect, useState } from 'react';
import ToastNotication from './Toast';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  const [showToast, setShowToast] = useState({
    show: false, type: 'success', title: '', message: '',
  });
  useEffect(() => {
    setShowToast({
      show: true, type: 'error', title: 'Something went wrong', message: error.message
    });
  }, [error]);
  return (
    showToast && <ToastNotication show={showToast.show} type={showToast.type} title={showToast.title} message={showToast.message} toggleShowToast={setShowToast} />
  );
}