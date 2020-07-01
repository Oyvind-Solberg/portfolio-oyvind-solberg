import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://portfolio-oyvind-solberg.herokuapp.com/api/v1',
});

export default instance;
