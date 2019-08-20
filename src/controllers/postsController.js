import config from '../config/config';
import axios from 'axios';
const postsController = {}
const url = `${config.uriBase}posts/`

postsController.getPosts = async () => {
    try {
        return await axios.get(url)
    } catch (e) {
        throw(e)
    }
}

postsController.deletePost = async (id) => {
    try {
        return await axios.get(`url${id}`)
    } catch (e) {
        throw(e)
    }
}

postsController.createPost = async (post) => {
    try {
        return await axios.post(url, post)
    } catch (e) {

    }
}

export default postsController