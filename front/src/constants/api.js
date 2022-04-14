import axios from 'axios'
const BASE_URL='https://inter-recipesapi.herokuapp.com/api'

const signup = async (form) => {
    const {data} = await axios.post(`${BASE_URL}/users`, form)
    return data
}
const login = async (username, password) => {
    const {data} = await axios.post(`${BASE_URL}/users/login`, {
        username: username,
        password:password
    })
    return data
}
export {
    signup,
    login,
    BASE_URL
}