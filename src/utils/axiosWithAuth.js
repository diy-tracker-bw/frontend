import axios from 'axios';

const axiosWithAuth = () => {
  let token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://patrick-diy.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 9d8a1097-5d0f-4960-87e3-88c251582f1d,
    },
  });
};

export default axiosWithAuth;
