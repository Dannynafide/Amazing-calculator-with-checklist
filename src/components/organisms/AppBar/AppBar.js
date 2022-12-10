import {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useParams, useNavigate} from 'react-router-dom';
import {MdExitToApp} from 'react-icons/md';

import {useAuth} from 'context/authContext';
import {useCalculatorState} from 'context/calculatorContext';
import Button from 'components/atoms/Button/Button';
import IconButton from 'components/atoms/IconButton/IconButton';
import ProjectListItem from 'components/molecules/ProjectListItem/ProjectListItem';
import HamburgerIcon from './components/HamburgerIcon/HamburgerIcon';
import './appBar.scss';

export default function AppBar() {
  // Application bar opening state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to open the application bar
  const handleDropdown = () => {
    setOpen(!open);
    dropdownRef.current.className = `appbar__dropdown ${
      open ? 'appbar__dropdown--close' : 'appbar__dropdown--open'
    }`;
  };

  // Get the name of the current project
  const {calculationId} = useParams();
  const {getProjectsSummary} = useCalculatorState();
  const nameProject = getProjectsSummary().find(
    (item) => item.id === calculationId
  )?.name;

  return (
    <div className="appbar">
      <div className="appbar__accordion">
        <p>{nameProject || 'No name'}</p>
        <IconButton
          onClick={handleDropdown}
          className="appbar__accordion__hamburger"
        >
          <HamburgerIcon checked={open} />
        </IconButton>
      </div>
      <Dropdown dropdownRef={dropdownRef} handleDropdown={handleDropdown} />
    </div>
  );
}

function Dropdown(props) {
  const {logout} = useAuth();
  const {getProjectsSummary, addProject} = useCalculatorState();
  const navigate = useNavigate();

  // Get all project names and their costs
  const projectsSummary = getProjectsSummary();

  // Add a new project
  const handleAddProject = () => {
    props.handleDropdown();
    const projetdId = addProject();
    navigate(`/calculation/${projetdId}`, {replace: false});
  };

  return (
    <div ref={props.dropdownRef} className="appbar__dropdown">
      <div className="appbar__dropdown__wrapper-buttons">
        <Button secondary onClick={handleAddProject}>
          Dodaj nowy projekt
        </Button>
        <Button onClick={logout} icon={<MdExitToApp />}>
          Logout
        </Button>
      </div>

      <ul className="appbar__dropdown__projects-list">
        {projectsSummary.map((item) => (
          <li key={item.id}>
            <ProjectListItem
              id={item.id}
              name={item.name}
              totalCost={item.cost}
              closeMenu={props.handleDropdown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  dropdownRef: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object))
    .isRequired,
  handleDropdown: PropTypes.func.isRequired,
};
