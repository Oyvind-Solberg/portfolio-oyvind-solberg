import axios from 'axios';

const instance = axios.create({
  // Development URL
  // baseURL: 'http://10.2.0.16:8000/api/v1',

  // Production URL
  baseURL: 'https://portfolio-oyvind-solberg.herokuapp.com/api/v1',
});

export default instance;
