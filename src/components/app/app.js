import React, { Component } from 'react';
import SearchField from '../search-filed';
import MembersList from '../members-list';
import OrganizationPage from '../oragnization-page';
import UserPage from "../user-page";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './app.css';
import UserFollowers from "../user-followers";
import UserFollows from "../user-follows";

export default class App extends Component {
    state = {
        orgName: ''
    };

    getOrgName(name) {
        this.setState({orgName: name});
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route
                        path='/'
                        exact
                        render={() => {
                            return(
                                <div className="container mt-2">
                                    <h2>Github Search</h2>
                                    <SearchField
                                        getOrgName={this.getOrgName.bind(this)}
                                    />
                                    <OrganizationPage orgName={this.state.orgName}/>
                                </div>
                            )}}>
                    </Route>
                    <Route
                        path='/:org/members'
                        exact
                        render={({match}) => {
                          return  <MembersList  name={this.state.orgName} org={match.params.user}/>
                        }}
                    >
                    </Route>
                    <Route path='/user/:user' exact render={({match}) => {
                        return(
                            <UserPage user={match.params.user}/>
                        )
                    }}/>
                    <Route path='/user/:user/followers' component={UserFollowers}/>
                    <Route path='/user/:user/follows' component={UserFollows}/>
                </Switch>
            </Router>
            )
    }
}


