import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';


const Login = () => {
  const { handleLogin } = useAuth();
  return (
    <div>
      <LoginForm handleLogin={handleLogin} />

    </div>
  );
};

export default Login;
