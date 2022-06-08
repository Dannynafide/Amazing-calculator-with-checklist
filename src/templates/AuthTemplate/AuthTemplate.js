import PropTypes from 'prop-types';
import {IoMdLock} from 'react-icons/io';
import './authTemplate.scss';

export default function AuthTemplate({title, children}) {
  return (
    <div className="main-template">
      <div className="auth-template">
        <div className="auth-template__lock">
          <IoMdLock />
        </div>
        <div className="auth-template__title">{title}</div>
        {children}
      </div>
    </div>
  );
}

AuthTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
