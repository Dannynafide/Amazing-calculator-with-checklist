import {useState} from 'react';
import Nav from '../../../containers/Nav/Nav';
import SummaryPage from './SummaryPage/SummaryPage';
import MainPage from './MainPage/MainPage';
import MainTemplate from '../../../templates/MainTemplate/MainTemplate';

function HomePage() {
  const [mainPage, setMainPage] = useState(true);
  const page = mainPage ? <MainPage /> : <SummaryPage />;

  return (
    <MainTemplate>
      <Nav mainPage={mainPage} setMainPage={setMainPage} />
      <div>{page}</div>
    </MainTemplate>
  );
}

export default HomePage;
