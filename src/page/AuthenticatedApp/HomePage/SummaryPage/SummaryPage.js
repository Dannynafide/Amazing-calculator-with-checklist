import {useParams} from 'react-router-dom';
import Display from '../../../../components/Display/Display';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import History from '../../../../containers/History/History';
import {useCalculatorState} from '../../../../context/calculatorContext';
import {evaluateCalculator} from '../../../../helpers/mathFunc';
import './summaryPage.scss';

function SummaryPage() {
  const params = useParams();
  const {calculationId} = params;

  const {getData} = useCalculatorState();
  const data = getData(calculationId);

  let count = 0;
  let countComplite = 0;
  if (data) {
    data.forEach((item) => {
      const result = evaluateCalculator(item.value);

      count += result;
      if (item.complite) countComplite += result;
    });
  }

  return (
    <>
      <Display id={calculationId} />
      {count >= 1 ? (
        <>
          <div className="motto">
            <p>Don&apos;t get too lazy!</p>
            <p>start now!</p>
          </div>
          <ProgressBar progress={(countComplite / count) * 100} />{' '}
          <History id={calculationId} details />
        </>
      ) : (
        <div className="no-math-operation">
          Don&apos;t wait! <br />
          Add the first element 😀
        </div>
      )}
    </>
  );
}

export default SummaryPage;
