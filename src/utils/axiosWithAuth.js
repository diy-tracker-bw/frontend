import axios from 'axios';

const axiosWithAuth = () => {
  let token = localStorage.getItem('token');
  let instance = axios.create({
    baseURL: 'https://patrick-diy.herokuapp.com',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + JSON.parse(token),
    },
  });

  return instance;
};

export default axiosWithAuth;
