import React, { Component } from 'react';

import GitApiService from '../../service';

import './user-page.css'

export default class UserPage extends Component {

    state = {
        user: '',
        data: {}
    };


    apiService = new GitApiService();

    _handleSearch(query) {
        this.apiService.getUser(query)
            .then((data) => {
                this.setState({data: {...data}});
            })
    };

    componentDidMount () {
        this.setState({user: this.props.user})
    }

    componentDidUpdate(prevState) {
        const {data} = this.state;
        if(Object.keys(data).length === 0) {
            this._handleSearch(this.props.user);
        }


    }

    render() {
        const {data} = this.state;
        return(
            <div className="container-user container  mt-2">
                <div>
                    <img className='userImage' src={data.avatar_url} alt={data.name}/>
                </div>
                <div className="container-description">
                    <p className='userName'>{data.name}</p>
                    <p className='userLogin'>{data.login}</p>
                    <div className="info-block">
                        <p >Workplace: {data.company}</p>
                        <p>Loction: {data.location}</p>
                        <p>Blog: <a href={data.blog}>{data.blog}</a></p>
                    </div>
                </div>
            </div>
        )
    }
}
