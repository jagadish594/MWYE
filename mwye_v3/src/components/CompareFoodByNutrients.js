import React, { Component } from 'react';
//import './App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import basicNutrients from './basicNutrients.json'
//List the foods by a nutrient
//import BuildNutriTree from './BuildNutriTree';

class CompareFoodByNutrients extends Component {
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
      basicNutrientInfo: "",
      isCheckBox509Checked: false,
      isCheckBox518Checked: false,
      isCheckBox516Checked: false,
      isCheckBox515Checked: false,
      isCheckBox514Checked: false,
      isCheckBox513Checked: false
    }

    this.toggleChange509 = this.toggleChange509.bind(this);
    this.toggleChange518 = this.toggleChange518.bind(this);
    this.toggleChange516 = this.toggleChange516.bind(this);
    this.toggleChange515 = this.toggleChange515.bind(this);
    this.toggleChange514 = this.toggleChange514.bind(this);
    this.toggleChange513 = this.toggleChange513.bind(this);
    this.getBasicNutrients = this.getBasicNutrients.bind(this);
    this.toggleCheckBoxChange = this.toggleCheckBoxChange.bind(this);    
    this.handleUserInputButton = this.handleUserInputButton.bind(this);
    
  }

  
  toggleChange509 = () => {
    this.setState({
      isCheckBox509Checked: !this.state.isCheckBox509Checked
    });
  }
  toggleChange518 = () => {
    this.setState({
      isCheckBox518Checked: !this.state.isCheckBox518Checked
    });
  }

  toggleChange516 = () => {
    this.setState({
      isCheckBox516Checked: !this.state.isCheckBox516Checked
    });
  }
  toggleChange515 = () => {
    this.setState({
      isCheckBox515Checked: !this.state.isCheckBox515Checked
    });
  }

  toggleChange514 = () => {
    this.setState({
      isCheckBox514Checked: !this.state.isCheckBox514Checked
    });
  }
  toggleChange513 = () => {
    this.setState({
      isCheckBox513Checked: !this.state.isCheckBox513Checked
    });
  }

  toggleCheckBoxChange(nutriID){
    const basicNutriInfo = Array.from(this.state.basicNutrientInfo);
    const nutrient = basicNutriInfo.filter(nutrient =>nutrient.nutrient_id === nutriID);
    nutrient.isCheckBoxChecked = !'isCheckBoxChecked';
    //basicNutriInfo[nutriID].isCheckBoxChecked = !this.state.isCheckBoxChecked;
    this.setState({
      basicNutrientInfo: basicNutriInfo
    });
  }

  getBasicNutrients(){
    const bNutri = basicNutrients;
    const newBNutri = [];
    for(let item in bNutri){
      // newBNutri[bNutri[item].nutrient_id] = {
      //   'nutrient_id': bNutri[item].nutrient_id,
      //   'nutrient_name': bNutri[item].nutrient_name,
      //   'nutrient_group': bNutri[item].nutrient_group,
      //   'isCheckBoxChecked': false
      // }
      newBNutri[item] = {
        'nutrient_id': bNutri[item].nutrient_id,
        'nutrient_name': bNutri[item].nutrient_name,
        'nutrient_group': bNutri[item].nutrient_group,
        'isCheckBoxChecked': false
      }
    }
    this.setState({
      basicNutrientInfo: newBNutri
    });

  }
  componentWillMount(){
    //console.log(newBNutri);
    //console.log(this.state.basicNutrientInfo);
  }
  componentDidMount(){
    //this.getBasicNutrients();
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

  handleUserInputButton(){
    //check for all true values and create URL as a string and set the state of URL
    //const selectedNutriList = new Set(this.state.selectedNutrients);
    this.getBasicNutrients();
    const selectedNutriList = new Set();
    let urlTemp = "";
    for(const attri in this.state){
      if(attri.substring(0, 10) === 'isCheckBox'){
        if(this.state[attri] === true){
          let tempNVal = attri.substring(10, 13);
          selectedNutriList.add(tempNVal);  
        }
      }
    }
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
      this.setState({
        url: url1,
        selectedNutrients: selectedNutriList,
        columns: tempColumns
      });  
    }
  }

  render() {  
    //console.log(this.state.basicNutrientInfo);
    const bNutri = Array.from(this.state.basicNutrientInfo);
    console.log(bNutri);
    // const temp1000 = bNutri.filter(item => item.nutrient_group === 'Proximates');
    // console.log(temp1000);
    
    //console.log(temp100);
    return(
      <div>
        <div>
          <h1>Nutrients Tree</h1>
          <div>
              <h2>Amino Acids</h2>
              <h3 key = '509'><input type ='checkbox' checked = {this.state.isCheckBox509Checked} onChange={this.toggleChange509} />Tyrosine</h3>
              <h3 key = '518'><input type ='checkbox' checked = {this.state.isCheckBox518Checked} onChange={this.toggleChange518} />Serine</h3>
              <h3 key = '516'><input type ='checkbox' checked = {this.state.isCheckBox516Checked} onChange={this.toggleChange516} />Glycine</h3>
              <h3 key = '515'><input type ='checkbox' checked = {this.state.isCheckBox515Checked} onChange={this.toggleChange515} />Glutamic</h3>
              <h3 key = '514'><input type ='checkbox' checked = {this.state.isCheckBox514Checked} onChange={this.toggleChange514} />Aspartic</h3>
              <h3 key = '513'><input type ='checkbox' checked = {this.state.isCheckBox513Checked} onChange={this.toggleChange513} />Alanine</h3>
              {
                bNutri.map(item =>{
                  return(<h3 key ={item.nutrient_id}><input type = 'checkbox' checked = {item.isCheckBoxChecked} onChange = {this.toggleCheckBoxChange(item.nutrient_id)}/>{item.nutrient_name}</h3>)
                })
              }

              <button type='Submit' onClick ={this.handleUserInputButton} >Submit</button>
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

export default CompareFoodByNutrients;
