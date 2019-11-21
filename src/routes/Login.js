import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';


const Login = () => {
  const { handleLogin } = useAuth();
  const history = useHistory()
  return (
    <div>
      <LoginForm handleLogin={handleLogin} history={history} />

    </div>
  );
};

export default Login;
