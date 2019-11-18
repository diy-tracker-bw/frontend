import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ values, errors, touched, status }) => {
  const [userCredentials, setUserCredentials] = useState([]);

  useEffect(() => {
    status && setUserCredentials(member => [...member, status])
  }, [status])

  return (
    <div>
      <Form>
        <div>
          <label htmlFor="username">Username: </label>
          <Field type="text" name="username" id="username" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <Field type="password" name="password" id="password" placeholder="Enter your password" />
        </div>
      </Form>
      {userCredentials.map(user => (
        <div key="user.id">
          <p>User: {user.username}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
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
    username: Yup.string().required(),
    password: Yup.string().required()
  })
})(LoginForm);

export default FormikLoginForm;


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