import PropTypes from 'prop-types';

import RippleEffect from 'components/RippleEffect/RippleEffect';
import './button.scss';

export default function Button(props) {
  const {children, onClick, value, className} = props;

  return (
    <button
      className={`keypad--button ${className || ''} `}
      type="button"
      value={value}
      onClick={onClick}
    >
      {children}
      <RippleEffect color="#fff" duration={1000} />
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  onClick: null,
  value: null,
};
