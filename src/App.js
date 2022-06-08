import React, {Suspense} from 'react';
import {useAuth} from './context/authContext';
import './theme/globalStyle.scss';

const AuthenticatedApp = React.lazy(() =>
  import('./page/AuthenticatedApp/index')
);
const UnauthenticatedApp = React.lazy(() =>
  import('./page/UnauthenticatedApp/UnauthenticatedApp')
);

function App() {
  const {user} = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
