import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const RegisterForm = ({ values, errors, touched, status }) => {
    const [userSignUp, setUserSignUp] = useState([])

    // const { handleLogin } = useAuth();

    useEffect(() => {
        status && setUserSignUp(member => [...member, status])
    }, [status])
    
    return (
        <RegistrationPage>
            <h1>DIY Tracker Sign Up</h1>
            <div className="register-page">
                <Form>
                    <div className="input-box">
                        <Field type="text" name="username" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="input-box">
                        <Field type="email" name="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-box">
                        <Field type="password" name="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div>
                        <button className="signup-button" type="submit">Sign Up</button>
                    </div>
                </Form>
                {userSignUp.map(user => (
                    <div key="user.id">
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                    </div>
                ))}
            </div>        
        </RegistrationPage> 
    )   
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({ username, email, password }) {
        return {
            username: username || "",
            email: email || "",
            password: password || ""
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    })
    // handleSubmit(values, { setStatus }) {
    //     // handleLogin(values)
    //     axiosWithAuth()
    //         .post("", values)
    //         .then(res => {
    //             console.log(res.data);
    //             setStatus(res.data)
    //         })
    //         .catch(err => console.log(err.res));
    // }
})(RegisterForm)

export default FormikRegisterForm