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
    //textAlign: 'center',
    //position: 'absolute'

      // textDecoration: 'none',
      // padding: '10px 20px',
      // display: 'block',
      // color: '#FFF',
      // textAlign: 'center',
      
  
  }

  const styleNavBar = {
    // position: 'absolute',
    // left: 0,
    // height: 40,
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
