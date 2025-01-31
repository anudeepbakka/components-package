import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './customStyles.scss'

const SearchInput = ({ placeholder = 'Search', onChange ,value}) => {
  return (
    <InputGroup className="" style={{width: '250px',height: '15px'}}>
      <InputGroup.Text className="bg-white border-end-0 pe-1" >
        <FontAwesomeIcon icon={faSearch} className="text-muted" />
      </InputGroup.Text>
      <Form.Control
        placeholder={placeholder}
        aria-label="Search"
        className="border-start-0 shadow-none ps-1 CircularPro searchBar"
        onChange={onChange}
        value={value}
      />
    </InputGroup>
  );
};

export default SearchInput;