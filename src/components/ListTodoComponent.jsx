import {deleteTodo, getAllTodos} from "../api/TodoServiceApi";
import {useEffect, useState} from "react";
import {useAuth} from "../security/AuthContext";
import {useNavigate} from "react-router-dom";


export default function ListTodoComponent(){
    const [todos, setTodos] = useState([])
    const authContext = useAuth()
    const username = authContext.username
    const [warningMessage, setWarningMessage] = useState(null)
    const navigate = useNavigate()
    // useEffect - tell react that your component needs to do after render
    useEffect(
        () => {
            refreshTodos()
        },[]
    )
    function refreshTodos() {
        getAllTodos(username)
            .then((response) => {
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
    }
    function deleteThis(id){
        deleteTodo(id)
            .then(
                ()=>{refreshTodos()
                    setWarningMessage(`Your Task has been successfully deleted with id: ${id}`)
            })
            .catch((error) => console.log(error))
    }
    function updateThis(id){
        navigate(`/todo/${id}`)
    }
    function addNew(){
        navigate(`/todo/-1`)
    }
    return(
        <div className="container">
            <h2>List of all your Todos</h2>
            {warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Is Complete</th>
                        <th>Target Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed.toString()}</td>
                                    <td>{todo.targetDate}</td>
                                    <td><button className="btn btn-danger" onClick={()=>deleteThis(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-primary" onClick={()=>updateThis(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={()=>addNew()}>Add Task</button>
            </div>
        </div>
    )
}