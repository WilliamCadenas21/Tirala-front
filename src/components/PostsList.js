import React, { Component } from 'react'
import { format } from 'timeago.js'
import postsController from '../controllers/postsController'
export default class PostsList extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts()
    }

    async getPosts() {
        try {
            const res = await postsController.getPosts()
            this.setState({ posts: res.data.posts })
        } catch (e) {
            console.log(e)
        }

    }

    deletePost = async (id) => {
        try {
            const res = await postsController.getPosts(id)
            if (res.data.status === 200) {
                this.getPosts()
            } else {
                throw(res.data.message)
            }
        } catch (e) {
            console.log(e)
        }   
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.posts.map(post => (
                        <div className="col-md-4 p2" key={post._id}>
                            <div className="card">
                                <div className="card-header">
                                    <h5>#{post.hashtag}</h5>
                                </div>
                                <div className="card-body">
                                    <p>{post.content}</p>
                                    <p>{post.author}</p>
                                    <p>{format(post.createdAt)}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deletePost(post._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
