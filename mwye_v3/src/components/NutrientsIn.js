import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, Fragment } from 'react';
import Checkbox from './Checkbox';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import basicNutrients from './basicNutrients.json';
import './CustomStyle.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import {FormGroup} from 'react-bootstrap';
import Control from 'react-bootstrap-typeahead/components/Control';
import {Typeahead} from 'react-bootstrap-typeahead/src/';
import options from 'react-bootstrap-typeahead/exampleData'

//var Typeahead = require('react-bootstrap-typeahead/src').Typeahead; // CommonJS

//User inputs with a input text field, which will be facilitated with suggestions. When selected, relevant food/item nutrient information is provided. 

class NutrientsIn extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: "",
          multiple: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
          value: event.target.value
        });
    }

    handleSubmit(event){
        alert("Name is " + this.state.value);
        event.preventDefault();
    }

    render(){
        const {multiple} = this.state;
        return(
            <div>
                <form action="index.html" method="post" onSubmit = {this.handleSubmit}>
                    <h2>NutrientsIn</h2>
                    <input type="text" placeholder="Search..."
                        value={this.state.value}
                        onChange={this.handleChange} />
                </form>
                <Fragment>
                    <Typeahead
                    labelKey="name"
                    multiple={multiple}
                    options={options}
                    placeholder="Choose a state..."
                    />
                    <FormGroup>
                    <Control
                        checked={multiple}
                        onChange={(e) => this.setState({multiple: e.target.checked})}
                        type="checkbox">
                        Multi-Select
                    </Control>
                    </FormGroup>
                </Fragment>
            </div>
        );
    }
}

export default NutrientsIn;