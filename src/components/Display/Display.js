import PropTypes from 'prop-types';
import {useCalculatorState} from '../../context/calculatorContext';
import AutoTextSize from './AutoTextSize/AutoTextSize';
import './display.scss';

export default function Display(props) {
  const {id} = props;
  const {getResult} = useCalculatorState();

  return (
    <div className="display">
      <div className="price">
        <div className="priceNumber">
          <AutoTextSize>{getResult(id)}</AutoTextSize>
        </div>
      </div>
      <span className="underline" />
    </div>
  );
}

Display.propTypes = {
  id: PropTypes.string,
};

Display.defaultProps = {
  id: null,
};
