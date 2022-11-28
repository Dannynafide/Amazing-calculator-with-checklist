import {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {MdExitToApp, MdDelete, MdCreate} from 'react-icons/md';

import {useAuth} from 'context/authContext';
import {useCalculatorState} from 'context/calculatorContext';
import Button from 'components/buttons/Button/Button';
import IconButton from 'components/buttons/IconButton/IconButton';
import colors from 'theme/colors.scss';
import HamburgerIcon from './HamburgerIcon/HamburgerIcon';
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
        <p>{nameProject || 'Brak nazwy'}</p>
        <IconButton
          onClick={handleDropdown}
          className="appbar__accordion--hamburger"
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
  const {getProjectsSummary, addProject, removeProject} = useCalculatorState();
  const navigate = useNavigate();

  // Get all project names and their costs
  const projectsSummary = getProjectsSummary();

  // Add a new project
  const handleAddProject = () => {
    props.handleDropdown();
    const projetdId = addProject();
    navigate(`/calculation/${projetdId}`, {replace: false});
  };

  // Remove the project
  const {calculationId} = useParams();
  const handleRemoveProject = (id) => {
    const newState = removeProject(id);
    if (id === calculationId) {
      if (newState.length > 0) {
        navigate(`/calculation/${newState[0].id}`, {replace: false});
      } else {
        navigate(`/`, {replace: false});
      }
    }
  };

  // Rename the project
  const handleRenameProject = (id) => {
    navigate(`/edit-project/${id}`, {replace: false});
  };

  return (
    <div ref={props.dropdownRef} className="appbar__dropdown">
      <div className="appbar__dropdown--wrapper-buttons">
        <Button secondary onClick={handleAddProject}>
          Dodaj nowy projekt
        </Button>
        <Button onClick={logout}>
          Logout
          <MdExitToApp className="mdExitToApp" size="16px" />
        </Button>
      </div>
      <ul className="appbar__dropdown--projects-list">
        {projectsSummary.map((item) => (
          <li className="projects-list__item" key={item.id}>
            <IconButton onClick={() => handleRenameProject(item.id)}>
              <MdCreate />
            </IconButton>
            <Link
              to={`/calculation/${item.id}`}
              className="projects-list__item--name"
              onClick={props.handleDropdown}
            >
              {item.name || 'Brak nazwy'}
            </Link>
            <span className="projects-list__item--cost">{item.cost}</span>
            <IconButton
              onClick={() => handleRemoveProject(item.id)}
              color={colors.error}
            >
              <MdDelete />
            </IconButton>
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
