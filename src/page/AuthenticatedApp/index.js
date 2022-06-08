import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import {CalculatorProvider} from '../../context/calculatorContext';
import EditProjetPage from './EditProjectPage';
import EditItemPage from './EditItemPage';

function AuthenticatedApp() {
  return (
    <CalculatorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="calculation" element={<HomePage />}>
            <Route path=":calculationId" element={<HomePage />} />
          </Route>
          <Route path="edit-project">
            <Route path=":calculationId" element={<EditProjetPage />} />
          </Route>
          <Route path="edit-item">
            <Route path=":calculationId">
              <Route path=":itemId" element={<EditItemPage />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <main style={{padding: '1rem'}}>
                <p>Theres nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </CalculatorProvider>
  );
}

export default AuthenticatedApp;
