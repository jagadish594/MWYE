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
      <NavLink to = "/CompareFoodByNutrients" style={styleNavigation}>CompareFoodByNutrients</NavLink>
      <NavLink to = "/AccordionBox" style = {styleNavigation}>AccordionBox</NavLink>
      <NavLink to = "/DemoCheckbox" style = {styleNavigation}>DemoCheckbox</NavLink>
    </div>
  );
};

export default Navigation;
