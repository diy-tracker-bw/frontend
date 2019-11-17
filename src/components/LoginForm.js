import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();
  const { handleLogin } = useAuth();

  const handleChange = e => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await handleLogin(userCredentials);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
        />
        <button> Log In </button>
      </form>
    </div>
  );
};

export default LoginForm;
