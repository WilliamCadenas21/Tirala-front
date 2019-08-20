import React, { Component } from 'react'
import postsController from '../controllers/postsController'
import usersController from '../controllers/usersController'
export default class CreatePost extends Component {

    state = {
        users: [],
        userSelected: '',
        hashtag: '',
        content: ''
    }

    onSubmit = async e => {
        e.preventDefault()
        const newPost = {
            hashtag: this.state.hashtag,
            content: this.state.content,
            author: this.state.userSelected
        }
        try {
            const res = await postsController.createPost(newPost)

            if (res.data.status === 200) {
                window.location.href = '/'
            } else {
                throw res.data.message
            }
        } catch (e) {
            console.log(e)
        }
    }

    async componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        try {
            const res = await usersController.getUsers()
            this.setState({
                users: res.data.users,
                userSelected: res.data.users[0].username
            })
        } catch (e) {
            console.log(e)
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Post</h4>
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                        >
                            {
                                this.state.users.map(user =>
                                    <option
                                        key={user._id}
                                        value={user.username}>
                                        {user.username}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hashtag"
                            name="hashtag"
                            onChange={this.onInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="content"
                            className="form-control"
                            placeholder="Content"
                            onChange={this.onInputChange}
                            required
                        >

                        </textarea>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>

                </div>
            </div>
        )
    }
}