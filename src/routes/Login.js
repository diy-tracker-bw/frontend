import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';


const Login = () => {
  const { handleLogin } = useAuth();
  return (
    <div>
      <LoginForm />
      {/* <p>mock email: eve.holt@reqres.in</p>
      <p>mock password: cityslicka</p> */}
    </div>
  );
};

export default Login;
