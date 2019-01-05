import React, { Component } from 'react';
import Checkbox from './Checkbox';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import basicNutrients from './basicNutrients.json';

const basicNutrientsBox = [];
for(let item in basicNutrients){
  basicNutrientsBox[item] = {
    'nutrient_id': basicNutrients[item].nutrient_id,
    'nutrient_name': basicNutrients[item].nutrient_name,
    'nutrient_group': basicNutrients[item].nutrient_group,
    'isCheckBoxChecked': false
  }
}

class CompareFood extends Component {
    componentWillMount = () => {
      this.selectedCheckboxes = new Set();
    }
  
    toggleCheckbox = label => {
      if (this.selectedCheckboxes.has(label)) {
        this.selectedCheckboxes.delete(label);
      } else {
        this.selectedCheckboxes.add(label);
      }
    }
  
    handleFormSubmit = formSubmitEvent => {
      formSubmitEvent.preventDefault();
  
      for (const checkbox of this.selectedCheckboxes) {
        console.log(checkbox, 'is selected.');
      }
    }
  
    createCheckbox = label => (
      <Checkbox
        label={label.nutrient_name}
        handleCheckboxChange={this.toggleCheckbox}
        key={label.nutrient_id}
      />
    )
  
    createCheckboxes = () => (
      basicNutrientsBox.map(this.createCheckbox)
    )
  
    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
  
              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}
  
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
  
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default CompareFood;
