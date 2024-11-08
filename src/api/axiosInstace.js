import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vipblackbets.ozzo.az',
  withCredentials: true,
  headers: {
    "Accept": 'application/json',
    "Content-Type": "application/json"
  },
});

export default axiosInstance;