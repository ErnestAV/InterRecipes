import { BASE_URL } from './api'
import axios from 'axios'

const createRecipe = async ({userid, title, description, ingredients, steps}) => {
    const recipe = {
        "user" : userid,
        "title": title,
        "description" : description,
        "ingredients" : ingredients,
        "steps" : steps
    }
    const { data } = await axios.post(`${BASE_URL}/recipes`, recipe, {
        headers:{
            'access-token' : localStorage.getItem('token')
        }
    })
    console.log(localStorage.getItem('token'))
    console.log(data)
    return data
}

const editRecipe = async ({recipeid, userid, title, description, ingredients, steps}) => {
    const recipe = {
        "user" : userid,
        "title": title,
        "description" : description ,
        "ingredients" : ingredients,
        "steps" : steps
    }
    const { data } = await axios.put(`${BASE_URL}/recipes/${recipeid}/edit`, recipe, {
        headers:{
            'access-token' : localStorage.getItem('token')
        }
    })
    return data
}

const deleteRecipe = async (id) => {
    const {data} = await axios.delete(`${BASE_URL}/recipes/${id}`, {
        headers:{
            'access-token' : localStorage.getItem('token')
        }
    })
    return data
}

const allRecipes = async () => {
    const {data} = await axios.get(`${BASE_URL}/recipes/all`)
    return data
}

const getMyRecipes = async () => {
    const {data} = await axios.get(`${BASE_URL}/recipes/me`, {
        headers:{
            'access-token' : localStorage.getItem('token')
        }
    })
    return data
}

const popularRecipes = async () => {
    const {data} = await axios.get(`${BASE_URL}/recipes/popular`)
    return data
}

export {
    createRecipe,
    editRecipe,
    popularRecipes,
    getMyRecipes,
    deleteRecipe,
    allRecipes
}