import React from 'react';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const { handleRegister } = useAuth();
  const history = useHistory();
  return (
    <div>
      <RegisterForm handleRegister={handleRegister} history={history} />
    </div>
  );
};

export default Register;
