import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import './App.css';
//import Home from './containers/Home';
//import Final from './containers/Final';
import Propose from './containers/Propose';
import Statstics from './containers/Statstics';
//import Select from './containers/Select';
import View from './containers/View';
import NavBar from './containers/Navbar';
//import Iconbar from './containers/Iconbar';


//const Login = React.lazy(() => import('./containers/Login'));

class App extends Component {
  constructor(props) {
    super(props);
  }

  RouteComponent = () =>
      <Switch>
        <Route path="/propose" component={Propose} />
        <Route path="/stats" component={Statstics} />
        <Route path="/view" component={View} />
      </Switch>

  render() {
    return (
      <div>
        <NavBar />
        <this.RouteComponent />
      </div>
    );
  }
}

export default withRouter(App);
