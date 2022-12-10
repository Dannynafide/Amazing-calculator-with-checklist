import {useState} from 'react';

import Nav from 'components/molecules/Nav/Nav';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import SummaryPage from './SummaryPage/SummaryPage';
import MainPage from './MainPage/MainPage';

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
