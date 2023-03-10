import {deleteTodo, getAllTodos} from "../api/TodoServiceApi";
import {useEffect, useState} from "react";
import {useAuth} from "../security/AuthContext";


export default function ListTodoComponent(){
    const [todos, setTodos] = useState([])
    const authContext = useAuth()
    const username = authContext.username
    const [warningMessage, setWarningMessage] = useState(null)
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
    return(
        <div className="container">
            <h2>List of all your Todos</h2>
            {warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Is Complete</td>
                        <td>Target Date</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed.toString()}</td>
                                    <td>{todo.targetDate}</td>
                                    <td><button className="btn btn-danger" onClick={()=>deleteThis(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}