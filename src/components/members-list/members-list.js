import React, { Component } from 'react';
import {Link} from "react-router-dom";
import GitApiService from '../../service';

import './members-list.css';



export default class  MembersList extends Component {

    state = {
        name: '',
        users: []
    };

    apiService = new GitApiService()

    componentDidMount() {
        console.log(this.props)
        this.setState({name: this.props.name})
    }

    componentDidUpdate() {
        const { name, users } = this.state;
        if(name && users.length === 0) {
            this.apiService.getMembers(name)
                .then((data) => {
                    if(data.length > 0) {
                        this.setState({users: data})
                    }else {
                        this.setState({users: {}})
                    }
                })
        }
    }


    render() {
        const { users } = this.state;
        if(!Array.isArray(users)) {
            return (
                <div className='container'>
                    <h2 className='mt-2 company-name'>{this.state.name} members list</h2>
                    <p>This organization have no members</p>
                </div>
            )
        }
        return(
            <div className="container">
                <h2 className='mt-2 company-name'>{this.state.name} members list</h2>
                <ul className="list-group">
                    {
                        users.map((item) => {
                            return (
                                <li className="list-group-item" key={item.id}>
                                    <img src={item.avatar_url} alt={`${item.login} profile pic`}/>
                                    <div>
                                        <p>{item.login}</p>

                                        <div>
                                            <Link to={`/user/${item.login}`} >Users page</Link>
                                        </div>
                                        <div>
                                            <Link to={{
                                                pathname: `/user/${item.login}/followers`,
                                                aboutProps: {
                                                    url: item.followers_url,
                                                    login: item.login
                                                }
                                            }}>Followers List</Link>
                                        </div>
                                        <div>
                                            <Link to={{
                                                pathname: `/user/${item.login}/follows`,
                                                aboutProps: {
                                                    url: `https://api.github.com/users/${item.login}/following`,
                                                    login: item.login
                                                }
                                            }}>Follows List</Link>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
//
// followers_url: "https://api.github.com/users/clydin/followers"
// following_url: "https://api.github.com/users/clydin/following{/other_user}"
