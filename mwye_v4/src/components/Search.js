import React, { Component } from 'react'
import axios from 'axios'
//import Suggestions from './Suggestions'
import Pagination from './Pagination';

const API_KEY = "OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN";
const API_URL = 'https://api.nal.usda.gov/ndb/search/?format=json'

class Search extends Component {
  constructor(){
    super();
    this.state = {
        query: '',
        OverAllresults: [],
        results: [],
        //pageOfItems: [], 
        page: 1
      }
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(page) {
    this.setState({ page: page });
  }
  
  componentDidUpdate(prevProps, prevState){
      if(this.state.page !== prevState.page) this.getInfo();
  }

  getInfo = () => {
    const offsetNum = this.state.page*25;
    console.log("offSetNum: ", offsetNum);
    axios.get(`${API_URL}&q=${this.state.query}&sort=n&max=25&offset=${offsetNum}&api_key=${API_KEY}`)
      .then(({ data }) => {
          console.log("From get Info: ", data.list);
        this.setState({
          OverAllresults: data.list, // USDA returns an object named data, as does axios. So... data.list
          results: data.list.item                      
          })
      })
      .catch(error =>{
        console.log("Fetching and parsing error ", error)
      })

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

  render() {
      console.log("Overall results: ", this.state.OverAllresults);
      console.log("end: ", this.state.OverAllresults['end']);
      console.log("start: ", this.state.OverAllresults['start']);
      console.log("total: ", this.state.OverAllresults['total']);
      console.log("Page: ", this.state.page);
    return (
        <div className="container">
            <form>
                <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                
            </form>
      
            <div className="text-center">
                <h1>List of items</h1>
                {this.state.results.map(item =>
                    <div key={item.ndbno}>{item.name}</div>
                )}
                <Pagination items={this.state.results} onChangePage={this.onChangePage} 
                    pageSize={this.state.OverAllresults['end']} totalItems ={this.state.OverAllresults['total']}/>
            </div>
        </div>
    )
  }
}

export default Search