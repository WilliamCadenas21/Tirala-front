import React, { Component } from 'react'
import usersController from '../controllers/usersController'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        try {
            const res = await usersController.getUsers()
            this.setState({ users: res.data.users })
        } catch (e) {
            console.log(e)
        }
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        try {
            const user = {
                username: this.state.username
            } 
            const res = await usersController.createUser(user)
            this.setState({ username: '' })
            if (res.data.status === 200) {
                this.getUsers()
            } else {
                throw res.data.message
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (<div className="row" >
            <div className="col-md-4" >
                <div className="card card-body" >
                    <h3> Create New User </h3>
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group" >
                            <input type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUserName}
                            /> </div> <button type="submit"
                                className="btn btn-primary" >
                            Save </button>
                    </form>
                </div>
            </div>
            <div className="col-md-8" >
                <ul className="list-group"> {
                    this.state.users.map(user => (
                        <li className="list-group-item list-group-item-action"
                            key={user._id}> {user.username} </li>
                    ))
                } </ul>
            </div>
        </div>
        )
    }
}