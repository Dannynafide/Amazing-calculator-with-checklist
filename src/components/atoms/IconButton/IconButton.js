import {useState} from 'react';
import PropTypes from 'prop-types';

import RippleEffect from 'components/other/RippleEffect/RippleEffect';
import './iconButton.scss';

export default function IconButton(props) {
  const {children, className, onClick, color} = props;
  const [isMouseHover, setMouseHover] = useState(false);

  // EN - Functions responsible for changing the color when hovering over the mouse.
  // PL - Funkcje odpowiedzialne za zmianę koloru po najechaniu myszką
  const handleMouseEnter = () => setMouseHover(true);
  const handleMouseLeave = () => setMouseHover(false);

  const styles = {
    color: isMouseHover ? color : null,
  };

  return (
    <button
      className={`buttonIcon ${className}`}
      type="button"
      style={styles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <RippleEffect />
    </button>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
};

IconButton.defaultProps = {
  className: null,
  color: null,
};
