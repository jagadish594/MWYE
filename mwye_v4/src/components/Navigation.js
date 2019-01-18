import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () =>{
  const styleNavigation = {
    margin: 20,
    height: 50,
    width: 100,
    padding: 0
  }
  return(
    <div>
      <NavLink to = "/" style={styleNavigation}>Home</NavLink>
      <NavLink to = "/About" style={styleNavigation}>About</NavLink>
      <NavLink to = "/CompareBySpecificNutrient" style = {styleNavigation}>CompareBySpecificNutrient</NavLink>
      <NavLink to = "/NutrientsIn" style = {styleNavigation}>NutrientsIn</NavLink>
      <NavLink to = "/Search" style = {styleNavigation}>Search</NavLink>
      <NavLink to = "/Search2" style = {styleNavigation}>Search 2</NavLink>
    </div>
  );
};

export default Navigation;
