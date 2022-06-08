import PropTypes from 'prop-types';
import './nav.scss';
import ButtonNav from './ButtonNav/ButtonNav';

export default function Nav(props) {
  const {mainPage, setMainPage} = props;
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <ButtonNav active={!mainPage} onClick={() => setMainPage(true)}>
            Lets calc!
          </ButtonNav>
        </li>
        <li>
          <ButtonNav active={mainPage} onClick={() => setMainPage(false)}>
            Lets check!
          </ButtonNav>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  mainPage: PropTypes.bool.isRequired,
  setMainPage: PropTypes.func.isRequired,
};
