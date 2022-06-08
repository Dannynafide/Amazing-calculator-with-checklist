import {useState} from 'react';
import PropTypes from 'prop-types';
import RippleEffect from '../../RippleEffect/RippleEffect';
import './iconButton.scss';

export default function IconButton(props) {
  const {children, className, onClick, color} = props;
  const [isHovering, setIsHovering] = useState(false);

  // Funkcje odpowiedzialne za zmianę koloru po najechaniu myszką
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const styles = {
    color: isHovering ? color : '',
  };

  return (
    <button
      className={`buttonIconRE ${className}`}
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
