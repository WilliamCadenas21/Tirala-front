import config from '../config/config';
import axios from 'axios';
const usersController = {}
const url = `${config.uriBase}users/`

usersController.getUsers = async () => {
    try {
        return await axios.get(url)
    } catch (e) {
        throw e
    }
}

usersController.createUser = async (user) => {
    try {
        return await axios.post(url, user)
    } catch (e) {
        throw e
    }
}

export default usersController