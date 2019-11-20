import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const RegistrationPage = styled.div`
  text-align: center;
  color: #7A7878;
  background-color: #EDC7C5;
  padding: 10px;

  .input-box {
    border: 1px solid #EDC7C5;
  }

  .signup-button {
    color: #EDC7C5;
    background-color: #7A7878;
    border-radius: 12px;
    font-weight: bold;
    padding: 5px;
  }
`;

const RegisterForm = ({ values, errors, touched }) => {

    // const { handleLogin } = useAuth();

    return (
        <RegistrationPage>
            <h1>DIY Tracker Sign Up</h1>
            <div className="register-page">
                <Form>
                    <div className="input-box">
                        <Field type="text" name="username" id="username" placeholder="Enter your username" />
                        {touched.username && errors.username && (
                            <p>{errors.username}</p>
                        )}
                    </div>
                    <div className="input-box">
                        <Field type="email" name="email" id="email" placeholder="Enter your email" />
                        {touched.email && errors.email && (
                            <p>{errors.email}</p>
                        )}
                    </div>
                    <div className="input-box">
                        <Field type="password" name="password" id="password" placeholder="Enter your password" />
                        {touched.password && errors.password && (
                            <p>{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <button className="signup-button" type="submit">Sign Up</button>
                    </div>
                </Form>
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
        username: Yup.string().required("Username Required"),
        email: Yup.string().required("Email Required"),
        password: Yup.string().required("Password Required")
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