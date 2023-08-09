/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { withRouter } from "react-router";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import 'semantic-ui-css/semantic.min.css'
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import firebase from './firebase';
import { setUser, clearUser } from './redux/users/userAction'
import Spinner from './components/ui/Spinner';



class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/')
        this.props.setUser(user)
      } else {
        this.props.history.push('/login')
        this.props.clearUser()

      }
    })
  }

  render() {
    const { loading } = this.props;
    return (
      <Fragment>
        {loading ? <Spinner></Spinner> :
          (<Switch>
            <Route exact path="/" component={App} ></Route>
            <Route exact path="/login" component={Login} ></Route>
            <Route exact path="/register" component={Register} ></Route>
          </Switch>
          )}
      </Fragment>
    );
  }
}



const mapStateToProps = ({ users: { loading } }) => ({
  loading: loading,
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
})

const RootWithAuth = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


export default Root;
