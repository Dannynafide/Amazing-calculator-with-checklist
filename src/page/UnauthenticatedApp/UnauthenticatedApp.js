import {useState} from 'react';

import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
// import MainTemplate from '../../templates/MainTemplate/MainTemplate';

function UnauthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);

  const replacement = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {isLogin ? (
        <LoginPage replacement={replacement} />
      ) : (
        <RegisterPage replacement={replacement} />
      )}
    </div>
  );
}

export default UnauthenticatedApp;
