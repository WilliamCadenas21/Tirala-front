import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
export default class PostsList extends Component {
    
    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts()
    }

    async getPosts() {
        const res =await axios.get('http://localhost:4000/api/posts/')
        this.setState({posts: res.data.posts})
    }

    deletePost = async (id) => {
        const res = await axios.delete(`http://localhost:4000/api/posts/${id}`)
        if (res.data.status === 200){
            this.getPosts()
        } else {
            console.log('no se pudo borrar')
        }
    }

    
    render() {
        return (
            <div className="row">
                {
                    this.state.posts.map(post =>(
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
                                    <button className="btn btn-danger" onClick={()=> this.deletePost(post._id)}>
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
