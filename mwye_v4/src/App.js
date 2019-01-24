import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CompareBySpecificNutrient from './components/CompareBySpecificNutrient';
import Search from './components/Search';
import Error from './components/Error';
import Navigation from './components/Navigation';
//import 'bootstrap/dist/css/bootstrap.css';
import './components/Style.css';

class App extends Component {
  render() {
    return (
      <div class="navBar">
          <BrowserRouter>
            <div>
              <Navigation />
              <Switch>
                <Route path = "/" component = {Home} exact />
                <Route path = "/About" component = {About} />
                <Route path = "/CompareBySpecificNutrient" component = {CompareBySpecificNutrient} />
                <Route path = "/Search" component = {Search} />
                <Route component = {Error} />
              </Switch>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
