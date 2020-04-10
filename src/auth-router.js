import React, { useEffect, useState } from "react";
import Signup from "./components/session/signup";
import Login from "./components/session/login";
import App from "./App";
import Loading from "./components/session/loading";
import Api from './api-client';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

function AuthRouter () {
  const [user, setUser] = useState({});
  const [isAuth, setisAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    Api.authenticate()
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setisAuth(true);
          setisLoading(false);
        }
        else {
          setUser(false);
          setisAuth(false);
          setisLoading(false);
        }
      });
  }, []);
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="App switch-wrapper"
      >

        <Auth exact path="/register" component={Signup} isAuth={isAuth} />
        <Auth exact path="/login" component={() => <Login setisAuth={setisAuth} setUser={setUser} setisLoading={setisLoading}/>} isAuth={isAuth}  />
        <Protected path="/" component={() => <App user={user} setisAuth={setisAuth} setUser={setUser}/>} isAuth={isAuth} isLoading={isLoading} />
      </AnimatedSwitch>
    </Router>
  );
}

const Auth = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !isAuth ? (
          <Component {...props} />
        ) : (
            // Redirect to root if user is authenticated
            <Redirect to="/" />
          );
      }}
    />
  );
};


const Protected = ({ component: Component, isAuth, isLoading, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) return <Loading />;
        return isAuth ? (
          <Component {...props} />
        ) : (
            // Redirect to the login page if the user is not authenticated
            <Redirect to="/login" />
          );
      }}
    />
  );
};
export default AuthRouter;
