import PropTypes from 'prop-types';

import AppBar from 'components/organisms/AppBar/AppBar';
import './MainTemplate.scss';

export default function MainTemplate({children}) {
  return (
    <div className="main-template">
      <AppBar />
      <div className="main-template__calculator">{children}</div>
    </div>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
