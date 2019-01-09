import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'

const API_KEY = "OasCIRLEORrKEt93SMJqCIQVHVdKLB5IpVwxnrBN";
const API_URL = 'https://api.nal.usda.gov/ndb/search/?format=json'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`${API_URL}&q=${this.state.query}&sort=n&max=25&offset=0&api_key=${API_KEY}`)
      .then(({ data }) => {
          console.log(data.list);
        this.setState({
          //results: data.list.q, // USDA returns an object named data, as does axios. So... data.list
          results: data.list.item                      
          })
      })
  }

  handleInputChange = () => {
    this.setState({
        query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 4 === 0) {
                    this.getInfo()
                }
            } 
        })
  }

  render() {
      console.log("results: ", this.state.results);
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default Search