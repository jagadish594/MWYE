import React from 'react';
import PropTypes from 'prop-types';
const propTypes = {
    items: PropTypes.array.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number, 
    totalItems: PropTypes.number,
    start: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 25
}
 
class Pagination2 extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.getInfo = this.getInfo.bind(this);
    }

    // componentWillMount() {
    //     // set page if items array isn't empty
    //     if (this.props.items && this.props.totalItems) {
    //         this.setPage(this.props.initialPage);
    //         console.log(this.props.initialPage);
    //     }
    // }
 
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        //if (this.props.items !== prevProps.items) {
        if(this.props.items && this.props.start === 0 && prevProps.start !== this.props.start)
            this.setPage(this.props.initialPage);
    }

    setPage(page){
        console.log("From pagination2, Page: ", page);
        var pager = this.state.pager;
        const totalItems = this.props.totalItems;
        pager =  this.getInfo(totalItems, page);
        this.setState({pager: pager});

        // call getPageNumber function in parent component
        this.props.getPageNumber(page);
    }

    getInfo(totalItems, currentPage){
        // calculate total pages
        var totalPages = Math.ceil(totalItems / this.props.pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages
        };
    }
    render(){
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            console.log("From Pagination2 -render, pager.pages: ", pager.pages);
            return null;
        }
        return(
            <ul>
                <li>{this.state.pager.currentPage}</li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li> 
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a href="#" onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
                
            </ul>
        );
    }
}
 
Pagination2.propTypes = propTypes;
Pagination2.defaultProps = defaultProps;
 
export default Pagination2;