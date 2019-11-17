import React from 'react';
import { useAuth } from '../hooks/useAuth';

import LoginForm from '../components/LoginForm';

const Login = () => {
  const { handleLogin } = useAuth();
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>mock email: eve.holt@reqres.in</p>
      <p>mock password: cityslicka</p>
    </div>
  );
};

export default Login;
