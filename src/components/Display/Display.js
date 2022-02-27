import PropTypes from 'prop-types';

export default function Button(props) {
  return <span type="button">{props.value}</span>;
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
};
