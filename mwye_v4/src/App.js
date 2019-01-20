import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CompareBySpecificNutrient from './components/CompareBySpecificNutrient';
import NutrientsIn from './components/NutrientsIn';
import Search from './components/Search';
import Error from './components/Error';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path = "/" component = {Home} exact />
          <Route path = "/About" component = {About} />
          <Route path = "/CompareBySpecificNutrient" component = {CompareBySpecificNutrient} />
          <Route path = "/NutrientsIn" component = {NutrientsIn} />
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
