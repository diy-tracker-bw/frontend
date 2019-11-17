import React, { useReducer } from 'react';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const AuthContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      state.registered = true;
      state.isAuthenticated = state.registered;
      return {
        ...state,
        ...action.payload,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      state.isAuthenticated = true;
      return {
        ...state,
        ...action.payload,
      };
    case 'AUTH_ERR':
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    // default
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    registered: false,
    token: localStorage.getItem('token') || null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async values => {
    try {
      // Mocking API post request
      const response = await axios.post('https://reqres.in/api/login', values);
      // const response = await axiosWithAuth().post('api/users/login', values);

      console.log(response.data);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'AUTH_ERR',
        payload: err.response,
      });
    }
  };

  const handleRegister = async values => {
    try {
      // Mocking API post request
      const response = await axios.post('https://reqres.in/api/register', {
        email: values.email,
        password: values.password,
      });
      // const response = await axiosWithAuth().post('api/users/register', {
      //   email: values.email,
      //   password: values.password,
      // });
      console.log(response.data);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'AUTH_ERR',
        payload: err.response,
      });
    }
  };

  const handleLogout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        registered: state.registered,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
