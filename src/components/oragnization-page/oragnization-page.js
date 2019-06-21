import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GitApiService from '../../service';


import './oragnization-page.css';

export default class OrganizationPage extends Component {

    state = {
        orgName: null,
        orgResponse: [],
    };

      ApiService = new GitApiService();
     _handleSearch = (query) => {
        this.ApiService.getOrganization(query)
            .then((orgResponse) => {
                this.setState({orgResponse});
            })
            .catch(() => {
                this.setState({orgResponse: null})
            });
    };




    componentDidUpdate(prevProps) {
         const { orgName } = this.props;
        if (orgName !== prevProps.orgName) {
            this._handleSearch(orgName);
        }
    }


    render() {
        const { orgResponse } =  this.state;
        if (orgResponse === null) {
            return <span className="orgNameSpan">There is no organization with that name</span>;
        }
        if (orgResponse.length === 0) {
            return <span className="orgNameSpan">Enter the organization name</span>;
        }

        const { name, location, description, login } = orgResponse;
       return(
           <div className="container container-block search-result">
               <h2>{name ? name : login}</h2>
               <p>{location ? location : 'No location for this organization'}</p>
               <p>{description ? description : 'No description for this organization'}</p>
               <Link to={`/${login}/members`}>Members List</Link>
           </div>
       )
   }
};
