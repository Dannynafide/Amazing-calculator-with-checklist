import {useParams} from 'react-router-dom';

import Display from 'components/atoms/Display/Display';
import History from 'components/molecules/History/History';
import Keypad from 'components/organisms/Keypad/Keypad';
import {useCalculatorState} from 'context/calculatorContext';

function HomePage() {
  const params = useParams();
  const {calculationId} = params;
  const {getResult} = useCalculatorState();

  return (
    <>
      <Display value={getResult(calculationId)} />
      <History id={calculationId} />
      <Keypad id={calculationId} />
    </>
  );
}

export default HomePage;
