import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import Login from './routes/Login';

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Switch>
          <Route exact path="/login">
            {localStorage.getItem('token') ? <Redirect to="/" /> : <Login />}
          </Route>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </div>
    </>
  );
}

export default App;
