import { useState } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import styles from './components.module.scss';

const FilterDropdown = ({ title  ,dropDownLabel, options, onChange ,setSearchColumn ,type}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setSearchColumn ? setSearchColumn(value) : {};
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      {type === 'radio' ? (
        <DropdownButton
          id="dropdown-item-button"
          className={styles.dropDown}
          title={title}
        >
          {dropDownLabel && (
            <Dropdown.ItemText className="pb-0">{dropDownLabel}</Dropdown.ItemText>
          )}
          {options.map((option, index) => (
            <Dropdown.Item
              as="button"
              className={`d-flex align-items-center ${index === 0 ? 'pb-0' : 'pt-0'}`}
              key={option}
            >
              <Form.Check
                type="radio"
                id={option}
                label={option}
                checked={selectedOption === option}
                onChange={() => handleSelect(option)}
                className="me-2"
              />
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <Form.Group className={styles.dropDown}>
          <Form.Select 
            value={selectedOption} 
            onChange={(e) => handleSelect(e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
    </>
  );
  
  
};

export default FilterDropdown;


// import { useState } from 'react';
// import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
// import styles from './components.module.scss';

// const FilterDropdown = ({ 
//   title, 
//   dropDownLabel, 
//   options, 
//   onChange, 
//   setSearchColumn, 
//   type = 'radio' 
// }) => {
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const handleSelect = (value) => {
//     setSelectedOption(value);
//     setSearchColumn ? setSearchColumn(value) : {};
//     if (onChange) {
//       onChange(value); // Trigger the callback with the selected option
//     }
//   };

//   if (type === 'radio') {
//     return (
//       <DropdownButton
//         id="dropdown-item-button"
//         className={styles.dropDown}
//         title={title}
//       >
//         <Dropdown.ItemText className="pb-0">{dropDownLabel}</Dropdown.ItemText>
//         {options.map((option, index) => (
//           <Dropdown.Item
//             as="button"
//             className={`d-flex align-items-center ${index === 0 ? 'pb-0' : 'pt-0'}`}
//             key={option}
//           >
//             <Form.Check
//               type="radio"
//               id={option}
//               label={option}
//               checked={selectedOption === option}
//               onChange={() => handleSelect(option)}
//               className="me-2"
//             />
//           </Dropdown.Item>
//         ))}
//       </DropdownButton>
//     );
//   }

//   if (type === 'select') {
//     return (
//       <Form.Group className={styles.dropDown}>
//         {dropDownLabel && <Form.Label>{dropDownLabel}</Form.Label>}
//         <Form.Select 
//           value={selectedOption} 
//           onChange={(e) => handleSelect(e.target.value)}
//         >
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </Form.Select>
//       </Form.Group>
//     );
//   }

//   return null;
// };

// export default FilterDropdown;