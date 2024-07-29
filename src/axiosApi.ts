import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://akmatalievatabek-js25-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

export default axiosApi;
