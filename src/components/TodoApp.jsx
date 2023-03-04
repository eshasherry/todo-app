import './TodoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from "react-router-dom";

export default function TodoApp(){
    const [username, setUsername] = useState('username')

    return(
        <div className="TodoApp">
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>
                        <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
                        <Route path='/todos' element={<ListTodoComponent />}></Route>
                        <Route path='*' element={<ErrorComponent/>}></Route>
                        <Route path='/logout' element={<LogoutComponent/>}></Route>
                    </Routes>
                    <FooterComponent/>
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
        <div className="container">
            <div>
                <h2>List of all your Todos</h2>
            </div>
            <div>
                <table className="table">
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
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand ms-2 fs-2 fw-bold text-black">QuickTask</div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/esha">Home</Link></li>
                                <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}
function FooterComponent(){
    return(
        <div className="footer">
            <div className="container">
                <hr/>   Footer
            </div>
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