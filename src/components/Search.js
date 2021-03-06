import React, { Component } from 'react';
import axios from 'axios';
import Pagination2 from './Pagination2';
import APIKey from './usda_key.json';
import FoodReport from './FoodReport';
//import { Redirect } from 'react-router-dom';
import './Style.css';


const API_KEY = APIKey[0].USDAKey;
const API_URL = 'https://api.nal.usda.gov/ndb/search/?format=json';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            exampleItems: [],
            result: [],
            page: 0,
            foodData: [],
            ingredients: [],
            nutrients: []
        };
        this.getPageNumber = this.getPageNumber.bind(this);
    }

    getInfo = () => {
        const offsetNum = (this.state.page - 1)*25;
        axios.get(`${API_URL}&q=${this.state.query}&sort=n&max=25&offset=${offsetNum}&api_key=${API_KEY}`)
          .then(({ data }) => {
            this.setState({
              result: data.list, // USDA returns an object named data, as does axios. So... data.list
              exampleItems: data.list.item                      
              })
          })
          .catch(error =>{
            console.log("Fetching and parsing error ", error)
        });
    }
    
    getPageNumber(page){
        this.setState({ page: page });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.page !== this.state.page) this.getInfo();
    }

    handleInputChange = () => {
    this.setState({
        query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 3 === 0) {
                    this.getInfo()
                }
            } 
        })
    }

    handleFoodReport(ndbno){
        //When food or item is clicked this will provide the link and get information
        this.getFoodReport(ndbno);
    }

    getFoodReport(ndbno){
        //Gets food/item data and stores on the state
        const foodReportURL1 = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
        const foodReportURL2 = `&type=f&format=json&api_key=${API_KEY}`;
        axios.get(foodReportURL1+ndbno+foodReportURL2)
        .then(({ data }) => {
          this.setState({
            foodData: data.foods[0],
            ingredients: data.foods[0].food.ing,
            nutrients: data.foods[0].food.nutrients,
            nutrientName: data.foods[0].food.desc.name                    
            })
            console.log("foodData: ", this.state.foodData)
            console.log("Ingredients: ", this.state.ingredients)
        })
        .catch(error =>{
          console.log("Fetching and parsing error ", error)
      });

    }

    render() {
        return (          
            <div className={["container", "styleSearch"].join(' ')}>
                <form>
                    <input
                    placeholder="Search for... butter"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    />
                    
                </form>
                <div className="text-center">
                  <div>
                    <h1>Food List</h1>
                    {this.state.exampleItems.map(item =>
                        <div key={item.ndbno}><a href="#NutriTable" onClick={() => this.handleFoodReport(item.ndbno)}>{item.name}</a></div>
                    )}
                  </div>
                    
                  <div>
                    <Pagination2 totalItems={this.state.result['total']} 
                        start = {this.state.result['start']}
                        items = {this.state.exampleItems}
                        getPageNumber = {this.getPageNumber}/>
                  </div>
                  <hr />
                  <div>
                        <FoodReport ingredients = {this.state.ingredients.desc} nutrients = {this.state.nutrients} 
                          nutrientName = {this.state.nutrientName}                        
                        /> 
                  </div>
                  
                </div>
            </div>    
        );
      }
}

export default Search;