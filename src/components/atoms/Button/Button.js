import PropTypes from 'prop-types';

import RippleEffect from 'components/other/RippleEffect/RippleEffect';
import './button.scss';

export default function Button(props) {
  const {icon, secondary, type, onClick, children, disabled} = props;
  const secondButtonStyle = secondary && 'btn-ripple-effect--secondary';

  return (
    <button
      className={`btn-ripple-effect ${secondButtonStyle}`}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-ripple-effect__content">{children}</span>
      {icon && <span className="btn-ripple-effect__icon">{icon}</span>}
      <RippleEffect />
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  secondary: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  secondary: false,
  type: 'button',
  onClick: null,
  disabled: false,
  icon: null,
};
