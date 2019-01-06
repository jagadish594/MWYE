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
    constructor(props){
        super(props);
        this.state = {
          //url: "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN&nutrients=204&max=100&offset=1000",
          url: "",
          foods: [],
          initialColumns: [
            {
              Header: "NDBNo",
              accessor: "ndbno"
            },
            {
              Header: "Food Name",
              accessor: "name"
            },
            {
              Header: "Weight",
              accessor: "weight"
            },
            {
              Header: "Measure",
              accessor: "measure"
            },
            {
              Header: "Nutrient Value/100gms",
              id: Math.random()*3,
              accessor: row => row.nutrients[0].value *100/row.nutrients[0].gm
            }
          ],
          columns: [
            {
              Header: "NDBNo",
              accessor: "ndbno"
            },
            {
              Header: "Food Name",
              accessor: "name"
            },
            {
              Header: "Weight",
              accessor: "weight"
            },
            {
              Header: "Measure",
              accessor: "measure"
            },
            {
              Header: "Nutrient Value/100gms",
              id: Math.random()*3,
              accessor: row => row.nutrients[0].value *100/row.nutrients[0].gm
            }
          ],
          selectedNutrients: new Set(),
          basicNutrientInfo: basicNutrientsBox,
        }
    }

    componentWillMount = () => {
      this.selectedCheckboxes = new Set();
    }
  
    componentDidUpdate(prevProps, prevState, props){
        if(this.state.url!==prevState.url && this.state.url!==""){
          fetch(this.state.url, {
            method: "GET"
          }).then(response => response.json())
          .then(responseData =>{
            this.setState({
              foods: responseData.report.foods
            });
          })
        }
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
        const selectedNutriList = new Set();
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
            let nutrientInfo = basicNutrients.filter(nutrient => nutrient.nutrient_name === checkbox);
            //console.log("NutrientInfo: ", nutrientInfo[0].nutrient_id);
            selectedNutriList.add(nutrientInfo[0].nutrient_id);
        
        }
        console.log(selectedNutriList);
        //pasted from CFBN
        let urlTemp = "";
        for(let item of selectedNutriList){
            urlTemp = urlTemp+'&nutrients='+item;
        }
        
        let url1 = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN"+urlTemp+"&max=100&offset=1000";
            //Updating columns with selected nutrients
        let tempColumns = this.state.initialColumns;
        const arrSelectedNutriList = Array.from(selectedNutriList);
        if(selectedNutriList.size > 0){
            for(let i=tempColumns.length-1; i===5;i--){
                tempColumns.pop();
            }
            if(tempColumns.length > 5){
                let colLength = tempColumns.length;
                while(colLength >=6){
                tempColumns.pop();
                colLength --;
                }
            }
            for(let i=0; i< arrSelectedNutriList.length; i++) {
                const nutriName = basicNutrients.filter(nutrient =>nutrient.nutrient_id === parseInt(arrSelectedNutriList[i]))
                .map(item => item.nutrient_name);
                const column = {
                Header: JSON.stringify(nutriName[0]),
                id: Math.random()*7,
                accessor: row => row.nutrients[i].gm
                }
                tempColumns.push(column);  
            }
        }
        //If no nutrients selected
        if(selectedNutriList.size === 0){
            for(let i=tempColumns.length-1; i===5;i--){
                tempColumns.pop();
            }

            if(tempColumns.length-1 > 5){
                let colLength = tempColumns.length;
                while(colLength >=6){
                tempColumns.pop();
                colLength --;
                }
            }

            this.setState({
                url: "",
                foods: [],
                selectedNutrients: new Set(),
                columns: this.state.initialColumns
            });
        }
        //If nutrients selected
        else{
            console.log(url1);
            this.setState({
                url: url1,
                selectedNutrients: selectedNutriList,
                columns: tempColumns
            });  
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
          <div className="CompareFoodByNutrients">
          <h2>List all Nutrient ids</h2>
          <ReactTable
            columns = {this.state.columns}
            data = {this.state.foods}
            filterable
          />
        </div>
        </div>
      );
    }
  }
  
  export default CompareFood;
