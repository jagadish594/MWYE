import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CompareFoodByNutrients from './components/CompareFoodByNutrients';
import CompareBySpecificNutrient from './components/CompareBySpecificNutrient';
import NutrientsIn from './components/NutrientsIn';
import Error from './components/Error';
import Navigation from './components/Navigation';

//import logo from './logo.svg';
//import './App.css';

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
              <Route path = "/CompareFoodByNutrients" component = {CompareFoodByNutrients} />
              <Route path = "/CompareBySpecificNutrient" component = {CompareBySpecificNutrient} />
              <Route path = "/NutrientsIn" component = {NutrientsIn} />
              <Route component = {Error} />
            </Switch>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
