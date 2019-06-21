import React, { Component } from 'react';

import GitApiService from '../../service'
import './user-follows.css'

export default class UserFollows extends Component {

    state = {
        url: '',
        login: '',
        follows: []
    };

    apiService = new GitApiService();

    componentDidMount() {
        if(!this.props.location.aboutProps) {
            this.setState({url: '', login: ''})
        }  else {
            const {url, login} = this.props.location.aboutProps;
            this.setState({url, login})
            if(url && this.state.follows.length === 0) {
                this.apiService.getFollowers(url)
                    .then(data => {
                        this.setState({follows: data})
                    })
            }
        }
    }

    render() {
        const { login, follows} = this.state;
        if(follows.length === 0) {
            return (
                <div className='container'>
                    <h2 className='mt-2 company-name'>{login} follows</h2>
                    <p>{login} has no follows</p>
                </div>
        )
        }
        return(
            <div className="container">
                <h2 className='mt-2 company-name'>{login} follows</h2>
                <ul className="list-group">
                    {
                        follows.map((item) => {
                            return (
                                <li className="list-group-item" key={item.id}>
                                    <img src={item.avatar_url} alt={`${item.login} profile pic`}/>
                                    <div>
                                        <p>{item.login}</p>

                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

};
