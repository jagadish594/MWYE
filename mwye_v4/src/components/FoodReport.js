import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class FoodReport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Group",
                  accessor: "group"
                },
                {
                  Header: "Value",
                  accessor: "value"
                },
                {
                  Header: "Unit",
                  accessor: "unit"
                }
            ]
        }

    }


    render(){
        return(
            <div>
                <h3>{this.props.nutrientName}</h3>
                <h5>Ingredients</h5>
                <p>{this.props.ingredients}</p>
                <h5>Nutrients Table</h5>
                <ReactTable
                columns = {this.state.columns}
                data = {this.props.nutrients}
                filterable
              />
            </div>
        );
    }
}

export default FoodReport;