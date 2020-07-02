import axios from 'axios';

const instance = axios.create({
  // Development URL
  baseURL: 'http://localhost:8000/api/v1',

  // Production URL
  // baseURL: 'https://portfolio-oyvind-solberg.herokuapp.com/api/v1',
});

export default instance;
