import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

//endereço do backend
//adicionar como Coding Vars no Heroku o link do backend associado ao REACT_APP_API_URL

export default api;