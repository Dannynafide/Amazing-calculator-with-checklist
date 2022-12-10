import PropTypes from 'prop-types';

import './navButton.scss';

export default function ButtonNav({active, onClick, children}) {
  return (
    <button
      type="button"
      className={`nav-links__btn ${active || 'active'}`}
      onClick={onClick}
    >
      {children}
      <div className="nav-links__btn--underline" />
    </button>
  );
}

ButtonNav.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ButtonNav.defaultProps = {
  active: false,
};
