import React, { Component } from 'react';
import Pagination from './Pagination';
import axios from 'axios';

const API_KEY = "OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN";
const API_URL = 'https://api.nal.usda.gov/ndb/search/?format=json';

class Search extends Component {
  constructor() {
        super();
 
        this.state = {
            query: '',
            exampleItems: [],
            pageOfItems: [],
            result: [],
            page: 1
        };
 
        this.onChangePage = this.onChangePage.bind(this);
        this.getPageNumber = this.getPageNumber.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    getPageNumber(page){
        this.setState({ page: page });
    }

    componentWillUpdate(prevProps, prevState){
        if(prevState.page !== this.state.page){
            this.getInfo();
        }
    }

  getInfo = () => {
    const offsetNum = (this.state.page - 1)*25;
    //const offsetNum = 0;
    axios.get(`${API_URL}&q=${this.state.query}&sort=n&max=25&offset=${offsetNum}&api_key=${API_KEY}`)
      .then(({ data }) => {
        this.setState({
          result: data.list, // USDA returns an object named data, as does axios. So... data.list
          exampleItems: data.list.item                      
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
    console.log("total: ", this.state.result.total);
    console.log("Example Items: ", this.state.exampleItems);
    return (
      <div>
        <div className="container">
            <form>
                <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                
            </form>
            <div className="text-center">
              <div>
                <h1>List of Items</h1>
                {this.state.pageOfItems.map(item =>
                    <div key={item.ndbno}>{item.name}</div>
                )}
              </div>
                <hr />
              <div>
                <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage}  
                    getPageNumber = {this.getPageNumber} totalItems={this.state.result.total}/>
              </div>
            </div>
        </div>
        

      </div>  
    );
  }
}

export default Search;
