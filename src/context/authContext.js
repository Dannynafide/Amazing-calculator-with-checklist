import PropTypes from 'prop-types';
import React, {useState, useMemo} from 'react';

import * as authClient from 'utils/auth-client';

const AuthContext = React.createContext({
  user: null,
  isPending: false,
  error: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});
AuthContext.displayName = 'AuthContext';

export function AuthProvider(props) {
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);

  const reload = async () => {
    setIsPending(true);
    try {
      setUser(await authClient.getUser());
    } catch (error) {
      // console.log('error', error);
    }
    setIsPending(false);
  };

  React.useEffect(() => {
    reload();
  }, []);

  const login = (email, password) =>
    authClient
      .login(email, password)
      .then(reload)
      .catch(() => {
        // .catch((error) => {
        // console.log('error', error);
      });

  const register = (email, password) =>
    authClient
      .register(email, password)
      .then(reload)
      .catch(() => {
        // .catch((error) => {
        // console.log('error', error);
      });

  const logout = () => authClient.logout().then(reload);

  const memoedValue = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={memoedValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
