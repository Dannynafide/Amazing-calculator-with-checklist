import PropTypes from 'prop-types';
import './Input.scss';

export default function Input(props) {
  const {type, name, placeholder, onChange, value} = props;

  return (
    <input
      className="input"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  value: '',
};
