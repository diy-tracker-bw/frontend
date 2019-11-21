import React from 'react';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const { handleLogin } = useAuth();
    const history = useHistory()
    return (
        <div>
            <RegisterForm handleLogin={handleLogin} history={history} />
        </div>
    );
};

export default Register