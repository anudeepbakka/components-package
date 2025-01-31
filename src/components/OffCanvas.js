import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OffcanvasComponent = ({ children, title, placement = 'end' , isOpen , onClose,offset = 0,width = 40 }) => {
  const style = {
    width: `${width}rem`,
    transform: `translateX(-${offset}px)`,
    transition: 'transform 0.4s ease-out'
};
  

  return (
    <>
      <Offcanvas show={isOpen} onHide={onClose} placement={placement} style={style}>
        <Offcanvas.Header closeButton className='CircularProBold'>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{borderTop:'1px solid #CCCCCC'}}>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasComponent;