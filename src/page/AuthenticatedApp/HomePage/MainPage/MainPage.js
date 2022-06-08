import {useParams} from 'react-router-dom';
import Display from '../../../../components/Display/Display';
import History from '../../../../containers/History/History';
import Keypad from '../../../../containers/Keypad/Keypad';

function HomePage() {
  const params = useParams();
  const {calculationId} = params;

  return (
    <>
      <Display id={calculationId} />
      <History id={calculationId} />
      <Keypad id={calculationId} />
    </>
  );
}

export default HomePage;
