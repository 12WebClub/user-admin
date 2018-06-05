import axios from 'axios';
import config from './../config';

const token = window.sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: config.apiHopst,
  params: {
    token,
  },
});


export default instance;
