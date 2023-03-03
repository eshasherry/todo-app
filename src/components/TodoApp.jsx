import './TodoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate, useParams} from "react-router-dom";

export default function TodoApp(){
    const [username, setUsername] = useState('username')

    return(
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
                    <Route path='/todos' element={<ListTodoComponent />}></Route>
                    <Route path='*' element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

function LoginComponent(){
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    function handleOnSubmit(){
        if(username === 'esha' && password === 'password'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate(`/welcome/${username}`)
        }else{
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }
    return(
        <div className="Login">
            {showSuccessMessage && <div>Successful Authentication</div>}
            {showErrorMessage && <div>Authentication Failed. Please try again</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name ="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name ="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleOnSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}
function WelcomeComponent(){
   // const params = useParams() or do below
    const {username} = useParams()
    console.log(username)
    return(
        <div>
            Welcome to the Application {username}
        </div>
    )
}
function ErrorComponent(){
    return(
        <div>
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404.
            </div>
        </div>
    )
}

function ListTodoComponent(){
    const todos = [{id: 1, description: "Learn Spring"},
                    {id: 1, description: "Learn Something"}]
    return(
        <div>
            <div>
                <h2>List of all your Todos</h2>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
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