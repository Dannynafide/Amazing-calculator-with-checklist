import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://calculator-with-checklist-default-rtdb.firebaseio.com',
});

export default instance;
