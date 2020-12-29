import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/DB';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());

    //Clear the current profile
    store.dispatch(clearCurrentProfile());

    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className="container">
              <Route exact path='/Login' component={Login} />
              <Route exact path='/Register' component={Register} />
              <Switch>
                <PrivateRoute exact path='/Dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
