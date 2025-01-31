import { Modal } from 'react-bootstrap'
import Loader from './loader'

function ModalLoader({show}) {
  return (
    <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        data-testid="GlobalDataLoader"
      >
        <Modal.Body>
          <div className="w-300">
            <Loader />
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default ModalLoader