import PropTypes from 'prop-types';

import './HamburgerIcon.scss';

export default function HamburgerIcon({checked}) {
  return (
    <label className="burger burger3" htmlFor="burger3">
      <input
        className="hidden"
        id="burger3"
        type="checkbox"
        checked={checked}
        readOnly
      />
      <span />
    </label>
  );
}

HamburgerIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
};
