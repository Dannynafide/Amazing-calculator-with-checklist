import PropTypes from 'prop-types';

import AutoTextSize from 'components/other/AutoTextSize/AutoTextSize';
import './display.scss';

export default function Display(props) {
  const {value} = props;

  return (
    <div className="display">
      <div className="price">
        <div className="priceNumber">
          <AutoTextSize>{value}</AutoTextSize>
        </div>
      </div>
      <span className="underline" />
    </div>
  );
}

Display.propTypes = {
  value: PropTypes.number,
};

Display.defaultProps = {
  value: 0,
};
