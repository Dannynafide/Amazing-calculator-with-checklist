import axios from 'axios';

const localStorageToken = '__bookshelf_token__';
const webAPIKey = process.env.REACT_APP_API_KEY;
const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;
const signInWithPasswordEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`;
const exchangeRefreshTokenForIDTokenEndpoint = `https://securetoken.googleapis.com/v1/token?key=${webAPIKey}`;

// Handle the user's response
function handleUserResponse({data: {email, idToken, localId, refreshToken}}) {
  window.localStorage.setItem(
    localStorageToken,
    JSON.stringify({
      email,
      token: idToken,
      userId: localId,
      refreshToken,
    })
  );
}

function login(email, password) {
  return axios
    .post(signInWithPasswordEndpoint, {
      email,
      password,
      returnSecureToken: true,
    })
    .then(handleUserResponse);
}

async function register(email, password) {
  return axios
    .post(signUpEndpoint, {
      email,
      password,
      returnSecureToken: true,
    })
    .then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(localStorageToken);
  return Promise.resolve();
}

// function getToken() {
//   const data = JSON.parse(window.localStorage.getItem(localStorageToken));
//   return data ? data.token : null;
// }

function getUser() {
  const data = JSON.parse(window.localStorage.getItem(localStorageToken));

  if (!data) {
    return Promise.resolve(null);
  }

  return axios
    .post(exchangeRefreshTokenForIDTokenEndpoint, {
      grant_type: 'refresh_token',
      refresh_token: data.refreshToken,
    })
    .then((res) => {
      const targetData = {
        email: data.email,
        idToken: res.data.id_token,
        localId: res.data.user_id,
        refreshToken: res.data.refresh_token,
      };
      handleUserResponse({
        data: targetData,
      });
      return targetData;
    })
    .catch(() => {
      // console.log('error', error);
      logout();
      return Promise.resolve(null);
    });
}

export {login, register, logout, getUser};
