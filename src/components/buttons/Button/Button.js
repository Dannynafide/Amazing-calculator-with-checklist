import PropTypes from 'prop-types';
import colors from '../../../theme/colors.scss';
import RippleEffect from '../../RippleEffect/RippleEffect';
import './button.scss';

export default function Button(props) {
  const {secondary, className, onClick, disabled, type, children} = props;
  const styled = secondary ? {background: colors.secondary} : null;

  return (
    <button
      className={`btn-ripple-effect ${className}`}
      type={type === 'submit' ? 'submit' : 'button'}
      style={styled}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <RippleEffect />
    </button>
  );
}

Button.propTypes = {
  secondary: PropTypes.bool,
  className: PropTypes.string,
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
  className: null,
  type: 'button',
  onClick: null,
  disabled: false,
};
