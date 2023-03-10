import axios from "axios";

const client = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
)
export const getAllTodos = (username)=>client.get(`/${username}/todos`)

export const deleteTodo = (id)=>client.delete(`/${id}/todo`)

export const getTodo = (username, id)=>client.get(`/${username}/${id}/todo`)