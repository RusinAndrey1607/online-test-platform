import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const apiAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials:true
});

