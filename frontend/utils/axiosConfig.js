import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Your Flask backend base URL
});

export default axiosInstance;
