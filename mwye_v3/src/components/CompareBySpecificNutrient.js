import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import Checkbox from './Checkbox';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import basicNutrients from './basicNutrients.json';
import './CustomStyle.css';
//import { LineChart, Line } from 'recharts';

const basicNutrientsBox = [];
for(let item in basicNutrients){
  basicNutrientsBox[item] = {
    'nutrient_id': basicNutrients[item].nutrient_id,
    'nutrient_name': basicNutrients[item].nutrient_name,
    'nutrient_group': basicNutrients[item].nutrient_group,
    'isCheckBoxChecked': false
  }
}

const styleCheckBoxColumn = {
    width: "16.67%",
    display: 'inline-block',
    maxWidth: "20%",
    margin: "auto",
    //padding: 2
}

class CompareBySpecificNutrient extends Component {
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
              Header: "Weight(Nutrient Value/100gms)",
              accessor: "weight"
            },
            {
              Header: "Measure",
              accessor: "measure"
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
              Header: "Weight(Nutrient Value/100gms)",
              accessor: "weight"
            },
            {
              Header: "Measure",
              accessor: "measure"
            }
          ],
          selectedNutrients: new Set(),
          basicNutrientInfo: basicNutrientsBox,
        }
    }

    componentWillMount = () => {
      this.selectedCheckboxes = new Set();
      this.prevNutriGroup = "";
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

    getNutriGroup(label){
        if(this.prevNutriGroup !== label.nutrient_group){
            this.prevNutriGroup = label.nutrient_group;
            return label.nutrient_group;
        }
    }
  
    createCheckbox = label =>{
        switch(label.nutrient_group){
            case 'Proximates':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            case 'Minerals':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            case 'Vitamins':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            case 'Lipids':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            case 'Amino Acids':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            case 'Other':
                return (
                    <div style={styleCheckBoxColumn}>
                        <h5>{this.getNutriGroup(label)}</h5>
                        <Checkbox
                            label={label.nutrient_name}
                            handleCheckboxChange={this.toggleCheckbox}
                            key={label.nutrient_id}
                        />
                    </div>
                );
            default:
                return (
                    <div>No match</div>
                );

        }
    }
  
    createCheckboxes = () => (
      basicNutrientsBox.map(this.createCheckbox)
    )


    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        const selectedNutriList = new Set();
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
            let nutrientInfo = basicNutrients.filter(nutrient => nutrient.nutrient_name === checkbox);
            selectedNutriList.add(nutrientInfo[0].nutrient_id);
        
        }
        let urlTemp = "";
        for(let item of selectedNutriList){
            urlTemp = urlTemp+'&nutrients='+item;
        }
        
        let url1 = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN"+urlTemp+"&max=100&offset=1000";
            //Updating columns with selected nutrients
        let tempColumns = this.state.initialColumns;
        const arrSelectedNutriList = Array.from(selectedNutriList);
        if(selectedNutriList.size > 0){
            // for(let i=tempColumns.length-1; i===4;i--){
            //     tempColumns.pop();
            // }
            if(tempColumns.length > 4){
                let colLength = tempColumns.length;
                while(colLength >=5){
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
            if(tempColumns.length-1 > 4){
                let colLength = tempColumns.length;
                while(colLength >=5){
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
            this.setState({
                url: url1,
                selectedNutrients: selectedNutriList,
                columns: tempColumns
            });  
        }

    }
  
  
    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}
                <hr></hr>
                <button className="btn btn-primary" type="submit">Submit</button>
              </form>
            </div>
          </div>
          <h2>List of Nutrient Information</h2>
          <ReactTable
            columns = {this.state.columns}
            data = {this.state.foods}
            filterable
          />
        </div>
      );
    }
  }
  
  export default CompareBySpecificNutrient;
