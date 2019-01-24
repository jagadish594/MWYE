import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () =>{
  const styleNavigation = {
    margin: 15,
    height: 47,
    width: 100,
    padding: 0,
    overflow: 'hidden',
    color: 'white'
  }

  const styleNavBar = {
    backgroundColor: '#2C64B4',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
  return(
    <div style = {styleNavBar}>
      <NavLink to = "/" style={styleNavigation}>Home</NavLink>
      <NavLink to = "/About" style={styleNavigation}>About</NavLink>
      <NavLink to = "/CompareBySpecificNutrient" style={styleNavigation}>Compare Nutrients</NavLink>
      <NavLink to = "/Search" style={styleNavigation}>Search</NavLink>
    </div>
  );
};

export default Navigation;
