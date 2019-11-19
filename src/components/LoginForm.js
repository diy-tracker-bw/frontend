import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';


const FormPage = styled.div`
  text-align: center;
  color: #7A7878;
  background-color: #EDC7C5;
  padding: 10px;

  .input-box {
    border: 1px solid #EDC7C5;
  }

  .login-button {
    color: #EDC7C5;
    background-color: #7A7878;
    border-radius: 12px;
    font-weight: bold;
    padding: 5px;
  }
`;


const LoginForm = ({ values, errors, touched, status }) => {
  const [userCredentials, setUserCredentials] = useState([]);

  // const { handleLogin } = useAuth();

  useEffect(() => {
    status && setUserCredentials(member => [...member, status])
  }, [status])

  return (
    <FormPage>
      <h1>DIY Tracker Login</h1>
      <div className="form-page">
        <Form>
          <div className="input-box">
            {/* <label htmlFor="username">Username: </label> */}
            <Field type="text" name="username" id="username" placeholder="Enter your username" />
            {touched.username && errors.username && (
              <p>{errors.username}</p>
            )}
          </div>
          <div className="input-box">
            {/* <label htmlFor="password">Password: </label> */}
            <Field type="password" name="password" id="password" placeholder="Enter your password" />
            {touched.password && errors.password && (
              <p>{errors.password}</p>
            )}
          </div>
          <div>
            <button className="login-button" type="submit">Login</button>
          </div>
        </Form>
        {userCredentials.map(user => (
          <div key="user.id">
            <p>User: {user.username}</p>
            <p>Password: {user.password}</p>
          </div>
        ))}
      </div>
    </FormPage>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username Required"),
    password: Yup.string().required("Password Required")
  }),
  handleSubmit(values, { setStatus }) {
    // handleLogin(values)
    axiosWithAuth()
        .post("/user/login", values)
        .then(res => {
            console.log(res.data);
            setStatus(res.data)
        })
        .catch(err => console.log(err.response));
}
})(LoginForm);

export default FormikLoginForm;


// DeAndre's mock login form code below!

// const LoginForm = () => {
//   const [userCredentials, setUserCredentials] = useState({
//     username: '',
//     password: '',
//   });

//   const history = useHistory();
//   const { handleLogin } = useAuth();

//   const handleChange = e => {
//     setUserCredentials({
//       ...userCredentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       await handleLogin(userCredentials);
//       history.push('/');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={userCredentials.username}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           value={userCredentials.password}
//           onChange={handleChange}
//         />
//         <button> Log In </button>
//       </form>
//     </div>
//   );
// };