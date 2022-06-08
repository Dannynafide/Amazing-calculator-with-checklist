import PropTypes from 'prop-types';
import {AuthProvider} from './authContext';
// import {UserProvider} from './userContext';

// <AuthProvider /> jest odpowiedzialny za ładowanie danych aplikacji
// (jeśli token uwierzytelniania użytkownika znajduje się już w localStorage,
// możemy po prostu pobrać dane użytkownika za pomocą tego tokena).

// <UserProvider /> jest odpowiedzialny za aktualizowanie danych
// użytkownika w pamięci i na serwerze, ponieważ wprowadzamy zmiany
// w danych użytkownika (takich jak jego adres e-mail/bio/itd.).

function AppProviders({children}) {
  return (
    <AuthProvider>
      {children}
      {/* <UserProvider>{children}</UserProvider> */}
    </AuthProvider>
  );
}

export default AppProviders;

AppProviders.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
