import axios from "axios";

const client = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
)
export const getAllTodos = (username)=>client.get(`users/${username}/todos`)

export const deleteTodo = (id)=>client.delete(`todo/${id}`)

export const getTodo = (username, id)=>client.get(`users/${username}/todo/${id}`)
export const updateTodo = (username, id, todo)=>client.put(`users/${username}/todo/${id}`, todo)
export const addTodo = (username, todo)=>client.put(`users/${username}/todo`, todo)