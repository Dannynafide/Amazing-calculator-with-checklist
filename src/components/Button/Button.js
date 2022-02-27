import PropTypes from 'prop-types';

export default function Button(props) {
  return <button type="button">{props.value}</button>;
}

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
