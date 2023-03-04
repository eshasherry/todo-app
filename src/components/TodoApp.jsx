import './TodoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from "react-router-dom";

export default function TodoApp(){
    const [username, setUsername] = useState('username')

    return(
        <div className="TodoApp">
            <HeaderComponent/>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>
                        <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
                        <Route path='/todos' element={<ListTodoComponent />}></Route>
                        <Route path='*' element={<ErrorComponent/>}></Route>
                        <Route path='/logout' element={<LogoutComponent/>}></Route>
                    </Routes>
                </BrowserRouter>
            <FooterComponent/>
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
            <div>
                Welcome to the Application {username}
            </div>
            <div>
                Manage your Todos <Link to="/todos">here</Link>
            </div>
        </div>
    )
}

function ListTodoComponent(){
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDay());
    const todos = [{id: 1, description: "Learn Spring", isComplete: false, targetDate:targetDate},
                   {id: 2, description: "Learn Something", isComplete: false, targetDate:targetDate}]
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
                            <td>Is Complete</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.isComplete.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
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
function HeaderComponent(){
    return(
        <div className="header">
               Header<hr/>
        </div>
    )
}
function FooterComponent(){
    return(
        <div className="footer">
            <hr/>   Footer
        </div>
    )
}
function LogoutComponent(){
    return(
        <div className="logout">
            <h1>Thanks for using our Application</h1>
        </div>
    )
}