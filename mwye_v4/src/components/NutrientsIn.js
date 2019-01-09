import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
//import basicNutrients from './basicNutrients.json';

class NutrientsIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: "",
            foods: [],
            test: this.props.options
        }
    }


    render(){
        return(
            <h1>Hello</h1>
        );
    }
}



export default NutrientsIn;