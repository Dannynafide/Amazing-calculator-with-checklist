import {useParams, Link, useNavigate} from 'react-router-dom';
import {MdDelete, MdCreate} from 'react-icons/md';
import PropTypes from 'prop-types';

import IconButton from 'components/atoms/IconButton/IconButton';
import {useCalculatorState} from 'context/calculatorContext';
import colors from 'theme/colors.scss';
import './projectListItem.scss';

export default function ProjectListItem(props) {
  const {id, name, totalCost, closeMenu} = props;
  const navigate = useNavigate();
  const {removeProject} = useCalculatorState();
  const {calculationId} = useParams();

  // Go to rename the project
  const goToRenameProject = (projectId) => {
    navigate(`/edit-project/${projectId}`, {replace: false});
  };

  // Remove the project
  const handleRemoveProject = (projectId) => {
    const newState = removeProject(projectId);
    if (projectId === calculationId) {
      if (newState.length > 0) {
        navigate(`/calculation/${newState[0].projectId}`, {replace: false});
      } else {
        navigate(`/`, {replace: false});
      }
    }
  };

  return (
    <div className="projects-list__item">
      <IconButton onClick={() => goToRenameProject(id)}>
        <MdCreate />
      </IconButton>

      <Link
        to={`/calculation/${id}`}
        className="projects-list__item__name"
        onClick={closeMenu}
      >
        {name || 'No name'}
      </Link>

      <span className="projects-list__item__cost">{totalCost}</span>

      <IconButton onClick={() => handleRemoveProject(id)} color={colors.error}>
        <MdDelete />
      </IconButton>
    </div>
  );
}

ProjectListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  totalCost: PropTypes.number,
  closeMenu: PropTypes.func,
};

ProjectListItem.defaultProps = {
  id: null,
  name: null,
  totalCost: 0,
  closeMenu: null,
};
