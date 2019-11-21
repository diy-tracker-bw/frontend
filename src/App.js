import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';

import GlobalStyles from './styles/GlobalStyles';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Project from './routes/Project';
import Register from './routes/Register';
import ByProject from './routes/ByProject';

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/byproject" component={ByProject} />
          <Route exact path="/register">
            {localStorage.getItem('token') ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/login">
            {localStorage.getItem('token') ? <Redirect to="/" /> : <Login />}
          </Route>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/project/:id">
            <Project />
          </PrivateRoute>
        </Switch>
      </Wrapper>
    </>
  );
}

export default App;
