import axios from 'axios';

const axiosWithAuth = () => {
  let token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://patrick-diy.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
